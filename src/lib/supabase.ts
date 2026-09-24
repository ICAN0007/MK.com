import { createClient } from '@supabase/supabase-js';

// Retrieve Supabase credentials from client-side environment variables
const supabaseUrlRaw = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKeyRaw = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Strip any accidental surrounding quotes from .env injection
const supabaseUrl = supabaseUrlRaw.replace(/^['"]|['"]$/g, '').trim();
const supabaseAnonKey = supabaseAnonKeyRaw.replace(/^['"]|['"]$/g, '').trim();

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

// Initialize Supabase Client (only if configured to prevent startup crashes)
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * Tracks a visitor by inserting their IP, country, city, and device into the Supabase table.
 * It maps location string and user agent dynamically.
 */
export async function trackVisitor(ipAddress: string, locationStr: string, userAgentStr: string) {
  if (!supabase) {
    console.warn('Supabase is not configured yet. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your env secrets.');
    return { success: false, error: 'Not configured' };
  }

  try {
    // Parse city and country from location string (e.g. "Ahmedabad, Gujarat, India")
    let city = 'Unknown';
    let country = 'Unknown';
    
    if (locationStr && locationStr !== 'Detecting...' && !locationStr.includes('Default') && !locationStr.includes('Proxy')) {
      const parts = locationStr.split(',').map(p => p.trim());
      if (parts.length === 1) {
        country = parts[0];
      } else if (parts.length >= 2) {
        city = parts[0];
        country = parts[parts.length - 1];
      }
    } else {
      // Default fallback values if unable to detect
      city = 'Ahmedabad';
      country = 'India';
    }

    // Format a friendly device string from userAgent (e.g., "Chrome (Windows)")
    let device = 'Web Visitor';
    const ua = userAgentStr.toLowerCase();
    
    const isMobile = /mobile|android|iphone|ipad|phone/i.test(ua);
    const os = /windows/i.test(ua) ? 'Windows' :
               /macintosh|mac os x/i.test(ua) ? 'macOS' :
               /android/i.test(ua) ? 'Android' :
               /iphone|ipad|ipod/i.test(ua) ? 'iOS' :
               /linux/i.test(ua) ? 'Linux' : 'OS Unknown';
               
    const browser = /chrome|crios/i.test(ua) && !/edge|edg/i.test(ua) && !/opr/i.test(ua) ? 'Chrome' :
                    /safari/i.test(ua) && !/chrome|crios/i.test(ua) ? 'Safari' :
                    /firefox|fxios/i.test(ua) ? 'Firefox' :
                    /edge|edg/i.test(ua) ? 'Edge' :
                    /opr/i.test(ua) ? 'Opera' : 'Browser';

    device = `${browser} on ${os}${isMobile ? ' (Mobile)' : ''}`;

    const referrer = typeof document !== 'undefined' ? (document.referrer || null) : null;

    // Create standard visitor record locally
    const localVisitor = {
      id: Date.now(),
      created_at: new Date().toISOString(),
      ip: ipAddress || 'Local/Shielded',
      country: country || 'India',
      city: city || 'Ahmedabad',
      browser: browser || 'Browser',
      device: device || 'Web Visitor',
      os: os || 'OS Unknown',
      user_agent: userAgentStr || null,
      referrer: referrer || null
    };

    // Store in localStorage so tracking is always preserved even if network or Supabase is offline
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        const stored = JSON.parse(localStorage.getItem('mtc_visitor_logs') || '[]');
        const filtered = Array.isArray(stored)
          ? stored.filter((item: any) => item && item.ip && (item.ip !== localVisitor.ip || (Date.now() - new Date(item.created_at).getTime()) > 30000))
          : [];
        const updated = [localVisitor, ...filtered].slice(0, 100);
        localStorage.setItem('mtc_visitor_logs', JSON.stringify(updated));
      } catch {
        // Silently ignore storage errors
      }
    }

    // If Supabase client is available, attempt to sync to remote table
    if (supabase) {
      try {
        const insertPromise = supabase
          .from('visitors')
          .insert([
            {
              ip: ipAddress || null,
              country: country || null,
              city: city || null,
              browser: browser || null,
              device: device || null,
              os: os || null,
              user_agent: userAgentStr || null,
              referrer: referrer || null
            }
          ]);

        const timeoutPromise = new Promise<{ data: any; error: any }>((resolve) =>
          setTimeout(() => resolve({ data: null, error: new Error('Supabase request timed out') }), 4000)
        );

        const { data, error } = await Promise.race([insertPromise, timeoutPromise]);

        if (error) {
          console.warn('Supabase visitor log skipped (table policy or offline):', error.message || error);
        } else {
          console.log('Successfully logged visitor to Supabase!', data);
        }
      } catch (networkErr: any) {
        // Silently degrade on fetch failures / unreachable hosts
        console.warn('Supabase endpoint unreachable; logged to local telemetry:', networkErr?.message || networkErr);
      }
    }

    // Dispatch a custom event to instantly notify any listening dashboard tables to refresh
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('supabase-visitor-tracked', { detail: localVisitor }));
    }

    return { success: true, data: localVisitor };
  } catch (err: any) {
    console.warn('Visitor tracking handled with fallback:', err?.message || err);
    return { success: false, error: err };
  }
}

/**
 * Retrieves the list of logged visitors from Supabase 'visitors' table,
 * falling back gracefully to local storage visitor logs if Supabase is offline.
 */
export async function getVisitors() {
  let localLogs: any[] = [];
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      const parsed = JSON.parse(localStorage.getItem('mtc_visitor_logs') || '[]');
      if (Array.isArray(parsed)) {
        localLogs = parsed;
      }
    } catch {
      localLogs = [];
    }
  }

  if (!supabase) return localLogs;

  try {
    const fetchPromise = supabase
      .from('visitors')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100);

    const timeoutPromise = new Promise<{ data: any[] | null; error: any }>((resolve) =>
      setTimeout(() => resolve({ data: null, error: new Error('Supabase request timed out') }), 4000)
    );

    const { data, error } = await Promise.race([fetchPromise, timeoutPromise]);

    if (error) {
      console.warn('Could not read from Supabase visitors table, displaying local logs:', error.message || error);
      return localLogs;
    }

    if (data && Array.isArray(data) && data.length > 0) {
      return data;
    }

    return localLogs;
  } catch (err: any) {
    console.warn('Supabase visitors endpoint unreachable, displaying local logs:', err?.message || err);
    return localLogs;
  }
}

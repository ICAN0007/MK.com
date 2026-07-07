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

    // Log the payload to the console for transparent developer debugging
    console.log('Sending visitor log to Supabase:', { ip: ipAddress, country, city, browser, device, os, user_agent: userAgentStr, referrer });

    // Insert into 'visitors' with columns matching the user's Supabase schema exactly
    // Omit created_at to let Postgres automatically assign its NOT NULL default now()
    const { data, error } = await supabase
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

    if (error) {
      console.error('Error inserting visitor tracking log into Supabase:', {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint
      });
      return { success: false, error };
    }

    console.log('Successfully logged visitor to Supabase!', data);

    // Dispatch a custom event to instantly notify any listening dashboard tables to refresh
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('supabase-visitor-tracked', { detail: data }));
    }

    return { success: true, data };
  } catch (err) {
    console.error('Unexpected error while tracking visitor:', err);
    return { success: false, error: err };
  }
}

/**
 * Retrieves the list of logged visitors from Supabase 'visitors' table.
 */
export async function getVisitors() {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('visitors')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(100);
    
  if (error) {
    console.error('Error retrieving visitors from Supabase:', error);
    throw error;
  }
  return data || [];
}

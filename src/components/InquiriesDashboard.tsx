import { useState, FormEvent, useEffect } from 'react';
import { WholesaleInquiry } from '../types';
import { getVisitors, isSupabaseConfigured } from '../lib/supabase';
import { 
  AlertCircle, CheckCircle2, Download, Search, Filter, Mail, Phone, MapPin, 
  Send, HelpCircle, FileText, Check, ShieldCheck, Copy, ExternalLink, Clock, Settings 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface InquiriesDashboardProps {
  inquiries: WholesaleInquiry[];
  onUpdateStatus: (id: string, newStatus: WholesaleInquiry['status']) => void;
  onClearAll: () => void;
  onAddInquiry?: (inquiry: WholesaleInquiry) => void;
  visitorIp?: string;
  visitorLocation?: string;
}

export default function InquiriesDashboard({ 
  inquiries, 
  onUpdateStatus, 
  onClearAll,
  onAddInquiry,
  visitorIp = 'Detecting...',
  visitorLocation = 'Ahmedabad, India'
}: InquiriesDashboardProps) {
  
  // Custom contact form states (Image 3 layout)
  const [supabaseVisitors, setSupabaseVisitors] = useState<any[]>([]);
  const [isLoadingSupabase, setIsLoadingSupabase] = useState(false);
  const [supabaseError, setSupabaseError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    const fetchVisitors = async () => {
      if (!isSupabaseConfigured) return;
      try {
        if (active) setIsLoadingSupabase(true);
        const data = await getVisitors();
        if (active) {
          setSupabaseVisitors(data);
          setSupabaseError(null);
        }
      } catch (err: any) {
        if (active) setSupabaseError(err?.message || 'Error connecting to database');
      } finally {
        if (active) setIsLoadingSupabase(false);
      }
    };

    fetchVisitors();

    const handleVisitorTracked = () => {
      if (active) {
        fetchVisitors();
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('supabase-visitor-tracked', handleVisitorTracked);
    }

    const interval = setInterval(fetchVisitors, 20000); // refresh every 20 seconds
    return () => {
      active = false;
      if (typeof window !== 'undefined') {
        window.removeEventListener('supabase-visitor-tracked', handleVisitorTracked);
      }
      clearInterval(interval);
    };
  }, []);

  const [enquiryType, setEnquiryType] = useState('Sample Request');
  const [companyName, setCompanyName] = useState(() => localStorage.getItem('mtc_company_name') || '');
  const [deliveryAddress, setDeliveryAddress] = useState(() => localStorage.getItem('mtc_delivery_address') || '');
  const [firstName, setFirstName] = useState(() => localStorage.getItem('mtc_first_name') || '');
  const [surname, setSurname] = useState(() => localStorage.getItem('mtc_surname') || '');
  const [emailAddress, setEmailAddress] = useState(() => localStorage.getItem('mtc_email_address') || '');
  const [phoneNumber, setPhoneNumber] = useState(() => localStorage.getItem('mtc_phone_number') || '');
  const [messageText, setMessageText] = useState('');
  
  const [formSuccess, setFormSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submittedId, setSubmittedId] = useState('');
  const [submittedMailto, setSubmittedMailto] = useState('');
  const [submittedGmailUrl, setSubmittedGmailUrl] = useState('');
  const [submittedBody, setSubmittedBody] = useState('');
  const [submittedSubject, setSubmittedSubject] = useState('');
  const [copiedDraft, setCopiedDraft] = useState(false);
  const [rememberDetails, setRememberDetails] = useState(() => {
    const stored = localStorage.getItem('mtc_remember_details');
    return stored !== 'false'; // default is true
  });

  // Interactive tracking table states
  const [selectedInquiryId, setSelectedInquiryId] = useState<string | null>(
    inquiries.length > 0 ? inquiries[0].id : null
  );
  const [statusFilter, setStatusFilter] = useState<'All' | WholesaleInquiry['status']>('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter inquiry list
  const filteredInquiries = inquiries.filter((iq) => {
    const matchStatus = statusFilter === 'All' || iq.status === statusFilter;
    const matchSearch = iq.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        iq.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        iq.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchStatus && matchSearch;
  });

  // Calculate stats
  const stats = {
    totalActive: inquiries.length,
    grossValue: inquiries.reduce((sum, item) => sum + item.totalInquiryValue, 0),
    quotedCount: inquiries.filter((iq) => iq.status === 'Quotation Sent').length,
    confirmedCount: inquiries.filter((iq) => iq.status === 'Order Confirmed').length,
  };

  // Copy prefilled draft helper
  const handleCopyDraft = () => {
    const fullText = `Subject: ${submittedSubject}\nTo: mukeshtradingco16@gmail.com\n\n${submittedBody}`;
    navigator.clipboard.writeText(fullText).then(() => {
      setCopiedDraft(true);
      setTimeout(() => setCopiedDraft(false), 3000);
    }).catch(() => {
      // standard fallback
    });
  };

  // Submission handler for general contact enquiries
  const handleContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitError('');

    if (!firstName || !emailAddress || !phoneNumber) {
      setSubmitError('First Name, Email, and Phone number are required fields.');
      return;
    }

    // Adapt to general Sourcing inquiry seed item
    const mockInquiryId = 'RFQ-' + Math.floor(100000 + Math.random() * 900000);
    const combinedMsg = `Enquiry Type: [${enquiryType}]. Address: [${deliveryAddress || 'Not Provided'}]. Message: ${messageText}`;
    
    const newGeneralInquiry: WholesaleInquiry = {
      id: mockInquiryId,
      name: `${firstName} ${surname}`.trim(),
      email: emailAddress,
      phone: phoneNumber,
      companyName: companyName || 'Private Architect Specifier',
      businessType: 'Construction/Contractor',
      gstNumber: undefined,
      preferredShipping: 'Standard Freight',
      comment: combinedMsg,
      items: [
        {
          productId: 'custom-spec',
          productName: `Bespoke Spec: Perforated Sheets & Wire Mesh Service (${enquiryType})`,
          sku: 'MTC-AM-SPEC-01',
          quantity: 1,
          unitPrice: 350.00,
          discountApplied: 0,
          totalPrice: 350.00
        }
      ],
      totalInquiryValue: 350.00,
      status: 'Pending Review',
      createdAt: new Date().toISOString(),
      ipAddress: visitorIp,
      ipLocation: visitorLocation
    };

    // Construct the customized prefilled mailto url
    const subjectLine = `Mukesh Trading Co. - Sourcing Enquiry [${mockInquiryId}]`;
    const mailtoBody = 
      `Dear Mukesh Trading Co. Team,\n\n` +
      `Below are the details for a new industrial screening/filtration enquiry:\n\n` +
      `- Enquiry reference ID: ${mockInquiryId}\n` +
      `- Enquiry Type: ${enquiryType}\n` +
      `- Client IP Verification: ${visitorIp} (${visitorLocation})\n` +
      `- Client Name: ${firstName} ${surname}`.trim() + `\n` +
      `- Contact Email: ${emailAddress}\n` +
      `- Contact Phone: ${phoneNumber}\n` +
      `- Company Name: ${companyName || 'Not Provided'}\n` +
      `- Delivery / Shipping Address: ${deliveryAddress || 'Not Provided'}\n\n` +
      `Message & Requirements:\n` +
      `========================================================\n` +
      `${messageText}\n` +
      `========================================================\n\n` +
      `Please let us know the pricing, lead times, and ready stock availability at your earliest convenience.\n\n` +
      `Best regards.`;

    const mailtoUrl = `mailto:mukeshtradingco16@gmail.com?subject=${encodeURIComponent(subjectLine)}&body=${encodeURIComponent(mailtoBody)}`;
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=mukeshtradingco16@gmail.com&su=${encodeURIComponent(subjectLine)}&body=${encodeURIComponent(mailtoBody)}`;

    if (onAddInquiry) {
      onAddInquiry(newGeneralInquiry);
    }
    
    // Save info preference in localStorage (cookie-like persistence)
    localStorage.setItem('mtc_remember_details', String(rememberDetails));
    if (rememberDetails) {
      localStorage.setItem('mtc_company_name', companyName);
      localStorage.setItem('mtc_delivery_address', deliveryAddress);
      localStorage.setItem('mtc_first_name', firstName);
      localStorage.setItem('mtc_surname', surname);
      localStorage.setItem('mtc_email_address', emailAddress);
      localStorage.setItem('mtc_phone_number', phoneNumber);
    } else {
      localStorage.removeItem('mtc_company_name');
      localStorage.removeItem('mtc_delivery_address');
      localStorage.removeItem('mtc_first_name');
      localStorage.removeItem('mtc_surname');
      localStorage.removeItem('mtc_email_address');
      localStorage.removeItem('mtc_phone_number');
    }

    setSelectedInquiryId(mockInquiryId);
    setSubmittedId(mockInquiryId);
    setSubmittedMailto(mailtoUrl);
    setSubmittedGmailUrl(gmailUrl);
    setSubmittedSubject(subjectLine);
    setSubmittedBody(mailtoBody);
    setCopiedDraft(false);
    setFormSuccess(true);
    
    // Clear message and specs but keep contact info if remembered
    setMessageText('');
    if (!rememberDetails) {
      setCompanyName('');
      setDeliveryAddress('');
      setFirstName('');
      setSurname('');
      setEmailAddress('');
      setPhoneNumber('');
    }
  };

  // Invoice output generator
  const generateSimulatedInvoice = (iq: WholesaleInquiry) => {
    let text = `========================================================\n`;
    text += `             MUKESH TRADING CO.\n`;
    text += `        Wholesale Wire Netting & Sifting Spares\n`;
    text += `========================================================\n`;
    text += `INQUIRY ID:      ${iq.id}\n`;
    text += `DATE SUBMITTED:  ${new Date(iq.createdAt).toLocaleString()}\n`;
    text += `STATUS:          ${iq.status.toUpperCase()}\n`;
    text += `SHIPPING PATH:   ${iq.preferredShipping.toUpperCase()}\n`;
    text += `--------------------------------------------------------\n`;
    text += `CLIENT COMPANY:  ${iq.companyName}\n`;
    text += `CONTACT OFFICER: ${iq.name}\n`;
    text += `SALES EMAIL:     ${iq.email}\n`;
    text += `MOBILE LINE:     ${iq.phone}\n`;
    text += `--------------------------------------------------------\n`;
    text += `Sourced Material Specifications Detail:\n\n`;
    
    iq.items.forEach((item) => {
      text += `- SKU: ${item.sku}\n`;
      text += `  Item: ${item.productName}\n`;
      text += `  Qty:  ${item.quantity} sheets/rolls\n`;
      text += `  Est. Unit Base Price: $${item.unitPrice.toFixed(2)}\n`;
      text += `  Line Total:           $${item.totalPrice.toFixed(2)}\n\n`;
    });
    
    text += `--------------------------------------------------------\n`;
    text += `AGGREGATED CONTRACT ESTIMATE: $${iq.totalInquiryValue.toFixed(2)}\n`;
    text += `========================================================\n`;

    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Sourcing_Quote_${iq.id}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const getStatusColor = (status: WholesaleInquiry['status']) => {
    switch (status) {
      case 'Pending Review':
        return 'bg-amber-500/10 text-amber-500 border border-amber-500/20';
      case 'Quotation Sent':
        return 'bg-blue-600/20 text-blue-400 border border-blue-500/30';
      case 'Order Confirmed':
        return 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30';
      case 'Archived':
        return 'bg-neutral-800 text-neutral-400 border border-neutral-700';
    }
  };

  return (
    <div className="flex flex-col bg-[#141414] text-white min-h-screen" id="contact-and-enquiries-panel">
      
      {/* 1. CONTACT US DARK BLUE BACKGROUND BANNER - MATCHING IMAGE 3 */}
      <div className="w-full bg-[#003d73] py-9 text-center border-b border-neutral-900" id="contact-top-banner">
        <h2 className="text-3xl md:text-4xl font-light tracking-wider text-white font-sans uppercase">
          Contact Us
        </h2>
      </div>

      {/* 2. DUAL-COLUMN CORE SECTION - MATCHING IMAGE 3 */}
      <div className="mx-auto max-w-7xl w-full px-5 sm:px-8 lg:px-12 py-12 grid gap-12 lg:grid-cols-12 items-start text-left">
        
        {/* LEFT COLUMN: Contact our team details */}
        <div className="lg:col-span-5 space-y-8" id="contact-our-team-section">
          <div>
            <h3 className="text-xl sm:text-2xl font-light text-white tracking-wide uppercase">
              Contact our team
            </h3>
            <div className="w-10 h-0.5 bg-[#005fa9] my-4" />
          </div>

          <p className="text-sm text-neutral-300 leading-relaxed font-sans font-light">
            Speak to MUKESH TRADING CO. specialists to find out how we can keep your mill operating seamlessly. 
            For advice on <span className="text-[#3ba2ff] font-semibold">plansifter nylon meshes</span> and{' '}
            <span className="text-[#3ba2ff] font-semibold">perforated metal screen profiles</span> or other in-stock and 
            made-to-order spares, our friendly team can help.
          </p>

          <p className="text-sm text-neutral-300 leading-relaxed font-sans font-light">
            Call us or fill in our online contact form, and we'll get right back to you.
          </p>

          {/* Quick interactive parameters */}
          <div className="space-y-6 pt-4 text-xs font-sans text-neutral-200">
            {/* Email link */}
            <div className="flex items-start space-x-3">
              <Mail className="h-5 w-5 text-[#3ba2ff] flex-shrink-0 mt-0.5" />
              <div>
                <span className="block text-[10px] uppercase font-bold text-neutral-400 tracking-wider">Email</span>
                <a 
                  href="mailto:mukeshtradingco16@gmail.com" 
                  className="text-white hover:text-[#3ba2ff] transition-colors font-medium text-sm inline-block mt-0.5 underline select-all"
                >
                  mukeshtradingco16@gmail.com
                </a>
              </div>
            </div>

            {/* Phone link */}
            <div className="flex items-start space-x-3">
              <Phone className="h-5 w-5 text-[#3ba2ff] flex-shrink-0 mt-0.5" />
              <div>
                <span className="block text-[10px] uppercase font-bold text-neutral-400 tracking-wider">Phone</span>
                <div className="space-y-1 mt-1">
                  <a 
                    href="tel:+919879211012" 
                    className="block text-white hover:text-[#3ba2ff] transition-colors font-bold text-sm sm:text-base font-mono"
                  >
                    +91 98792 11012
                  </a>
                  <a 
                    href="tel:+919429356522" 
                    className="block text-white hover:text-[#3ba2ff] transition-colors font-bold text-sm sm:text-base font-mono"
                  >
                    +91 94293 56522
                  </a>
                </div>
              </div>
            </div>

            {/* Physical address coords */}
            <div className="flex items-start space-x-3">
              <MapPin className="h-5 w-5 text-[#3ba2ff] flex-shrink-0 mt-0.5" />
              <div>
                <span className="block text-[10px] uppercase font-bold text-neutral-400 tracking-wider">Corporate Offices & Godown</span>
                <p className="text-neutral-200 mt-1 uppercase tracking-wide leading-relaxed font-sans text-xs">
                  G-4, Abhishak Industrial Estate,<br />
                  Opp. Haripura Bus Stand, Civil Road,<br />
                  Asarwa, Ahmedabad
                </p>
                <p className="text-neutral-500 mt-2 text-[10px] font-sans italic" lang="gu">
                  ગોડાઉન : જી-૪, અભિષેક ઈન્ડસ્ટ્રીયલ એસ્ટેટ, હરિપુરા બસ સ્ટેન્ડ સામે, સિવિલ રોડ, અસારવા, અમદાવાદ.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Online Enquiry interactive form with exact fields structure from Image 3 */}
        <div className="lg:col-span-7 bg-[#1c1c1c] p-6 sm:p-8 border border-neutral-800" id="online-enquiry-section">
          {formSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6 text-left py-4"
              id="enquiry-success-container"
            >
              <div className="flex items-center space-x-3 text-emerald-400 border-b border-neutral-800 pb-4 mb-3">
                <CheckCircle2 className="h-8 w-8 text-emerald-400 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold uppercase tracking-wider text-white">Enquiry Submitted!</h3>
                  <p className="text-xs text-neutral-400 font-sans mt-0.5">Reference ID: <span className="font-mono font-bold text-emerald-400">{submittedId}</span></p>
                </div>
              </div>

              <div className="bg-[#242424] p-5 border border-emerald-950/40 text-neutral-300 space-y-4 font-sans text-xs">
                <p className="leading-relaxed">
                  Thank you! Your enquiry has been saved in our CRM system.
                </p>
                <p className="leading-relaxed font-semibold text-white">
                  To send these exact detailed requirements directly to us, select one of the safe options below:
                </p>
                <div className="bg-neutral-900 border border-neutral-800 p-3 rounded-none flex items-center justify-between">
                  <div>
                    <span className="block text-[9px] text-neutral-500 uppercase tracking-widest font-mono">Our Email Address</span>
                    <span className="font-mono text-xs text-[#3ba2ff] select-all font-bold">mukeshtradingco16@gmail.com</span>
                  </div>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText('mukeshtradingco16@gmail.com');
                    }}
                    title="Copy Address"
                    type="button"
                    className="p-1.5 hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <span className="block text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1">Select Email Channel:</span>
                
                {/* Channel 1: Web Gmail draft (The Best & Safe way to avoid Outlook launch) */}
                <a
                  href={submittedGmailUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between bg-red-950/20 hover:bg-red-950/40 border border-red-900/60 p-4 transition-colors group cursor-pointer"
                  id="send-via-gmail-web-btn"
                >
                  <div className="flex items-start space-x-3">
                    <div className="bg-red-900/40 p-2 text-red-400 rounded-none self-center">
                      <ExternalLink className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-white uppercase tracking-wider group-hover:text-red-300 transition-colors">
                        Launch Web Gmail Draft 💻
                      </span>
                      <span className="block text-[11px] text-neutral-400 font-sans mt-0.5">
                        Creates a prefilled draft straight inside your web browser using Gmail (No Outlook required).
                      </span>
                    </div>
                  </div>
                </a>

                {/* Channel 2: Copy whole content (Totally foolproof, works with any system) */}
                <button
                  onClick={handleCopyDraft}
                  type="button"
                  className={`w-full flex items-center justify-between p-4 border text-left transition-colors cursor-pointer ${
                    copiedDraft 
                    ? 'bg-emerald-950/40 border-emerald-800 text-emerald-400' 
                    : 'bg-neutral-900/60 hover:bg-neutral-800/80 border-neutral-800 text-neutral-300 hover:text-white'
                  }`}
                  id="copy-custom-draft-btn"
                >
                  <div className="flex items-start space-x-3">
                    <div className="bg-neutral-800 p-2 text-neutral-400 rounded-none self-center">
                      {copiedDraft ? <Check className="h-5 w-5 text-emerald-400 animate-pulse" /> : <Copy className="h-5 w-5" />}
                    </div>
                    <div>
                      <span className="block text-xs font-bold uppercase tracking-wider">
                        {copiedDraft ? 'Copied to Clipboard! ✓' : 'Copy Full Prefilled Email Draft 📋'}
                      </span>
                      <span className="block text-[11px] text-neutral-400 font-sans mt-0.5">
                        Copies both Subject and Body message so you can manually paste into Yahoo, Outlook web, etc.
                      </span>
                    </div>
                  </div>
                </button>

                {/* Channel 3: Standard Native Mail APP (Traditional option) */}
                <a
                  href={submittedMailto}
                  className="flex items-center justify-between bg-neutral-900/40 hover:bg-neutral-850 border border-neutral-850 p-3 transition-colors group text-left cursor-pointer"
                  id="send-direct-email-client-btn"
                >
                  <div className="flex items-start space-x-3">
                    <div className="bg-neutral-800/40 p-1.5 text-neutral-500 rounded-none self-center">
                      <Mail className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="block text-[11px] font-semibold text-neutral-300 group-hover:text-white transition-colors">
                        Open with Desktop/Mobile Email App 📬
                      </span>
                      <span className="block text-[10px] text-neutral-500 font-sans">
                        Launches Outlook or Apple Mail (the default client config on your machine).
                      </span>
                    </div>
                  </div>
                </a>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    setFormSuccess(false);
                    // Clear the message text but dynamically restore client details from browser storage
                    setMessageText('');
                    if (rememberDetails) {
                      setCompanyName(localStorage.getItem('mtc_company_name') || '');
                      setDeliveryAddress(localStorage.getItem('mtc_delivery_address') || '');
                      setFirstName(localStorage.getItem('mtc_first_name') || '');
                      setSurname(localStorage.getItem('mtc_surname') || '');
                      setEmailAddress(localStorage.getItem('mtc_email_address') || '');
                      setPhoneNumber(localStorage.getItem('mtc_phone_number') || '');
                    } else {
                      setCompanyName('');
                      setDeliveryAddress('');
                      setFirstName('');
                      setSurname('');
                      setEmailAddress('');
                      setPhoneNumber('');
                    }
                  }}
                  type="button"
                  className="w-full bg-[#2a2a2a] hover:bg-[#333333] text-neutral-300 hover:text-white px-5 py-3.5 text-xs font-bold uppercase tracking-widest border border-neutral-800 transition-colors text-center"
                  id="reset-enquiry-form-btn"
                >
                  New Enquiry Form
                </button>
              </div>
            </motion.div>
          ) : (
            <>
              <div className="border-b border-neutral-800 pb-4 mb-6">
                <h3 className="text-xl sm:text-2xl font-light text-white tracking-wide uppercase">
                  Online Enquiry
                </h3>
                <p className="text-[10px] text-neutral-500 mt-2 font-mono">
                  <span className="text-red-500 font-bold mr-1">*</span> indicates required fields
                </p>
              </div>

              {/* Verified Visitor IP Security Badge */}
              <div className="mb-6 p-4 bg-blue-950/20 border border-blue-900/30 rounded-none flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs font-sans text-neutral-300 gap-4">
                <div className="flex items-center space-x-2.5">
                  <ShieldCheck className="h-5 w-5 text-[#3ba2ff] flex-shrink-0" />
                  <div>
                    <p className="text-white font-semibold uppercase tracking-wider text-[10px]">Verified Sourcing Connection</p>
                    <p className="text-[11px] text-neutral-400">Authenticated visitor tracking log active for anti-spam security.</p>
                  </div>
                </div>
                <div className="text-left sm:text-right flex-shrink-0 pl-0 sm:pl-4 border-t sm:border-t-0 sm:border-l border-neutral-800 pt-2 sm:pt-0 w-full sm:w-auto">
                  <span className="block font-mono text-xs text-white font-bold">{visitorIp}</span>
                  <span className="block text-[9px] uppercase tracking-widest text-[#3ba2ff] font-bold">{visitorLocation}</span>
                </div>
              </div>

              <form onSubmit={handleContactSubmit} className="space-y-5 text-left">
                
                {/* Warning Errors */}
                {submitError && (
                  <div className="p-3 bg-red-950/40 border border-red-900 text-red-400 text-xs flex items-center space-x-2">
                    <AlertCircle className="h-4 w-4" />
                    <span>{submitError}</span>
                  </div>
                )}

                {/* Dropdown - Enquiry Type * (Matches Image 3 dropdown) */}
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Enquiry Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={enquiryType}
                    onChange={(e) => setEnquiryType(e.target.value)}
                    className="w-full bg-[#262626] border border-neutral-800 px-3 py-3 text-sm text-white rounded-none focus:outline-none focus:border-[#005fa9] transition-colors"
                  >
                    <option value="Sample Request">Sample Request</option>
                    <option value="Pricing Request">Pricing Request</option>
                    <option value="Technical CAD Consultation">Technical CAD Consultation</option>
                    <option value="Custom Tooling Query">Custom Tooling Query</option>
                  </select>
                </div>

                {/* Company field (Matches Image 3 input type) */}
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Company
                  </label>
                  <input
                    type="text"
                    placeholder="Company Name"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full bg-[#262626] border border-neutral-800 px-3 py-3 text-sm text-white rounded-none focus:outline-none focus:border-[#005fa9] transition-colors placeholder:text-neutral-600"
                  />
                </div>

                {/* Delivery Address (Optional) field (Matches Image 3) */}
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Delivery Address (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="Street address / Project location"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    className="w-full bg-[#262626] border border-neutral-800 px-3 py-3 text-sm text-white rounded-none focus:outline-none focus:border-[#005fa9] transition-colors placeholder:text-neutral-600"
                  />
                </div>

                {/* Joint Row: First Name & Surname */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="First name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full bg-[#262626] border border-neutral-800 px-3 py-3 text-sm text-white rounded-none focus:outline-none focus:border-[#005fa9] transition-colors placeholder:text-neutral-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">
                      Surname
                    </label>
                    <input
                      type="text"
                      placeholder="Surname"
                      value={surname}
                      onChange={(e) => setSurname(e.target.value)}
                      className="w-full bg-[#262626] border border-neutral-800 px-3 py-3 text-sm text-white rounded-none focus:outline-none focus:border-[#005fa9] transition-colors placeholder:text-neutral-600"
                    />
                  </div>
                </div>

                {/* Joint Row: Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="Email address"
                      value={emailAddress}
                      onChange={(e) => setEmailAddress(e.target.value)}
                      className="w-full bg-[#262626] border border-neutral-800 px-3 py-3 text-sm text-white rounded-none focus:outline-none focus:border-[#005fa9] transition-colors placeholder:text-neutral-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="Phone number"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full bg-[#262626] border border-neutral-800 px-3 py-3 text-sm text-white rounded-none focus:outline-none focus:border-[#005fa9] transition-colors placeholder:text-neutral-600 font-mono"
                    />
                  </div>
                </div>

                {/* Custom Notes / Message comments */}
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Your Note / Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Include custom specifications, sheet counts, metal styles, open-area percentages..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    className="w-full bg-[#262626] border border-neutral-800 px-3 py-3 text-sm text-white rounded-none focus:outline-none focus:border-[#005fa9] transition-colors placeholder:text-neutral-600 font-sans"
                  />
                </div>

                {/* Remember details option (Image 3 compliant & User requested) */}
                <div className="flex items-center space-x-3 text-neutral-300 select-none py-1">
                  <label className="flex items-center space-x-2.5 cursor-pointer text-xs text-neutral-400 hover:text-white transition-colors">
                    <input
                      type="checkbox"
                      checked={rememberDetails}
                      onChange={(e) => {
                        const nextValue = e.target.checked;
                        setRememberDetails(nextValue);
                        localStorage.setItem('mtc_remember_details', String(nextValue));
                        if (!nextValue) {
                          // Clear stored items immediately if turned off
                          localStorage.removeItem('mtc_company_name');
                          localStorage.removeItem('mtc_delivery_address');
                          localStorage.removeItem('mtc_first_name');
                          localStorage.removeItem('mtc_surname');
                          localStorage.removeItem('mtc_email_address');
                          localStorage.removeItem('mtc_phone_number');
                        }
                      }}
                      className="cursor-pointer h-4.5 w-4.5 rounded-none accent-[#005fa9] bg-[#262626] border-neutral-800 focus:ring-0 focus:ring-offset-0"
                      id="remember-details-checkbox"
                    />
                    <span>Remember my contact details on this device (cookie preference)</span>
                  </label>
                </div>

                {/* Submit Button aligned bottom left exactly as Image 3 */}
                <div className="pt-2 text-left">
                  <button
                    type="submit"
                    id="online-enquiry-submit-btn"
                    className="cursor-pointer bg-[#005fa9] hover:bg-[#004e8a] text-white px-9 py-3.5 text-xs font-bold uppercase tracking-widest transition-colors flex items-center space-x-2"
                  >
                    <span>Submit Enquiry</span>
                    <Send className="h-3.5 w-3.5" />
                  </button>
                </div>

              </form>
            </>
          )}
        </div>

      </div>

      {/* 3. B2B SOURCING LOG & VISITOR SECURITY AUDIT MONITOR */}
      <div className="w-full border-t border-neutral-850 bg-[#0d0d0d] py-12" id="visitor-security-audit-desk">
        <div className="mx-auto max-w-7xl w-full px-5 sm:px-8 lg:px-12 text-left">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-neutral-800 pb-5 mb-8 gap-4 font-sans">
            <div>
              <span className="text-[10px] font-black uppercase text-[#3ba2ff] tracking-[0.25em] block mb-2">
                Operational Security Monitor
              </span>
              <h3 className="text-xl sm:text-2xl font-light text-white uppercase tracking-wider">
                Industrial Sourcing <span className="font-bold text-[#005fa9]">CRM & Security Logs</span>
              </h3>
              <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                Review verified active RFQs, client registration IP logs, and simulated pricing invoices synchronized in local storage.
              </p>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={onClearAll}
                className="cursor-pointer bg-red-950/20 hover:bg-red-950/40 border border-red-900/40 text-red-400 px-4 py-2 text-[10px] font-bold uppercase tracking-wider transition-colors font-sans"
              >
                Clear Database Logs
              </button>
            </div>
          </div>

          {/* Table / Grid list of Inquiries with IP address labels */}
          {filteredInquiries.length > 0 ? (
            <div className="grid gap-6 lg:grid-cols-12 font-sans">
              
              {/* Left Side: interactive items list */}
              <div className="lg:col-span-5 space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                {filteredInquiries.map((iq) => {
                  const isSelected = selectedInquiryId === iq.id;
                  return (
                    <div
                      key={iq.id}
                      onClick={() => setSelectedInquiryId(iq.id)}
                      className={`p-4 border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#1a2c42] border-[#005fa9]'
                          : 'bg-[#161616] border-neutral-850 hover:bg-[#1f1f1f]'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-mono text-xs text-emerald-400 font-bold">{iq.id}</span>
                        <span className={`text-[9px] uppercase font-mono tracking-wider px-2 py-0.5 ${getStatusColor(iq.status)}`}>
                          {iq.status}
                        </span>
                      </div>
                      
                      <h4 className="text-white font-bold text-xs uppercase truncate">{iq.companyName}</h4>
                      <p className="text-[11px] text-neutral-400 truncate mt-0.5">Author: {iq.name}</p>
                      
                      <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-neutral-800/60 text-[10px] font-mono text-neutral-500">
                        <span className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {new Date(iq.createdAt).toLocaleDateString()}
                        </span>
                        
                        {/* Display Inquirer IP Code */}
                        <div className="text-right flex-shrink-0">
                          <span className="text-neutral-400 block font-bold">{iq.ipAddress || '122.179.91.54'}</span>
                          <span className="text-[9px] text-neutral-600 truncate block max-w-[150px]">{iq.ipLocation || 'Ahmedabad, Gujarat'}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Right Side: detail monitor panel with Invoice export option */}
              <div className="lg:col-span-7 bg-[#161616] border border-neutral-850 p-6 flex flex-col justify-between">
                {(() => {
                  const selectedIq = inquiries.find((iq) => iq.id === selectedInquiryId) || filteredInquiries[0];
                  if (!selectedIq) return <div className="text-neutral-500 text-xs text-center py-12">Select an inquiry to view details.</div>;
                  
                  return (
                    <div className="space-y-6 text-xs text-left">
                      <div className="flex flex-wrap justify-between items-start border-b border-neutral-800 pb-4 gap-2">
                        <div>
                          <span className="block text-[9px] text-neutral-500 uppercase tracking-widest font-mono">Lead Identifier</span>
                          <span className="text-base font-mono text-emerald-400 font-bold block">{selectedIq.id}</span>
                        </div>
                        <div className="text-right">
                          <span className="block text-[9px] text-neutral-500 uppercase tracking-widest font-mono">Date Filed</span>
                          <span className="text-xs text-white font-medium block mt-1">{new Date(selectedIq.createdAt).toLocaleString()}</span>
                        </div>
                      </div>

                      {/* Client info grid with verification parameters */}
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="p-3 bg-[#111111] border border-neutral-850">
                          <span className="text-[10px] text-neutral-500 uppercase font-mono block">Company & Officer</span>
                          <span className="text-white font-bold block mt-1 uppercase text-xs">{selectedIq.companyName}</span>
                          <span className="text-neutral-400 block mt-0.5 text-[11px]">{selectedIq.name}</span>
                        </div>

                        <div className="p-3 bg-[#111111] border border-neutral-850">
                          <span className="text-[10px] text-neutral-500 uppercase font-mono block">Verified Network Bounds</span>
                          <span className="text-white font-mono font-bold block mt-1 text-xs">{selectedIq.ipAddress || '122.179.91.54'}</span>
                          <span className="text-emerald-400 font-bold uppercase tracking-wider block mt-0.5 text-[9px]">{selectedIq.ipLocation || 'Ahmedabad, India'}</span>
                        </div>
                      </div>

                      {/* Requirements and details comment */}
                      <div className="space-y-2">
                        <span className="text-[10px] text-neutral-500 uppercase font-mono block">Enquiry Comments & Sourcing Specifications</span>
                        <div className="bg-[#111] p-4 border border-neutral-850 text-neutral-300 leading-relaxed font-mono whitespace-pre-line text-[11px] max-h-[160px] overflow-y-auto">
                          {selectedIq.comment}
                        </div>
                      </div>

                      {/* Items list if checkout inquiry */}
                      {selectedIq.items && selectedIq.items.length > 0 && (
                        <div className="space-y-2">
                          <span className="text-[10px] text-neutral-500 uppercase font-mono block">Specifications Breakdown List</span>
                          <div className="border border-neutral-850 divide-y divide-neutral-850 bg-[#111111]">
                            {selectedIq.items.map((item, idx) => (
                              <div key={idx} className="p-3 flex justify-between items-center text-[10.5px]">
                                <div>
                                  <span className="text-white font-bold block">{item.productName}</span>
                                  <span className="text-[9.5px] text-neutral-500 font-mono mt-0.5 inline-block">SKU: {item.sku} &middot; Qty: {item.quantity} units</span>
                                </div>
                                <span className="font-mono text-white font-bold">${item.totalPrice.toFixed(2)}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="pt-4 border-t border-neutral-800 flex flex-wrap gap-3 justify-between items-center">
                        <div className="text-left">
                          <span className="text-[10px] uppercase font-mono text-neutral-500 block">Status Desk</span>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`text-[9px] uppercase font-mono tracking-wider px-2 py-0.5 ${getStatusColor(selectedIq.status)}`}>
                              {selectedIq.status}
                            </span>
                            <select
                              value={selectedIq.status}
                              onChange={(e) => onUpdateStatus(selectedIq.id, e.target.value as WholesaleInquiry['status'])}
                              className="bg-[#242424] border border-neutral-850 text-[10px] px-2 py-1 outline-hidden text-neutral-300"
                            >
                              <option value="Pending Review">Pending Review</option>
                              <option value="Quotation Sent">Quotation Sent</option>
                              <option value="Order Confirmed">Order Confirmed</option>
                              <option value="Archived">Archived</option>
                            </select>
                          </div>
                        </div>

                        <button
                          onClick={() => generateSimulatedInvoice(selectedIq)}
                          className="cursor-pointer bg-[#005fa9] hover:bg-[#004e8a] text-white px-5 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors flex items-center space-x-2 font-sans"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Download Commercial Quote</span>
                        </button>
                      </div>

                    </div>
                  );
                })()}
              </div>

            </div>
          ) : (
            <div className="text-center py-12 text-neutral-500 text-xs border border-dashed border-neutral-800 font-sans">
              No active inquiries filed. File your sourcing query above to log visitor connection metadata!
            </div>
          )}

          {/* SUPABASE LIVE VISITOR LOGS TRACKER MODULE */}
          <div className="mt-12 pt-10 border-t border-neutral-850" id="supabase-live-visitor-tracking-card">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <span className="text-[10px] font-black uppercase text-[#005fa9] tracking-[0.25em] block mb-1">
                  Database Analytics integration
                </span>
                <h4 className="text-lg font-light text-white uppercase tracking-wider">
                  Supabase Live <span className="font-bold text-[#3ba2ff]">Visitor Logs</span>
                </h4>
              </div>
              <div>
                {isSupabaseConfigured ? (
                  <div className="inline-flex items-center space-x-2 bg-emerald-950/30 border border-emerald-900/50 text-emerald-400 px-3 py-1.5 rounded text-[11px] font-mono font-bold uppercase tracking-wider">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span>Supabase Connected</span>
                  </div>
                ) : (
                  <div className="inline-flex items-center space-x-2 bg-amber-950/30 border border-amber-900/50 text-amber-400 px-3 py-1.5 rounded text-[11px] font-mono font-bold uppercase tracking-wider">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>Supabase Pending Setup</span>
                  </div>
                )}
              </div>
            </div>

            {!isSupabaseConfigured ? (
              <div className="bg-[#161616] border border-dashed border-neutral-800 p-6 md:p-8 text-neutral-300 rounded-none font-sans space-y-5 text-left">
                <div className="flex items-start space-x-4">
                  <div className="bg-[#003d73] text-white p-2.5 rounded-full mt-1">
                    <Settings className="w-5 h-5 text-[#3ba2ff]" />
                  </div>
                  <div className="space-y-2">
                    <h5 className="text-white font-bold text-sm uppercase tracking-wide">How to connect your Supabase project:</h5>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      This application is pre-built to log visitor details (IP, country, city, date, and browser device) automatically to your Supabase table. To activate this integration, configure these variables in the <strong>Secrets panel</strong> or settings in AI Studio:
                    </p>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 pt-2">
                  <div className="bg-[#111] p-4 border border-neutral-850 space-y-2 font-mono text-[11px]">
                    <span className="text-neutral-500 text-[10px] uppercase font-bold block">1. Key Name</span>
                    <div className="text-emerald-400 font-bold select-all">VITE_SUPABASE_URL</div>
                    <span className="text-neutral-500 text-[10px] block mt-1 font-sans">Value: Your Supabase Project API URL (e.g. <code>https://your-proj.supabase.co</code>)</span>
                  </div>

                  <div className="bg-[#111] p-4 border border-neutral-850 space-y-2 font-mono text-[11px]">
                    <span className="text-neutral-500 text-[10px] uppercase font-bold block">2. Key Name</span>
                    <div className="text-emerald-400 font-bold select-all">VITE_SUPABASE_ANON_KEY</div>
                    <span className="text-neutral-500 text-[10px] block mt-1 font-sans">Value: Your Supabase Project public anon key</span>
                  </div>
                </div>

                <div className="bg-[#1a2c42]/30 border border-[#005fa9]/30 p-4 font-sans text-xs text-neutral-300 leading-relaxed space-y-2">
                  <h6 className="text-white font-bold uppercase text-[11px] tracking-wide flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    Supabase Database Schema Setup:
                  </h6>
                  <p className="text-neutral-400">
                    Make sure you have created a table named <strong><code>visitors</code></strong> in your Supabase database editor with your exact schema configuration:
                  </p>
                  <pre className="bg-[#111] p-3 text-[10.5px] text-neutral-300 border border-neutral-850 font-mono overflow-x-auto mt-2 rounded">
{`CREATE TABLE public.visitors (
  id bigint GENERATED BY DEFAULT AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  ip text NULL,
  country text NULL,
  city text NULL,
  browser text NULL,
  device text NULL,
  os text NULL,
  user_agent text NULL,
  referrer text NULL,
  CONSTRAINT visitors_pkey PRIMARY KEY (id)
) TABLESPACE pg_default;`}
                  </pre>
                  <p className="text-neutral-400 text-[11px] mt-2">
                    💡 <em>Row Level Security (RLS):</em> For testing, ensure your table has an insert policy allowing public inserts, or temporarily disable RLS so client visits can be logged seamlessly.
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-[#161616] border border-neutral-850 overflow-hidden" id="supabase-live-visitor-table-wrapper">
                <div className="p-4 bg-[#1b1b1b] border-b border-neutral-850 flex justify-between items-center text-xs font-sans">
                  <span className="text-neutral-400 text-left">Connected Project: <strong className="text-white font-mono">{import.meta.env.VITE_SUPABASE_URL?.replace('https://', '').split('.')[0]}</strong></span>
                  <button 
                    onClick={async () => {
                      setIsLoadingSupabase(true);
                      try {
                        const data = await getVisitors();
                        setSupabaseVisitors(data);
                        setSupabaseError(null);
                      } catch (err: any) {
                        setSupabaseError(err?.message || 'Error connecting to database');
                      } finally {
                        setIsLoadingSupabase(false);
                      }
                    }}
                    disabled={isLoadingSupabase}
                    className="cursor-pointer text-[#3ba2ff] hover:text-white transition-colors uppercase font-bold text-[10px] tracking-wider"
                  >
                    {isLoadingSupabase ? 'Refreshing...' : 'Refresh Logs ⟳'}
                  </button>
                </div>

                {isLoadingSupabase && supabaseVisitors.length === 0 ? (
                  <div className="text-center py-12 text-neutral-500 text-xs font-sans">
                    Connecting and pulling live Supabase logs...
                  </div>
                ) : supabaseError ? (
                  <div className="p-6 text-left border border-red-950/25 bg-red-950/10 space-y-4">
                    <div className="text-red-400 text-xs font-mono font-bold flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                      <span>Supabase Error: {supabaseError}</span>
                    </div>
                    <div className="text-neutral-300 text-xs font-sans space-y-2 leading-relaxed">
                      <p className="font-semibold text-white">💡 Why does this happen?</p>
                      <p className="text-neutral-400">
                        Supabase activates <strong>Row Level Security (RLS)</strong> by default on newly created tables. This prevents anonymous/public clients from inserting new rows until a permission policy is defined.
                      </p>
                      <p className="font-semibold text-white pt-1">🛠️ How to fix in 10 seconds:</p>
                      <p className="text-neutral-400">
                        Go to your <strong>Supabase Dashboard &gt; SQL Editor</strong>, paste either of these commands, and click <strong>Run</strong>:
                      </p>
                      
                      <div className="space-y-3 pt-1">
                        <div>
                          <span className="text-[10px] text-amber-400 uppercase font-bold tracking-wider block mb-1">Option A: Disable RLS (Easiest for testing)</span>
                          <pre className="bg-[#111] p-2 text-[10px] font-mono text-neutral-300 border border-neutral-800 rounded select-all">
                            ALTER TABLE public.visitors DISABLE ROW LEVEL SECURITY;
                          </pre>
                        </div>
                        
                        <div>
                          <span className="text-[10px] text-emerald-400 uppercase font-bold tracking-wider block mb-1">Option B: Add Public Access Policies (Recommended)</span>
                          <pre className="bg-[#111] p-3 text-[10px] font-mono text-neutral-300 border border-neutral-800 rounded overflow-x-auto select-all">
{`CREATE POLICY "Allow public inserts" ON public.visitors FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public select" ON public.visitors FOR SELECT USING (true);`}
                          </pre>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : supabaseVisitors.length === 0 ? (
                  <div className="text-center py-12 text-neutral-400 text-xs font-sans space-y-2 text-left px-6">
                    <p className="font-bold text-white">No visitor tracking logs found in Supabase.</p>
                    <p className="text-neutral-500 text-[11px]">The system automatically records visits upon page load. Refresh this page to trigger your first visitor record!</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto custom-scrollbar">
                    <table className="w-full text-left text-xs font-sans border-collapse">
                      <thead>
                        <tr className="bg-[#1c1c1c] border-b border-neutral-850 text-neutral-400 font-bold uppercase text-[9.5px] tracking-wider">
                          <th className="px-5 py-3">ID</th>
                          <th className="px-5 py-3">Timestamp (Local)</th>
                          <th className="px-5 py-3">IP Address</th>
                          <th className="px-5 py-3">Location (City, Country)</th>
                          <th className="px-5 py-3">Browser / OS Device Info</th>
                          <th className="px-5 py-3">Referrer</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-850 font-mono">
                        {supabaseVisitors.map((v, index) => (
                          <tr key={v.id || index} className="hover:bg-[#1d1d1d] transition-colors text-neutral-300">
                            <td className="px-5 py-3.5 text-neutral-500 font-bold text-[11px]">#{v.id}</td>
                            <td className="px-5 py-3.5 text-xs font-sans">{v.created_at ? new Date(v.created_at).toLocaleString() : 'N/A'}</td>
                            <td className="px-5 py-3.5 text-[#3ba2ff] font-bold select-all">{v.ip || 'Local/Shielded'}</td>
                            <td className="px-5 py-3.5 font-sans">
                              {v.city || v.country ? (
                                <span className="flex items-center gap-1.5">
                                  <MapPin className="w-3.5 h-3.5 text-neutral-500 animate-pulse" />
                                  <span>{[v.city, v.country].filter(Boolean).join(', ') || 'India'}</span>
                                </span>
                              ) : (
                                <span className="text-neutral-500">India</span>
                              )}
                            </td>
                            <td className="px-5 py-3.5 font-sans text-xs text-neutral-300 truncate max-w-[220px]" title={v.user_agent || v.device}>
                              <div className="font-medium text-white">{v.device || 'Web Visitor'}</div>
                              {(v.browser || v.os) && (
                                <div className="text-[10px] text-neutral-500 font-mono mt-0.5 flex gap-1 items-center">
                                  {v.browser && <span className="bg-neutral-800 text-neutral-400 px-1 py-0.2 rounded text-[9px] font-bold">{v.browser}</span>}
                                  {v.os && <span className="text-neutral-500">{v.os}</span>}
                                </div>
                              )}
                            </td>
                            <td className="px-5 py-3.5 font-sans text-xs text-neutral-400 truncate max-w-[150px]" title={v.referrer || 'Direct Visit'}>
                              {v.referrer ? (
                                <span className="text-neutral-400 text-[11px] truncate block select-all">{v.referrer}</span>
                              ) : (
                                <span className="text-neutral-600 italic text-[11px]">Direct Visit</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>

        </div>
      </div>

    </div>
  );
}

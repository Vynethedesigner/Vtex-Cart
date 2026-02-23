'use client';

import { useRouter } from 'next/navigation';
import styles from '../checkout.module.css';

/* ── Desktop Header (Full) ── */
function DesktopHeader() {
  return (
    <div className={styles.desktopHeaderWrap}>
      <div className={styles.desktopHeader}>
        <div className={styles.desktopHeaderLeft}>
          <img src="/images/red101-logo.svg" alt="Red101" className={styles.desktopLogo} />
          <div className={styles.desktopLocation}>
            <svg width="16" height="20" viewBox="0 0 14 19.47" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M0 7C0 3.13 3.13 0 7 0C10.87 0 14 3.13 14 7C14 11.17 9.58 16.92 7.77 19.11C7.37 19.59 6.64 19.59 6.24 19.11C4.42 16.92 0 11.17 0 7ZM4.5 7C4.5 8.38 5.62 9.5 7 9.5C8.38 9.5 9.5 8.38 9.5 7C9.5 5.62 8.38 4.5 7 4.5C5.62 4.5 4.5 5.62 4.5 7Z" fill="#8f8f8f"/></svg>
            <div className={styles.desktopLocationText}>
              <span className={styles.desktopLocationLine1}>X5000, C&oacute;rdoba</span>
              <span className={styles.desktopLocationLine2}>Argentina <svg width="10" height="6" viewBox="0 0 10.5 5.833" fill="none"><path d="M0.75 0.75L5.25 5.083L9.75 0.75" stroke="#1f1f1f" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
            </div>
          </div>
        </div>
        <div className={styles.desktopSearchWrap}>
          <input type="text" placeholder="Search RED101" className={styles.desktopSearchInput} readOnly />
          <button className={styles.desktopSearchBtn}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M7.43 0C11.5 0 14.81 3.27 14.87 7.34C14.87 7.37 14.88 7.41 14.88 7.44C14.88 11.55 11.55 14.88 7.44 14.88C3.34 14.88 0 11.55 0 7.44C0 3.34 3.33 0 7.43 0ZM1.3 7.44C1.3 10.83 4.05 13.58 7.44 13.58C10.81 13.58 13.54 10.86 13.57 7.5C13.57 7.48 13.57 7.46 13.57 7.44C13.57 4.05 10.82 1.3 7.43 1.3C4.05 1.3 1.3 4.05 1.3 7.44Z" fill="white"/><path d="M11.78 11.78C12 11.55 12.34 11.53 12.59 11.69L12.69 11.78L17.81 16.89L17.89 16.99C18.06 17.25 18.03 17.59 17.81 17.81C17.59 18.03 17.25 18.06 16.99 17.89L16.89 17.81L11.78 12.69L11.69 12.59C11.53 12.34 11.55 12 11.78 11.78Z" fill="white"/></svg>
          </button>
        </div>
        <div className={styles.desktopHeaderRight}>
          <button className={styles.desktopHeaderAction}>
            <img src="/images/header-user-icon.svg" alt="" className={styles.desktopHeaderIcon} />
            <span>Sign in/<br/>Register</span>
          </button>
          <button className={styles.desktopHeaderAction}>
            <img src="/images/header-nav-icon.svg" alt="" className={styles.desktopHeaderIcon} />
            <span>RedPay</span>
          </button>
          <button className={styles.desktopHeaderAction}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M6 6H16L14.5 13H7.5L6 6Z" stroke="#8f8f8f" strokeWidth="1.3" strokeLinejoin="round"/><path d="M6 6L5.5 4H3" stroke="#8f8f8f" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/><circle cx="8.5" cy="16" r="1.2" fill="#8f8f8f"/><circle cx="13.5" cy="16" r="1.2" fill="#8f8f8f"/></svg>
            <span>Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Desktop Footer ── */
function DesktopFooter() {
  return (
    <div className={styles.desktopFooter}>
      <div className={styles.desktopFooterInner}>
        <div className={styles.desktopFooterLeft}>
          <img src="/images/red101-logo.svg" alt="Red101" className={styles.desktopFooterLogo} />
          <a href="mailto:customerservice@redcloudtechnology.com" className={styles.desktopFooterEmail}>customerservice@redcloudtechnology.com</a>
          <div className={styles.desktopFooterHours}>9:00AM - 5:30PM</div>
          <div className={styles.desktopFooterHours}>Mondays to Fridays (except Public Holidays)</div>
        </div>
        <div className={styles.desktopFooterColumns}>
          <div className={styles.desktopFooterCol}>
            <h4 className={styles.desktopFooterColTitle}>Support</h4>
            <a href="#" className={styles.desktopFooterLink}>FAQ</a>
            <a href="#" className={styles.desktopFooterLink}>Shipping &amp; Returns</a>
            <a href="#" className={styles.desktopFooterLink}>Payments</a>
            <a href="#" className={styles.desktopFooterLink}>Your Orders</a>
          </div>
          <div className={styles.desktopFooterCol}>
            <h4 className={styles.desktopFooterColTitle}>About</h4>
            <a href="#" className={styles.desktopFooterLink}>Our company</a>
            <a href="#" className={styles.desktopFooterLink}>Become a Seller</a>
          </div>
        </div>
      </div>
      <div className={styles.desktopFooterBottom}>
        <div className={styles.desktopFooterSocials}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="9" stroke="white" strokeWidth="1.2"/><path d="M12 3V7H10.5C10 7 10 7.5 10 8V10H12L11.5 13H10V20" stroke="white" strokeWidth="1.2"/></svg>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="2" y="2" width="16" height="16" rx="3" stroke="white" strokeWidth="1.2"/><path d="M6 9V14M6 6V6.01M10 14V10C10 8.9 10.9 8 12 8C13.1 8 14 8.9 14 10V14" stroke="white" strokeWidth="1.2" strokeLinecap="round"/></svg>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="2" y="2" width="16" height="16" rx="5" stroke="white" strokeWidth="1.2"/><circle cx="10" cy="10" r="4" stroke="white" strokeWidth="1.2"/><circle cx="15" cy="5" r="1" fill="white"/></svg>
        </div>
        <div className={styles.desktopFooterRight}>
          <div className={styles.desktopFooterCopyright}>
            &copy; Redcloud.Ltd All rights reserved
          </div>
          <div className={styles.desktopFooterLegal}>
            <a href="#">Privacy policy</a>
            <a href="#">Terms</a>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusBar() {
  return (
    <div className={styles.statusBar}>
      <span>12:30</span>
      <div className={styles.statusBarIcons}>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none"><path d="M1 4C4 1 8 0 15 4" stroke="#1f1f1f" strokeWidth="1.3" strokeLinecap="round"/><path d="M3.5 6.5C5.5 4.5 8.5 4 12.5 6.5" stroke="#1f1f1f" strokeWidth="1.3" strokeLinecap="round"/><path d="M6 9C7 8 9 7.8 10 9" stroke="#1f1f1f" strokeWidth="1.3" strokeLinecap="round"/><circle cx="8" cy="11" r="1" fill="#1f1f1f"/></svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none"><rect x="0" y="8" width="3" height="4" rx="0.5" fill="#1f1f1f"/><rect x="4.5" y="5" width="3" height="7" rx="0.5" fill="#1f1f1f"/><rect x="9" y="2" width="3" height="10" rx="0.5" fill="#1f1f1f"/><rect x="13.5" y="0" width="3" height="12" rx="0.5" fill="#1f1f1f" opacity="0.25"/></svg>
        <svg width="22" height="12" viewBox="0 0 22 12" fill="none"><rect x="0.5" y="0.5" width="18" height="11" rx="2" stroke="#1f1f1f" strokeWidth="1"/><rect x="2" y="2" width="13" height="8" rx="1" fill="#1f1f1f"/><rect x="19.5" y="3.5" width="2" height="5" rx="1" fill="#1f1f1f"/></svg>
      </div>
    </div>
  );
}

export default function HelpPage() {
  const router = useRouter();

  return (
    <div className={styles.shell}>
      {/* Mobile Header */}
      <div className={styles.mobileOnly}>
        <StatusBar />
        <div className={styles.header}>
          <button className={styles.headerBack} onClick={() => router.push('/checkout')}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="#1f1f1f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>Here to help</span>
          </button>
          <button className={styles.headerHelp}>Need help?</button>
        </div>
      </div>

      {/* Desktop Header */}
      <div className={styles.desktopOnly}>
        <DesktopHeader />
      </div>

      <div className={styles.scrollArea}>
        {/* Desktop Breadcrumb */}
        <div className={styles.desktopOnly}>
          <div className={styles.desktopBreadcrumb}>
            <span className={styles.breadcrumbLink} onClick={() => router.push('/checkout')}>Checkout</span>
            <span className={styles.breadcrumbSep}>&gt;</span>
            <span className={styles.breadcrumbCurrent}>Here to help</span>
          </div>
        </div>

        <div style={{ maxWidth: 600, margin: '0 auto', padding: '40px 24px' }}>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#1f1f1f', marginBottom: 16, lineHeight: '36px' }}>
            Need Help with Checkout?
          </h1>
          <p style={{ fontSize: 14, color: '#626262', lineHeight: '22px', marginBottom: 32 }}>
            Need assistance? Contact our Customer Support team or explore our <a href="#" style={{ color: '#34C5F5', textDecoration: 'none' }}>FAQs</a> for answers to common checkout questions.
          </p>

          <div className={styles.supportItem}>
            <div className={styles.supportLabel}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M14 11.4V13.4C14 13.7 13.7 14 13.4 14C7.2 14 2 8.8 2 2.6C2 2.3 2.3 2 2.6 2H4.6C4.9 2 5.2 2.3 5.2 2.6C5.2 3.8 5.4 5 5.8 6L4.4 7.4C5.4 9.4 6.6 10.6 8.6 11.6L10 10.2C11 10.6 12.2 10.8 13.4 10.8C13.7 10.8 14 11.1 14 11.4Z" stroke="#506079" strokeWidth="1.2"/></svg>
              TELEPHONE
            </div>
            <a href="tel:+2348184187327" style={{ color: '#34C5F5', textDecoration: 'none', fontSize: 14, fontWeight: 500 }}>+234 8184187327</a>
          </div>

          <div className={styles.supportItem}>
            <div className={styles.supportLabel}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="#0d7c3d" strokeWidth="1.2"/><path d="M5 9.5C5 9.5 6.5 11 8 11C9.5 11 11 9.5 11 9.5" stroke="#0d7c3d" strokeWidth="1.2" strokeLinecap="round"/></svg>
              WHATSAPP
            </div>
            <a href="tel:+2348184187327" style={{ color: '#34C5F5', textDecoration: 'none', fontSize: 14, fontWeight: 500 }}>+234 8184187327</a>
          </div>

          <div className={styles.supportItem}>
            <div className={styles.supportLabel}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="3" width="12" height="10" rx="1" stroke="#506079" strokeWidth="1.2"/><path d="M2 5L8 9L14 5" stroke="#506079" strokeWidth="1.2"/></svg>
              EMAIL
            </div>
            <a href="mailto:CS@red101.com" style={{ color: '#34C5F5', textDecoration: 'none', fontSize: 14, fontWeight: 500 }}>CS@red101.com</a>
          </div>
        </div>

        {/* Mobile Footer */}
        <div className={styles.mobileOnly}>
          <div className={styles.footer}>
            <div className={styles.footerSocials}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="9" stroke="#1f1f1f" strokeWidth="1.2"/><path d="M12 3V7H10.5C10 7 10 7.5 10 8V10H12L11.5 13H10V20" stroke="#1f1f1f" strokeWidth="1.2"/></svg>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="2" y="2" width="16" height="16" rx="3" stroke="#1f1f1f" strokeWidth="1.2"/><path d="M6 9V14M6 6V6.01M10 14V10C10 8.9 10.9 8 12 8C13.1 8 14 8.9 14 10V14" stroke="#1f1f1f" strokeWidth="1.2" strokeLinecap="round"/></svg>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="2" y="2" width="16" height="16" rx="5" stroke="#1f1f1f" strokeWidth="1.2"/><circle cx="10" cy="10" r="4" stroke="#1f1f1f" strokeWidth="1.2"/><circle cx="15" cy="5" r="1" fill="#1f1f1f"/></svg>
            </div>
            <div className={styles.footerCopy}>&copy; Redcloud.Ltd All rights reserved</div>
            <div className={styles.footerLinks}>
              <span className={styles.footerLink}>Privacy policy</span>
              <span className={styles.footerLink}>Terms</span>
            </div>
          </div>
        </div>

        {/* Desktop Footer */}
        <div className={styles.desktopOnly}>
          <DesktopFooter />
        </div>
      </div>
    </div>
  );
}

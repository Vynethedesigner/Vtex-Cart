'use client';

import { useState, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import styles from './checkout.module.css';
import { initialSuppliers } from '../cart/data';

/* ═══════════════════════════════════════════════════════
   Checkout Page — Full Interactive Prototype
   States from Figma:
   1. Items moved to wishlist banner
   2. Fulfilment setup (Delivery / Pick-up tabs)
   3. Delivery address (defaulted / first time form / filled)
   4. Delivery time + schedule (per-supplier)
   5. Multiple supplier delivery schedule with thumbnails
   6. Payment setup (Pay at delivery / RedPay)
   7. Billing address checkbox
   8. Order summary (collapsed / expanded)
   9. Place order
   10. Thank you / Order completed
   ═══════════════════════════════════════════════════════ */

type CheckoutStep = 'checkout' | 'thank-you';
type FulfilmentTab = 'delivery' | 'pickup';

interface AddressForm {
  contactName: string;
  phone: string;
  country: string;
  city: string;
  addressLine1: string;
  addressLine2: string;
  postalCode: string;
  isDefault: boolean;
}

interface PickupAddress {
  id: string;
  name: string;
  address: string;
  postalCode: string;
  city: string;
  country: string;
  contactName: string;
  phone: string;
}

const pickupAddresses: PickupAddress[] = [
  { id: 'pa-1', name: 'Carrefour Express', address: 'Arenales 975', postalCode: 'C1061AAS', city: 'Buenos Aires', country: 'Argentina', contactName: 'Juan Perez', phone: '+54 11 4803-1234' },
  { id: 'pa-2', name: 'Carrefour Express', address: 'Arenales 975', postalCode: 'C1061AAS', city: 'Buenos Aires', country: 'Argentina', contactName: 'Juan Perez', phone: '+54 11 4803-1234' },
  { id: 'pa-3', name: 'Carrefour Express', address: 'Arenales 975', postalCode: 'C1061AAS', city: 'Buenos Aires', country: 'Argentina', contactName: 'Juan Perez', phone: '+54 11 4803-1234' },
  { id: 'pa-4', name: 'Carrefour Express', address: 'Arenales 975', postalCode: 'C1061AAS', city: 'Buenos Aires', country: 'Argentina', contactName: 'Juan Perez', phone: '+54 11 4803-1234' },
  { id: 'pa-5', name: 'Carrefour Express', address: 'Arenales 975', postalCode: 'C1061AAS', city: 'Buenos Aires', country: 'Argentina', contactName: 'Juan Perez', phone: '+54 11 4803-1234' },
];

/* ── Inline SVG Icons ── */

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

function BackArrowIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M15 18L9 12L15 6" stroke="#1f1f1f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LocationPinIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M9 1C5.7 1 3 3.7 3 7C3 11.25 9 17 9 17C9 17 15 11.25 15 7C15 3.7 12.3 1 9 1Z" stroke="#506079" strokeWidth="1.5" />
      <circle cx="9" cy="7" r="2" stroke="#506079" strokeWidth="1.5" />
    </svg>
  );
}

function CheckmarkIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BigCheckIcon() {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" style={{ animation: 'checkmark 0.5s ease' }}>
      <circle cx="40" cy="40" r="36" fill="#e6f4ea" />
      <circle cx="40" cy="40" r="28" fill="#0d7c3d" />
      <path d="M25 40L35 50L55 30" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="2" stroke="#9a9a9a" strokeWidth="1.2"/>
      <path d="M8 1V3M8 13V15M1 8H3M13 8H15M2.9 2.9L4.3 4.3M11.7 11.7L13.1 13.1M13.1 2.9L11.7 4.3M4.3 11.7L2.9 13.1" stroke="#9a9a9a" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  );
}

/* ── Desktop Header (Full — Thank You / Help pages) ── */
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
      <div className={styles.desktopCategoryNav}>
        <div className={styles.desktopCategoryInner}>
          <button className={styles.desktopCategoryItem}>All Suppliers <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3.5 5.25L7 8.75L10.5 5.25" stroke="#1f1f1f" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
          <div className={styles.desktopCategorySep} />
          <button className={styles.desktopCategoryItem}>All Categories <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3.5 5.25L7 8.75L10.5 5.25" stroke="#1f1f1f" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
          <button className={styles.desktopCategoryItem}>Beverages</button>
          <button className={styles.desktopCategoryItem}>Grocery</button>
          <button className={styles.desktopCategoryItem}>Body Care</button>
          <button className={styles.desktopCategoryItem}>Cleaning Supplies</button>
          <button className={styles.desktopCategoryItem}>Meat and Seafood</button>
        </div>
      </div>
    </div>
  );
}

/* ── Simplified Checkout Header (for checkout form screens) ── */
function CheckoutDesktopHeader({ onHelp }: { onHelp: () => void }) {
  return (
    <div className={styles.checkoutHeaderWrap}>
      <div className={styles.checkoutHeader}>
        <img src="/images/red101-logo.svg" alt="Red101" className={styles.desktopLogo} />
        <button className={styles.checkoutHeaderHelp} onClick={onHelp}>Need help?</button>
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
      <div className={styles.desktopFooterBottom}>
        <div className={styles.desktopFooterSocials}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="9" stroke="white" strokeWidth="1.2"/><path d="M12 3V7H10.5C10 7 10 7.5 10 8V10H12L11.5 13H10V20" stroke="white" strokeWidth="1.2"/></svg>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="2" y="2" width="16" height="16" rx="3" stroke="white" strokeWidth="1.2"/><path d="M6 9V14M6 6V6.01M10 14V10C10 8.9 10.9 8 12 8C13.1 8 14 8.9 14 10V14" stroke="white" strokeWidth="1.2" strokeLinecap="round"/></svg>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="2" y="2" width="16" height="16" rx="5" stroke="white" strokeWidth="1.2"/><circle cx="10" cy="10" r="4" stroke="white" strokeWidth="1.2"/><circle cx="15" cy="5" r="1" fill="white"/></svg>
        </div>
        <div className={styles.desktopFooterCopyright}>
          &copy; Redcloud.Ltd All rights reserved
        </div>
        <div className={styles.desktopFooterLegal}>
          <a href="#">Privacy policy</a>
          <a href="#">Terms</a>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  const router = useRouter();
  const [step, setStep] = useState<CheckoutStep>('checkout');
  const [fulfilmentTab, setFulfilmentTab] = useState<FulfilmentTab>('delivery');
  const [showBanner, setShowBanner] = useState(true);
  const [addressMode, setAddressMode] = useState<'saved' | 'form'>('saved');
  const [paymentMethod, setPaymentMethod] = useState<'pay-at-delivery' | 'redpay'>('pay-at-delivery');
  const [sameAsBilling, setSameAsBilling] = useState(true);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [fulfilmentConfirmed, setFulfilmentConfirmed] = useState(false);
  const [showPickupModal, setShowPickupModal] = useState(false);
  const [selectedPickupAddress, setSelectedPickupAddress] = useState<string>('pa-1');
  const [deliveryNotes, setDeliveryNotes] = useState('');
  const [pickupSelections, setPickupSelections] = useState<Record<string, string>>(() => {
    const defaults: Record<string, string> = {};
    initialSuppliers.forEach(s => { defaults[s.id] = 'fast'; });
    return defaults;
  });
  const [address, setAddress] = useState<AddressForm>({
    contactName: 'Juan Perez',
    phone: '+54 11 4803-1234',
    country: 'Argentina',
    city: 'Buenos Aires',
    addressLine1: 'Carrefour Express',
    addressLine2: 'Arenales 975',
    postalCode: 'C1061AAS',
    isDefault: true,
  });

  // Compute totals from real data
  const { subTotal, deliveryCost, discount, orderTotal, totalItems } = useMemo(() => {
    let sub = 0;
    let items = 0;
    initialSuppliers.forEach(supplier => {
      supplier.items.forEach(item => {
        sub += item.price * item.quantity;
        items += item.quantity;
      });
    });
    const disc = -(sub * 0.05); // 5% coupon
    const delivery = 0;
    return {
      subTotal: sub,
      deliveryCost: delivery,
      discount: disc,
      orderTotal: sub + delivery + disc,
      totalItems: items,
    };
  }, []);

  const handlePlaceOrder = useCallback(() => {
    setStep('thank-you');
  }, []);

  const goBackToCart = useCallback(() => {
    router.push('/cart');
  }, [router]);

  const goToHelp = useCallback(() => {
    router.push('/checkout/help');
  }, [router]);

  // ═══════════════════════════════════════════════════════
  // THANK YOU SCREEN
  // ═══════════════════════════════════════════════════════
  if (step === 'thank-you') {
    return (
      <div className={styles.shell}>
        {/* Mobile header */}
        <div className={styles.mobileOnly}>
          <StatusBar />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 16px', background: '#ffffff', borderBottom: '1px solid #e8e8e8' }}>
            <img src="/images/red101-logo.svg" alt="Red101" style={{ height: 20, width: 'auto' }} />
            <div style={{ flex: 1, margin: '0 12px', background: '#f5f5f5', borderRadius: 8, padding: '8px 12px', fontSize: 13, color: '#9a9a9a' }}>Search Red101</div>
            <svg width="20" height="14" viewBox="0 0 20 14" fill="none"><rect y="0" width="20" height="2" rx="1" fill="#1f1f1f"/><rect y="6" width="20" height="2" rx="1" fill="#1f1f1f"/><rect y="12" width="20" height="2" rx="1" fill="#1f1f1f"/></svg>
          </div>
          <div style={{ padding: '4px 16px', fontSize: 13, color: '#626262' }}>X5000, Cordoba ARG <span style={{ fontSize: 10 }}>{'\u25BC'}</span></div>
        </div>

        {/* Desktop header */}
        <div className={styles.desktopOnly}>
          <DesktopHeader />
        </div>

        <div className={styles.scrollArea}>
          <div className={styles.thankYou}>
            <BigCheckIcon />
            <h1 className={styles.thankYouTitle}>Thank you!</h1>
            <div className={styles.thankYouOrderId}>Your order #5363636336 &amp; #5363636337 have been placed</div>
            <p className={styles.thankYouMessage}>Your item will be delivered very soon, we will send an email to confirm your order details.</p>
            <button className={styles.viewOrdersBtn} onClick={goBackToCart}>View my orders</button>

            <div className={styles.supportSection}>
              <div className={styles.supportTitle}>Need assistance?</div>
              <div className={styles.supportSubtitle}>Contact our Customer Support team</div>

              <div className={styles.supportItem}>
                <div className={styles.supportLabel}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M14 11.4V13.4C14 13.7 13.7 14 13.4 14C7.2 14 2 8.8 2 2.6C2 2.3 2.3 2 2.6 2H4.6C4.9 2 5.2 2.3 5.2 2.6C5.2 3.8 5.4 5 5.8 6L4.4 7.4C5.4 9.4 6.6 10.6 8.6 11.6L10 10.2C11 10.6 12.2 10.8 13.4 10.8C13.7 10.8 14 11.1 14 11.4Z" stroke="#506079" strokeWidth="1.2"/></svg>
                  TELEPHONE
                </div>
                <a href="tel:+2348184187327" className={styles.supportValueLink || styles.supportValue}>+234 8184187327</a>
              </div>

              <div className={styles.supportItem}>
                <div className={styles.supportLabel}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="#506079" strokeWidth="1.2"/><path d="M5 9.5C5 9.5 6.5 11 8 11C9.5 11 11 9.5 11 9.5" stroke="#506079" strokeWidth="1.2" strokeLinecap="round"/></svg>
                  WHATSAPP
                </div>
                <a href="tel:+2348184187327" className={styles.supportValueLink || styles.supportValue}>+234 8184187327</a>
              </div>

              <div className={styles.supportItem}>
                <div className={styles.supportLabel}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="3" width="12" height="10" rx="1" stroke="#506079" strokeWidth="1.2"/><path d="M2 5L8 9L14 5" stroke="#506079" strokeWidth="1.2"/></svg>
                  EMAIL
                </div>
                <a href="mailto:CS@red101.com" className={styles.supportValueLink || styles.supportValue}>CS@red101.com</a>
              </div>
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

  // ═══════════════════════════════════════════════════════
  // ORDER SUMMARY SIDEBAR (Desktop)
  // ═══════════════════════════════════════════════════════
  const OrderSummarySidebar = (
    <div className={styles.desktopSidebar}>
      <div className={styles.sidebarHeader}>
        <span className={styles.sidebarTitle}>Order Summary</span>
        <button className={styles.sidebarDetailsLink} onClick={() => setShowOrderDetails(!showOrderDetails)}>
          Details {showOrderDetails ? '\u25B2' : '\u25BC'}
        </button>
      </div>

      {showOrderDetails && initialSuppliers.map(supplier => (
        <div key={supplier.id} style={{ marginBottom: 16 }}>
          {supplier.items.map(item => (
            <div key={item.id} className={styles.summaryItemRow}>
              <img src={item.image} alt={item.name} className={styles.sidebarItemThumb} />
              <div className={styles.summaryItemInfo}>
                <div className={styles.summaryItemName}>{item.name},</div>
                <div className={styles.summaryItemDesc}>{item.description}</div>
                <div className={styles.summaryItemQty}>Quantity:{item.quantity}</div>
              </div>
              <span className={styles.summaryItemPrice}>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
      ))}

      <div className={styles.sidebarTotalRow}>
        <div>
          <div className={styles.sidebarTotalLabel}>Total</div>
          <div className={styles.sidebarTotalSubLabel}>Including delivery</div>
        </div>
        <span className={styles.sidebarTotalValue}>${orderTotal.toFixed(2)}</span>
      </div>

      <div className={styles.sidebarRow}>
        <span className={styles.sidebarLabel}>Sub-total</span>
        <span className={styles.sidebarValue}>${subTotal.toFixed(2)}</span>
      </div>
      <div className={styles.sidebarRow}>
        <span className={styles.sidebarLabel}>Delivery cost</span>
        <span className={`${styles.sidebarValue} ${styles.sidebarFree}`}>${deliveryCost.toFixed(2)}</span>
      </div>
      <div className={styles.sidebarRow}>
        <span className={styles.sidebarLabel}>Code applied -5%</span>
        <span className={`${styles.sidebarValue} ${styles.sidebarDiscount}`}>-${Math.abs(discount).toFixed(2)}</span>
      </div>

      <button
        className={styles.sidebarPlaceOrderBtn}
        disabled={!fulfilmentConfirmed}
        onClick={handlePlaceOrder}
      >
        Place Order
      </button>
    </div>
  );

  // ═══════════════════════════════════════════════════════
  // PICK-UP POINTS MODAL
  // ═══════════════════════════════════════════════════════
  const PickupPointsModal = showPickupModal && (
    <div className={styles.modalOverlay} onClick={() => setShowPickupModal(false)}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Choose a pick-up point</h2>
          <button className={styles.modalClose} onClick={() => setShowPickupModal(false)}>&times;</button>
        </div>

        <div className={styles.modalSectionLabel}>Default</div>
        <div
          className={`${styles.modalAddressCard} ${selectedPickupAddress === pickupAddresses[0].id ? styles.modalAddressCardSelected : ''}`}
          onClick={() => { setSelectedPickupAddress(pickupAddresses[0].id); setShowPickupModal(false); }}
        >
          <div className={styles.addressPin}><LocationPinIcon /></div>
          <div className={styles.addressText}>
            {pickupAddresses[0].name}, {pickupAddresses[0].address}, {pickupAddresses[0].postalCode}<br />
            {pickupAddresses[0].city}, {pickupAddresses[0].country}<br />
            <span className={styles.addressName}>{pickupAddresses[0].contactName},<br />{pickupAddresses[0].phone}</span>
          </div>
        </div>

        <div className={styles.modalSectionLabel}>Sorted by distance</div>
        {pickupAddresses.slice(1).map(pa => (
          <div
            key={pa.id}
            className={`${styles.modalAddressCard} ${selectedPickupAddress === pa.id ? styles.modalAddressCardSelected : ''}`}
            onClick={() => { setSelectedPickupAddress(pa.id); setShowPickupModal(false); }}
          >
            <div className={styles.addressPin}><LocationPinIcon /></div>
            <div className={styles.addressText}>
              {pa.name}, {pa.address}, {pa.postalCode}<br />
              {pa.city}, {pa.country}<br />
              <span className={styles.addressName}>{pa.contactName},<br />{pa.phone}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // ═══════════════════════════════════════════════════════
  // FULFILMENT: DELIVERY TAB CONTENT
  // ═══════════════════════════════════════════════════════
  const DeliveryContent = (
    <>
      <div className={styles.sectionLabel}>DELIVERY ADDRESS</div>
      {addressMode === 'saved' ? (
        <div className={styles.addressCard} onClick={() => setAddressMode('form')}>
          <div className={styles.addressPin}><LocationPinIcon /></div>
          <div className={styles.addressText}>
            {address.addressLine1}, {address.addressLine2}, {address.postalCode}<br />
            {address.city}, {address.country}<br />
            <span className={styles.addressName}>{address.contactName},<br />{address.phone}</span>
          </div>
        </div>
      ) : (
        <>
          <div className={styles.sectionSubLabel}>The address should be in {address.city}, {address.country}</div>
          <div className={styles.formField}>
            <label className={styles.formLabel}>Contact name</label>
            <input className={styles.formInput} value={address.contactName} onChange={e => setAddress(prev => ({ ...prev, contactName: e.target.value }))} />
          </div>
          <div className={styles.formField}>
            <label className={styles.formLabel}>Phone number</label>
            <input className={styles.formInput} value={address.phone} onChange={e => setAddress(prev => ({ ...prev, phone: e.target.value }))} />
          </div>
          <div className={styles.formField}>
            <label className={styles.formLabel}>Country</label>
            <input className={`${styles.formInput} ${styles.formInputDisabled}`} value={address.country} readOnly />
          </div>
          <div className={styles.formField}>
            <label className={styles.formLabel}>City</label>
            <input className={`${styles.formInput} ${styles.formInputDisabled}`} value={address.city} readOnly />
          </div>
          <div className={styles.formField}>
            <label className={styles.formLabel}>Address line 1</label>
            <input className={styles.formInput} value={address.addressLine1} onChange={e => setAddress(prev => ({ ...prev, addressLine1: e.target.value }))} />
          </div>
          <div className={styles.formField}>
            <label className={styles.formLabel}>Address line 2</label>
            <input className={styles.formInput} value={address.addressLine2} onChange={e => setAddress(prev => ({ ...prev, addressLine2: e.target.value }))} />
          </div>
          <div className={styles.formField}>
            <label className={styles.formLabel}>Postal Code</label>
            <input className={styles.formInput} value={address.postalCode} onChange={e => setAddress(prev => ({ ...prev, postalCode: e.target.value }))} />
          </div>
          <div className={styles.checkboxRow} onClick={() => setAddress(prev => ({ ...prev, isDefault: !prev.isDefault }))}>
            <div className={`${styles.checkbox} ${!address.isDefault ? styles.checkboxUnchecked : ''}`}>
              {address.isDefault && <CheckmarkIcon />}
            </div>
            <span className={styles.checkboxLabel}>Make this my default address</span>
          </div>
        </>
      )}

      <div className={styles.sectionLabel}>DELIVERY METHOD</div>
      <div style={{ fontSize: 14, color: '#1f1f1f', marginBottom: 8 }}>Schedule all</div>

      {initialSuppliers.map(supplier => (
        <div key={supplier.id} style={{ marginBottom: 16 }}>
          <div className={styles.scheduleDateLabel}>Saturday, March 03, 2025</div>
          <div className={styles.timeCardWithIcon}>
            <span>10:00pm</span>
            <span className={styles.timeCardIcon}><SettingsIcon /></span>
          </div>
          <div className={styles.scheduleThumbnails}>
            {supplier.items.slice(0, 5).map(item => (
              <img key={item.id} src={item.image} alt={item.name} className={styles.scheduleThumb} />
            ))}
            {supplier.items.length > 5 && (
              <div className={styles.scheduleThumbMore}>+{supplier.items.length - 5}</div>
            )}
          </div>
        </div>
      ))}

      <div className={styles.deliveryNotesWrap}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 8 }}>
          <img src={initialSuppliers[0]?.items[0]?.image} alt="" style={{ width: 40, height: 40, borderRadius: 6, objectFit: 'contain', background: '#f8f8f8', padding: 2 }} />
          <div style={{ fontSize: 13, color: '#1f1f1f', lineHeight: '17px' }}>
            <strong>Delivery Driver</strong><br />
            <span style={{ color: '#626262', fontSize: 12 }}>your delivery...</span>
          </div>
        </div>
        <input
          className={styles.deliveryNotesInput}
          placeholder="Enter courier notes, e.g. code, delivery instructions"
          value={deliveryNotes}
          onChange={e => setDeliveryNotes(e.target.value)}
          style={{ minHeight: 'auto' }}
        />
      </div>

      <button
        className={`${styles.continueBtn} ${address.contactName ? styles.continueBtnEnabled : styles.continueBtnDisabled}`}
        onClick={() => {
          if (addressMode === 'form') setAddressMode('saved');
          setFulfilmentConfirmed(true);
        }}
      >
        Continue
      </button>
    </>
  );

  // ═══════════════════════════════════════════════════════
  // FULFILMENT: PICK-UP TAB CONTENT
  // ═══════════════════════════════════════════════════════
  const PickupContent = (
    <>
      {initialSuppliers.map(supplier => (
        <div key={supplier.id} className={styles.supplierFulfilment}>
          <div className={styles.supplierFulfilmentHeader}>Sold by {supplier.name}</div>

          <div className={styles.sectionLabel}>PICK UP POINT</div>
          <div className={styles.addressCard}>
            <div className={styles.addressPin}><LocationPinIcon /></div>
            <div className={styles.addressText}>
              Carrefour Express, Arenales 975, C1061AAS<br />
              Buenos Aires, Argentina<br />
              <span className={styles.addressName}>Juan Perez,<br />+54 11 4803-1234</span>
            </div>
          </div>
          <button className={styles.pickupPointLink} onClick={() => setShowPickupModal(true)}>
            See all available pick-up points
          </button>

          <div className={styles.sectionLabel}>PICK UP OPTION</div>
          <div
            className={`${styles.pickupOptionRow} ${pickupSelections[supplier.id] === 'fast' ? styles.pickupOptionRowSelected : ''}`}
            onClick={() => setPickupSelections(prev => ({ ...prev, [supplier.id]: 'fast' }))}
          >
            <div className={`${styles.radio} ${pickupSelections[supplier.id] === 'fast' ? styles.radioSelected : ''}`}>
              {pickupSelections[supplier.id] === 'fast' && <div className={styles.radioInner} />}
            </div>
            <span className={styles.pickupOptionLabel}>Ready in up to 1 day</span>
            <span className={styles.pickupOptionPrice}>$50.00</span>
          </div>
          <div
            className={`${styles.pickupOptionRow} ${pickupSelections[supplier.id] === 'standard' ? styles.pickupOptionRowSelected : ''}`}
            onClick={() => setPickupSelections(prev => ({ ...prev, [supplier.id]: 'standard' }))}
          >
            <div className={`${styles.radio} ${pickupSelections[supplier.id] === 'standard' ? styles.radioSelected : ''}`}>
              {pickupSelections[supplier.id] === 'standard' && <div className={styles.radioInner} />}
            </div>
            <span className={styles.pickupOptionLabel}>5-7 business day</span>
            <span className={styles.pickupOptionPrice}>FREE</span>
          </div>
        </div>
      ))}

      <div className={styles.sectionLabel}>DELIVERY ADDRESS</div>
      <div className={styles.addressCard}>
        <div className={styles.addressPin}><LocationPinIcon /></div>
        <div className={styles.addressText}>
          {address.addressLine1}, {address.addressLine2}, {address.postalCode}<br />
          {address.city}, {address.country}<br />
          <span className={styles.addressName}>{address.contactName},<br />{address.phone}</span>
        </div>
      </div>

      <div className={styles.sectionLabel}>DELIVERY METHOD</div>
      {initialSuppliers.map(supplier => (
        <div key={supplier.id} style={{ marginBottom: 16 }}>
          <div className={styles.scheduleDateLabel}>Saturday, March 03, 2025</div>
          <div className={styles.timeCardWithIcon}>
            <span>10:00pm</span>
            <span className={styles.timeCardIcon}><SettingsIcon /></span>
          </div>
          <div className={styles.scheduleThumbnails}>
            {supplier.items.slice(0, 5).map(item => (
              <img key={item.id} src={item.image} alt={item.name} className={styles.scheduleThumb} />
            ))}
            {supplier.items.length > 5 && (
              <div className={styles.scheduleThumbMore}>+{supplier.items.length - 5}</div>
            )}
          </div>
        </div>
      ))}

      <button className={`${styles.continueBtn} ${styles.continueBtnEnabled}`} onClick={() => setFulfilmentConfirmed(true)}>Continue</button>
    </>
  );

  // ═══════════════════════════════════════════════════════
  // PAYMENT SECTION
  // ═══════════════════════════════════════════════════════
  const PaymentSection = (
    <>
      <h2 className={styles.sectionTitle}>Payment setup</h2>

      <div className={styles.sectionLabel}>PAYMENT METHOD</div>
      <div className={`${styles.radioRow} ${paymentMethod === 'pay-at-delivery' ? styles.radioRowSelected : ''}`} onClick={() => setPaymentMethod('pay-at-delivery')}>
        <div className={`${styles.radio} ${paymentMethod === 'pay-at-delivery' ? styles.radioSelected : ''}`}>
          {paymentMethod === 'pay-at-delivery' && <div className={styles.radioInner} />}
        </div>
        <span className={styles.radioLabel}>Pay at delivery</span>
      </div>
      <div className={`${styles.radioRow} ${paymentMethod === 'redpay' ? styles.radioRowSelected : ''}`} onClick={() => setPaymentMethod('redpay')}>
        <div className={`${styles.radio} ${paymentMethod === 'redpay' ? styles.radioSelected : ''}`}>
          {paymentMethod === 'redpay' && <div className={styles.radioInner} />}
        </div>
        <span className={styles.radioLabel}>RedPay</span>
      </div>

      <div style={{ marginTop: 16 }}>
        <div className={styles.sectionLabel}>BILLING ADDRESS</div>
        <div className={styles.addressCard} style={{ cursor: 'default' }}>
          <div className={styles.addressPin}><LocationPinIcon /></div>
          <div className={styles.addressText}>
            {address.addressLine1}, {address.addressLine2}, {address.postalCode}<br />
            {address.city}, {address.country}<br />
            <span className={styles.addressName}>{address.contactName},<br />{address.phone}</span>
          </div>
        </div>
      </div>
    </>
  );

  // ═══════════════════════════════════════════════════════
  // MOBILE ORDER SUMMARY (bottom of page)
  // ═══════════════════════════════════════════════════════
  const MobileOrderSummary = (
    <div className={styles.section} style={{ paddingTop: 20 }}>
      <div className={styles.summaryHeader}>
        <h2 className={styles.summaryTitle}>Order summary</h2>
        <button className={styles.summaryDetails} onClick={() => setShowOrderDetails(!showOrderDetails)}>
          Details <span style={{ fontSize: 10 }}>{showOrderDetails ? '\u25B2' : '\u25BC'}</span>
        </button>
      </div>

      {showOrderDetails && (
        <>
          {initialSuppliers.map(supplier => (
            <div key={supplier.id} className={styles.supplierGroup}>
              <div className={styles.supplierGroupHeader}>Sold by {supplier.name} ({supplier.items.reduce((a, i) => a + i.quantity, 0)})</div>
              {supplier.items.map(item => (
                <div key={item.id} className={styles.summaryItemRow}>
                  <img src={item.image} alt={item.name} className={styles.sidebarItemThumb} />
                  <div className={styles.summaryItemInfo}>
                    <div className={styles.summaryItemName}>{item.name}</div>
                    <div className={styles.summaryItemQty}>Quantity: {item.quantity}</div>
                  </div>
                  <span className={styles.summaryItemPrice}>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
          ))}
          <div className={styles.dividerThin} />
          <div className={styles.summaryRow}>
            <span className={styles.summaryLabel}>Sub-total</span>
            <span className={styles.summaryValue}>${subTotal.toFixed(2)}</span>
          </div>
          <div className={styles.summaryRow}>
            <span className={styles.summaryLabel}>Delivery cost</span>
            <span className={`${styles.summaryValue} ${styles.summaryFree}`}>FREE</span>
          </div>
          <div className={styles.summaryRow}>
            <span className={styles.summaryLabel}>Coupon applied -5%</span>
            <span className={`${styles.summaryValue} ${styles.summaryDiscount}`}>-${Math.abs(discount).toFixed(2)}</span>
          </div>
        </>
      )}

      <div className={styles.summaryTotal}>
        <span className={styles.summaryTotalLabel}>Total</span>
        <span className={styles.summaryTotalValue}>${orderTotal.toFixed(2)}</span>
      </div>

      <button
        className={`${styles.placeOrderBtn} ${fulfilmentConfirmed ? styles.placeOrderEnabled : styles.placeOrderDisabled}`}
        disabled={!fulfilmentConfirmed}
        onClick={handlePlaceOrder}
      >
        Place Order
      </button>
    </div>
  );

  // ═══════════════════════════════════════════════════════
  // CHECKOUT FORM
  // ═══════════════════════════════════════════════════════
  return (
    <div className={styles.shell}>
      {/* Mobile Status Bar + Header */}
      <div className={styles.mobileOnly}>
        <StatusBar />
      </div>

      {/* Desktop Header */}
      <div className={styles.desktopOnly}>
        <CheckoutDesktopHeader onHelp={goToHelp} />
      </div>

      {/* Banner */}
      {showBanner && (
        <div className={styles.toast} onClick={() => setShowBanner(false)}>
          Items below the supplier&apos;s minimum order value have been moved to your wish list.
        </div>
      )}

      {/* Mobile Header */}
      <div className={styles.mobileOnly}>
        <div className={styles.header}>
          <button className={styles.headerBack} onClick={goBackToCart}>
            <BackArrowIcon />
            <span>Checkout</span>
          </button>
          <button className={styles.headerHelp} onClick={goToHelp}>Need help?</button>
        </div>
      </div>

      {/* Desktop Back + Title */}
      <div className={styles.desktopOnly}>
        <div className={styles.desktopPageHeader}>
          <button className={styles.desktopBackToCart} onClick={goBackToCart}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M15 18L9 12L15 6" stroke="#626262" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            Back to Cart
          </button>
          <h1 className={styles.desktopPageTitle}>Checkout</h1>
        </div>
      </div>

      <div className={styles.scrollArea}>
        {/* Desktop: Two-column layout */}
        <div className={styles.desktopOnly}>
          <div className={styles.desktopTwoCol}>
            <div className={styles.desktopMainCol}>
              {/* Fulfilment Setup Card */}
              <div className={styles.desktopCard}>
                <h2 className={styles.sectionTitle}>Fulfilment setup</h2>
                <div className={styles.tabs}>
                  <button className={`${styles.tab} ${fulfilmentTab === 'delivery' ? styles.tabActive : ''}`} onClick={() => setFulfilmentTab('delivery')}>Delivery</button>
                  <button className={`${styles.tab} ${fulfilmentTab === 'pickup' ? styles.tabActive : ''}`} onClick={() => setFulfilmentTab('pickup')}>Pick-up</button>
                </div>
                {fulfilmentTab === 'delivery' ? DeliveryContent : PickupContent}
              </div>

              {/* Payment Setup Card */}
              <div className={styles.desktopCard}>
                {PaymentSection}
              </div>
            </div>

            {/* Sidebar */}
            <div className={styles.desktopSidebarCol}>
              {OrderSummarySidebar}
            </div>
          </div>
        </div>

        {/* Mobile: Original vertical flow */}
        <div className={styles.mobileOnly}>
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Fulfilment setup</h2>
            <div className={styles.tabs}>
              <button className={`${styles.tab} ${fulfilmentTab === 'delivery' ? styles.tabActive : ''}`} onClick={() => setFulfilmentTab('delivery')}>Delivery</button>
              <button className={`${styles.tab} ${fulfilmentTab === 'pickup' ? styles.tabActive : ''}`} onClick={() => setFulfilmentTab('pickup')}>Pick-up</button>
            </div>
            {fulfilmentTab === 'delivery' ? DeliveryContent : PickupContent}
          </div>

          <div className={styles.divider} />

          <div className={styles.section} style={{ paddingTop: 20 }}>
            {PaymentSection}
          </div>

          <div className={styles.divider} />

          {MobileOrderSummary}
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

      {/* Pick-up Points Modal */}
      {PickupPointsModal}
    </div>
  );
}

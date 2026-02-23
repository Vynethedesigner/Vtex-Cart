'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import styles from './checkout.module.css';

/* ═══════════════════════════════════════════════════════
   Checkout Page — Full Interactive Prototype
   States from Figma:
   1. Items moved to wishlist banner
   2. Fulfilment setup (Delivery / Pick-up tabs)
   3. Delivery address (defaulted / first time form / filled)
   4. Delivery time + schedule
   5. Multiple supplier delivery schedule
   6. Payment setup (Pay at delivery / Options)
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

export default function CheckoutPage() {
  const router = useRouter();
  const [step, setStep] = useState<CheckoutStep>('checkout');
  const [fulfilmentTab, setFulfilmentTab] = useState<FulfilmentTab>('delivery');
  const [showBanner, setShowBanner] = useState(true);
  const [addressMode, setAddressMode] = useState<'saved' | 'form'>('saved');
  const [paymentMethod, setPaymentMethod] = useState<'pay-at-delivery' | 'options'>('pay-at-delivery');
  const [sameAsBilling, setSameAsBilling] = useState(true);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [fulfilmentConfirmed, setFulfilmentConfirmed] = useState(false);
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

  const orderTotal = 1180.00;
  const subTotal = 1200.00;
  const deliveryCost = 0;
  const discount = -20.00;

  const handlePlaceOrder = useCallback(() => {
    setStep('thank-you');
  }, []);

  const goBackToCart = useCallback(() => {
    router.push('/cart');
  }, [router]);

  // ═══════════════════════════════════════════════════════
  // THANK YOU SCREEN
  // ═══════════════════════════════════════════════════════
  if (step === 'thank-you') {
    return (
      <div className={styles.shell}>
        <StatusBar />
        {/* Red101 header bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 16px', background: '#ffffff', borderBottom: '1px solid #e8e8e8' }}>
          <img src="/images/red101-logo.svg" alt="Red101" style={{ height: 20, width: 'auto' }} />
          <div style={{ flex: 1, margin: '0 12px', background: '#f5f5f5', borderRadius: 8, padding: '8px 12px', fontSize: 13, color: '#9a9a9a' }}>Search Red101</div>
          <svg width="20" height="14" viewBox="0 0 20 14" fill="none"><rect y="0" width="20" height="2" rx="1" fill="#1f1f1f"/><rect y="6" width="20" height="2" rx="1" fill="#1f1f1f"/><rect y="12" width="20" height="2" rx="1" fill="#1f1f1f"/></svg>
        </div>
        <div style={{ padding: '4px 16px', fontSize: 13, color: '#626262' }}>X5000, Cordoba ARG <span style={{ fontSize: 10 }}>{'\u25BC'}</span></div>

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
                <div className={styles.supportValue}>+234 8184187327</div>
              </div>

              <div className={styles.supportItem}>
                <div className={styles.supportLabel}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="#506079" strokeWidth="1.2"/><path d="M5 9.5C5 9.5 6.5 11 8 11C9.5 11 11 9.5 11 9.5" stroke="#506079" strokeWidth="1.2" strokeLinecap="round"/></svg>
                  WHATSAPP
                </div>
                <div className={styles.supportValue}>+234 8184187327</div>
              </div>

              <div className={styles.supportItem}>
                <div className={styles.supportLabel}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="3" width="12" height="10" rx="1" stroke="#506079" strokeWidth="1.2"/><path d="M2 5L8 9L14 5" stroke="#506079" strokeWidth="1.2"/></svg>
                  EMAIL
                </div>
                <div className={styles.supportValue}>CS@RED101.COM</div>
              </div>
            </div>
          </div>

          {/* Footer */}
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
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════
  // CHECKOUT FORM
  // ═══════════════════════════════════════════════════════
  return (
    <div className={styles.shell}>
      <StatusBar />

      {/* Banner */}
      {showBanner && (
        <div className={styles.toast} onClick={() => setShowBanner(false)}>
          Items below the supplier&apos;s minimum order value have been moved to your wish list.
        </div>
      )}

      {/* Header */}
      <div className={styles.header}>
        <button className={styles.headerBack} onClick={goBackToCart}>
          <BackArrowIcon />
          <span>Checkout</span>
        </button>
        <button className={styles.headerHelp}>Need help?</button>
      </div>

      <div className={styles.scrollArea}>
        {/* ── Fulfilment Setup ── */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Fulfilment setup</h2>

          {/* Tabs */}
          <div className={styles.tabs}>
            <button className={`${styles.tab} ${fulfilmentTab === 'delivery' ? styles.tabActive : ''}`} onClick={() => setFulfilmentTab('delivery')}>Delivery</button>
            <button className={`${styles.tab} ${fulfilmentTab === 'pickup' ? styles.tabActive : ''}`} onClick={() => setFulfilmentTab('pickup')}>Pick-up</button>
          </div>

          {fulfilmentTab === 'delivery' && (
            <>
              <div className={styles.sectionLabel}>DELIVERY ADDRESS</div>
              {addressMode === 'saved' ? (
                <>
                  <div className={styles.addressCard} onClick={() => setAddressMode('form')}>
                    <div className={styles.addressPin}><LocationPinIcon /></div>
                    <div className={styles.addressText}>
                      {address.addressLine1}, {address.addressLine2}, {address.postalCode}<br />
                      {address.city}, {address.country}<br />
                      <span className={styles.addressName}>{address.contactName},<br />{address.phone}</span>
                    </div>
                  </div>

                  <div className={styles.sectionLabel}>DELIVERY TIME</div>
                  <div className={styles.timeCard}>
                    <span><span className={styles.timeCardBold}>ASAP</span> 01 Feb 2025</span>
                  </div>
                  <div className={styles.timeCard}>15:00-20</div>
                  <button className={styles.addNotes}>Add delivery notes</button>
                </>
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
                    <label className={styles.formLabel}>Label</label>
                    <input className={`${styles.formInput} ${styles.formInputDisabled}`} value={address.country} readOnly />
                  </div>
                  <div className={styles.formField}>
                    <label className={styles.formLabel}>Label</label>
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
          )}

          {fulfilmentTab === 'pickup' && (
            <>
              <div className={styles.sectionLabel}>PICK-UP STORE</div>
              <div className={styles.addressCard}>
                <div className={styles.addressPin}><LocationPinIcon /></div>
                <div className={styles.addressText}>
                  Carrefour Express, Arenales 975, C1061AAS<br />
                  Buenos Aires, Argentina
                </div>
              </div>
              <div className={styles.sectionLabel}>PICK-UP TIME</div>
              <div className={styles.timeCard}>
                <span><span className={styles.timeCardBold}>ASAP</span> 01 Feb 2025</span>
              </div>
              <div className={styles.timeCard}>15:00-20</div>
              <button className={`${styles.continueBtn} ${styles.continueBtnEnabled}`} onClick={() => setFulfilmentConfirmed(true)}>Continue</button>
            </>
          )}
        </div>

        <div className={styles.divider} />

        {/* ── Payment Setup ── */}
        <div className={styles.section} style={{ paddingTop: 20 }}>
          <h2 className={styles.sectionTitle}>Payment setup</h2>

          <div className={styles.sectionLabel}>PAYMENT METHOD</div>
          <div className={`${styles.radioRow} ${paymentMethod === 'pay-at-delivery' ? styles.radioRowSelected : ''}`} onClick={() => setPaymentMethod('pay-at-delivery')}>
            <div className={`${styles.radio} ${paymentMethod === 'pay-at-delivery' ? styles.radioSelected : ''}`}>
              {paymentMethod === 'pay-at-delivery' && <div className={styles.radioInner} />}
            </div>
            <span className={styles.radioLabel}>Pay at delivery</span>
          </div>
          <div className={`${styles.radioRow} ${paymentMethod === 'options' ? styles.radioRowSelected : ''}`} onClick={() => setPaymentMethod('options')}>
            <div className={`${styles.radio} ${paymentMethod === 'options' ? styles.radioSelected : ''}`}>
              {paymentMethod === 'options' && <div className={styles.radioInner} />}
            </div>
            <span className={styles.radioLabel}>Options</span>
          </div>

          <div style={{ marginTop: 16 }}>
            <div className={styles.sectionLabel}>BILLING ADDRESS</div>
            <div className={styles.checkboxRow} onClick={() => setSameAsBilling(!sameAsBilling)}>
              <div className={`${styles.checkbox} ${!sameAsBilling ? styles.checkboxUnchecked : ''}`}>
                {sameAsBilling && <CheckmarkIcon />}
              </div>
              <span className={styles.checkboxLabel}>Same as delivery address</span>
            </div>
          </div>
        </div>

        <div className={styles.divider} />

        {/* ── Order Summary ── */}
        <div className={styles.section} style={{ paddingTop: 20 }}>
          <div className={styles.summaryHeader}>
            <h2 className={styles.summaryTitle}>Order summary</h2>
            <button className={styles.summaryDetails} onClick={() => setShowOrderDetails(!showOrderDetails)}>
              Details <span style={{ fontSize: 10 }}>{showOrderDetails ? '\u25B2' : '\u25BC'}</span>
            </button>
          </div>

          {showOrderDetails && (
            <>
              {/* Supplier breakdown */}
              <div className={styles.supplierGroup}>
                <div className={styles.supplierGroupHeader}>Sold by Cencosud Argentina (4)</div>
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className={styles.summaryItemRow}>
                    <div className={styles.summaryItemName}>Item name Item name Item<br /><span className={styles.summaryItemQty}>Quantity: 1</span></div>
                    <span className={styles.summaryItemPrice}>$10.00</span>
                  </div>
                ))}
              </div>
              <div className={styles.supplierGroup}>
                <div className={styles.supplierGroupHeader}>Sold by Grupo Baires (3)</div>
                {[1, 2, 3].map(i => (
                  <div key={i} className={styles.summaryItemRow}>
                    <div className={styles.summaryItemName}>Item name Item name Item<br /><span className={styles.summaryItemQty}>Quantity: 1</span></div>
                    <span className={styles.summaryItemPrice}>$10.00</span>
                  </div>
                ))}
              </div>

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

        {/* Footer */}
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
    </div>
  );
}

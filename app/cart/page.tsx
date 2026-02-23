'use client';

import { useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import styles from './cart.module.css';
import { Supplier, CouponState, ToastMessage } from './types';
import { initialSuppliers, suggestedItems } from './data';

/* ═══════════════════════════════════════════════════════════
   Inline SVG Icons (matching Figma)
   ═══════════════════════════════════════════════════════════ */

function HomeIcon({ active }: { active?: boolean }) {
  const c = active ? '#051c40' : '#506079';
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path d="M3 8.5L11 2L19 8.5V18.5C19 19.05 18.55 19.5 18 19.5H4C3.45 19.5 3 19.05 3 18.5V8.5Z" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 19.5V11H14V19.5" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SearchIcon({ active }: { active?: boolean }) {
  const c = active ? '#051c40' : '#506079';
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <circle cx="10" cy="10" r="7" stroke={c} strokeWidth="1.5" />
      <path d="M15 15L19 19" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function WalletIcon({ active }: { active?: boolean }) {
  const c = active ? '#051c40' : '#506079';
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <rect x="2" y="4" width="18" height="14" rx="2" stroke={c} strokeWidth="1.5" />
      <path d="M2 9H20" stroke={c} strokeWidth="1.5" />
      <circle cx="16" cy="14" r="1.5" fill={c} />
    </svg>
  );
}

function CartIcon({ active }: { active?: boolean }) {
  const c = active ? '#051c40' : '#506079';
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path d="M7 7H19L17.5 14H8.5L7 7Z" stroke={c} strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M7 7L6.5 5H3" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="9.5" cy="18" r="1.5" fill={c} />
      <circle cx="16" cy="18" r="1.5" fill={c} />
    </svg>
  );
}

function ShoppingCartBigIcon() {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
      <path d="M20 20H60L55.5 50H25L20 20Z" stroke="#b0b8c4" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M20 20L18 14H10" stroke="#b0b8c4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="30" cy="60" r="4" stroke="#b0b8c4" strokeWidth="2" />
      <circle cx="50" cy="60" r="4" stroke="#b0b8c4" strokeWidth="2" />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="7" fill="#0d7c3d" />
      <path d="M5 8L7 10L11 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BackArrowIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M15 18L9 12L15 6" stroke="#1f1f1f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M2 10C2 10 5 4 10 4C15 4 18 10 18 10C18 10 15 16 10 16C5 16 2 10 2 10Z" stroke="#626262" strokeWidth="1.5" />
      <circle cx="10" cy="10" r="3" stroke="#626262" strokeWidth="1.5" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════
   Reusable Sub-Components
   ═══════════════════════════════════════════════════════════ */

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

function BottomNav({ totalItems }: { totalItems: number }) {
  return (
    <div className={styles.bottomNav}>
      <button className={styles.navItem}><HomeIcon /><span className={styles.navLabel}>Home</span></button>
      <button className={styles.navItem}><SearchIcon /><span className={styles.navLabel}>Explore</span></button>
      <button className={styles.navItem}><WalletIcon /><span className={styles.navLabel}>Wallet</span></button>
      <button className={`${styles.navItem} ${styles.navItemActive}`}>
        <CartIcon active />
        <span className={styles.navLabel}>Cart</span>
        {totalItems > 0 && <span className={styles.navBadge}>{totalItems}</span>}
        <div className={styles.navActiveIndicator} />
      </button>
    </div>
  );
}

function ProgressIndicator({ current, minimum }: { current: number; minimum: number }) {
  const met = current >= minimum;
  const remaining = minimum - current;
  const progress = Math.min(100, (current / minimum) * 100);
  return (
    <div className={styles.progressSection}>
      {met ? (
        <div className={styles.progressMet}>You&apos;ve met the minimum order value <CheckCircleIcon /></div>
      ) : (
        <div className={styles.progressUnmet}>Add ${remaining.toFixed(2)} or more to check out</div>
      )}
      <div className={styles.progressBar}>
        <div className={`${styles.progressBarFill} ${met ? styles.progressBarFillMet : styles.progressBarFillUnmet}`} style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}

function SuggestedItems() {
  return (
    <div className={styles.suggestedSection}>
      <h3 className={styles.suggestedTitle}>Suggested Items</h3>
      <div className={styles.suggestedGrid}>
        {suggestedItems.map(item => (
          <div key={item.id} className={styles.suggestedCard}>
            {/* Image with add button overlay */}
            <div className={styles.suggestedCardImageWrap}>
              <img src={item.image} alt={item.name} className={styles.suggestedCardImage} />
              <div className={styles.suggestedAddBtnWrap}>
                <button className={styles.suggestedAddBtn}>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M9 3v12M3 9h12" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            </div>
            {/* Text content */}
            <div className={styles.suggestedTextContent}>
              <div className={styles.suggestedSupplier}>{item.supplier}</div>
              <div className={styles.suggestedName}>{item.name}, {item.description}</div>
              <div className={styles.suggestedPriceRow}>
                <div className={styles.suggestedPrice}>${item.price.toFixed(2)}</div>
                <div className={styles.suggestedUnit}>{item.unitPrice}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   Main Cart Page — All States
   ═══════════════════════════════════════════════════════════

   Figma states covered:
   1. Cart_Empty — no items
   2. Cart_Disabled checkout — items but no supplier meets minimum
   3. Cart_Enable checkout — at least one supplier meets minimum
   4. Cart_Expand coupon code — coupon input visible
   5. Cart_Code_typing — user typing in coupon
   6. Cart_Code_Invalid — invalid coupon entered
   7. Cart_Code_Applied — valid coupon, discount shown
   8. Cart_Code Applied_Collapsed — coupon collapsed, discount in totals
   9. Cart_Expand page — scrolled down, all suppliers + suggested visible
   10. Cart_Single supplier items added — expanded supplier with item rows
   11. Cart_Supplier review — drill-in to supplier with Remove/Move to Wishlist
   12. Cart_Review_Moved item to Wishlist — toast
   13. Cart_Review_Removed item — toast
*/

type View = 'main' | 'supplier-expanded' | 'supplier-review';

export default function CartPage() {
  const router = useRouter();
  const [suppliers, setSuppliers] = useState<Supplier[]>(initialSuppliers);
  const [coupon, setCoupon] = useState<CouponState>({ isExpanded: false, code: '', status: 'idle' });
  const [view, setView] = useState<View>('main');
  const [activeSupplier, setActiveSupplier] = useState<string | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const toastTimeouts = useRef<Map<string, NodeJS.Timeout>>(new Map());

  // ── Computed ──
  const totalItems = suppliers.reduce((s, sup) => s + sup.items.reduce((a, i) => a + i.quantity, 0), 0);
  const subtotal = suppliers.reduce((s, sup) => s + sup.items.reduce((a, i) => a + i.price * i.quantity, 0), 0);
  const couponDiscount = coupon.status === 'applied' ? subtotal * 0.05 : 0;
  const estimatedTotal = subtotal - couponDiscount;
  const freeShippingThreshold = 800;
  const hasFreeShipping = estimatedTotal >= freeShippingThreshold;
  const isEmpty = suppliers.length === 0 || suppliers.every(s => s.items.length === 0);
  const canCheckout = totalItems > 0 && suppliers.some(s => {
    const t = s.items.reduce((a, i) => a + i.price * i.quantity, 0);
    return t >= s.minimumOrderValue;
  });

  const currentSupplier = suppliers.find(s => s.id === activeSupplier);

  // ── Toast ──
  const showToast = useCallback((text: string, type: 'success' | 'error' | 'info', action?: { label: string; onClick: () => void }) => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, text, type, action }]);
    const timeout = setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
      toastTimeouts.current.delete(id);
    }, 3000);
    toastTimeouts.current.set(id, timeout);
  }, []);

  // ── Actions ──
  const updateQuantity = useCallback((supplierId: string, itemId: string, delta: number) => {
    setSuppliers(prev => prev.map(s => {
      if (s.id !== supplierId) return s;
      return {
        ...s,
        items: s.items.map(item => {
          if (item.id !== itemId) return item;
          return { ...item, quantity: Math.max(0, item.quantity + delta) };
        }).filter(item => item.quantity > 0),
      };
    }).filter(s => s.items.length > 0));
  }, []);

  const removeItem = useCallback((supplierId: string, itemId: string) => {
    setSuppliers(prev => {
      const updated = prev.map(s => {
        if (s.id !== supplierId) return s;
        return { ...s, items: s.items.filter(i => i.id !== itemId) };
      }).filter(s => s.items.length > 0);
      if (!updated.find(s => s.id === supplierId)) {
        setView('main');
        setActiveSupplier(null);
      }
      return updated;
    });
    showToast('Item successfully removed from your cart', 'info');
  }, [showToast]);

  const moveToWishlist = useCallback((supplierId: string, itemId: string) => {
    setSuppliers(prev => {
      const updated = prev.map(s => {
        if (s.id !== supplierId) return s;
        return { ...s, items: s.items.filter(i => i.id !== itemId) };
      }).filter(s => s.items.length > 0);
      if (!updated.find(s => s.id === supplierId)) {
        setView('main');
        setActiveSupplier(null);
      }
      return updated;
    });
    showToast('Item successfully added to your wishlist', 'success', { label: 'View', onClick: () => {} });
  }, [showToast]);

  const saveForLater = useCallback((supplierId: string, itemId: string) => {
    setSuppliers(prev => {
      const updated = prev.map(s => {
        if (s.id !== supplierId) return s;
        return { ...s, items: s.items.filter(i => i.id !== itemId) };
      }).filter(s => s.items.length > 0);
      if (!updated.find(s => s.id === supplierId)) {
        setView('main');
        setActiveSupplier(null);
      }
      return updated;
    });
    showToast('Item saved for later', 'success');
  }, [showToast]);

  const applyCoupon = useCallback(() => {
    if (!coupon.code.trim()) return;
    if (coupon.code.toLowerCase() === 'red25') {
      setCoupon(prev => ({ ...prev, status: 'applied', discount: subtotal * 0.05, discountPercent: 5 }));
    } else {
      setCoupon(prev => ({ ...prev, status: 'invalid' }));
    }
  }, [coupon.code, subtotal]);

  const removeCoupon = useCallback(() => {
    setCoupon({ isExpanded: false, code: '', status: 'idle' });
  }, []);

  const resetCart = useCallback(() => {
    setSuppliers(initialSuppliers);
    setCoupon({ isExpanded: false, code: '', status: 'idle' });
    setView('main');
    setActiveSupplier(null);
  }, []);

  // ── Navigation ──
  const openSupplierExpanded = useCallback((id: string) => {
    setActiveSupplier(id);
    setView('supplier-expanded');
  }, []);

  const openSupplierReview = useCallback((id: string) => {
    setActiveSupplier(id);
    setView('supplier-review');
  }, []);

  const goBack = useCallback(() => {
    if (view === 'supplier-review') {
      setView('supplier-expanded');
    } else {
      setView('main');
      setActiveSupplier(null);
    }
  }, [view]);

  // ── Coupon UI ──
  function CouponUI() {
    if (coupon.status === 'applied' && !coupon.isExpanded) {
      return (
        <div className={styles.couponSection}>
          <button className={styles.couponToggle} onClick={() => setCoupon(prev => ({ ...prev, isExpanded: true }))}>
            Apply coupon code <span className={styles.couponArrow}>{'\u25BC'}</span>
          </button>
        </div>
      );
    }

    return (
      <div className={styles.couponSection}>
        <button className={styles.couponToggle} onClick={() => setCoupon(prev => ({ ...prev, isExpanded: !prev.isExpanded }))}>
          Apply coupon code{' '}
          <span className={`${styles.couponArrow} ${coupon.isExpanded ? styles.couponArrowUp : ''}`}>
            {'\u25BC'}
          </span>
        </button>

        {coupon.isExpanded && coupon.status !== 'applied' && (
          <>
            <div className={`${styles.couponInputWrapper} ${coupon.status === 'invalid' ? styles.couponInputWrapperError : coupon.code ? styles.couponInputWrapperFocused : ''}`}>
              <input
                className={styles.couponInput}
                type="text"
                placeholder="Enter code"
                value={coupon.code}
                onChange={(e) => setCoupon(prev => ({
                  ...prev,
                  code: e.target.value,
                  status: prev.status === 'invalid' ? 'typing' : (e.target.value ? 'typing' : 'idle'),
                }))}
                onKeyDown={(e) => e.key === 'Enter' && applyCoupon()}
                autoFocus
              />
              <button className={styles.couponApplyBtn} onClick={applyCoupon}><EyeIcon /></button>
            </div>
            {coupon.status === 'invalid' && (
              <div className={styles.couponError}>
                <span className={styles.couponErrorIcon}>{'\u26A0'}</span>
                Coupon code is no longer valid
              </div>
            )}
          </>
        )}

        {coupon.isExpanded && coupon.status === 'applied' && (
          <div className={styles.couponAppliedTag}>
            {coupon.code} (-{coupon.discountPercent}%)
            <span className={styles.couponRemove} onClick={removeCoupon}>&times;</span>
          </div>
        )}
      </div>
    );
  }

  // ── Checkout Footer ──
  function CheckoutFooter({ shippingContext }: { shippingContext?: { supplierTotal: number; minimum: number } }) {
    const showCouponBreakdown = coupon.status === 'applied';
    return (
      <div className={styles.bottomCheckout}>
        {showCouponBreakdown && (
          <div className={styles.checkoutContent}>
            <div className={styles.checkoutPriceRow}>
              <span className={styles.checkoutLabel}>Subtotal</span>
              <span className={styles.checkoutValue}>${subtotal.toFixed(2)}</span>
            </div>
            <div className={styles.checkoutPriceRow}>
              <span className={styles.checkoutLabel}>Coupon applied -{coupon.discountPercent}%</span>
              <span className={`${styles.checkoutValue} ${styles.checkoutDiscount}`}>-${couponDiscount.toFixed(2)}</span>
            </div>
          </div>
        )}
        <div className={styles.checkoutContent}>
          <div className={styles.checkoutBtnRow}>
            <div>
              <div className={styles.totalLabel}>Est. total</div>
              <div className={styles.totalValue}>${estimatedTotal.toFixed(2)}</div>
            </div>
            <button className={`${styles.checkoutBtn} ${canCheckout ? styles.checkoutBtnEnabled : styles.checkoutBtnDisabled}`} disabled={!canCheckout} onClick={() => router.push('/checkout')}>
              Checkout
            </button>
          </div>
        </div>
        {shippingContext ? (
          shippingContext.supplierTotal >= shippingContext.minimum ? (
            <div className={styles.freeShippingBanner}>You&apos;ve unlocked FREE SHIPPING on this order!</div>
          ) : (
            <div className={styles.shippingNote}>Add <span className={styles.shippingNoteHighlight}>${(shippingContext.minimum - shippingContext.supplierTotal).toFixed(2)}</span> or more to check out</div>
          )
        ) : hasFreeShipping ? (
          <div className={styles.freeShippingBanner}>You&apos;ve unlocked FREE SHIPPING on this order!</div>
        ) : (
          <div className={styles.shippingNote}>Reach <span className={styles.shippingNoteHighlight}>${freeShippingThreshold.toFixed(0)}</span> to get free shipping on this order</div>
        )}
        <BottomNav totalItems={totalItems} />
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════════════════════
  return (
    <div className={styles.shell}>
      {/* Toasts */}
      {toasts.map(toast => (
        <div key={toast.id} className={`${styles.toast} ${toast.type === 'success' ? styles.toastSuccess : toast.type === 'error' ? styles.toastError : styles.toastInfo}`}>
          <span>{toast.text}</span>
          {toast.action && <span className={styles.toastAction} onClick={toast.action.onClick}>{toast.action.label}</span>}
        </div>
      ))}

      <StatusBar />

      {/* ════════════════════════════════════════════════════
         VIEW: EMPTY CART
         ════════════════════════════════════════════════════ */}
      {view === 'main' && isEmpty && (
        <>
          <div className={styles.header}><h1 className={styles.headerTitle}>Cart</h1></div>
          <div className={styles.emptyState}>
            <ShoppingCartBigIcon />
            <h2 className={styles.emptyTitle}>Your cart is empty.</h2>
            <p className={styles.emptySubtitle}>Add items to get started</p>
            <button className={styles.emptyButton} onClick={resetCart}>Search items</button>
          </div>
          <div className={styles.bottomCheckout} style={{ borderTop: 'none' }}>
            <BottomNav totalItems={0} />
          </div>
        </>
      )}

      {/* ════════════════════════════════════════════════════
         VIEW: MAIN CART (collapsed supplier cards)
         States: Disabled checkout, Enable checkout, Coupon states, Expand page
         ════════════════════════════════════════════════════ */}
      {view === 'main' && !isEmpty && (
        <>
          <div className={styles.header}><h1 className={styles.headerTitle}>Cart</h1></div>
          <div className={styles.alertBanner}>
            You&apos;re almost there! Meet each supplier&apos;s minimum order value to check out. Items below it will move to your wish list
          </div>
          <div className={styles.scrollArea}>
            {suppliers.map(supplier => {
              const supplierTotal = supplier.items.reduce((s, i) => s + i.price * i.quantity, 0);
              const itemCount = supplier.items.reduce((a, i) => a + i.quantity, 0);

              return (
                <div key={supplier.id} className={styles.supplierCard} onClick={() => openSupplierExpanded(supplier.id)}>
                  <div className={styles.supplierHeader}>
                    <span className={styles.supplierName}>{supplier.name} <span className={styles.supplierItemCount}>({itemCount})</span></span>
                  </div>
                  <div className={styles.supplierThumbnails}>
                    {supplier.items.slice(0, 4).map(item => (
                      <img key={item.id} src={item.image} alt={item.name} className={styles.thumbnail} />
                    ))}
                    {itemCount > 4 && <div className={styles.thumbnailMore}>{itemCount - 4}+</div>}
                  </div>
                  <ProgressIndicator current={supplierTotal} minimum={supplier.minimumOrderValue} />
                  <button className={styles.addMoreBtn} onClick={(e) => e.stopPropagation()}>Add more items</button>
                </div>
              );
            })}
            <SuggestedItems />
            <CouponUI />
          </div>
          <CheckoutFooter />
        </>
      )}

      {/* ════════════════════════════════════════════════════
         VIEW: SINGLE SUPPLIER EXPANDED (item rows with Save for later)
         Figma: Cart_Single supplier items added
         ════════════════════════════════════════════════════ */}
      {view === 'supplier-expanded' && currentSupplier && (
        <>
          <div className={styles.header}>
            <button className={styles.headerBack} onClick={goBack}>
              <BackArrowIcon />
              <span>{currentSupplier.name} ({currentSupplier.items.reduce((a, i) => a + i.quantity, 0)})</span>
            </button>
          </div>

          <div className={styles.scrollArea}>
            {/* Progress */}
            <div style={{ padding: '8px 16px 0' }}>
              <ProgressIndicator
                current={currentSupplier.items.reduce((a, i) => a + i.price * i.quantity, 0)}
                minimum={currentSupplier.minimumOrderValue}
              />
            </div>

            {/* Item rows */}
            <div style={{ padding: '0 16px' }}>
              {currentSupplier.items.map(item => (
                <div key={item.id} className={styles.cartItemRow}>
                  <img src={item.image} alt={item.name} className={styles.cartItemImage} />
                  <div className={styles.cartItemInfo}>
                    <div className={styles.cartItemName}>{item.name}</div>
                    {item.description && <div className={styles.cartItemDesc}>{item.description}</div>}
                    <div className={styles.itemActions}>
                      <span className={`${styles.itemActionLink} ${styles.removeLink}`} onClick={() => removeItem(currentSupplier.id, item.id)}>Remove</span>
                      <span className={`${styles.itemActionLink} ${styles.saveLink}`} onClick={() => saveForLater(currentSupplier.id, item.id)}>Save for later</span>
                    </div>
                  </div>
                  <div className={styles.cartItemRight}>
                    <div className={styles.cartItemPrices}>
                      <span className={styles.cartItemPrice}>${(item.price * item.quantity).toFixed(2)}</span>
                      {item.originalPrice && <span className={styles.cartItemOriginalPrice}>${item.originalPrice.toFixed(2)}</span>}
                      <span className={styles.cartItemUnitPrice}>{item.unitPrice}</span>
                    </div>
                    <div className={styles.quantityControl}>
                      <button className={styles.quantityBtn} onClick={() => updateQuantity(currentSupplier.id, item.id, -1)}>&minus;</button>
                      <span className={styles.quantityValue}>{item.quantity}</span>
                      <button className={styles.quantityBtn} onClick={() => updateQuantity(currentSupplier.id, item.id, 1)}>+</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <SuggestedItems />
            <CouponUI />
          </div>

          <CheckoutFooter />
        </>
      )}

      {/* ════════════════════════════════════════════════════
         VIEW: SUPPLIER REVIEW (item rows with Remove + Move to Wishlist)
         Figma: Cart_Supplier review, Cart_Review_Moved, Cart_Review_Removed
         ════════════════════════════════════════════════════ */}
      {view === 'supplier-review' && currentSupplier && (
        <>
          <div className={styles.header}>
            <button className={styles.headerBack} onClick={goBack}>
              <BackArrowIcon />
              <span>{currentSupplier.name} ({currentSupplier.items.reduce((a, i) => a + i.quantity, 0)})</span>
            </button>
          </div>

          <div className={styles.reviewHeader}>
            <div className={styles.reviewMinOrder}>Minimum order value: ${currentSupplier.minimumOrderValue.toFixed(0)}</div>
            <ProgressIndicator
              current={currentSupplier.items.reduce((a, i) => a + i.price * i.quantity, 0)}
              minimum={currentSupplier.minimumOrderValue}
            />
          </div>

          <div className={styles.scrollArea}>
            <div style={{ padding: '0 16px' }}>
              {currentSupplier.items.map(item => (
                <div key={item.id} className={styles.cartItemRow}>
                  <img src={item.image} alt={item.name} className={styles.cartItemImage} />
                  <div className={styles.cartItemInfo}>
                    <div className={styles.cartItemName}>{item.name}</div>
                    {item.description && <div className={styles.cartItemDesc}>{item.description}</div>}
                    <div className={styles.itemActions}>
                      <span className={`${styles.itemActionLink} ${styles.removeLink}`} onClick={() => removeItem(currentSupplier.id, item.id)}>Remove</span>
                      <span className={`${styles.itemActionLink} ${styles.wishlistLink}`} onClick={() => moveToWishlist(currentSupplier.id, item.id)}>Move to Wishlist</span>
                    </div>
                  </div>
                  <div className={styles.cartItemRight}>
                    <div className={styles.cartItemPrices}>
                      <span className={styles.cartItemPrice}>${(item.price * item.quantity).toFixed(2)}</span>
                      {item.originalPrice && <span className={styles.cartItemOriginalPrice}>${item.originalPrice.toFixed(2)}</span>}
                      <span className={styles.cartItemUnitPrice}>{item.unitPrice}</span>
                    </div>
                    <div className={styles.quantityControl}>
                      <button className={styles.quantityBtn} onClick={() => updateQuantity(currentSupplier.id, item.id, -1)}>&minus;</button>
                      <span className={styles.quantityValue}>{item.quantity}</span>
                      <button className={styles.quantityBtn} onClick={() => updateQuantity(currentSupplier.id, item.id, 1)}>+</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <SuggestedItems />
            <CouponUI />
          </div>

          <CheckoutFooter shippingContext={{
            supplierTotal: currentSupplier.items.reduce((a, i) => a + i.price * i.quantity, 0),
            minimum: currentSupplier.minimumOrderValue,
          }} />
        </>
      )}
    </div>
  );
}

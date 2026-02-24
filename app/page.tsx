'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './home/home.module.css';
import { promotions, mostSold, newArrivals, HomeProduct } from './home/data';

/* ═══════════════════════════════════════════════════════════
   Inline SVG Icons
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

/* ═══════════════════════════════════════════════════════════
   Reusable Components
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

function BottomNav() {
  const router = useRouter();
  return (
    <div className={styles.bottomNav}>
      <button className={`${styles.navItem} ${styles.navItemActive}`}>
        <HomeIcon active />
        <span className={styles.navLabel}>Home</span>
        <div className={styles.navActiveIndicator} />
      </button>
      <button className={styles.navItem} onClick={() => router.push('/search')}>
        <SearchIcon />
        <span className={styles.navLabel}>Explore</span>
      </button>
      <button className={styles.navItem}>
        <WalletIcon />
        <span className={styles.navLabel}>Wallet</span>
      </button>
      <button className={styles.navItem} onClick={() => router.push('/cart')}>
        <CartIcon />
        <span className={styles.navLabel}>Cart</span>
      </button>
    </div>
  );
}

/* ── Desktop Header ── */
function DesktopHeader() {
  const router = useRouter();
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchWrapRef = useRef<HTMLDivElement>(null);

  const recentSearches = ['beer pack', 'search record', 'search record', 'search record', 'search record', 'search record', 'search record', 'search record'];
  const topSearches = ['beer pack', 'search record', 'search record', 'search record', 'search record', 'search record', 'search record', 'search record'];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchWrapRef.current && !searchWrapRef.current.contains(e.target as Node)) {
        setSearchFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchFocused(false);
    }
  };

  const handleChipClick = (term: string) => {
    setSearchQuery(term);
    router.push(`/search?q=${encodeURIComponent(term)}`);
    setSearchFocused(false);
  };

  return (
    <div className={styles.desktopHeaderWrap}>
      <div className={styles.desktopHeader}>
        <div className={styles.desktopHeaderLeft}>
          <img src="/images/red101-logo.svg" alt="Red101" className={styles.desktopLogo} />
          <div className={styles.desktopLocation}>
            <svg width="16" height="20" viewBox="0 0 14 19.47" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M0 7C0 3.13 3.13 0 7 0C10.87 0 14 3.13 14 7C14 11.17 9.58 16.92 7.77 19.11C7.37 19.59 6.64 19.59 6.24 19.11C4.42 16.92 0 11.17 0 7ZM4.5 7C4.5 8.38 5.62 9.5 7 9.5C8.38 9.5 9.5 8.38 9.5 7C9.5 5.62 8.38 4.5 7 4.5C5.62 4.5 4.5 5.62 4.5 7Z" fill="#051c40"/></svg>
            <div className={styles.desktopLocationText}>
              <span className={styles.desktopLocationLine1}>X5000, C&oacute;rdoba</span>
              <span className={styles.desktopLocationLine2}>Argentina <svg width="10" height="6" viewBox="0 0 10.5 5.833" fill="none"><path d="M0.75 0.75L5.25 5.083L9.75 0.75" stroke="#1f1f1f" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
            </div>
          </div>
        </div>
        <div className={styles.desktopSearchContainer} ref={searchWrapRef}>
          <div className={`${styles.desktopSearchWrap} ${searchFocused ? styles.desktopSearchWrapFocused : ''}`}>
            <input
              type="text"
              placeholder="Search RED101"
              className={styles.desktopSearchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button className={`${styles.desktopSearchBtn} ${searchFocused ? styles.desktopSearchBtnFocused : ''}`} onClick={handleSearch}>
              <svg width="14" height="14" viewBox="0 0 18 18" fill="none"><path d="M7.43 0C11.5 0 14.81 3.27 14.87 7.34C14.87 7.37 14.88 7.41 14.88 7.44C14.88 11.55 11.55 14.88 7.44 14.88C3.34 14.88 0 11.55 0 7.44C0 3.34 3.33 0 7.43 0ZM1.3 7.44C1.3 10.83 4.05 13.58 7.44 13.58C10.81 13.58 13.54 10.86 13.57 7.5C13.57 7.48 13.57 7.46 13.57 7.44C13.57 4.05 10.82 1.3 7.43 1.3C4.05 1.3 1.3 4.05 1.3 7.44Z" fill={searchFocused ? '#626262' : 'white'}/><path d="M11.78 11.78C12 11.55 12.34 11.53 12.59 11.69L12.69 11.78L17.81 16.89L17.89 16.99C18.06 17.25 18.03 17.59 17.81 17.81C17.59 18.03 17.25 18.06 16.99 17.89L16.89 17.81L11.78 12.69L11.69 12.59C11.53 12.34 11.55 12 11.78 11.78Z" fill={searchFocused ? '#626262' : 'white'}/></svg>
            </button>
          </div>
          {searchFocused && (
            <div className={styles.searchDropdown}>
              <div className={styles.searchDropdownSection}>
                <div className={styles.searchDropdownLabel}>Recent searches</div>
                <div className={styles.searchChipRow}>
                  {recentSearches.map((term, i) => (
                    <button key={`recent-${i}`} className={styles.searchChip} onClick={() => handleChipClick(term)}>{term}</button>
                  ))}
                </div>
              </div>
              <div className={styles.searchDropdownSection}>
                <div className={styles.searchDropdownLabel}>Top searches</div>
                <div className={styles.searchChipRow}>
                  {topSearches.map((term, i) => (
                    <button key={`top-${i}`} className={styles.searchChip} onClick={() => handleChipClick(term)}>{term}</button>
                  ))}
                </div>
              </div>
            </div>
          )}
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
          <button className={styles.desktopHeaderAction} onClick={() => router.push('/cart')}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M6 6H16L14.5 13H7.5L6 6Z" stroke="#8f8f8f" strokeWidth="1.3" strokeLinejoin="round"/><path d="M6 6L5.5 4H3" stroke="#8f8f8f" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/><circle cx="8.5" cy="16" r="1.2" fill="#8f8f8f"/><circle cx="13.5" cy="16" r="1.2" fill="#8f8f8f"/></svg>
            <span>Cart</span>
          </button>
        </div>
      </div>
      <div className={styles.desktopCategoryNav}>
        <div className={styles.desktopCategoryInner}>
          <button className={styles.desktopCategoryItem}>All Suppliers <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3.5 5.25L7 8.75L10.5 5.25" stroke="#1f1f1f" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
          <div className={styles.desktopCategorySep} />
          <button className={styles.desktopCategoryItem} onClick={() => router.push('/search')}>All Categories <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3.5 5.25L7 8.75L10.5 5.25" stroke="#1f1f1f" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
          <button className={styles.desktopCategoryItem} onClick={() => router.push('/search?category=beverages')}>Beverages</button>
          <button className={styles.desktopCategoryItem}>Grocery</button>
          <button className={styles.desktopCategoryItem}>Body Care</button>
          <button className={styles.desktopCategoryItem}>Cleaning Supplies</button>
          <button className={styles.desktopCategoryItem}>Meat and Seafood</button>
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
          <div className={styles.desktopFooterCopyright}>&copy; Redcloud.Ltd All rights reserved</div>
          <div className={styles.desktopFooterLegal}>
            <a href="#">Privacy policy</a>
            <a href="#">Terms</a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Product Card ── */
function ProductCard({ product }: { product: HomeProduct }) {
  const [qty, setQty] = useState(0);
  return (
    <div className={styles.productCard}>
      <div className={styles.productImageWrap}>
        <img src={product.image} alt={product.name} className={styles.productImage} />
        {qty === 0 ? (
          <button className={styles.addBtn} onClick={() => setQty(1)}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 3V15M3 9H15" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>
          </button>
        ) : (
          <div className={styles.quantityControl}>
            <button className={styles.quantityBtn} onClick={() => setQty(q => Math.max(0, q - 1))}>
              <svg width="14" height="2" viewBox="0 0 14 2" fill="none"><path d="M1 1H13" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>
            </button>
            <div className={styles.quantityValue}>{qty}</div>
            <button className={styles.quantityBtn} onClick={() => setQty(q => q + 1)}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1V13M1 7H13" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>
            </button>
          </div>
        )}
      </div>
      <div className={styles.productInfo}>
        <div className={styles.productSupplier}>{product.supplier}</div>
        <div className={styles.productName}>{product.name}, {product.description}</div>
        {product.options && <div className={styles.productOptions}>{product.options}</div>}
        <div className={styles.productPriceRow}>
          <span className={styles.productPriceTag}><span className={styles.productPrice}>${product.price.toFixed(2)}</span></span>
          {product.originalPrice && <span className={styles.productOriginalPrice}>${product.originalPrice.toFixed(2)}</span>}
        </div>
        <div className={styles.productUnit}>{product.unitPrice}</div>
      </div>
      {product.pricingOptions && (
        <button className={styles.productPricingLink}>Pricing options({product.pricingOptions})</button>
      )}
    </div>
  );
}

/* ── Product Section ── */
function ProductSection({ title, products, sectionId }: { title: string; products: HomeProduct[]; sectionId: string }) {
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateArrows = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateArrows();
    el.addEventListener('scroll', updateArrows, { passive: true });
    return () => el.removeEventListener('scroll', updateArrows);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollAmount = el.clientWidth * 0.75;
    el.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
  };

  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>{title}</h2>
        <button className={styles.viewMoreLink} onClick={() => router.push(`/search?section=${sectionId}`)}>View more</button>
      </div>

      {/* Mobile: horizontal scroll */}
      <div className={styles.mobileOnly}>
        <div className={styles.productScrollRow}>
          {products.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
        <button className={styles.viewMoreBtn} onClick={() => router.push(`/search?section=${sectionId}`)}>View more</button>
      </div>

      {/* Desktop: horizontal scroll with arrows */}
      <div className={styles.desktopOnly}>
        <div className={styles.productScrollContainer}>
          <div className={styles.productScrollRow} ref={scrollRef}>
            {products.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
          {canScrollLeft && (
            <button className={styles.scrollArrow + ' ' + styles.scrollArrowLeft} onClick={() => scroll('left')}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M15 18L9 12L15 6" stroke="#1f1f1f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          )}
          {canScrollRight && (
            <button className={styles.scrollArrow + ' ' + styles.scrollArrowRight} onClick={() => scroll('right')}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M9 6L15 12L9 18" stroke="#1f1f1f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   Main Homepage Component
   ═══════════════════════════════════════════════════════════ */

export default function HomePage() {
  const router = useRouter();

  return (
    <div className={styles.shell}>
      {/* ── Mobile Header ── */}
      <div className={styles.mobileOnly}>
        <StatusBar />
        <div className={styles.mobileHeader}>
          <img src="/images/red101-logo.svg" alt="Red101" className={styles.mobileLogo} />
          <div className={styles.mobileSearchWrap}>
            <input type="text" placeholder="Search Red101" className={styles.mobileSearchInput} readOnly />
            <button className={styles.mobileSearchBtn}>
              <svg width="14" height="14" viewBox="0 0 18 18" fill="none"><path d="M7.43 0C11.5 0 14.81 3.27 14.87 7.34C14.87 7.37 14.88 7.41 14.88 7.44C14.88 11.55 11.55 14.88 7.44 14.88C3.34 14.88 0 11.55 0 7.44C0 3.34 3.33 0 7.43 0ZM1.3 7.44C1.3 10.83 4.05 13.58 7.44 13.58C10.81 13.58 13.54 10.86 13.57 7.5C13.57 7.48 13.57 7.46 13.57 7.44C13.57 4.05 10.82 1.3 7.43 1.3C4.05 1.3 1.3 4.05 1.3 7.44Z" fill="white"/><path d="M11.78 11.78C12 11.55 12.34 11.53 12.59 11.69L12.69 11.78L17.81 16.89L17.89 16.99C18.06 17.25 18.03 17.59 17.81 17.81C17.59 18.03 17.25 18.06 16.99 17.89L16.89 17.81L11.78 12.69L11.69 12.59C11.53 12.34 11.55 12 11.78 11.78Z" fill="white"/></svg>
            </button>
          </div>
          <button className={styles.mobileProfileBtn}>
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="7" r="4" stroke="white" strokeWidth="1.5"/><path d="M3 18C3 14 6 12 10 12C14 12 17 14 17 18" stroke="white" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </button>
          <button className={styles.mobileMenuBtn}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M3 6H19M3 11H19M3 16H19" stroke="#1f1f1f" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </button>
        </div>
        <div className={styles.locationPill}>
          <svg width="12" height="16" viewBox="0 0 14 19.47" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M0 7C0 3.13 3.13 0 7 0C10.87 0 14 3.13 14 7C14 11.17 9.58 16.92 7.77 19.11C7.37 19.59 6.64 19.59 6.24 19.11C4.42 16.92 0 11.17 0 7ZM4.5 7C4.5 8.38 5.62 9.5 7 9.5C8.38 9.5 9.5 8.38 9.5 7C9.5 5.62 8.38 4.5 7 4.5C5.62 4.5 4.5 5.62 4.5 7Z" fill="#051c40"/></svg>
          X5000, C&oacute;rdoba ARG
          <svg width="10" height="6" viewBox="0 0 10.5 5.833" fill="none"><path d="M0.75 0.75L5.25 5.083L9.75 0.75" stroke="#1f1f1f" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
      </div>

      {/* ── Desktop Header ── */}
      <div className={styles.desktopOnly}>
        <DesktopHeader />
      </div>

      {/* ── Main Content ── */}
      <div className={styles.scrollArea}>
        {/* Promotions */}
        <ProductSection title="PROMOTIONS" products={promotions} sectionId="promotions" />

        {/* Most Sold */}
        <ProductSection title="MOST SOLD" products={mostSold} sectionId="most-sold" />

        {/* Banner */}
        <div className={styles.bannerSection}>
          <div className={styles.bannerWrap}>
            <img src="/images/banner-hellmanns.png" alt="Hellmann's — Más suave. Más cremosa." className={styles.bannerImage} />
            <button className={`${styles.bannerArrow} ${styles.bannerArrowLeft}`}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M15 18L9 12L15 6" stroke="#1f1f1f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <button className={`${styles.bannerArrow} ${styles.bannerArrowRight}`}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M9 6L15 12L9 18" stroke="#1f1f1f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <div className={styles.bannerDots}>
              <div className={styles.bannerIndicators}>
                <button className={`${styles.bannerDot} ${styles.bannerDotActive}`} />
                <button className={styles.bannerDot} />
                <button className={styles.bannerDot} />
                <button className={`${styles.bannerDot} ${styles.bannerDotSmall}`} />
                <button className={`${styles.bannerDot} ${styles.bannerDotTiny}`} />
              </div>
            </div>
          </div>
        </div>

        {/* New Arrivals / Latest Products */}
        <ProductSection title="NEW ARRIVALS" products={newArrivals} sectionId="new-arrivals" />
      </div>

      {/* ── Mobile Bottom Nav ── */}
      <div className={styles.mobileOnly}>
        <BottomNav />
      </div>

      {/* ── Desktop Footer ── */}
      <div className={styles.desktopOnly}>
        <DesktopFooter />
      </div>
    </div>
  );
}

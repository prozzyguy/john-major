import { useState } from "react";
import { Search, ShoppingCart, Menu, X, Phone, ChevronDown } from "lucide-react";
import { useNav } from "../NavContext";
import { useCart } from "../CartContext";
import { categories } from "../catalog";

export default function Header() {
  const { navigate, searchQuery, setSearchQuery } = useNav();
  const { totalItems } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);

  const navItems = [
    { label: "HOME", page: { name: "home" as const } },
    { label: "SHOP", page: { name: "shop" as const } },
    { label: "CATEGORIES", page: null },
    { label: "ABOUT", page: { name: "about" as const } },
    { label: "CONTACT", page: { name: "contact" as const } },
  ];

  const handleNav = (page: any) => {
    if (page) navigate(page);
    setMobileOpen(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ name: "shop" });
    setMobileOpen(false);
  };

  return (
    <>
      {/* Top bar */}
      <div className="jm-topbar">
        <div className="container jm-topbar-inner">
          <div className="jm-topbar-left">
            <span>Need assistance? Call <strong>09164591760</strong></span>
          </div>
          <div className="jm-topbar-right">
            <span>155 Ibrahim Taiwo Road, Oko Erin, Kwara State</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header className="jm-header">
        <div className="container jm-header-inner">
          {/* Logo */}
          <button className="jm-logo" onClick={() => navigate({ name: "home" })}>
            <img src="/photo_2026-09-24_15-38-55.jpg" alt="John Major Innovation Technology logo" className="jm-logo-img" />
            <div className="jm-logo-text">
              <span className="jm-logo-name">JOHN MAJOR</span>
              <span className="jm-logo-sub">INNOVATION TECHNOLOGY</span>
            </div>
          </button>

          {/* Search bar */}
          <form className="jm-search" onSubmit={handleSearch}>
            <Search size={18} className="jm-search-icon" />
            <input
              type="text"
              placeholder="Search products, brands, models..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="jm-search-input"
            />
            <button type="submit" className="jm-search-btn">Search</button>
          </form>

          {/* Cart */}
          <button className="jm-cart-btn" onClick={() => navigate({ name: "cart" })}>
            <ShoppingCart size={22} />
            <span className="jm-cart-label">MY CART</span>
            {totalItems > 0 && <span className="jm-cart-count">{totalItems}</span>}
          </button>

          {/* Mobile menu toggle */}
          <button className="jm-mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Nav bar */}
        <nav className={`jm-nav ${mobileOpen ? "open" : ""}`}>
          <div className="container jm-nav-inner">
            <button className={`jm-nav-item ${categories.length > 0 ? "has-dropdown" : ""}`} onClick={() => setCatOpen(!catOpen)}>
              CATEGORIES
              <ChevronDown size={14} />
            </button>
            {catOpen && (
              <div className="jm-cat-dropdown">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    className="jm-cat-dropdown-item"
                    onClick={() => {
                      navigate({ name: "shop", category: cat.id });
                      setCatOpen(false);
                      setMobileOpen(false);
                    }}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            )}
            {navItems.filter(n => n.label !== "CATEGORIES").map((item) => (
              <button
                key={item.label}
                className="jm-nav-item"
                onClick={() => handleNav(item.page)}
              >
                {item.label}
              </button>
            ))}
            <button className="jm-nav-item jm-nav-cart" onClick={() => handleNav({ name: "cart" })}>
              MY CART {totalItems > 0 && `(${totalItems})`}
            </button>
            <a href="tel:09164591760" className="jm-nav-phone">
              <Phone size={16} /> 09164591760
            </a>
          </div>
        </nav>
      </header>
    </>
  );
}

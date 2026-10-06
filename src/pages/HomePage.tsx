import { ArrowRight, Truck, ShieldCheck, Headphones, CreditCard, Phone, MapPin, Star, Zap } from "lucide-react";
import { useNav } from "../NavContext";
import { products, categories, brands, formatPrice } from "../catalog";
import ProductCard from "../components/ProductCard";

export default function HomePage() {
  const { navigate } = useNav();
  const featured = products.filter((p) => p.featured).slice(0, 8);
  const newProducts = products.filter((p) => p.new).slice(0, 4);
  const popular = products.filter((p) => p.popular).slice(0, 8);

  const catColors: Record<string, string> = {
    smartphones: "linear-gradient(135deg, #0066ff, #3b82f6)",
    laptops: "linear-gradient(135deg, #0a1628, #142849)",
    audio: "linear-gradient(135deg, #f77f00, #fba94d)",
    wearables: "linear-gradient(135deg, #e63946, #f06070)",
    tablets: "linear-gradient(135deg, #16a34a, #4ade80)",
    cameras: "linear-gradient(135deg, #7c3aed, #a78bfa)",
    gaming: "linear-gradient(135deg, #1e293b, #475569)",
    tv: "linear-gradient(135deg, #0f766e, #14b8a6)",
    accessories: "linear-gradient(135deg, #b45309, #d97706)",
  };

  const catImages: Record<string, string> = {
    smartphones: "https://images.pexels.com/photos/36680544/pexels-photo-36680544.jpeg?auto=compress&cs=tinysrgb&h=300&w=300&fit=crop",
    laptops: "https://images.pexels.com/photos/35229321/pexels-photo-35229321.jpeg?auto=compress&cs=tinysrgb&h=300&w=300&fit=crop",
    audio: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&h=300&w=300&fit=crop",
    wearables: "https://images.pexels.com/photos/12564670/pexels-photo-12564670.jpeg?auto=compress&cs=tinysrgb&h=300&w=300&fit=crop",
    tablets: "https://images.pexels.com/photos/18205642/pexels-photo-18205642.jpeg?auto=compress&cs=tinysrgb&h=300&w=300&fit=crop",
    cameras: "https://images.pexels.com/photos/28859522/pexels-photo-28859522.jpeg?auto=compress&cs=tinysrgb&h=300&w=300&fit=crop",
    gaming: "https://images.pexels.com/photos/16070479/pexels-photo-16070479.jpeg?auto=compress&cs=tinysrgb&h=300&w=300&fit=crop",
    tv: "https://images.pexels.com/photos/28195649/pexels-photo-28195649.jpeg?auto=compress&cs=tinysrgb&h=300&w=300&fit=crop",
    accessories: "https://images.pexels.com/photos/38649173/pexels-photo-38649173.jpeg?auto=compress&cs=tinysrgb&h=300&w=300&fit=crop",
  };

  return (
    <div className="homepage">
      {/* HERO */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="container hero-inner">
          <div className="hero-content">
            <div className="hero-badge">
              <Zap size={14} /> Premium Electronics Store in Kwara State
            </div>
            <h1 className="hero-title">
              Innovation That <span className="hero-accent">Empowers</span> Your World
            </h1>
            <p className="hero-text">
              Shop the latest smartphones, laptops, audio, cameras, and more from top brands. Quality products, competitive prices, and trusted service at John Major Innovation Technology.
            </p>
            <div className="hero-buttons">
              <button className="btn btn-primary btn-lg" onClick={() => navigate({ name: "shop" })}>
                Shop Now <ArrowRight size={18} />
              </button>
              <button className="btn btn-outline btn-lg" onClick={() => navigate({ name: "shop" })}>
                Explore Categories
              </button>
            </div>
            <div className="hero-stats">
              <div><strong>{products.length}+</strong><span>Products</span></div>
              <div><strong>{brands.length}</strong><span>Top Brands</span></div>
              <div><strong>{categories.length}</strong><span>Categories</span></div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-img-main">
              <img src="https://images.pexels.com/photos/36680544/pexels-photo-36680544.jpeg?auto=compress&cs=tinysrgb&h=500&w=500&fit=crop" alt="Samsung Galaxy smartphone" />
            </div>
            <div className="hero-img-tl">
              <img src="https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&h=200&w=200&fit=crop" alt="Sony wireless headphones" />
            </div>
            <div className="hero-img-br">
              <img src="https://images.pexels.com/photos/12564670/pexels-photo-12564670.jpeg?auto=compress&cs=tinysrgb&h=200&w=200&fit=crop" alt="Apple Watch" />
            </div>
            <div className="hero-circle hero-circle-1" />
            <div className="hero-circle hero-circle-2" />
          </div>
        </div>
      </section>

      {/* BENEFITS BAR */}
      <section className="benefits-bar">
        <div className="container benefits-inner">
          <div className="benefit">
            <Truck size={28} />
            <div><strong>Fast Delivery</strong><span>Across Kwara State & Nigeria</span></div>
          </div>
          <div className="benefit">
            <ShieldCheck size={28} />
            <div><strong>Genuine Products</strong><span>100% authentic guarantee</span></div>
          </div>
          <div className="benefit">
            <Headphones size={28} />
            <div><strong>Expert Support</strong><span>Call 09164591760</span></div>
          </div>
          <div className="benefit">
            <CreditCard size={28} />
            <div><strong>Bank Transfer</strong><span>Secure payment options</span></div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>Shop by Category</h2>
            <p>Explore our wide range of premium electronics across every category</p>
          </div>
          <div className="cat-grid">
            {categories.map((cat) => (
              <button
                key={cat.id}
                className="cat-card"
                style={{ background: catColors[cat.id] || "var(--navy)" }}
                onClick={() => navigate({ name: "shop", category: cat.id })}
              >
                <img src={catImages[cat.id]} alt={cat.name} className="cat-card-img" />
                <div className="cat-card-overlay" />
                <span className="cat-card-name">{cat.name}</span>
                <ArrowRight size={16} className="cat-card-arrow" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="section section-grey">
        <div className="container">
          <div className="section-title-row">
            <h2>Featured Products</h2>
            <button onClick={() => navigate({ name: "shop" })}>
              View All <ArrowRight size={16} />
            </button>
          </div>
          <div className="product-grid">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* PROMO BANNER */}
      <section className="promo-banner">
        <div className="container promo-inner">
          <div className="promo-content">
            <span className="promo-tag">Special Offer</span>
            <h2>Save Big on Premium Audio</h2>
            <p>Get up to 15% off on select Sony and JBL headphones, earbuds, and speakers. Limited time only.</p>
            <button className="btn btn-red btn-lg" onClick={() => navigate({ name: "shop", category: "audio" })}>
              Shop Audio Deals <ArrowRight size={18} />
            </button>
          </div>
          <div className="promo-visual">
            <img src="https://images.pexels.com/photos/3394653/pexels-photo-3394653.jpeg?auto=compress&cs=tinysrgb&h=400&w=400&fit=crop" alt="Premium headphones on sale" />
          </div>
        </div>
      </section>

      {/* NEW ARRIVALS */}
      <section className="section">
        <div className="container">
          <div className="section-title-row">
            <h2>New Arrivals</h2>
            <button onClick={() => navigate({ name: "shop" })}>
              View All <ArrowRight size={16} />
            </button>
          </div>
          <div className="product-grid">
            {newProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* SHOP BY BRAND */}
      <section className="section section-grey">
        <div className="container">
          <div className="section-header">
            <h2>Shop by Brand</h2>
            <p>We carry the world's leading electronics brands</p>
          </div>
          <div className="brand-grid">
            {brands.map((brand) => (
              <button
                key={brand}
                className="brand-card"
                onClick={() => navigate({ name: "shop", brand })}
              >
                {brand}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* POPULAR PRODUCTS */}
      <section className="section">
        <div className="container">
          <div className="section-title-row">
            <h2>Popular Products</h2>
            <button onClick={() => navigate({ name: "shop" })}>
              View All <ArrowRight size={16} />
            </button>
          </div>
          <div className="product-grid">
            {popular.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="cta-section">
        <div className="container cta-inner">
          <div className="cta-content">
            <Star size={32} className="cta-icon" />
            <h2>Need Help Choosing?</h2>
            <p>Our expert team is ready to help you find the perfect product for your needs. Call us or visit our store in Kwara State.</p>
            <a href="tel:09164591760" className="btn btn-orange btn-lg">
              <Phone size={18} /> Call 09164591760
            </a>
          </div>
          <div className="cta-info">
            <div className="cta-info-item">
              <MapPin size={20} />
              <div>
                <strong>Visit Our Store</strong>
                <span>155 Ibrahim Taiwo Road, Oko Erin, 240101, Kwara State, Nigeria</span>
              </div>
            </div>
            <div className="cta-info-item">
              <Phone size={20} />
              <div>
                <strong>Customer Assistance</strong>
                <span>09164591760</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

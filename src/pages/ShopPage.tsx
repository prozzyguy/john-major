import { useState, useMemo } from "react";
import { SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { products, categories, brands, formatPrice } from "../catalog";
import { useNav } from "../NavContext";
import ProductCard from "../components/ProductCard";

export default function ShopPage() {
  const { page, navigate, searchQuery, setSearchQuery } = useNav();
  const initialCategory = page.name === "shop" ? page.category : undefined;
  const initialBrand = page.name === "shop" ? page.brand : undefined;

  const [selectedCats, setSelectedCats] = useState<string[]>(initialCategory ? [initialCategory] : []);
  const [selectedBrands, setSelectedBrands] = useState<string[]>(initialBrand ? [initialBrand] : []);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 4000000]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);
  const [visibleCount, setVisibleCount] = useState(12);

  const filtered = useMemo(() => {
    let result = [...products];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter((p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.model.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }

    if (selectedCats.length > 0) {
      result = result.filter((p) => selectedCats.includes(p.category));
    }

    if (selectedBrands.length > 0) {
      result = result.filter((p) => selectedBrands.includes(p.brand));
    }

    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

    if (inStockOnly) {
      result = result.filter((p) => p.inStock);
    }

    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "new":
        result.sort((a, b) => (b.new ? 1 : 0) - (a.new ? 1 : 0));
        break;
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }, [searchQuery, selectedCats, selectedBrands, priceRange, inStockOnly, sortBy]);

  const toggleCat = (id: string) => {
    setSelectedCats((prev) => prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]);
    setVisibleCount(12);
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) => prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]);
    setVisibleCount(12);
  };

  const clearFilters = () => {
    setSelectedCats([]);
    setSelectedBrands([]);
    setPriceRange([0, 4000000]);
    setInStockOnly(false);
    setSearchQuery("");
    setVisibleCount(12);
  };

  const visibleProducts = filtered.slice(0, visibleCount);

  const FilterPanel = () => (
    <div className="filter-panel">
      <div className="filter-group">
        <h4>Categories</h4>
        {categories.map((cat) => (
          <label key={cat.id} className="filter-checkbox">
            <input
              type="checkbox"
              checked={selectedCats.includes(cat.id)}
              onChange={() => toggleCat(cat.id)}
            />
            <span>{cat.name}</span>
          </label>
        ))}
      </div>

      <div className="filter-group">
        <h4>Brands</h4>
        <div className="filter-brands">
          {brands.map((brand) => (
            <label key={brand} className="filter-checkbox">
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand)}
                onChange={() => toggleBrand(brand)}
              />
              <span>{brand}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <h4>Price Range</h4>
        <div className="filter-price">
          <input
            type="number"
            className="input"
            placeholder="Min"
            value={priceRange[0]}
            onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
          />
          <span>—</span>
          <input
            type="number"
            className="input"
            placeholder="Max"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
          />
        </div>
        <div className="filter-price-presets">
          {[
            { label: "Under ₦50k", min: 0, max: 50000 },
            { label: "₦50k - ₦200k", min: 50000, max: 200000 },
            { label: "₦200k - ₦500k", min: 200000, max: 500000 },
            { label: "₦500k - ₦1M", min: 500000, max: 1000000 },
            { label: "Over ₦1M", min: 1000000, max: 4000000 },
          ].map((preset) => (
            <button
              key={preset.label}
              className="filter-preset"
              onClick={() => setPriceRange([preset.min, preset.max])}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <h4>Availability</h4>
        <label className="filter-checkbox">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => setInStockOnly(e.target.checked)}
          />
          <span>In Stock Only</span>
        </label>
      </div>

      <button className="btn btn-outline-dark btn-block btn-sm" onClick={clearFilters}>
        Clear All Filters
      </button>
    </div>
  );

  return (
    <div className="shop-page">
      <div className="page-banner">
        <div className="container">
          <h1>Shop All Products</h1>
          <p>Browse our complete catalog of premium electronics</p>
        </div>
      </div>

      <div className="container shop-layout">
        {/* Mobile filter toggle */}
        <button className="filter-toggle" onClick={() => setShowFilters(!showFilters)}>
          <SlidersHorizontal size={18} /> Filters
          {(selectedCats.length > 0 || selectedBrands.length > 0 || inStockOnly) && (
            <span className="filter-active-count">
              {selectedCats.length + selectedBrands.length + (inStockOnly ? 1 : 0)}
            </span>
          )}
        </button>

        {/* Sidebar */}
        <aside className={`shop-sidebar ${showFilters ? "open" : ""}`}>
          <div className="sidebar-header">
            <h3>Filters</h3>
            <button className="sidebar-close" onClick={() => setShowFilters(false)}><X size={20} /></button>
          </div>
          <FilterPanel />
        </aside>

        {/* Main content */}
        <div className="shop-main">
          <div className="shop-toolbar">
            <div className="shop-count">
              Showing <strong>{visibleProducts.length}</strong> of <strong>{filtered.length}</strong> products
            </div>
            <div className="shop-sort">
              <span>Sort by:</span>
              <select className="select sort-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
                <option value="new">Newest First</option>
              </select>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="shop-empty">
              <p>No products match your filters.</p>
              <button className="btn btn-primary" onClick={clearFilters}>Clear Filters</button>
            </div>
          ) : (
            <>
              <div className="product-grid">
                {visibleProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
              {visibleCount < filtered.length && (
                <div className="load-more">
                  <button className="btn btn-outline-dark btn-lg" onClick={() => setVisibleCount((c) => c + 12)}>
                    Load More Products ({filtered.length - visibleCount} remaining)
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {showFilters && <div className="sidebar-overlay" onClick={() => setShowFilters(false)} />}
    </div>
  );
}

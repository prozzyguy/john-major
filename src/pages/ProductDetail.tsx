import { useState } from "react";
import { ShoppingCart, Minus, Plus, Check, ArrowLeft, Truck, ShieldCheck, RotateCcw } from "lucide-react";
import { getProductById, getRelatedProducts, formatPrice } from "../catalog";
import { useNav } from "../NavContext";
import { useCart } from "../CartContext";
import ProductCard from "../components/ProductCard";

export default function ProductDetail() {
  const { page, navigate } = useNav();
  const { addToCart } = useCart();
  const productId = page.name === "product" ? page.id : "";
  const product = getProductById(productId);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="container" style={{ padding: "80px 24px", textAlign: "center" }}>
        <h2>Product not found</h2>
        <button className="btn btn-primary" style={{ marginTop: 16 }} onClick={() => navigate({ name: "shop" })}>
          Back to Shop
        </button>
      </div>
    );
  }

  const related = getRelatedProducts(product, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="product-detail-page">
      <div className="container">
        <button className="back-link" onClick={() => navigate({ name: "shop" })}>
          <ArrowLeft size={16} /> Back to Shop
        </button>

        <div className="product-detail-grid">
          {/* Images */}
          <div className="product-detail-images">
            <div className="product-detail-main-img">
              <img src={product.images[activeImage]} alt={`${product.brand} ${product.name}`} />
              <div className="product-detail-badges">
                {product.new && <span className="badge badge-new">NEW</span>}
                {product.oldPrice && <span className="badge badge-sale">SALE</span>}
              </div>
            </div>
            {product.images.length > 1 && (
              <div className="product-detail-thumbs">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    className={`thumb ${activeImage === i ? "active" : ""}`}
                    onClick={() => setActiveImage(i)}
                  >
                    <img src={img} alt={`${product.name} view ${i + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="product-detail-info">
            <span className="product-detail-brand">{product.brand}</span>
            <h1 className="product-detail-name">{product.name}</h1>
            <p className="product-detail-model">Model: {product.model}</p>
            {(product.ram || product.storage || product.color) && (
              <div className="product-detail-variants">
                {product.ram && <span className="variant-tag">RAM: {product.ram}</span>}
                {product.storage && <span className="variant-tag">Storage: {product.storage}</span>}
                {product.color && <span className="variant-tag">Color: {product.color}</span>}
              </div>
            )}

            <div className="product-detail-price">
              <span className="price-current-lg">{formatPrice(product.price)}</span>
              {product.oldPrice && <span className="price-old-lg">{formatPrice(product.oldPrice)}</span>}
            </div>

            <div className="product-detail-stock">
              {product.inStock ? (
                <span className="stock-badge"><Check size={16} /> In Stock</span>
              ) : (
                <span className="stock-badge out">Out of Stock</span>
              )}
            </div>

            <p className="product-detail-desc">{product.description}</p>

            {product.inStock && (
              <>
                <div className="product-detail-actions">
                  <div className="qty-selector">
                    <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}><Minus size={16} /></button>
                    <span>{quantity}</span>
                    <button onClick={() => setQuantity((q) => q + 1)}><Plus size={16} /></button>
                  </div>
                  <button className={`btn ${added ? "btn-green" : "btn-primary"} btn-lg`} onClick={handleAddToCart} disabled={!product.inStock}>
                    {added ? <><Check size={18} /> Added!</> : <><ShoppingCart size={18} /> Add to Cart</>}
                  </button>
                  <button className="btn btn-orange btn-lg" onClick={() => { addToCart(product, quantity); navigate({ name: "cart" }); }}>
                    Buy Now
                  </button>
                </div>

                <div className="product-trust">
                  <div><Truck size={20} /><span>Fast delivery across Nigeria</span></div>
                  <div><ShieldCheck size={20} /><span>Genuine product guarantee</span></div>
                  <div><RotateCcw size={20} /><span>Easy returns within 7 days</span></div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Specifications */}
        <div className="product-specs">
          <h2>Specifications</h2>
          <table className="specs-table">
            <tbody>
              {Object.entries(product.specifications).map(([key, value]) => (
                <tr key={key}>
                  <td className="spec-key">{key}</td>
                  <td className="spec-value">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="product-related">
            <h2>Related Products</h2>
            <div className="product-grid">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

import { ShoppingCart, Eye } from "lucide-react";
import type { Product } from "../types";
import { useNav } from "../NavContext";
import { useCart } from "../CartContext";
import { formatPrice } from "../catalog";

export default function ProductCard({ product }: { product: Product }) {
  const { navigate } = useNav();
  const { addToCart } = useCart();

  return (
    <div className="product-card">
      <div className="product-card-image" onClick={() => navigate({ name: "product", id: product.id })}>
        <img src={product.image} alt={`${product.brand} ${product.name}`} loading="lazy" />
        <div className="product-card-badges">
          {product.new && <span className="badge badge-new">NEW</span>}
          {product.oldPrice && <span className="badge badge-sale">SALE</span>}
        </div>
        <button className="product-card-quick" onClick={(e) => { e.stopPropagation(); navigate({ name: "product", id: product.id }); }}>
          <Eye size={16} /> View
        </button>
      </div>
      <div className="product-card-body">
        <span className="product-card-brand">{product.brand}</span>
        <h3 className="product-card-name" onClick={() => navigate({ name: "product", id: product.id })}>{product.name}</h3>
        <p className="product-card-model">Model: {product.model}</p>
        {(product.ram || product.storage) && (
          <p className="product-card-variant">
            {product.ram && `${product.ram} RAM`}
            {product.ram && product.storage && " | "}
            {product.storage && `${product.storage}`}
            {product.color && ` | ${product.color}`}
          </p>
        )}
        <div className="product-card-price">
          <span className="price-current">{formatPrice(product.price)}</span>
          {product.oldPrice && <span className="price-old">{formatPrice(product.oldPrice)}</span>}
        </div>
        <div className="product-card-stock">
          {product.inStock ? (
            <span className="badge badge-stock">In Stock</span>
          ) : (
            <span className="badge badge-out">Out of Stock</span>
          )}
        </div>
        <button
          className="btn btn-primary btn-sm btn-block product-card-add"
          onClick={() => addToCart(product)}
          disabled={!product.inStock}
        >
          <ShoppingCart size={16} /> Add to Cart
        </button>
      </div>
    </div>
  );
}

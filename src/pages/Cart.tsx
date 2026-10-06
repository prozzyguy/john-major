import { Minus, Plus, Trash2, ArrowRight, ArrowLeft, ShoppingCart } from "lucide-react";
import { useNav } from "../NavContext";
import { useCart } from "../CartContext";
import { formatPrice } from "../catalog";

export default function Cart() {
  const { navigate } = useNav();
  const { items, updateQuantity, removeFromCart, subtotal } = useCart();

  if (items.length === 0) {
    return (
      <div className="container" style={{ padding: "80px 24px", textAlign: "center" }}>
        <ShoppingCart size={64} style={{ color: "var(--text-secondary)", margin: "0 auto 24px" }} />
        <h2>Your Cart is Empty</h2>
        <p style={{ color: "var(--text-secondary)", margin: "12px 0 24px" }}>
          Browse our catalog and add products to your cart.
        </p>
        <button className="btn btn-primary btn-lg" onClick={() => navigate({ name: "shop" })}>
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <div className="page-header-row">
          <h1>MY CART</h1>
          <span className="cart-item-count">{items.length} item{items.length !== 1 ? "s" : ""}</span>
        </div>

        <div className="cart-layout">
          <div className="cart-items">
            {items.map((item) => (
              <div key={item.product.id} className="cart-item">
                <div className="cart-item-img" onClick={() => navigate({ name: "product", id: item.product.id })}>
                  <img src={item.product.image} alt={`${item.product.brand} ${item.product.name}`} />
                </div>
                <div className="cart-item-info">
                  <span className="cart-item-brand">{item.product.brand}</span>
                  <h3 className="cart-item-name" onClick={() => navigate({ name: "product", id: item.product.id })}>
                    {item.product.name}
                  </h3>
                  <p className="cart-item-model">{item.product.model}</p>
                  {(item.product.ram || item.product.storage) && (
                    <p className="cart-item-variant">
                      {item.product.ram && `${item.product.ram}`}
                      {item.product.ram && item.product.storage && " | "}
                      {item.product.storage && `${item.product.storage}`}
                      {item.product.color && ` | ${item.product.color}`}
                    </p>
                  )}
                  <span className="cart-item-price">{formatPrice(item.product.price)}</span>
                </div>
                <div className="cart-item-controls">
                  <div className="qty-selector">
                    <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)}><Minus size={14} /></button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)}><Plus size={14} /></button>
                  </div>
                  <span className="cart-item-total">{formatPrice(item.product.price * item.quantity)}</span>
                  <button className="cart-item-remove" onClick={() => removeFromCart(item.product.id)}>
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}

            <button className="back-link" onClick={() => navigate({ name: "shop" })}>
              <ArrowLeft size={16} /> Continue Shopping
            </button>
          </div>

          {/* Summary */}
          <div className="cart-summary">
            <h3>Order Summary</h3>
            <div className="summary-row">
              <span>Subtotal ({items.length} items)</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="summary-row">
              <span>Delivery</span>
              <span>Calculated at checkout</span>
            </div>
            <div className="summary-divider" />
            <div className="summary-row total">
              <span>Total</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <button className="btn btn-primary btn-lg btn-block" onClick={() => navigate({ name: "checkout" })}>
              Proceed to Checkout <ArrowRight size={18} />
            </button>
            <p className="summary-note">Payment via Direct Bank Transfer to Sterling Bank</p>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { ArrowLeft, ArrowRight, Building2, Copy, Check } from "lucide-react";
import { useNav } from "../NavContext";
import { useCart } from "../CartContext";
import { formatPrice } from "../catalog";
import { supabase } from "../supabase";

const BANK_DETAILS = {
  accountName: "John Chibusor Enterprises",
  accountNumber: "0149888021",
  bank: "Sterling Bank",
};

export default function Checkout() {
  const { navigate } = useNav();
  const { items, subtotal, clearCart } = useCart();
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    notes: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  if (items.length === 0) {
    return (
      <div className="container" style={{ padding: "80px 24px", textAlign: "center" }}>
        <h2>Your cart is empty</h2>
        <button className="btn btn-primary" style={{ marginTop: 16 }} onClick={() => navigate({ name: "shop" })}>
          Continue Shopping
        </button>
      </div>
    );
  }

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.fullName.trim()) e.fullName = "Full name is required";
    if (!form.phone.trim()) e.phone = "Phone number is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Invalid email address";
    if (!form.address.trim()) e.address = "Delivery address is required";
    if (!form.city.trim()) e.city = "City is required";
    if (!form.state.trim()) e.state = "State is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    const orderNumber = "JM-" + Date.now().toString().slice(-8) + Math.floor(Math.random() * 100).toString().padStart(2, "0");

    try {
      const { data, error } = await supabase.from("orders").insert({
        order_number: orderNumber,
        full_name: form.fullName,
        phone: form.phone,
        email: form.email,
        address: form.address,
        city: form.city,
        state: form.state,
        notes: form.notes || null,
        items: items.map((i) => ({
          id: i.product.id,
          name: i.product.name,
          brand: i.product.brand,
          model: i.product.model,
          price: i.product.price,
          quantity: i.quantity,
          image: i.product.image,
        })),
        total: subtotal,
        payment_method: "Direct Bank Transfer",
        status: "awaiting_payment",
      }).select().single();

      if (error) throw error;

      clearCart();
      navigate({ name: "confirmation", orderId: data.id });
    } catch (err) {
      setErrors({ submit: "Failed to place order. Please try again or call 09164591760." });
      setSubmitting(false);
    }
  };

  const copyAccount = () => {
    navigator.clipboard?.writeText(BANK_DETAILS.accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="checkout-page">
      <div className="container">
        <button className="back-link" onClick={() => navigate({ name: "cart" })}>
          <ArrowLeft size={16} /> Back to Cart
        </button>

        <h1 className="page-title">Checkout</h1>

        <form className="checkout-layout" onSubmit={handleSubmit}>
          {/* Form fields */}
          <div className="checkout-form">
            <h2 className="checkout-section-title">Delivery Information</h2>
            <div className="form-grid">
              <div className="form-group">
                <label className="label">Full Name *</label>
                <input className="input" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} placeholder="John Doe" />
                {errors.fullName && <span className="form-error">{errors.fullName}</span>}
              </div>
              <div className="form-group">
                <label className="label">Phone Number *</label>
                <input className="input" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="08012345678" />
                {errors.phone && <span className="form-error">{errors.phone}</span>}
              </div>
              <div className="form-group">
                <label className="label">Email Address *</label>
                <input className="input" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="john@example.com" />
                {errors.email && <span className="form-error">{errors.email}</span>}
              </div>
              <div className="form-group full">
                <label className="label">Delivery Address *</label>
                <input className="input" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="House number, street name" />
                {errors.address && <span className="form-error">{errors.address}</span>}
              </div>
              <div className="form-group">
                <label className="label">City *</label>
                <input className="input" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} placeholder="Ilorin" />
                {errors.city && <span className="form-error">{errors.city}</span>}
              </div>
              <div className="form-group">
                <label className="label">State *</label>
                <input className="input" value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} placeholder="Kwara State" />
                {errors.state && <span className="form-error">{errors.state}</span>}
              </div>
              <div className="form-group full">
                <label className="label">Additional Notes</label>
                <textarea className="textarea" rows={3} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="Landmark, delivery preference, etc." />
              </div>
            </div>

            {/* Payment method */}
            <h2 className="checkout-section-title">Payment Method</h2>
            <div className="payment-method-card selected">
              <div className="payment-method-header">
                <Building2 size={24} />
                <div>
                  <strong>Direct Bank Transfer</strong>
                  <p>Transfer to our bank account and send payment confirmation</p>
                </div>
                <Check size={20} className="payment-check" />
              </div>
              <div className="bank-details">
                <div className="bank-row">
                  <span>Account Name:</span>
                  <strong>{BANK_DETAILS.accountName}</strong>
                </div>
                <div className="bank-row">
                  <span>Account Number:</span>
                  <div className="bank-number">
                    <strong>{BANK_DETAILS.accountNumber}</strong>
                    <button type="button" className="copy-btn" onClick={copyAccount}>
                      {copied ? <Check size={14} /> : <Copy size={14} />}
                    </button>
                  </div>
                </div>
                <div className="bank-row">
                  <span>Bank:</span>
                  <strong>{BANK_DETAILS.bank}</strong>
                </div>
              </div>
              <p className="payment-note">
                Your order will be placed as <strong>Awaiting Payment</strong>. Once we verify your transfer, we will process and ship your order. Please send payment confirmation to <strong>09164591760</strong>.
              </p>
            </div>

            {errors.submit && <div className="form-error-banner">{errors.submit}</div>}
          </div>

          {/* Order summary */}
          <div className="checkout-summary">
            <h3>Order Summary</h3>
            <div className="checkout-items">
              {items.map((item) => (
                <div key={item.product.id} className="checkout-item">
                  <img src={item.product.image} alt={item.product.name} />
                  <div className="checkout-item-info">
                    <span className="checkout-item-name">{item.product.name}</span>
                    <span className="checkout-item-qty">Qty: {item.quantity}</span>
                  </div>
                  <span className="checkout-item-price">{formatPrice(item.product.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="summary-divider" />
            <div className="summary-row">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="summary-row">
              <span>Delivery</span>
              <span>Calculated after confirmation</span>
            </div>
            <div className="summary-divider" />
            <div className="summary-row total">
              <span>Total</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <button type="submit" className="btn btn-primary btn-lg btn-block" disabled={submitting}>
              {submitting ? "Placing Order..." : <>Place Order <ArrowRight size={18} /></>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

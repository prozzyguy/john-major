import { useEffect, useState } from "react";
import { CircleCheck as CheckCircle, Phone, ArrowRight, Building2, Copy } from "lucide-react";
import { useNav } from "../NavContext";
import { supabase } from "../supabase";
import { formatPrice } from "../catalog";
import type { Order } from "../types";

export default function Confirmation() {
  const { page, navigate } = useNav();
  const orderId = page.name === "confirmation" ? page.orderId : "";
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data, error } = await supabase
          .from("orders")
          .select("*")
          .eq("id", orderId)
          .maybeSingle();

        if (error) throw error;
        setOrder(data as Order);
      } catch {
        setOrder(null);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [orderId]);

  const copyAccount = () => {
    navigator.clipboard?.writeText("0149888021");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="container" style={{ padding: "80px 24px", textAlign: "center" }}>
        <p>Loading order details...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container" style={{ padding: "80px 24px", textAlign: "center" }}>
        <h2>Order not found</h2>
        <button className="btn btn-primary" style={{ marginTop: 16 }} onClick={() => navigate({ name: "shop" })}>
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="confirmation-page">
      <div className="container">
        <div className="confirmation-header">
          <CheckCircle size={64} className="confirmation-icon" />
          <h1>Order Placed Successfully!</h1>
          <p>Thank you, {order.full_name}. Your order has been received and is awaiting payment verification.</p>
        </div>

        <div className="confirmation-layout">
          <div className="confirmation-main">
            {/* Order number */}
            <div className="confirmation-card">
              <h3>Order Details</h3>
              <div className="order-detail-row">
                <span>Order Number:</span>
                <strong>{order.order_number}</strong>
              </div>
              <div className="order-detail-row">
                <span>Order Date:</span>
                <strong>{new Date(order.created_at).toLocaleDateString("en-NG", { year: "numeric", month: "long", day: "numeric" })}</strong>
              </div>
              <div className="order-detail-row">
                <span>Status:</span>
                <span className="badge badge-warning">Awaiting Payment</span>
              </div>
            </div>

            {/* Customer details */}
            <div className="confirmation-card">
              <h3>Customer Information</h3>
              <div className="order-detail-row"><span>Name:</span><strong>{order.full_name}</strong></div>
              <div className="order-detail-row"><span>Phone:</span><strong>{order.phone}</strong></div>
              <div className="order-detail-row"><span>Email:</span><strong>{order.email}</strong></div>
              <div className="order-detail-row"><span>Address:</span><strong>{order.address}, {order.city}, {order.state}</strong></div>
              {order.notes && <div className="order-detail-row"><span>Notes:</span><strong>{order.notes}</strong></div>}
            </div>

            {/* Ordered products */}
            <div className="confirmation-card">
              <h3>Ordered Products</h3>
              <div className="order-items">
                {order.items.map((item: any, i: number) => (
                  <div key={i} className="order-item">
                    <img src={item.image} alt={item.name} />
                    <div className="order-item-info">
                      <span className="order-item-name">{item.brand} {item.name}</span>
                      <span className="order-item-model">{item.model}</span>
                      <span className="order-item-qty">Qty: {item.quantity} × {formatPrice(item.price)}</span>
                    </div>
                    <span className="order-item-total">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="summary-divider" />
              <div className="summary-row total">
                <span>Total</span>
                <span>{formatPrice(order.total)}</span>
              </div>
            </div>
          </div>

          {/* Payment instructions */}
          <div className="confirmation-sidebar">
            <div className="payment-instructions">
              <h3>
                <Building2 size={20} /> Bank Transfer Instructions
              </h3>
              <p>Payment Method: <strong>Direct Bank Transfer</strong></p>
              <div className="bank-details-box">
                <div className="bank-row"><span>Account Name:</span><strong>John Chibusor Enterprises</strong></div>
                <div className="bank-row">
                  <span>Account Number:</span>
                  <div className="bank-number">
                    <strong>0149888021</strong>
                    <button className="copy-btn" onClick={copyAccount}>
                      {copied ? <CheckCircle size={14} /> : <Copy size={14} />}
                    </button>
                  </div>
                </div>
                <div className="bank-row"><span>Bank:</span><strong>Sterling Bank</strong></div>
              </div>
              <ol className="payment-steps">
                <li>Transfer <strong>{formatPrice(order.total)}</strong> to the account above.</li>
                <li>Send your payment confirmation to <strong>09164591760</strong>.</li>
                <li>Include your order number: <strong>{order.order_number}</strong>.</li>
                <li>We will verify and process your order shortly.</li>
              </ol>
              <div className="payment-assistance">
                <Phone size={16} />
                <span>Need help? Call <strong>09164591760</strong></span>
              </div>
            </div>
          </div>
        </div>

        <div className="confirmation-actions">
          <button className="btn btn-primary btn-lg" onClick={() => navigate({ name: "shop" })}>
            Continue Shopping <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

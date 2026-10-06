import { Phone, MapPin, Clock, Mail } from "lucide-react";

export default function Contact() {
  return (
    <div className="contact-page">
      <div className="page-banner">
        <div className="container">
          <h1>Contact Us</h1>
          <p>We're here to help with any questions about our products or your order</p>
        </div>
      </div>

      <div className="container">
        <div className="contact-layout">
          <div className="contact-cards">
            <div className="contact-info-card">
              <MapPin size={28} />
              <h3>Our Location</h3>
              <p>155 Ibrahim Taiwo Road<br />Oko Erin, 240101<br />Kwara State, Nigeria</p>
            </div>
            <div className="contact-info-card">
              <Phone size={28} />
              <h3>Customer Assistance</h3>
              <p><a href="tel:09164591760" className="contact-phone">09164591760</a></p>
              <p className="contact-sub">Call us for product inquiries, order support, and technical assistance.</p>
            </div>
            <div className="contact-info-card">
              <Clock size={28} />
              <h3>Business Hours</h3>
              <p>Monday - Friday: 8:00 AM - 7:00 PM<br />Saturday: 9:00 AM - 6:00 PM<br />Sunday: Closed</p>
            </div>
          </div>

          <div className="contact-cta-box">
            <h2>Get in Touch</h2>
            <p>
              Have a question about a product? Need help with an order? Our team is ready to assist you.
              Call us directly at <strong><a href="tel:09164591760">09164591760</a></strong> or visit our store
              at 155 Ibrahim Taiwo Road, Oko Erin, Kwara State.
            </p>
            <div className="contact-cta-buttons">
              <a href="tel:09164591760" className="btn btn-primary btn-lg">
                <Phone size={18} /> Call Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

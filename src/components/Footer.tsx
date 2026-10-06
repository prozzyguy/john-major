import { Phone, MapPin, Mail, Clock } from "lucide-react";
import { useNav } from "../NavContext";
import { categories } from "../catalog";

export default function Footer() {
  const { navigate } = useNav();

  return (
    <footer className="jm-footer">
      <div className="container">
        <div className="jm-footer-grid">
          {/* Brand */}
          <div className="jm-footer-col">
            <div className="jm-footer-logo">
              <img src="/photo_2026-09-24_15-38-55.jpg" alt="JM Innovation Technology logo" />
              <div>
                <strong>JOHN MAJOR</strong>
                <span>INNOVATION TECHNOLOGY</span>
              </div>
            </div>
            <p className="jm-footer-desc">
              Your trusted electronics store in Kwara State, Nigeria. Quality products, competitive prices, and reliable customer service.
            </p>
          </div>

          {/* Quick links */}
          <div className="jm-footer-col">
            <h4>Shop</h4>
            <ul>
              <li><button onClick={() => navigate({ name: "shop" })}>All Products</button></li>
              <li><button onClick={() => navigate({ name: "cart" })}>My Cart</button></li>
              {categories.slice(0, 4).map((c) => (
                <li key={c.id}>
                  <button onClick={() => navigate({ name: "shop", category: c.id })}>{c.name}</button>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="jm-footer-col">
            <h4>Categories</h4>
            <ul>
              {categories.slice(4).map((c) => (
                <li key={c.id}>
                  <button onClick={() => navigate({ name: "shop", category: c.id })}>{c.name}</button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="jm-footer-col">
            <h4>Customer Support</h4>
            <ul className="jm-footer-contact">
              <li>
                <MapPin size={16} />
                <span>155 Ibrahim Taiwo Road, Oko Erin, 240101, Kwara State, Nigeria</span>
              </li>
              <li>
                <Phone size={16} />
                <a href="tel:09164591760">09164591760</a>
              </li>
              <li>
                <Clock size={16} />
                <span>Mon - Sat: 8:00 AM - 7:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="jm-footer-bottom">
          <p>&copy; {new Date().getFullYear()} John Major Innovation Technology. All rights reserved.</p>
          <p>John Chibusor Enterprises &middot; Sterling Bank &middot; 0149888021</p>
        </div>
      </div>
    </footer>
  );
}

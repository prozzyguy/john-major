import { Phone, MapPin, Clock, Mail, Target, Eye, Award } from "lucide-react";

export default function About() {
  return (
    <div className="about-page">
      <div className="page-banner">
        <div className="container">
          <h1>About Us</h1>
          <p>Quality electronics, trusted service, and innovation for everyone</p>
        </div>
      </div>

      <div className="container">
        <section className="about-section">
          <div className="about-intro">
            <h2>Who We Are</h2>
            <p>
              John Major Innovation Technology is a premier electronics retailer based in Kwara State, Nigeria.
              We are committed to bringing the latest technology and premium electronics to our community at
              competitive prices. From smartphones to laptops, audio equipment to cameras, we offer genuine
              products from the world's leading brands.
            </p>
            <p>
              Our mission is simple: to empower our customers with quality technology that enhances their
              lives and businesses. Whether you're a student, professional, creator, or tech enthusiast,
              we have the right products for you.
            </p>
          </div>
        </section>

        <section className="about-values">
          <div className="values-grid">
            <div className="value-card">
              <Target size={32} />
              <h3>Our Mission</h3>
              <p>To make premium technology accessible to everyone in our community with honest pricing and reliable service.</p>
            </div>
            <div className="value-card">
              <Eye size={32} />
              <h3>Our Vision</h3>
              <p>To be the most trusted electronics store in Kwara State, known for quality, integrity, and customer satisfaction.</p>
            </div>
            <div className="value-card">
              <Award size={32} />
              <h3>Our Promise</h3>
              <p>100% genuine products, transparent pricing, and dedicated customer support every step of the way.</p>
            </div>
          </div>
        </section>

        <section className="about-contact">
          <h2>Visit Our Store</h2>
          <div className="contact-grid">
            <div className="contact-info-card">
              <MapPin size={24} />
              <h3>Address</h3>
              <p>155 Ibrahim Taiwo Road<br />Oko Erin, 240101<br />Kwara State, Nigeria</p>
            </div>
            <div className="contact-info-card">
              <Phone size={24} />
              <h3>Phone</h3>
              <p><a href="tel:09164591760">09164591760</a></p>
            </div>
            <div className="contact-info-card">
              <Clock size={24} />
              <h3>Hours</h3>
              <p>Monday - Saturday<br />8:00 AM - 7:00 PM<br />Sunday: Closed</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

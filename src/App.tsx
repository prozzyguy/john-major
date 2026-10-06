import { CartProvider } from "./CartContext";
import { NavProvider, useNav } from "./NavContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Confirmation from "./pages/Confirmation";
import About from "./pages/About";
import Contact from "./pages/Contact";

function Pages() {
  const { page } = useNav();

  switch (page.name) {
    case "home":
      return <HomePage />;
    case "shop":
      return <ShopPage />;
    case "product":
      return <ProductDetail />;
    case "cart":
      return <Cart />;
    case "checkout":
      return <Checkout />;
    case "confirmation":
      return <Confirmation />;
    case "about":
      return <About />;
    case "contact":
      return <Contact />;
    default:
      return <HomePage />;
  }
}

function AppContent() {
  return (
    <div className="app">
      <Header />
      <main>
        <Pages />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <NavProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </NavProvider>
  );
}

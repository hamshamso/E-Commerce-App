import { useState, useEffect } from "react";
import { getProducts } from "../services/api";
import ProductCard from "../pages/ProductCard";
import "../styles/home.css";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data.data);
      } catch (e) {
        console.error(e);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <>
      <div className="landing">
        <div className="welcome">
          <h1>Welcome to Our E-Commerce Store</h1>
          <h2>Every Purchase Will Be Made With Pleasure</h2>
          <p>Buying and selling quality products with modern technology</p>
        </div>
    </div>

      <section className="shop-section" >
        <h2 className="shop-title">Our Products</h2>

        {loading && <p className="shop-status">Loading products...</p>}
        {error && <p className="shop-status shop-error">{error}</p>}

        {!loading && !error && (
          <div className="product-grid">
            {products.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        )}
      </section>

      <footer>
        <div>
          <p className="rights">© 2026 E-Commerce.    All rights reserved.</p>
        </div>
        <div className="fot">
          <a>Legal Notice</a>
          <a>Privacy</a>
          <a>Terms</a>
          <a>· Algérie</a>
        </div>
      </footer>
    </>
  );
}

export default Home;
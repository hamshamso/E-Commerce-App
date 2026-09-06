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
        <div className="search-section">
          <div className="labels">
            <label className="search-label">Search</label>
            <label className="Category-label">Category</label>
            <label className="Price-label">Price</label>
          </div>
          <div className="fields">
            <input type="text" placeholder="Search products" />
            <select name="category" id="category-select">
              <option value="All-categories">All</option>
              <option value="Bags">Bags</option>
              <option value="Watches">Watches</option>
              <option value="Clothes">Clothes</option>
              <option value="Accessories">Accessories</option>
              <option value="Parfum">Parfum</option>
              <option value="Phones">Phones</option>
              <option value="Tech">Tech</option>
              <option value="Other">Other</option>
            </select>
            <label className="filter-label">Price</label>
            <select name="price" id="price-select" className="filter-select">
              <option value="all">All Prices</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
              <option value="under-5000">5000 or under -</option>
              <option value="btw-5000-10000">Between 5000 - 10000</option>
              <option value="btw-10000-20000">Between 10000 - 20000</option>
              <option value="btw-20000-50000">Between 20000 - 50000</option>
              <option value="more-50000">50000 or more +</option>
            </select>
          </div>
        </div>

  
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
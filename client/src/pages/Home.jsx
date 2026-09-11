import { useState, useEffect } from "react";
import { getProducts } from "../services/api";
import ProductCard from "../pages/ProductCard";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/home.css";

function Home() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All-categories");
  const [selectedName,setSelectedName] = useState("")
  const [selectedPrice,setSelectedPrice] = useState("All prices")
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const {isAdmin} = useAuth();
  

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

  const filteredProducts = products.filter((product) => {

      const matchesCategory = selectedCategory === "All-categories" || product.category?.toLowerCase() === selectedCategory.toLowerCase();

      const matchesName = selectedName.trim() === "" || product.name?.toLowerCase().includes(selectedName.toLowerCase().trim());

      let matchesPrice = true;
      const price = Number(product.price);

      if (selectedPrice === "under-5000") matchesPrice = price <= 5000;
      else if (selectedPrice === "btw-5000-10000") matchesPrice = price >= 5000 && price <= 10000;
      else if (selectedPrice === "btw-10000-20000") matchesPrice = price >= 10000 && price <= 20000;
      else if (selectedPrice === "btw-20000-50000") matchesPrice = price >= 20000 && price <= 50000;
      else if (selectedPrice === "more-50000") matchesPrice = price >= 50000;

      return matchesCategory && matchesName && matchesPrice
    })

    .sort((a, b) => {
      if (selectedPrice === "low-high") return a.price - b.price;
      if (selectedPrice === "high-low") return b.price - a.price;
      return 0;
    });
  return (
    <>
      <div className="landing">
        <div className="welcome">
          <h1>Welcome to Our E-Commerce Store</h1>
          <h2>Every Purchase Will Be Made With Pleasure</h2>
          <p>Buying and selling quality products with modern technology</p>
        </div>
      </div>

      <section className="shop-section">
        <h2 className="shop-title">Our Products</h2>

        <div className="search-section">
          <div className="filter-group">
            <label className="filter-label">Search</label>
            <input 
              type="text" 
              className="filter-input" 
              placeholder="Search products..." 
              value={selectedName}
              onChange={(e) => setSelectedName(e.target.value)}
            />
          </div>

          <div className="filter-group">
            <label className="filter-label">Category</label>
            <select 
              name="category" 
              id="category-select" 
              className="filter-select" 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="All-categories">All Categories</option>
              <option value="Bags">Bags</option>
              <option value="Watches">Watches</option>
              <option value="Clothes">Clothes</option>
              <option value="Accessories">Accessories</option>
              <option value="Parfum">Parfum</option>
              <option value="Phones">Phones</option>
              <option value="Tech">Tech</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label">Price</label>
            <select name="price" 
              id="price-select" 
              className="filter-select"
              value={selectedPrice}
              onChange={(e) => setSelectedPrice(e.target.value)}>
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
            {filteredProducts.length > 0 ? (
              filteredProducts.map((p,index) => (
                <div key={p._id}
                className="product-card-animated"
                style={{ animationDelay: `${index * 0.08}s` }}>
                   <ProductCard  product={p} />
                </div>
              ))
            ) : (
              <p className="shop-status">No products found.</p>
            )}
          </div>
        )}
      </section>

      <footer>
        <div>
          <p className="rights">© 2026 E-Commerce. All rights reserved.</p>
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
import { useState, useEffect } from "react";
import { getProducts } from "../services/api";
import ProductCard from "../pages/ProductCard";
import { useAuth } from "../context/AuthContext";
import "../styles/home.css";

function Home() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All-categories");
  const [selectedName,setSelectedName] = useState("")
  const [selectedPrice,setSelectedPrice] = useState("All prices")
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const {isAdmin,isuser} = useAuth();
  

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
      <section className="home-hero">
        <svg className="hero-lines" viewBox="0 0 1000 300" preserveAspectRatio="none">
          <path d="M -50 60 Q 200 -20 450 60 T 950 40" />
          <path d="M 550 260 Q 750 340 1050 250" />
        </svg>

        <span className="hero-year">EST. 2026</span>

        <p className="eyebrow eyebrow-light">
          <span className="rule" /> Thoughtfully Made, Beautifully Lived <span className="rule" />
        </p>

        <h1>
          {isuser() && isAdmin() ? (
            "Welcome back Admin"
          ) : (
            <>Welcome to <span className="brand-italic">Velora</span></>
          )}
        </h1>

        <p className="hero-tagline">
          {isAdmin() ? "Manage your store products and orders with ease" : "Every Purchase   Will Be Made With Pleasure"}
        </p>

        <p className="hero-desc">
          {isAdmin() ? "Control panel for inventory, sales, and modern technology items" : "Discover premium quality products with modern technology"}
        </p>

        <a href="#collection" className="hero-cta">
          Explore the collection <span className="arrow">↓</span>
        </a>
      </section>

      <section className="shop-section" id="collection">
        <div className="collection-heading">
          <p className="eyebrow">The Velora Edit</p>
          <h2 className="shop-title">{isAdmin() ? "My" : "Our"} Collection</h2>
          <div className="divider" />
          <p className="collection-desc">
            Discover a considered collection of quiet luxuries, made with care and meant to be cherished.
          </p>
        </div>
        <div className="search-section-home">
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

        {loading && <p className="loading">Loading products...</p>}
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
    </>
  );
}

export default Home;
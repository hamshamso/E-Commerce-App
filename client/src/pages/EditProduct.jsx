import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getProductById, UpdateProduct, deleteProduct } from "../services/api";
import "../styles/editProduct.css";

function EditProduct() {
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    price: "",
    quantity: "",
    category: "",
  });

  const [save, setSave] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await getProductById(id);
        const data = response?.data || response; 
        //Fill all inputs with previus data
        if (data) {
          setProduct({
            name: data.name || "",
            price: data.price || "",
            quantity: data.quantity ?? "",
            category: data.category || "",
          });
        }
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to load product details");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({...prev,[name]: value,}));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await UpdateProduct(product, id, token);
      setSave(true);
    } catch (err) {
      console.error("Error updating product:", err);
      setError("Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      setLoading(true);
      await deleteProduct(id, token);
      navigate("/");
    } catch (err) {
      console.error("Error deleting product:", err);
      setError("Failed to delete product");
    } finally {
      setLoading(false);
    }
  };

  if (loading && !product.name) return <h1 className="loading">Loading product data...</h1>;

  if (save) {
    return (
      <div className="success-container">
        <h1>Your changes have been successfully saved</h1>
        <Link to="/">Back to home</Link>
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="edit-product-form">
        <h2>Edit Product</h2>
        {error && <p className="error">{error}</p>}

        <label>Name</label>
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
        />

        <label>Price</label>
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          min="0"
          onKeyDown={(e) => ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()}
        />

        <label>Quantity</label>
        <input
          type="number"
          name="quantity"
          value={product.quantity}
          onChange={handleChange}
          min="0"
          onKeyDown={(e) => ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()}
        />

        <label>Category</label>
        <input
          type="text"
          name="category"
          value={product.category}
          onChange={handleChange}
        />

        <button type="submit" disabled={loading} className="btn-save">
          {loading ? "Saving..." : "Save"}
        </button>

        <div className="actions">
          <button type="button" className="btn-cancel" onClick={handleCancel}>
            Cancel
          </button>
          <button
            type="button"
            className="btn-delete"
            onClick={handleDelete}
            disabled={loading}
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  );
}

EditProduct.displayName = "EditProduct";

export default EditProduct;
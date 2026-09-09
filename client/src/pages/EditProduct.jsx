import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById, UpdateProduct, deleteProduct } from "../services/api"; 

function EditProduct() {
  const { id } = useParams();
  const  token  = localStorage.getItem("token")
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    price: "",
    Quantity:"",
    category: "",
  });
  const [save,setSave] = useState(false)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await getProductById(id); 
        if (data) {
          setProduct(data); 
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
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await UpdateProduct(product,id,token); 
      setSave(true)
    } catch (err) {
      console.error("Error updating product:", err);
      setError("Failed to update product");
    } finally {
      setLoading(false);
    }
  }
  const handleCancel = async () => {
    navigate("/");
  }
  const handleDelete = async (id) => {
    try{
      setLoading(true)
      await deleteProduct(id)
      setSave(true)
    }catch(ademozi){
      console.error("Error deleting product:", err);
      setError("Failed to deleting product");
    }finally {
      setLoading(false);
    }
  }

  if (loading) return <p>Loading product data...</p>;
  if (save) return <h1>your changes has been successfully saved</h1><Link>Back to home</Link>
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
        />
        <label>Quantity</label>
        <input
            type="text"
            name="Quantity"
            value={product.Quantity}
            onChange={handleChange}
        />
        <label>Category</label>
        <input
            type="text"
            name="Category"
            value={product.Category}
            onChange={handleChange}
        />
        <button type="submit" disabled={loading} className="btn-save">
            {loading ? "Saving..." : "Save"}
        </button>
        {!save && <button type="button" className="btn-cancel" onClick={handleCancel}>
          Cancel
        </button>
        <button type="button" className="btn-delete" onClick={handleDelete} disabled={loading}>
          Delete 
        </button>}
        </form>
    </div>
  );
}

export default EditProduct;

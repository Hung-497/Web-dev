import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ProductPage = ({ isAuthenticated }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const token = user ? user.token : null;

  const deleteProduct = async (id) => {
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        throw new Error("Failed to delete product");
      }
      return true;
    } catch (error) {
      toast.error(error.message || "Problem deleting the product");
      return false;
    }
  };

  const deletingProduct = async () => {
    const pop_up = window.confirm("The deletion is final, proceed?");
    if (pop_up) {
      const result = await deleteProduct(id);
      if (result) {
        navigate("/");
      }
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        if (!res.ok) throw new Error("Network response was not ok");
        const data = await res.json();
        setProduct(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  return loading ? (
    <p>Loading...</p>
  ) : error ? (
    <p>Error: {error}</p>
  ) : (
    product && (
      <div>
        <h2>Product Name: {product.productName}</h2>
        <p>Category: {product.category}</p>
        <p>Description: {product.description}</p>
        <p>Price: {product.price}</p>
        <p>Inventory count: {product.inventoryCount}</p>
        <p>Supplier name: {product.supplier.name}</p>
        <p>Supplier contact email: {product.supplier.contactEmail}</p>
        <p>Supplier contact phone: {product.supplier.contactPhone}</p>
        <p>Supplier verified: {product.supplier.isVerified ? "Yes" : "No"}</p>
        <button onClick={() => navigate("/")}>Back</button>

        {isAuthenticated && (
          <>
            <button onClick={deletingProduct}>Delete</button>
            <button onClick={() => navigate(`/edit/${product._id}`)}>
              Edit
            </button>
          </>
        )}
      </div>
    )
  );
};

export default ProductPage;

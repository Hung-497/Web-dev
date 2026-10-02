import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [inventoryCount, setInventoryCount] = useState("");
  const [name, setName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [isVerified, setIsVerified] = useState("true");

  const user = JSON.parse(localStorage.getItem("user"));
  const token = user ? user.token : null;

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`/api/products/${id}`);
      if (!res.ok) throw new Error("Network response was not ok");
      const data = await res.json();
      setProductName(data.productName);
      setCategory(data.category);
      setDescription(data.description);
      setPrice(data.price);
      setInventoryCount(data.inventoryCount);
      setName(data.supplier.name);
      setContactEmail(data.supplier.contactEmail);
      setContactPhone(data.supplier.contactPhone);
      setIsVerified(data.supplier.isVerified);
    };
    fetchProduct();
  }, [id]);

  const updateProduct = async (product) => {
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(product),
      });
      if (!res.ok) throw new Error("Failed to update product");
      return true;
    } catch (error) {
      console.log("Error updating product:", error);
      return false;
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const updatedProduct = {
      productName,
      category,
      description,
      price,
      inventoryCount,
      supplier: {
        name,
        contactEmail,
        contactPhone,
        isVerified,
      },
    };
    const success = await updateProduct(updatedProduct);
    if (success) {
      navigate(`/products/${id}`);
    }
  };

  return (
    <div className="create">
      <h2>Update Book</h2>
      <form onSubmit={submitForm}>
        <label>Product name:</label>
        <input
          type="text"
          required
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <label>Category:</label>
        <input
          type="text"
          required
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <label>Description:</label>
        <input
          type="text"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label>Price:</label>
        <input
          type="text"
          required
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <label>Inventory count:</label>
        <input
          type="text"
          required
          value={inventoryCount}
          onChange={(e) => setInventoryCount(e.target.value)}
        />
        <label>Supplier name:</label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
        <label>Supplier email:</label>
        <input
          type="email"
          required
          value={contactEmail}
          onChange={(e) => setContactEmail(e.target.value)}
        />
        <label>Supplier phone number:</label>
        <input
          type="text"
          value={contactPhone}
          onChange={(e) => setContactPhone(e.target.value)}
        />
        <select
          value={isVerified}
          onChange={(e) => setIsVerified(e.target.value)}
        >
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
        <button>Update Product</button>
      </form>
    </div>
  );
};

export default ProductPage;

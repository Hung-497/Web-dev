import { Link } from "react-router-dom";

const ProductListing = ({ product }) => {
  return (
    <div className="product-review">
      <Link to={`/products/${product._id}`}>
        <h2>Product Name: {product.productName}</h2>
      </Link>
      <p>Category: {product.category}</p>
      <p>Description: {product.description}</p>
      <p>Price: {product.price}</p>
      <p>Inventory count: {product.inventoryCount}</p>
    </div>
  );
};

export default ProductListing;

import ProductListing from "./ProductListing"

const ProductListings = ({products}) => {
    return (
        <div className="product-list">
            {products.map((product) => (
                <ProductListing product={product} key={product._id} />
            ))}
        </div>
    );
};

export default ProductListings;
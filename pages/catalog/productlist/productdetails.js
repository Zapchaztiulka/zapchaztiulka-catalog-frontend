import Link from "next/link";

const ProductDetails=() => (
    <>
    <h1>This is Product Details</h1>
    <Link legacyBehavior href = {{pathname: '/busket'}}>Go to the basket</Link>
    </>
);
export default ProductDetails;
import Link from "next/link";

const ProductDetails = () => {
  return (
    <>
      <h1 className="text-red-600">This is Product ID</h1>
      <Link legacyBehavior href={{ pathname: "/cart" }}>
        Go to the cart
      </Link>
    </>
  );
};

export default ProductDetails;

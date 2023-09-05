import Link from "next/link";

const ProductDetails = () => {
  return (
    <>
      <h1 className="text-red-600">This is Product ID</h1>
      <Link legacyBehavior href={{ pathname: "/basket" }}>
        Go to the basket
      </Link>
    </>
  );
};

export default ProductDetails;

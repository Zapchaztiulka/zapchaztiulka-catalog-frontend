const SkeletonProductDetail = () => {
  return (
    <div className="container mt-[117px] mb-3">
      <div className="mt-2 mb-5 tablet600:mb-6 flex flex-col tablet600:flex-row gap-8 tablet600:border tablet600:border-borderDefault tablet600:rounded-lg tablet600:py-8  tablet600:px-5 ">
        <div className="tablet768:min-h-[650px] tablet600:w-[50%] ">
          <div className="mb-3 tablet600:hidden w-full bg-bgImg animate-pulse"></div>
          <div className="mb-s w-[100px] tablet600:hidden bg-bgImg animate-pulse"></div>
          <div className="product-card-img-byId bg-bgImg animate-pulse"></div>
        </div>
        <div className="tablet768:min-h-[650px] tablet600:w-[50%] ">
           <ul className="flex flex-col gap-3">
        {[...Array(10)].map((_, index) => (
          <li key={index}>
            <div className="h-8 w-full bg-bgImg animate-pulse "></div>
          </li>
        ))}
      </ul>
        </div>
      </div>
    </div>
  );
}

export default SkeletonProductDetail
const SkeletonPagination = () => {
  return (
    <div className="flex justify-center">
      <ul className="flex gap-3">
        {[...Array(5)].map((_, index) => (
          <li key={index}>
            <div className="h-6 w-6 bg-bgImg animate-pulse"></div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SkeletonPagination

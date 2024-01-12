import SkeletonFilter from "@/components/Skeleton/SkeletonFilter";
import SkeletonPagination from "@/components/Skeleton/SkeletonPagination";
import SkeletonProducts from "@/components/Skeleton/SkeletonProducts";

export default function Loading() {
    return (
    <div>
      <SkeletonProducts />
        <SkeletonFilter />
        <SkeletonPagination/>
    </div>
  );
}

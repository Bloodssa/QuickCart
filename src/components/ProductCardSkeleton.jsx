import Skeleton from "./ui/Skeleton";

const ProductCardSkeleton = () => {
    return (
        <div className="overflow-hidden rounded-md border border-gray-300 bg-white">
            <Skeleton className="m-2 aspect-square" />
            <div className="space-y-2 p-3 pt-1">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="mt-4 h-5 w-1/3" />
                <Skeleton className="h-3 w-1/4" />
                <Skeleton className="mt-3 h-9 w-full" />
            </div>
        </div>
    );
}

export default ProductCardSkeleton;
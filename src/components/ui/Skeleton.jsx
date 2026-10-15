const Skeleton = ({ className = "" }) => {
    return (
        <div
            aria-hidden="true"
            className={`animate-pulse rounded-md bg-gray-200 motion-reduce:animate-none ${className}`}
        />
    );
}

export default Skeleton;
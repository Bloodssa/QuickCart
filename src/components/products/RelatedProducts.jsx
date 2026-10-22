import ProductSection from "./ProductSection";
import { useProducts } from "../../queries/products";

const DEFAULT_COUNT = 10;

export default function RelatedProducts({ 
    title = "You may also like",
    params = {},
    excludeIds = [],
    count = DEFAULT_COUNT,
}) {
    const { data, isPending } = useProducts({
        ...params,
        page: 1,
        pageSize: count + excludeIds.length,
    });

    const items = (data?.products ?? [])
        .filter((product) => !excludeIds.includes(product.id))
        .slice(0, count);

    return (
        <ProductSection
            title={title}
            products={items}
            isLoading={isPending}
            columns={5}
            hideWhenEmpty
            className="mt-12 pt-8"
        />
    );
}
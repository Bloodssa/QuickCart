import { useProducts } from "../../queries/products";
import ProductSection from "./ProductSection";

export default function ProductShelf({ params, ...sectionProps })
{   
    const { data, isPending, isError } = useProducts(params);

    return (
        <ProductSection 
            products={data?.products ?? []}
            isLoading={isPending}
            isError={isError}
            {...sectionProps}
        />
    );
}
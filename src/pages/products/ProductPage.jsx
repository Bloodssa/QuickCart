import { useParams } from "react-router-dom";
import HomeLayout from "../../layouts/HomeLayout";
import earbuds from "../../assets/images/category/Wireless Earbuds Pro.jpg"

const ProductPage = () => {
    const { id } = useParams();
    const sampleProduct = {
        id: 1,
        name: "Wireless Earbuds Pro",
        category: "Electronics",
        price: 2499,
        imageUrl: earbuds,
        stockQuantity: 25,
    }

    return (
        <HomeLayout>
            {/* Product Information Display */}
            <img className="h-50 w-50" src={earbuds} alt="" srcset="" />
            < p className=""> Product Id: {id}</p >
            < p className=""> Product Id: {sampleProduct.name}</p >
            < p className=""> Product Id: {sampleProduct.category}</p >
            < p className=""> Product Id: {sampleProduct.price}</p >
            < p className=""> Product Id: {sampleProduct.stockQuantity}</p >
        </HomeLayout>
    );
}

export default ProductPage;
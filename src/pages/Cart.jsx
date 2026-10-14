import HomeLayout from "../layouts/HomeLayout";
import { useAuth } from "../hooks/useAuth";

const Cart = () => {
    const { user } = useAuth();

    return (
        <HomeLayout>
            <title>Cart</title>
            <p>Add To Cart</p>

            {user ? "Logged In.,  Choose product": "You must login first"}
        </HomeLayout>
    );
}

export default Cart;
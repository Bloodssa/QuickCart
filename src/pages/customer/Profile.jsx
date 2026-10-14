import { useAuth } from "../../hooks/useAuth";
import HomeLayout from "../../layouts/HomeLayout";

const Home = () => {
    const { user } = useAuth();

    return (
        <HomeLayout subhead={false}>
            <h1 className="text-2xl font-bold">
                User Profile
            </h1>

            {/* Profile UI */}
            <p className="mt-10">{user.fullName}</p>
            <p>{user.email}</p>
            <p>{user.role}</p>

        </HomeLayout>
    );
};

export default Home;

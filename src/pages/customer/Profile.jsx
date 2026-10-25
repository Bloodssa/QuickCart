import { useAuth } from "../../hooks/useAuth";
import HomeLayout from "../../layouts/HomeLayout";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import ProfileSidebar from "../../components/profile/ProfileSidebar";
import AccountDetails from "../../components/profile/AccountDetails";
import { useSearchParams } from "react-router-dom";
import OrdersSection from "../../components/profile/OrderSection";
import AddressSection from "../../components/profile/AddressSection";
import RelatedProducts from "../../components/products/RelatedProducts";
const VALID_TABS = ["details", "address", "on-ship", "history"];

const Home = () => {
    const { user } = useAuth();
    useDocumentTitle(`${user.fullName} Profile`);

    const [searchParams, setSearchParams] = useSearchParams();
    const tabParam = searchParams.get("tab");

    const activeTab = VALID_TABS.includes(tabParam) ? tabParam : "details";

    const changeTab = (tab) => setSearchParams(tab === "details" ? {} : { tab });

    return (
        <HomeLayout subhead={false}>
            <h1 className="text-2xl font-bold">
                User Profile
            </h1>

            <div className="mt-4 flex w-full flex-col gap-6 md:mt-6 md:flex-row">
                <div className="md:w-56 md:shrink-0">
                    <ProfileSidebar activeTab={activeTab} onChange={changeTab} />
                </div>
                <div className="min-w-0 flex-1">
                    <div className="h-full w-full rounded-md border border-gray-300">
                        {activeTab === "details" && <AccountDetails user={user} label="Account Details" onNavigate={changeTab} />}
                        {activeTab === "address" && <AddressSection label="Address" />}
                        {activeTab === "on-ship" && (
                            <OrdersSection label="On Ship Orders" status="Processing" emptyMessage="You have no orders on the way." />
                        )}
                        {activeTab === "history" && (
                            <OrdersSection label="Order History" emptyMessage="You have not placed any orders yet." />
                        )}
                    </div>
                </div>
            </div>

            <RelatedProducts
                title="You may also like"
                params={{ sort: "popular" }}
            />
        </HomeLayout>
    );
};

export default Home;

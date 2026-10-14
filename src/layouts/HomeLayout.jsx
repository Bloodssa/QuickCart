import Header from "../components/Header";
import Footer from "../components/Footer";

const HomeLayout = ({ children, subhead = true }) => {
    return (
        <>
            <Header subhead={subhead} />

            <main className="min-h-screen container mx-auto px-4 py-10 md:px-8 md:py-12">
                {children}
            </main>

            <Footer />
        </>
    );
}

export default HomeLayout;
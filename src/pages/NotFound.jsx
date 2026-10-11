import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="grid min-h-[50vh] place-content-center gap-2 text-center">
            <h1 className="text-2xl font-bold">Page not found</h1>
            <Link to="/" className="underline">
                Back to home
            </Link>
        </div>
    );
}

export default NotFound;
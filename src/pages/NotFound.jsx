import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

const NotFound = () => {
    const { isAdmin } = useAuth();
    useDocumentTitle("Page Not Found");
    
    return (
        <div className="grid min-h-[50vh] place-content-center gap-2 text-center">
            <h1 className="text-2xl font-bold">Page not found</h1>
            <Link to={isAdmin ? "/admin" : "/"} className="underline">
                Back to home
            </Link>
        </div>
    );
}

export default NotFound;
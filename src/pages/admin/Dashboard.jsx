import { useAuth } from "../../hooks/useAuth";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";

const Dashboard = () => {
    const { user } = useAuth();
    useDocumentTitle("Dashboard");

    return (
        <div>
            <h1>Admin dashboard</h1>
            <p>Signed in as {user.fullName}</p>
        </div>
    );
}

export default Dashboard;
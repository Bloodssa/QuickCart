import { useAuth } from "../../hooks/useAuth";

const Dashboard = () => {
    const { user } = useAuth();

    return (
        <div>
            <h1>Admin dashboard</h1>
            <p>Signed in as {user.fullName}</p>
        </div>
    );
}

export default Dashboard;
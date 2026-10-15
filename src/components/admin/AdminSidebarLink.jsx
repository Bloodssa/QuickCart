import { NavLink } from "react-router-dom";

const AdminSidebarLink = ({ item, onNavigate }) => {
    const Icon = item.icon;

    return (
        <NavLink
            to={item.path}
            end={item.end}
            onClick={onNavigate}
            className={({ isActive }) =>
                `group flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors duration-200 ${isActive
                    ? "bg-accent-100/10 font-semibold text-accent-100"
                    : "font-medium text-neutral-600 hover:bg-gray-100 hover:text-neutral-900"
                }`
            }
        >
            {({ isActive }) => (
                <>
                    <Icon className={`h-5 w-5 shrink-0 transition-colors ${isActive ? "text-accent-100" : "text-neutral-500 group-hover:text-neutral-900"}`}/>
                    {item.name}
                </>
            )}
        </NavLink>
    );
};

export default AdminSidebarLink;
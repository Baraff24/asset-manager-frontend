import React from "react";
import { NavLink } from "react-router-dom";

interface NavItemProps {
    to: string;
    label: string;
    icon?: React.ReactElement;
    onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ to, label, icon, onClick }) => {
    return (
        <NavLink
            to={to}
            onClick={onClick}
            className={({ isActive }) =>
                `flex items-center px-3 py-2 rounded hover:bg-gray-600 transition-colors ${
                    isActive ? "bg-gray-600" : ""
                }`
            }
        >
            {icon && <span className="mr-2">{icon}</span>}
            {label}
        </NavLink>
    );
};

export default NavItem;

import React from 'react';
import { Link } from 'react-router-dom';

interface NavItemProps {
  to: string;
  label: string;
  icon?: React.ReactNode;
}

const NavItem: React.FC<NavItemProps> = ({ to, label, icon }) => (
  <Link
    to={to}
    className="flex items-center rounded py-3 pl-3 pr-4 text-gray-50"
  >
    {icon && <span className="mr-2">{icon}</span>}
    {label}
  </Link>
);

export default NavItem;
import React from 'react';
import { Link } from 'react-router-dom';

interface NavItemProps {
  to: string;
  label: string;
}

const NavItem: React.FC<NavItemProps> = ({ to, label }) => (
  <li>
    <Link
      to={to}
      className="flex items-center rounded py-3 pl-3 pr-4 text-gray-50 hover:bg-gray-600"
    >
      {label}
    </Link>
  </li>
);

export default NavItem;

import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { logout } from "../../services";
import {
  FaUser,
  FaSignOutAlt,
  FaSignInAlt,
  FaHouseUser,
  FaClipboardList,
  FaUserEdit,
  FaBuilding,
  FaUsers,
  FaDesktop,
  FaTruck,
  FaLaptopCode,
} from 'react-icons/fa';
import { useAuthContext } from "../../context/authContext";
import {NavItem} from "../index.ts";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false); // Stato per il menu mobile
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false); // Stato per il menu desktop
  const { isAuthenticated, user, setUser } = useAuthContext();
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    logout();
    setUser(null);
    navigate("/login");
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Chiudi il dropdown se clicchi fuori
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  // Funzione per chiudere il menu mobile
  const closeMobileMenu = () => {
    setIsOpen(false);
  };

  return (
      <>
        {/* Top Navigation */}
        <nav className="bg-gray-700 fixed top-0 w-full z-50">
          <div className="flex justify-between items-center text-white py-4 pl-6 pr-6 md:pl-10 md:pr-10">
            <a href="/" className="inline text-lg font-semibold">ITAM</a>
            <div className="flex items-center">
              {isAuthenticated ? (
                  <div className="relative">
                    {/* Desktop Dropdown Button */}
                    <button
                        type="button"
                        className="hidden sm:flex items-center space-x-2 text-white hover:text-gray-200 focus:outline-none"
                        onClick={toggleDropdown}
                    >
                      <FaUser className="h-6 w-6" />
                      <span>{user?.username}</span>
                      {/* Icona Dropdown */}
                      <svg
                          className="h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                        <div
                            ref={dropdownRef}
                            className="absolute right-0 mt-2 w-64 bg-gray-800 rounded-md shadow-lg py-2"
                        >
                          {/* Nuove voci di navigazione */}
                          <NavItem to="/departments" label="Dipartimenti" icon={<FaBuilding size={18} />} onClick={() => setIsDropdownOpen(false)} />
                          <NavItem to="/users" label="Utenti" icon={<FaUsers size={18} />} onClick={() => setIsDropdownOpen(false)} />
                          <NavItem to="/devices" label="Dispositivi" icon={<FaDesktop size={18} />} onClick={() => setIsDropdownOpen(false)} />
                          <NavItem to="/suppliers" label="Fornitori" icon={<FaTruck size={18} />} onClick={() => setIsDropdownOpen(false)} />
                          <NavItem to="/software" label="Software" icon={<FaLaptopCode size={18} />} onClick={() => setIsDropdownOpen(false)} />
                          {/* Voci esistenti */}
                          <NavItem to="/my-profile" label="Il mio profilo" icon={<FaUserEdit size={18} />} onClick={() => setIsDropdownOpen(false)} />
                          <NavItem to="/rapportiIntervento" label="Rapporti di Intervento" icon={<FaClipboardList size={18} />} onClick={() => setIsDropdownOpen(false)} />
                          <button
                              onClick={handleLogout}
                              className="w-full text-left px-4 py-2 text-gray-200 hover:bg-gray-600 flex items-center"
                          >
                            <FaSignOutAlt className="mr-2" />
                            Logout
                          </button>
                        </div>
                    )}
                  </div>
              ) : (
                  <button
                      type="button"
                      className="flex items-center space-x-2 text-white hover:text-gray-200"
                      onClick={() => navigate("/login")}
                  >
                    <FaSignInAlt className="h-5 w-5" />
                    <span>Login</span>
                  </button>
              )}

              {/* Mobile Menu Button */}
              <button
                  type="button"
                  className="ml-4 py-2 text-white hover:text-gray-200 sm:hidden"
                  onClick={toggleMenu}
              >
                {isOpen ? (
                    // Close Menu Icon
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 384 512"
                        className="h-6 w-6"
                    >
                      <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" />
                    </svg>
                ) : (
                    // Open Menu Icon
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                        className="h-6 w-6"
                    >
                      <path d="M0 96C0 78.3 14.3 64 32 64h384c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zm0 160c0-17.7 14.3-32 32-32h384c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zm448 160c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32h384c17.7 0 32 14.3 32 32z" />
                    </svg>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
              <div className="sm:hidden bg-gray-700">
                <ul className="px-4 py-2 space-y-2">
                  <li>
                    <NavItem to="/" label="Homepage" icon={<FaHouseUser size={18} />} onClick={closeMobileMenu} />
                  </li>
                  {isAuthenticated ? (
                      <>
                        <li><NavItem to="/departments" label="Dipartimenti" icon={<FaBuilding size={18} />} onClick={closeMobileMenu} /></li>
                        <li><NavItem to="/users" label="Utenti" icon={<FaUsers size={18} />} onClick={closeMobileMenu} /></li>
                        <li><NavItem to="/devices" label="Dispositivi" icon={<FaDesktop size={18} />} onClick={closeMobileMenu} /></li>
                        <li><NavItem to="/suppliers" label="Fornitori" icon={<FaTruck size={18} />} onClick={closeMobileMenu} /></li>
                        <li><NavItem to="/software" label="Software" icon={<FaLaptopCode size={18} />} onClick={closeMobileMenu} /></li>
                        <li><NavItem to="/my-profile" label="Il mio profilo" icon={<FaUserEdit size={18} />} onClick={closeMobileMenu} /></li>
                        <li><NavItem to="/rapportiIntervento" label="Rapporti di Intervento" icon={<FaClipboardList size={18} />} onClick={closeMobileMenu} /></li>
                        <li>
                          <button
                              onClick={() => {
                                handleLogout();
                                closeMobileMenu();
                              }}
                              className="flex items-center rounded py-3 pl-3 pr-4 text-gray-50 hover:bg-gray-600 w-full text-left"
                          >
                            <FaSignOutAlt className="h-5 w-5 mr-1" />
                            Logout
                          </button>
                        </li>
                      </>
                  ) : (
                      <li>
                        <button
                            onClick={() => {
                              navigate("/login");
                              closeMobileMenu();
                            }}
                            className="flex items-center rounded py-3 pl-3 pr-4 text-gray-50 hover:bg-gray-600 w-full text-left"
                        >
                          <FaSignInAlt className="h-5 w-5 mr-1" />
                          Login
                        </button>
                      </li>
                  )}
                </ul>
              </div>
          )}
        </nav>
      </>
  );
};

export default Header;

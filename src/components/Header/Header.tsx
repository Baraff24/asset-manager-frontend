// src/components/Header/Header.tsx
import React, { useState } from 'react';
import { NavItem } from "../index";
import { useNavigate } from "react-router-dom";
import { logout } from "../../services";
import { FaUser, FaSignOutAlt, FaSignInAlt, FaHouseUser, FaRegCalendarAlt, FaWarehouse, FaBriefcaseMedical, FaClipboardList, FaRegBuilding, FaThumbtack} from 'react-icons/fa';
import {useAuthContext} from "../../context/authContext.tsx";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { isAuthenticated, user } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Top Navigation */}
      <nav className="bg-gray-700 fixed top-0 w-full z-50">
        <div className="flex justify-between items-center text-white sm:flex py-6 pl-10 pr-10">
          <span className="inline text-lg font-semibold">ITAM</span>
          <div className="flex items-center">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                {/* Icona Utente */}
                <FaUser className="h-6 w-6" />

                {/* Nome Utente */}
                <span className="hidden sm:block">{user?.username}</span>

                {/* Pulsante Logout */}
                <button
                  type="button"
                  className="flex items-center text-white hover:text-gray-200"
                  onClick={handleLogout}
                >
                  <FaSignOutAlt className="h-5 w-5 mr-1" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            ) : (
              <button
                type="button"
                className="flex items-center text-white hover:text-gray-200"
                onClick={() => navigate("/login")}
              >
                <FaSignInAlt className="h-5 w-5 mr-1" />
                <span className="hidden sm:inline">Login</span>
              </button>
            )}

            {/* Bottone per il menu mobile */}
            <button
              type="button"
              className="ml-4 py-4 text-white hover:text-gray-200 sm:hidden"
              onClick={toggleMenu}
            >
              {isOpen ? (
                // Icona Chiudi Menu
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                  className="h-4 w-4"
                >
                  <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" />
                </svg>
              ) : (
                // Icona Apri Menu
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  className="h-4 w-4"
                >
                  <path d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="sm:hidden bg-gray-700">
            <ul className="px-4 py-2 space-y-2">
              <NavItem to="/" label="Homepage" />
              {isAuthenticated ? (
                <>
                  <NavItem to="/dipartimenti" label="Dipartimenti" />
                  <NavItem to="/statoRisorse" label="Stato risorse" />
                  <NavItem to="/rapportiIntervento" label="Rapporti di intervento" />
                  <NavItem to="/assegnazioneRisorse" label="Assegnazione risorse" />
                  <NavItem to="/magazzino" label="Magazzino" />
                  <NavItem to="/agenda" label="Agenda" />
                  <li>
                    <button
                      onClick={handleLogout}
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
                    onClick={() => navigate("/login")}
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

      {/* Side Navigation (Desktop) */}
      <div className="z-40 hidden sm:block">
        <nav className="fixed left-0 bottom-0 flex w-1/6 flex-col bg-gray-700 pt-6 pb-40">
          {/* Main Section */}
          <div className="px-4 pb-6">
            <h3 className="mb-2 text-xs font-medium uppercase text-gray-500">
              Main
            </h3>
            <ul className="mb-8 text-sm font-medium flex items-center hover:bg-gray-600 rounded pl-3">
              <FaHouseUser size={22}/>
              <NavItem to="/" label="Homepage" />
            </ul>
          </div>

          {/* Anagrafiche Section */}
          <div className="px-4 pb-6">
            <h3 className="mb-2 text-xs font-medium uppercase text-gray-500">
              Anagrafiche
            </h3>
            <ul className="mb-8 text-sm font-medium flex items-center hover:bg-gray-600 rounded pl-3">
              <FaRegBuilding size={22}/> 
              <NavItem to="/dipartimenti" label="Dipartimenti" />
            </ul>
          </div>

          {/* Attività Section */}
          <div className="px-4 pb-6">
            <h3 className="mb-2 text-xs font-medium uppercase text-gray-500">
              Attività
            </h3>
            <ul className="mb-8 text-sm font-medium">
              <li className='flex items-center hover:bg-gray-600 rounded pl-3'>
                <FaBriefcaseMedical size={22}/>
                <NavItem to="/statoRisorse" label="Stato risorse" />
              </li>
              <li className='flex items-center hover:bg-gray-600 rounded pl-3'>
                <FaClipboardList size={22}/>
                <NavItem to="/rapportiIntervento" label="Rapporti di intervento" />
              </li>
            </ul>
          </div>

          {/* Articoli Section */}
          <div className="px-4 pb-6">
            <h3 className="mb-2 text-xs font-medium uppercase text-gray-500">
              Articoli
            </h3>
            <ul className="mb-8 text-sm font-medium">
              <li className='flex items-center hover:bg-gray-600 rounded pl-3'>
                <FaThumbtack size={22}/>
                <NavItem to="/assegnazioneRisorse" label="Assegnazione risorse" />
              </li>
              <li className='flex items-center hover:bg-gray-600 rounded pl-3'>
                <FaWarehouse size={22}/>
                <NavItem to="/magazzino" label="Magazzino" />
              </li>
            </ul>
          </div>

          {/* Agenda Section */}
          <div className="px-4 pb-6">
            <h3 className="mb-2 text-xs font-medium uppercase text-gray-500">
              Agenda
            </h3>
            <ul className="mb-8 text-sm font-medium flex items-center hover:bg-gray-600 rounded pl-3">
              <FaRegCalendarAlt size={22}/>
              <NavItem to="/agenda" label="Agenda" />
            </ul>
          </div>

          {/* Logout Section (Desktop) */}
          {isAuthenticated && (
            <div className="px-4 pb-6">
              <button
                onClick={handleLogout}
                className="flex items-center rounded py-3 pl-3 pr-4 text-gray-50 hover:bg-gray-600 w-full text-left"
              >
                <FaSignOutAlt className="h-5 w-5 mr-1" />
                Logout
              </button>
            </div>
          )}
        </nav>
      </div>
    </>
  );
};

export default Header;

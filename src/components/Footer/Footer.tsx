import React from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { IoIosHelpCircleOutline } from "react-icons/io";

const Footer: React.FC = () =>{
    return(
        <>
            {/*footer navigation (Desktop)*/}
            <footer className="bg-gray-400 fixed bottom-0 left-0 right-0 border-t border-border p-3">
                <div className="container mx-auto flex justify-between items-center">
                    <span></span>
                    <div className="flex">
                        <span className="px-2"><IoSettingsOutline size={20}/></span>
                        <span className="px-2"><IoIosHelpCircleOutline size={20}/></span>
                    </div>
                </div>
            </footer>
        </>
    )
}
export default Footer;
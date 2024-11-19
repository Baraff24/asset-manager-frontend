import React from 'react';
import { FaInstagram, FaFacebookF } from 'react-icons/fa';

// Define the SocialButton interface
interface SocialButton {
    href: string;
    icon: React.ReactNode;
    label: string;
}

// Array of social buttons
const socialButtons: SocialButton[] = [
    {
        href: 'https://www.instagram.com/',
        icon: <FaInstagram />,
        label: 'Instagram',
    },
    {
        href: 'https://www.facebook.com/',
        icon: <FaFacebookF />,
        label: 'Facebook',
    },
];

const SocialButtons: React.FC = () => {
    return (
        <ul className="flex space-x-4">
            {socialButtons.map((link) => (
                <li key={link.href}>
                    <a
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={link.label}
                        className="text-gray-600 hover:text-gray-800 transition-colors duration-200"
                    >
                        {link.icon}
                    </a>
                </li>
            ))}
        </ul>
    );
};

export default SocialButtons;
import React from 'react';
import { IconType } from 'react-icons';

interface ButtonWithIconProps {
  onClick?: () => void;
  children: React.ReactNode;
  icon: IconType;
  className?: string;
  disabled?: boolean;
}

const ButtonWithIcon: React.FC<ButtonWithIconProps> = ({ onClick, children, icon: Icon, className, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${className} flex items-center space-x-1 transition-opacity duration-200`}
    >
      <Icon className="mr-1" />
      <span>{children}</span>
    </button>
  );
}

export default ButtonWithIcon;

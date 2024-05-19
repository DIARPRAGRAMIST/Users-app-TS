import { FC, ReactNode } from "react";

interface ButtonProps {
  cls?: string;
  onClick?: () => void;
  children: ReactNode;
}

const Button: FC<ButtonProps> = ({ cls, children, onClick, ...restProps }) => {
  return (
    <button
      className={`border border-gray-700 rounded-sm px-2 py-1 ${cls}`}
      {...restProps}
      onClick={ onClick }
    >
      {children}
    </button>
  );
};

export default Button;

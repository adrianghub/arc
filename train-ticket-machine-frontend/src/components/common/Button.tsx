export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = "primary",
  size = "md",
  fullWidth = false,
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center font-medium rounded-lg shadow-sm transition-colors duration-150 select-none" +
    " focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800" +
    " active:translate-y-0.5 active:shadow-inner";

  const variantClasses = {
    primary:
      "bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white focus:ring-indigo-500",
    secondary:
      "bg-gray-600 hover:bg-gray-700 active:bg-gray-800 text-gray-100 focus:ring-gray-500",
    danger:
      "bg-red-600 hover:bg-red-700 active:bg-red-800 text-white focus:ring-red-500",
  };

  const sizeClasses = {
    sm: "px-4 py-2.5 text-sm",
    md: "px-5 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button
      type='button'
      className={`${baseClasses} ${variantClasses[variant]} ${
        sizeClasses[size]
      } ${widthClass} ${className || ""}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

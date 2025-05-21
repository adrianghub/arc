export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  title?: string;
  subtitle?: string;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "full";
}

const Form: React.FC<FormProps> = ({
  children,
  className,
  title,
  subtitle,
  maxWidth = "md",
  ...props
}) => {
  // Map maxWidth to TailwindCSS classes
  const maxWidthClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    full: "max-w-full",
  };

  return (
    <div
      className={`w-full ${maxWidthClasses[maxWidth]} mx-auto bg-gray-800 shadow-lg rounded-xl p-6 md:p-8`}
    >
      {title && (
        <div className='mb-8'>
          <h2 className='text-2xl font-bold text-white text-center'>{title}</h2>
          {subtitle && (
            <p className='mt-2 text-gray-300 text-center'>{subtitle}</p>
          )}
        </div>
      )}
      <form className={`space-y-6 ${className || ""}`} {...props}>
        {children}
      </form>
    </div>
  );
};

export default Form;

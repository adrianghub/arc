export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  id: string;
  error?: string;
  helpText?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  id,
  className,
  error,
  helpText,
  ...props
}) => {
  const baseClasses =
    "mt-1 block w-full bg-gray-700 border rounded-lg shadow-sm py-3.5 px-4 text-white placeholder-gray-400 " +
    "focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 " +
    "text-base touch-manipulation";

  const borderClasses = error ? "border-red-500" : "border-gray-600";

  return (
    <div className='mb-4'>
      {label && (
        <label
          htmlFor={id}
          className='block text-base font-medium text-gray-300 mb-2'
        >
          {label}
        </label>
      )}
      <input
        id={id}
        className={`${baseClasses} ${borderClasses} ${className || ""}`}
        aria-invalid={error ? "true" : "false"}
        {...props}
      />
      {error && <p className='mt-2 text-sm text-red-500'>{error}</p>}
      {helpText && !error && (
        <p className='mt-2 text-sm text-gray-400'>{helpText}</p>
      )}
    </div>
  );
};

export default Input;

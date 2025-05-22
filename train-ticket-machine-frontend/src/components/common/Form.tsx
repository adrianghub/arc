import * as RadixForm from "@radix-ui/react-form";

export interface FormProps extends RadixForm.FormProps {
  title?: string;
  subtitle?: string;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "full";
  children: React.ReactNode;
}

const Form: React.FC<FormProps> = ({
  children,
  className,
  title,
  subtitle,
  maxWidth = "lg",
  ...props
}) => {
  const maxWidthClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    full: "max-w-full",
  };

  const outerDivBaseClasses = `w-full ${maxWidthClasses[maxWidth]} mx-auto bg-gray-800 shadow-lg rounded-xl p-6 md:p-8`;

  return (
    <div className={outerDivBaseClasses}>
      {title && (
        <div className='mb-6 text-center'>
          <h2 className='text-2xl font-bold text-white'>{title}</h2>
          {subtitle && <p className='mt-2 text-sm text-gray-300'>{subtitle}</p>}
        </div>
      )}
      <RadixForm.Root className={`space-y-6 ${className || ""}`} {...props}>
        {children}
      </RadixForm.Root>
    </div>
  );
};

const FormField = RadixForm.Field;
const FormLabel = RadixForm.Label;
const FormControl = RadixForm.Control;
const FormMessage = RadixForm.Message;
const FormValidityState = RadixForm.ValidityState;
const FormSubmit = RadixForm.Submit;

export {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
  FormSubmit,
  FormValidityState,
};

import {
  forwardRef,
  type HTMLAttributes,
  useState,
  createContext,
  useContext,
  isValidElement,
  cloneElement,
} from "react";

// --- Contexto interno ---
const DialogContext = createContext<{
  open: boolean;
  setOpen: (open: boolean) => void;
} | null>(null);

export const Dialog = ({
  children,
  open: openProp,
  defaultOpen = false,
}: {
  children: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
}) => {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const open = openProp !== undefined ? openProp : internalOpen;
  const setOpen = openProp !== undefined ? () => {} : setInternalOpen;

  return (
    <DialogContext.Provider value={{ open, setOpen }}>
      {children}
    </DialogContext.Provider>
  );
};
Dialog.displayName = "Dialog";

// --- Trigger ---
export const DialogTrigger = ({
  children,
  asChild = false,
}: {
  children: React.ReactNode;
  asChild?: boolean;
}) => {
  const context = useContext(DialogContext);
  if (!context) throw new Error("DialogTrigger must be used within Dialog");

  const handleClick = () => context.setOpen(true);

  // Corrección: Usamos isValidElement y cloneElement importados arriba
  if (asChild && isValidElement(children)) {
    return cloneElement(children, { onClick: handleClick } as any);
  }

  return (
    <button
      onClick={handleClick}
      className="inline-flex items-center justify-center"
    >
      {children}
    </button>
  );
};
DialogTrigger.displayName = "DialogTrigger";

// --- Content ---
export const DialogContent = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className = "", children, ...props }, ref) => {
  const context = useContext(DialogContext);
  if (!context || !context.open) return null;

  const handleClose = () => context.setOpen(false);

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div
        ref={ref}
        className={`relative w-full max-w-lg rounded-lg border bg-white p-6 shadow-lg duration-200 ${className}`}
        {...props}
      >
        {/* Botón de cerrar */}
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-slate-400 p-1"
          aria-label="Cerrar"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {children}
      </div>
    </div>
  );
});
DialogContent.displayName = "DialogContent";

// --- Header ---
export const DialogHeader = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className = "", ...props }, ref) => (
  <div
    ref={ref}
    className={`flex flex-col space-y-1.5 text-center sm:text-left ${className}`}
    {...props}
  />
));
DialogHeader.displayName = "DialogHeader";

// --- Footer ---
export const DialogFooter = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className = "", ...props }, ref) => (
  <div
    ref={ref}
    className={`flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-4 ${className}`}
    {...props}
  />
));
DialogFooter.displayName = "DialogFooter";

// --- Title ---
export const DialogTitle = forwardRef<
  HTMLHeadingElement,
  HTMLAttributes<HTMLHeadingElement>
>(({ className = "", ...props }, ref) => (
  <h2
    ref={ref}
    className={`text-lg font-semibold leading-none tracking-tight ${className}`}
    {...props}
  />
));
DialogTitle.displayName = "DialogTitle";

// --- Description ---
export const DialogDescription = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className = "", ...props }, ref) => (
  <p ref={ref} className={`text-sm text-slate-500 ${className}`} {...props} />
));
DialogDescription.displayName = "DialogDescription";

import { useToast } from "@/hooks/use-toast";

export function Toaster() {
  const { toasts } = useToast();
  if (!toasts.length) return null;
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full">
      {toasts.map(({ id, title, description, open }) =>
        open ? (
          <div key={id} className="bg-white border border-gray-200 rounded-xl shadow-lg p-4">
            {title && <p className="font-semibold text-sm text-gray-900">{title}</p>}
            {description && <p className="text-sm text-gray-500 mt-0.5">{description}</p>}
          </div>
        ) : null
      )}
    </div>
  );
}
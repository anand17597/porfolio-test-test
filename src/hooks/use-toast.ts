import * as React from "react";

const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 1000000;

type ToasterToast = { id: string; title?: React.ReactNode; description?: React.ReactNode; action?: React.ReactElement; open?: boolean; onOpenChange?: (open: boolean) => void; };
type Toast = Omit<ToasterToast, "id">;

let count = 0;
function genId() { count = (count + 1) % Number.MAX_SAFE_INTEGER; return count.toString(); }

const listeners: Array<(state: { toasts: ToasterToast[] }) => void> = [];
let memoryState: { toasts: ToasterToast[] } = { toasts: [] };

function dispatch(action: { type: string; toast?: ToasterToast; toastId?: string }) {
  if (action.type === "ADD_TOAST") memoryState = { toasts: [action.toast!, ...memoryState.toasts].slice(0, TOAST_LIMIT) };
  else if (action.type === "DISMISS_TOAST") memoryState = { toasts: memoryState.toasts.map(t => t.id === action.toastId || !action.toastId ? { ...t, open: false } : t) };
  else if (action.type === "REMOVE_TOAST") memoryState = { toasts: action.toastId ? memoryState.toasts.filter(t => t.id !== action.toastId) : [] };
  listeners.forEach(l => l(memoryState));
}

export function toast({ ...props }: Toast) {
  const id = genId();
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id });
  dispatch({ type: "ADD_TOAST", toast: { ...props, id, open: true, onOpenChange: (open) => { if (!open) dismiss(); } } });
  return { id, dismiss, update: (p: ToasterToast) => dispatch({ type: "ADD_TOAST", toast: { ...p, id } }) };
}

export function useToast() {
  const [state, setState] = React.useState<{ toasts: ToasterToast[] }>(memoryState);
  React.useEffect(() => {
    listeners.push(setState);
    return () => { const i = listeners.indexOf(setState); if (i > -1) listeners.splice(i, 1); };
  }, []);
  return { ...state, toast, dismiss: (id?: string) => dispatch({ type: "DISMISS_TOAST", toastId: id }) };
}
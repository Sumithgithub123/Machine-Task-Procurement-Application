import { createContext, useContext, useState } from "react";

const Modalcontext = createContext();

function Modal({ children }: { children: React.ReactNode }) {
  const [state, setstate] = useState("");

  return (
    <Modalcontext.Provider value={{ state, setstate }}>
      {children}
    </Modalcontext.Provider>
  );
}

function Opens({ open }: { open: string }) {
  const { setstate } = useContext(Modalcontext);

  return (
    <button
      className="rounded active:bg-blue-700 bg-blue-500 p-2 px-5"
      onClick={() => setstate(open)}
    >
      Add Item
    </button>
  );
}

function Window({
  children,
  open,
}: {
  children: React.ReactNode;
  open: string;
}) {
  const { state } = useContext(Modalcontext);

  if (state !== open) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-20 flex items-center justify-center">
      {children}
    </div>
  );
}

export function useModal() {
  const context = useContext(Modalcontext);
  if (context === undefined)
    throw new Error("modal used outside of its provider");
  return context;
}

Modal.Opens = Opens;
Modal.Window = Window;

export default Modal;

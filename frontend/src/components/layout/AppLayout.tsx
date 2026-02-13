import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export function AppLayout({ children }: Props) {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 p-4 max-w-md mx-auto w-full">
        {children}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-md">
        <div className="flex justify-around py-3 text-sm">
          <button className="text-primary-600">Dashboard</button>
          <button>Transações</button>
          <button>Cartões</button>
          <button>Perfil</button>
        </div>
      </nav>
    </div>
  );
}
import { Car, Plus, RefreshCw, SlidersHorizontal, Sun, Moon } from "lucide-react";

interface HeaderProps {
  totalCars: number;
  totalBrands: number;
  sortBy: "name" | "count" | "value";
  onSortChange: (v: "name" | "count" | "value") => void;
  onNewCar: () => void;
  onReload: () => void;
  loading: boolean;
  theme: "light" | "dark";
  onToggleTheme: () => void;
}

const SORT_OPTIONS: { value: "name" | "count" | "value"; label: string }[] = [
  { value: "name", label: "Nome" },
  { value: "count", label: "Quantidade" },
  { value: "value", label: "Valor total" },
];

export function Header({
  totalCars,
  totalBrands,
  sortBy,
  onSortChange,
  onNewCar,
  onReload,
  loading,
  theme,
  onToggleTheme,
}: HeaderProps) {
  return (
    <header className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 sticky top-0 z-40 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white shrink-0">
              <Car size={18} />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900 dark:text-slate-100 leading-tight">
                WS Work Cars
              </h1>
              <p className="text-xs text-slate-400 dark:text-slate-500">
                {totalCars} veículos · {totalBrands} marcas
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:ml-auto flex-wrap">
            <div className="flex items-center gap-1.5 mr-1">
              <SlidersHorizontal size={14} className="text-slate-400 dark:text-slate-500" />
              <span className="hidden sm:inline text-xs text-slate-500 dark:text-slate-400">Ordenar:</span>
            </div>

            {SORT_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => onSortChange(opt.value)}
                className={[
                  "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
                  sortBy === opt.value
                    ? "bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-400"
                    : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800",
                ].join(" ")}
              >
                {opt.label}
              </button>
            ))}

            <button
              onClick={onReload}
              disabled={loading}
              className="p-2 rounded-lg text-slate-400 dark:text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-600 dark:hover:text-slate-300 transition-colors disabled:opacity-40"
              aria-label="Recarregar dados"
              title="Recarregar"
            >
              <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
            </button>

            <button
              onClick={onToggleTheme}
              className="p-2 rounded-lg text-slate-400 dark:text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
              aria-label={theme === "dark" ? "Ativar tema claro" : "Ativar tema escuro"}
              title={theme === "dark" ? "Tema claro" : "Tema escuro"}
            >
              {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
            </button>

            <button
              onClick={onNewCar}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white text-sm font-semibold transition-colors"
            >
              <Plus size={16} />
              <span>Novo veículo</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

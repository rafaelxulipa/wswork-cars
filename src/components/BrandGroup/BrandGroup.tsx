import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import type { Brand, Car } from "../../types";
import { VehicleCard } from "../VehicleCard/VehicleCard";
import { formatCurrency } from "../../utils/format";

interface BrandGroupProps {
  brand: Brand;
  cars: Car[];
  defaultOpen?: boolean;
}

export function BrandGroup({ brand, cars, defaultOpen = true }: BrandGroupProps) {
  const [open, setOpen] = useState(defaultOpen);

  const avg = cars.reduce((s, c) => s + c.valor, 0) / cars.length;

  return (
    <section className="mb-8">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-3 mb-4 group"
        aria-expanded={open}
      >
        <div className="w-1 h-8 rounded-full shrink-0" style={{ backgroundColor: brand.cor }} />
        <span className="text-xl font-bold text-slate-800 dark:text-slate-100 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
          {brand.nome}
        </span>
        <span className="ml-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
          {cars.length} {cars.length === 1 ? "veículo" : "veículos"}
        </span>
        <span className="ml-auto text-sm text-slate-400 dark:text-slate-500 hidden sm:block">
          Média: {formatCurrency(avg)}
        </span>
        <span className="text-slate-400 dark:text-slate-500 ml-2">
          {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </span>
      </button>

      {open && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {cars.map((car) => (
            <VehicleCard key={car.id} car={car} />
          ))}
        </div>
      )}
    </section>
  );
}

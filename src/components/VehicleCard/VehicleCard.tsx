import { Calendar, Droplets, DoorOpen } from "lucide-react";
import type { Car } from "../../types";
import { formatCurrency, formatDate, getCorStyle, FUEL_LABELS } from "../../utils/format";

interface VehicleCardProps {
  car: Car;
}

export function VehicleCard({ car }: VehicleCardProps) {
  const { bg, border } = getCorStyle(car.cor);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col">
      <div
        className="h-2"
        style={{
          backgroundColor: bg,
          outline: border ? "1px solid #e2e8f0" : undefined,
        }}
      />

      <div className="p-5 flex flex-col gap-3 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-slate-900 dark:text-slate-100 font-semibold text-base leading-tight">
            {car.nome_modelo}
          </h3>
          <span className="text-emerald-600 dark:text-emerald-400 font-bold text-sm whitespace-nowrap">
            {formatCurrency(car.valor)}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-y-2 gap-x-3 text-sm text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-1.5">
            <Calendar size={13} className="text-slate-400 dark:text-slate-500 shrink-0" />
            {car.ano}
          </span>
          <span className="flex items-center gap-1.5">
            <Droplets size={13} className="text-slate-400 dark:text-slate-500 shrink-0" />
            {FUEL_LABELS[car.combustivel] ?? car.combustivel}
          </span>
          <span className="flex items-center gap-1.5">
            <DoorOpen size={13} className="text-slate-400 dark:text-slate-500 shrink-0" />
            {car.num_portas} portas
          </span>
          <span className="flex items-center gap-1.5">
            <span
              className="w-3 h-3 rounded-full shrink-0 ring-1 ring-slate-200 dark:ring-slate-600"
              style={{ backgroundColor: bg }}
            />
            <span className="capitalize">
              {car.cor.charAt(0) + car.cor.slice(1).toLowerCase()}
            </span>
          </span>
        </div>

        <div className="mt-auto pt-3 border-t border-slate-50 dark:border-slate-700/60 flex items-center justify-between">
          <span className="text-xs text-slate-400 dark:text-slate-500">
            Cadastrado em {formatDate(car.timestamp_cadastro)}
          </span>
          <span className="text-xs text-slate-300 dark:text-slate-600">#{car.id}</span>
        </div>
      </div>
    </div>
  );
}

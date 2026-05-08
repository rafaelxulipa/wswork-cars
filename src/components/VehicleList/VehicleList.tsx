import { useMemo } from "react";
import type { CarsByBrand } from "../../types";
import { BrandGroup } from "../BrandGroup/BrandGroup";

/**
 * Props do componente VehicleList.
 *
 * @see VehicleList.md para documentação completa de uso
 */
export interface VehicleListProps {
  /** Veículos agrupados por marca, estrutura: { [brandId]: { brand, cars[] } } */
  carsByBrand: CarsByBrand;
  /** Exibe skeleton de carregamento quando true */
  loading?: boolean;
  /** Mensagem de erro a exibir (null = sem erro) */
  error?: string | null;
  /** Ordem de exibição das marcas: 'name' | 'count' | 'value' */
  sortBy?: "name" | "count" | "value";
}

function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 overflow-hidden animate-pulse">
      <div className="h-2 bg-slate-200 dark:bg-slate-700" />
      <div className="p-5 space-y-3">
        <div className="flex justify-between">
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-32" />
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-20" />
        </div>
        <div className="grid grid-cols-2 gap-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-4 bg-slate-100 dark:bg-slate-700/60 rounded w-24" />
          ))}
        </div>
        <div className="pt-3 border-t border-slate-50 dark:border-slate-700">
          <div className="h-3 bg-slate-100 dark:bg-slate-700/60 rounded w-28" />
        </div>
      </div>
    </div>
  );
}

function SkeletonGroup() {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-1 h-8 rounded-full bg-slate-200 dark:bg-slate-700" />
        <div className="h-6 w-32 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
        <div className="h-5 w-16 bg-slate-100 dark:bg-slate-800 rounded-full animate-pulse" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {[...Array(3)].map((_, i) => <SkeletonCard key={i} />)}
      </div>
    </div>
  );
}

/**
 * VehicleList — exibe veículos agrupados por marca.
 *
 * Cada grupo pode ser recolhido/expandido. Suporta ordenação de grupos,
 * estado de carregamento com skeleton e estado de erro.
 *
 * @example
 * ```tsx
 * const { carsByBrand, loading, error } = useVehicles();
 * <VehicleList carsByBrand={carsByBrand} loading={loading} error={error} sortBy="name" />
 * ```
 */
export function VehicleList({
  carsByBrand,
  loading = false,
  error = null,
  sortBy = "name",
}: VehicleListProps) {
  const sortedGroups = useMemo(() => {
    const entries = Object.values(carsByBrand);
    return entries.sort((a, b) => {
      if (sortBy === "count") return b.cars.length - a.cars.length;
      if (sortBy === "value")
        return (
          b.cars.reduce((s: number, c: { valor: number }) => s + c.valor, 0) -
          a.cars.reduce((s: number, c: { valor: number }) => s + c.valor, 0)
        );
      return a.brand.nome.localeCompare(b.brand.nome);
    });
  }, [carsByBrand, sortBy]);

  if (loading) {
    return (
      <div>
        <SkeletonGroup />
        <SkeletonGroup />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center gap-3">
        <span className="text-4xl">⚠️</span>
        <p className="text-slate-600 dark:text-slate-400 font-medium">{error}</p>
      </div>
    );
  }

  if (sortedGroups.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center gap-3">
        <span className="text-4xl">🚗</span>
        <p className="text-slate-500 dark:text-slate-400">Nenhum veículo encontrado.</p>
      </div>
    );
  }

  return (
    <div>
      {sortedGroups.map(({ brand, cars }, index) => (
        <BrandGroup
          key={brand.id}
          brand={brand}
          cars={cars}
          defaultOpen={index < 3}
        />
      ))}
    </div>
  );
}

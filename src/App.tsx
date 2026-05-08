import { useState } from "react";
import { Header } from "./components/Header/Header";
import { VehicleList } from "./components/VehicleList/VehicleList";
import { VehicleForm } from "./components/VehicleForm/VehicleForm";
import { useVehicles } from "./hooks/useVehicles";
import { useTheme } from "./hooks/useTheme";
import type { NewCarForm } from "./types";

export default function App() {
  const { carsByBrand, loading, error, addCar, totalCars, reload } = useVehicles();
  const { theme, toggle } = useTheme();
  const [showForm, setShowForm] = useState(false);
  const [sortBy, setSortBy] = useState<"name" | "count" | "value">("name");

  const handleNewCar = (data: NewCarForm) => {
    addCar({
      nome_modelo: data.nome_modelo,
      brand: data.brand,
      ano: data.ano,
      combustivel: data.combustivel,
      num_portas: data.num_portas,
      cor: data.cor,
      valor: data.valor,
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <Header
        totalCars={totalCars}
        totalBrands={Object.keys(carsByBrand).length}
        sortBy={sortBy}
        onSortChange={setSortBy}
        onNewCar={() => setShowForm(true)}
        onReload={reload}
        loading={loading}
        theme={theme}
        onToggleTheme={toggle}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <VehicleList
          carsByBrand={carsByBrand}
          loading={loading}
          error={error}
          sortBy={sortBy}
        />
      </main>

      {showForm && (
        <VehicleForm
          onSubmit={handleNewCar}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
}

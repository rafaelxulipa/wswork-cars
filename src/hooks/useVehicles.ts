import { useCallback, useEffect, useState } from "react";
import { fetchCars, fetchCarsByBrand, loadLocalCars, saveLocalCars } from "../services/api";
import type { Car, CarsByBrand } from "../types";
import { getBrand, inferBrand } from "../utils/brands";

export function useVehicles() {
  const [carsByBrand, setCarsByBrand] = useState<CarsByBrand>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const buildGroups = useCallback((cars: Car[]): CarsByBrand => {
    const groups: CarsByBrand = {};
    for (const car of cars) {
      const brandId = car.brand ?? inferBrand(car.nome_modelo);
      const brand = getBrand(brandId);
      if (!groups[brandId]) {
        groups[brandId] = { brand, cars: [] };
      }
      groups[brandId].cars.push(car);
    }
    return groups;
  }, []);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [brandCars, plainCars] = await Promise.all([fetchCarsByBrand(), fetchCars()]);
      const localCars = loadLocalCars();

      const allById = new Map<number, Car>();
      for (const car of [...plainCars, ...brandCars, ...localCars]) {
        allById.set(car.id, car);
      }

      setCarsByBrand(buildGroups(Array.from(allById.values())));
    } catch (e) {
      setError("Erro ao carregar os veículos. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }, [buildGroups]);

  useEffect(() => {
    load();
  }, [load]);

  const addCar = useCallback(
    (car: Omit<Car, "id" | "timestamp_cadastro" | "modelo_id">) => {
      const local = loadLocalCars();
      const maxId = local.reduce((m, c) => Math.max(m, c.id), 10000);
      const newCar: Car = {
        ...car,
        id: maxId + 1,
        timestamp_cadastro: Math.floor(Date.now() / 1000),
        modelo_id: 0,
      };
      const updated = [...local, newCar];
      saveLocalCars(updated);
      load();
      return newCar;
    },
    [load]
  );

  const totalCars = Object.values(carsByBrand).reduce((s, g) => s + g.cars.length, 0);

  return { carsByBrand, loading, error, addCar, totalCars, reload: load };
}

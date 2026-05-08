import type { Car } from "../types";

const REMOTE_BRAND_URL = "https://wswork.com.br/cars_by_brand.json";
const REMOTE_CARS_URL = "https://wswork.com.br/cars.json";
const LOCAL_BRAND_URL = "/cars_by_brand.json";
const LOCAL_CARS_URL = "/cars.json";

async function fetchWithFallback(remoteUrl: string, localUrl: string): Promise<Car[]> {
  const tryFetch = async (url: string): Promise<Car[]> => {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const text = await res.text();
    const cleaned = text.replace(/,(\s*[\]}])/g, "$1");
    const data = JSON.parse(cleaned);
    return data.cars ?? [];
  };

  try {
    return await tryFetch(remoteUrl);
  } catch {
    console.warn(`Falha ao buscar ${remoteUrl}, usando fallback local.`);
    return tryFetch(localUrl);
  }
}

export async function fetchCarsByBrand(): Promise<Car[]> {
  return fetchWithFallback(REMOTE_BRAND_URL, LOCAL_BRAND_URL);
}

export async function fetchCars(): Promise<Car[]> {
  return fetchWithFallback(REMOTE_CARS_URL, LOCAL_CARS_URL);
}

const STORAGE_KEY = "wswork_cars";

export function loadLocalCars(): Car[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
  } catch {
    return [];
  }
}

export function saveLocalCars(cars: Car[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cars));
}

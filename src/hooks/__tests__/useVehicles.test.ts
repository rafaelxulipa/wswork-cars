import { renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { useVehicles } from "../useVehicles";
import { makeCar } from "../../test/factories";

const mockCarsBrand = [makeCar({ id: 1, brand: 1, nome_modelo: "COROLLA" })];
const mockCars = [makeCar({ id: 2, nome_modelo: "ONIX PLUS" })];

function mockFetch(data: object) {
  return vi.fn().mockResolvedValue({
    ok: true,
    text: async () => JSON.stringify(data),
  });
}

describe("useVehicles", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("inicia em estado de loading", () => {
    vi.stubGlobal("fetch", mockFetch({ cars: [] }));
    const { result } = renderHook(() => useVehicles());
    expect(result.current.loading).toBe(true);
  });

  it("carrega e agrupa veículos das duas APIs", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn()
        .mockResolvedValueOnce({ ok: true, text: async () => JSON.stringify({ cars: mockCarsBrand }) })
        .mockResolvedValueOnce({ ok: true, text: async () => JSON.stringify({ cars: mockCars }) })
    );

    const { result } = renderHook(() => useVehicles());

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.totalCars).toBeGreaterThan(0);
    expect(Object.keys(result.current.carsByBrand).length).toBeGreaterThan(0);
  });

  it("deduplica veículos com o mesmo id", async () => {
    const duplicateCar = makeCar({ id: 1, brand: 1 });
    vi.stubGlobal(
      "fetch",
      vi.fn()
        .mockResolvedValueOnce({ ok: true, text: async () => JSON.stringify({ cars: [duplicateCar] }) })
        .mockResolvedValueOnce({ ok: true, text: async () => JSON.stringify({ cars: [duplicateCar] }) })
    );

    const { result } = renderHook(() => useVehicles());
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.totalCars).toBe(1);
  });

  it("define error quando o fetch falha completamente", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("network")));

    const { result } = renderHook(() => useVehicles());
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.error).not.toBeNull();
  });

  it("addCar persiste o veículo e o inclui na listagem", async () => {
    vi.stubGlobal("fetch", mockFetch({ cars: [] }));
    const { result } = renderHook(() => useVehicles());
    await waitFor(() => expect(result.current.loading).toBe(false));

    vi.stubGlobal("fetch", mockFetch({ cars: [] }));
    result.current.addCar({
      nome_modelo: "NOVO MODELO",
      brand: 1,
      ano: 2024,
      combustivel: "FLEX",
      num_portas: 4,
      cor: "PRETA",
      valor: 80000,
    });

    await waitFor(() => {
      expect(result.current.totalCars).toBeGreaterThan(0);
    });
  });
});

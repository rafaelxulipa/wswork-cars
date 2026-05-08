import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { VehicleList } from "../VehicleList";
import { makeBrand, makeCar } from "../../../test/factories";
import type { CarsByBrand } from "../../../types";

const mockData: CarsByBrand = {
  1: {
    brand: makeBrand({ id: 1, nome: "Toyota" }),
    cars: [makeCar({ id: 1, nome_modelo: "COROLLA" })],
  },
  3: {
    brand: makeBrand({ id: 3, nome: "Chevrolet", cor: "#CC0000" }),
    cars: [makeCar({ id: 2, nome_modelo: "ONIX PLUS", brand: 3 })],
  },
};

describe("VehicleList", () => {
  it("exibe os grupos de marca", () => {
    render(<VehicleList carsByBrand={mockData} />);
    expect(screen.getByText("Toyota")).toBeInTheDocument();
    expect(screen.getByText("Chevrolet")).toBeInTheDocument();
  });

  it("exibe cards dos veículos", () => {
    render(<VehicleList carsByBrand={mockData} />);
    expect(screen.getByText("COROLLA")).toBeInTheDocument();
    expect(screen.getByText("ONIX PLUS")).toBeInTheDocument();
  });

  it("exibe skeleton quando loading=true", () => {
    const { container } = render(<VehicleList carsByBrand={{}} loading={true} />);
    expect(container.querySelector(".animate-pulse")).toBeInTheDocument();
  });

  it("exibe mensagem de erro quando error não é null", () => {
    render(<VehicleList carsByBrand={{}} error="Falha na rede" />);
    expect(screen.getByText("Falha na rede")).toBeInTheDocument();
  });

  it("exibe mensagem de vazio quando não há dados", () => {
    render(<VehicleList carsByBrand={{}} />);
    expect(screen.getByText(/nenhum veículo/i)).toBeInTheDocument();
  });

  it("ordena por nome da marca quando sortBy='name'", () => {
    render(<VehicleList carsByBrand={mockData} sortBy="name" />);
    const headings = screen.getAllByRole("button");
    const names = headings.map((h) => h.textContent ?? "");
    const chevroletIdx = names.findIndex((n) => n.includes("Chevrolet"));
    const toyotaIdx = names.findIndex((n) => n.includes("Toyota"));
    expect(chevroletIdx).toBeLessThan(toyotaIdx);
  });
});

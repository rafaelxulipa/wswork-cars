import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { VehicleCard } from "../VehicleCard";
import { makeCar } from "../../../test/factories";

describe("VehicleCard", () => {
  it("exibe o nome do modelo", () => {
    render(<VehicleCard car={makeCar({ nome_modelo: "COROLLA" })} />);
    expect(screen.getByText("COROLLA")).toBeInTheDocument();
  });

  it("exibe o valor formatado em reais", () => {
    render(<VehicleCard car={makeCar({ valor: 150000 })} />);
    expect(screen.getByText(/150/)).toBeInTheDocument();
    expect(screen.getByText(/R\$/)).toBeInTheDocument();
  });

  it("exibe o ano corretamente", () => {
    render(<VehicleCard car={makeCar({ ano: 2022 })} />);
    expect(screen.getByText("2022")).toBeInTheDocument();
  });

  it("exibe o número de portas", () => {
    render(<VehicleCard car={makeCar({ num_portas: 2 })} />);
    expect(screen.getByText("2 portas")).toBeInTheDocument();
  });

  it("exibe rótulo legível para combustível FLEX", () => {
    render(<VehicleCard car={makeCar({ combustivel: "FLEX" })} />);
    expect(screen.getByText("Flex")).toBeInTheDocument();
  });

  it("exibe rótulo legível para combustível DIESEL", () => {
    render(<VehicleCard car={makeCar({ combustivel: "DIESEL" })} />);
    expect(screen.getByText("Diesel")).toBeInTheDocument();
  });

  it("exibe a cor com initial uppercase", () => {
    render(<VehicleCard car={makeCar({ cor: "AZUL" })} />);
    expect(screen.getByText("Azul")).toBeInTheDocument();
  });

  it("renderiza sem erros com timestamp muito grande (ms)", () => {
    expect(() =>
      render(<VehicleCard car={makeCar({ timestamp_cadastro: 16965354321 })} />)
    ).not.toThrow();
  });
});

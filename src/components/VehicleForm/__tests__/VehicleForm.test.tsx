import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { VehicleForm } from "../VehicleForm";

const setup = (onSubmit = vi.fn(), onClose = vi.fn()) => {
  render(<VehicleForm onSubmit={onSubmit} onClose={onClose} />);
  return { onSubmit, onClose };
};

describe("VehicleForm — renderização", () => {
  it("exibe o título do formulário", () => {
    setup();
    expect(screen.getByText("Cadastrar Novo Veículo")).toBeInTheDocument();
  });

  it("exibe todos os campos obrigatórios", () => {
    setup();
    expect(screen.getByLabelText(/modelo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/marca/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/ano/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/combustível/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/cor/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/valor/i)).toBeInTheDocument();
  });
});

describe("VehicleForm — validação", () => {
  it("exibe erros ao submeter sem preencher campos", async () => {
    setup();
    fireEvent.click(screen.getByRole("button", { name: /cadastrar/i }));
    await waitFor(() => {
      expect(screen.getByText(/informe o modelo/i)).toBeInTheDocument();
    });
  });

  it("não submete com modelo muito curto", async () => {
    const { onSubmit } = setup();
    await userEvent.type(screen.getByLabelText(/modelo/i), "A");
    fireEvent.click(screen.getByRole("button", { name: /cadastrar/i }));
    await waitFor(() => {
      expect(screen.getByText(/mínimo 2 caracteres/i)).toBeInTheDocument();
    });
    expect(onSubmit).not.toHaveBeenCalled();
  });
});

describe("VehicleForm — segurança", () => {
  it("rejeita modelo com caracteres especiais proibidos", async () => {
    setup();
    const input = screen.getByLabelText(/modelo/i);
    await userEvent.type(input, "<script>alert(1)</script>");
    fireEvent.click(screen.getByRole("button", { name: /cadastrar/i }));
    await waitFor(() => {
      expect(
        screen.getByText(/apenas letras, números, espaços e hífens/i)
      ).toBeInTheDocument();
    });
  });
});

describe("VehicleForm — interação", () => {
  it("chama onClose ao clicar no backdrop", async () => {
    const { onClose } = setup();
    const backdrop = document.querySelector('[aria-hidden="true"]') as HTMLElement;
    fireEvent.click(backdrop);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("chama onClose ao clicar no botão X", async () => {
    const { onClose } = setup();
    fireEvent.click(screen.getByLabelText(/fechar formulário/i));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});

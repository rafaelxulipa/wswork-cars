import { useForm } from "react-hook-form";
import { X, Plus, AlertCircle } from "lucide-react";
import { BRANDS } from "../../utils/brands";
import type { NewCarForm } from "../../types";

interface VehicleFormProps {
  onSubmit: (data: NewCarForm) => void;
  onClose: () => void;
}

const currentYear = new Date().getFullYear();
const MIN_YEAR = 1900;

const FUEL_OPTIONS = [
  { value: "FLEX", label: "Flex" },
  { value: "GASOLINA", label: "Gasolina" },
  { value: "DIESEL", label: "Diesel" },
  { value: "ELETRICO", label: "Elétrico" },
  { value: "ETANOL", label: "Etanol" },
  { value: "HIBRIDO", label: "Híbrido" },
];

const COR_OPTIONS = [
  "BRANCA", "PRETA", "PRATA", "CINZA", "AZUL", "VERMELHA",
  "VERDE", "AMARELA", "BEGE", "MARROM", "LARANJA", "VINHO", "DOURADA",
];

const DOOR_OPTIONS = [2, 4];

function sanitizeText(value: string): string {
  return value.replace(/[<>"'/\\]/g, "").trimStart();
}

export function VehicleForm({ onSubmit, onClose }: VehicleFormProps) {
  const FIELD_IDS = {
    nome_modelo: "field-nome_modelo",
    brand: "field-brand",
    ano: "field-ano",
    num_portas: "field-num_portas",
    combustivel: "field-combustivel",
    cor: "field-cor",
    valor: "field-valor",
  } as const;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NewCarForm>({
    defaultValues: {
      num_portas: 4,
      combustivel: "FLEX",
      ano: currentYear,
    },
  });

  const handleFormSubmit = (data: NewCarForm) => {
    const sanitized: NewCarForm = {
      ...data,
      nome_modelo: sanitizeText(data.nome_modelo).toUpperCase(),
      cor: sanitizeText(data.cor).toUpperCase(),
      valor: Number(data.valor),
      ano: Number(data.ano),
      num_portas: Number(data.num_portas),
      brand: Number(data.brand),
    };
    onSubmit(sanitized);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="form-title"
    >
      <div
        className="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto border border-transparent dark:border-slate-700">
        <div className="sticky top-0 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-700 px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
          <h2 id="form-title" className="text-lg font-bold text-slate-800 dark:text-slate-100">
            Cadastrar Novo Veículo
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
            aria-label="Fechar formulário"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)} noValidate className="p-6 space-y-5">
          <Field label="Modelo" htmlFor={FIELD_IDS.nome_modelo} error={errors.nome_modelo?.message}>
            <input
              id={FIELD_IDS.nome_modelo}
              {...register("nome_modelo", {
                required: "Informe o modelo do veículo",
                minLength: { value: 2, message: "Mínimo 2 caracteres" },
                maxLength: { value: 60, message: "Máximo 60 caracteres" },
                pattern: {
                  value: /^[a-zA-Z0-9 \-À-ÿ]+$/,
                  message: "Apenas letras, números, espaços e hífens",
                },
              })}
              placeholder="Ex: COROLLA"
              className={inputClass(!!errors.nome_modelo)}
              autoComplete="off"
            />
          </Field>

          <Field label="Marca" htmlFor={FIELD_IDS.brand} error={errors.brand?.message}>
            <select
              id={FIELD_IDS.brand}
              {...register("brand", { required: "Selecione a marca" })}
              className={inputClass(!!errors.brand)}
            >
              <option value="">Selecione...</option>
              {Object.values(BRANDS)
                .filter((b) => b.id !== 0)
                .sort((a, b) => a.nome.localeCompare(b.nome))
                .map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.nome}
                  </option>
                ))}
            </select>
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Ano" htmlFor={FIELD_IDS.ano} error={errors.ano?.message}>
              <input
                id={FIELD_IDS.ano}
                type="number"
                {...register("ano", {
                  required: "Informe o ano",
                  min: { value: MIN_YEAR, message: `Mínimo ${MIN_YEAR}` },
                  max: { value: currentYear + 1, message: `Máximo ${currentYear + 1}` },
                })}
                className={inputClass(!!errors.ano)}
                min={MIN_YEAR}
                max={currentYear + 1}
              />
            </Field>

            <Field label="Nº de Portas" htmlFor={FIELD_IDS.num_portas} error={errors.num_portas?.message}>
              <select
                id={FIELD_IDS.num_portas}
                {...register("num_portas", { required: "Selecione" })}
                className={inputClass(!!errors.num_portas)}
              >
                {DOOR_OPTIONS.map((d) => (
                  <option key={d} value={d}>{d} portas</option>
                ))}
              </select>
            </Field>
          </div>

          <Field label="Combustível" htmlFor={FIELD_IDS.combustivel} error={errors.combustivel?.message}>
            <select
              id={FIELD_IDS.combustivel}
              {...register("combustivel", { required: "Selecione o combustível" })}
              className={inputClass(!!errors.combustivel)}
            >
              {FUEL_OPTIONS.map((f) => (
                <option key={f.value} value={f.value}>{f.label}</option>
              ))}
            </select>
          </Field>

          <Field label="Cor" htmlFor={FIELD_IDS.cor} error={errors.cor?.message}>
            <select
              id={FIELD_IDS.cor}
              {...register("cor", { required: "Selecione a cor" })}
              className={inputClass(!!errors.cor)}
            >
              <option value="">Selecione...</option>
              {COR_OPTIONS.map((c) => (
                <option key={c} value={c}>
                  {c.charAt(0) + c.slice(1).toLowerCase()}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Valor (R$)" htmlFor={FIELD_IDS.valor} error={errors.valor?.message}>
            <input
              id={FIELD_IDS.valor}
              type="number"
              step="0.01"
              {...register("valor", {
                required: "Informe o valor",
                min: { value: 1, message: "Valor deve ser maior que zero" },
                max: { value: 99_999_999, message: "Valor muito alto" },
              })}
              placeholder="Ex: 85000"
              className={inputClass(!!errors.valor)}
              min={1}
              max={99999999}
            />
          </Field>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 active:bg-indigo-800 text-white font-semibold transition-colors disabled:opacity-60 disabled:cursor-not-allowed mt-2"
          >
            <Plus size={18} />
            Cadastrar Veículo
          </button>
        </form>
      </div>
    </div>
  );
}

function inputClass(hasError: boolean) {
  return [
    "w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition-colors",
    "text-slate-800 dark:text-slate-100",
    "focus:ring-2 focus:ring-indigo-500/30",
    hasError
      ? "border-red-400 bg-red-50 dark:bg-red-900/20 dark:border-red-500 focus:border-red-400"
      : "border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:border-indigo-400 focus:bg-white dark:focus:bg-slate-700",
  ].join(" ");
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-sm font-medium text-slate-700 dark:text-slate-300">
        {label}
      </label>
      {children}
      {error && (
        <p className="flex items-center gap-1 text-xs text-red-500 dark:text-red-400" role="alert">
          <AlertCircle size={12} />
          {error}
        </p>
      )}
    </div>
  );
}

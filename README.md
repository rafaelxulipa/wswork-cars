# 🚗 WS Work Cars

Aplicação React desenvolvida como teste técnico para a **WS Work**. Exibe uma listagem de veículos agrupados por marca, com persistência local de novos cadastros.

---

## 📋 Requisitos atendidos

| # | Requisito | Status |
|---|-----------|--------|
| 1 | Listagem de veículos agrupada por marcas | ✅ |
| 2 | Componente `VehicleList` documentado | ✅ |
| 3 | Formulário de cadastro de novo carro | ✅ |
| 4 | Pronto para hospedagem (Vercel) | ✅ |

---

## 🛠️ Tecnologias

| Tecnologia | Versão | Motivo da escolha |
|---|---|---|
| React | 19 | Framework principal |
| TypeScript | 6 | Tipagem estática, maior confiabilidade |
| Vite | 8 | Build rápido, HMR, suporte nativo a ESM |
| Tailwind CSS v4 | 4 | Estilização utilitária sem CSS customizado |
| React Hook Form | 7 | Validação de formulário performática (uncontrolled) |
| Lucide React | latest | Ícones leves e consistentes |
| Vitest | 4 | Testes rápidos com suporte a jsdom e globals |
| Testing Library | 16 | Testes orientados ao comportamento do usuário |

---

## 🚀 Como rodar localmente

### Pré-requisitos

- Node.js **18+**
- npm **9+**

### Instalação

```bash
# 1. Clone o repositório (ou extraia o zip)
git clone <url-do-repositorio>
cd wswork-cars

# 2. Instale as dependências
npm install

# 3. Inicie o servidor de desenvolvimento
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`.

---

## 📦 Scripts disponíveis

| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia o servidor de desenvolvimento com HMR |
| `npm run build` | Gera o build de produção na pasta `dist/` |
| `npm run preview` | Serve o build de produção localmente |
| `npm test` | Executa a suíte de testes uma única vez |
| `npm run test:watch` | Executa os testes em modo watch |
| `npm run test:coverage` | Executa os testes com relatório de cobertura |

---

## ☁️ Deploy na Vercel

O projeto já possui `vercel.json` configurado. Basta conectar o repositório na Vercel ou usar o CLI:

```bash
# Instale o Vercel CLI (se necessário)
npm i -g vercel

# Dentro da pasta do projeto
vercel
```

A Vercel detectará automaticamente o Vite, executará `npm run build` e publicará o conteúdo da pasta `dist/`.

> **SPA Routing:** o `vercel.json` já inclui o rewrite `/* → /index.html` para que o React Router funcione corretamente em rotas diretas.

---

## 🏗️ Arquitetura do projeto

```
src/
├── types/
│   └── index.ts              # Interfaces TypeScript (Car, Brand, NewCarForm...)
│
├── utils/
│   ├── brands.ts             # Mapeamento de marcas e inferência por modelo
│   └── format.ts             # Formatação de moeda, data, cor e combustível
│
├── services/
│   └── api.ts                # Fetch das APIs com fallback local + localStorage
│
├── hooks/
│   └── useVehicles.ts        # Hook principal: carrega, mescla e agrupa veículos
│
├── components/
│   ├── Header/               # Cabeçalho fixo com ordenação e botão de cadastro
│   ├── VehicleList/          # Listagem agrupada por marca (componente documentado)
│   │   └── VehicleList.md    # Documentação de uso do componente
│   ├── BrandGroup/           # Grupo colapsável de uma marca
│   ├── VehicleCard/          # Card individual de um veículo
│   └── VehicleForm/          # Modal de cadastro com validação
│
├── test/
│   ├── setup.ts              # Configuração global do Testing Library
│   └── factories.ts          # Funções auxiliares para criar dados de teste
│
├── App.tsx                   # Componente raiz — orquestra estado e navegação
└── main.tsx                  # Entry point do React
```

---

## 🔌 Fontes de dados

A aplicação consome duas APIs externas e possui **fallback local** para cada uma:

| API | URL remota | Fallback |
|---|---|---|
| Carros por marca | `https://wswork.com.br/cars_by_brand.json` | `public/cars_by_brand.json` |
| Carros genéricos | `https://wswork.com.br/cars.json` | `public/cars.json` |

### Por que dois endpoints?

- `cars_by_brand.json` — retorna carros **com** campo `brand` (id da marca)
- `cars.json` — retorna carros **sem** campo `brand`

A aplicação mescla os dois conjuntos, **deduplica por ID** e **infere a marca** pelo nome do modelo para os carros sem `brand`.

### Fallback local

A API remota possui um JSON malformado (vírgulas ausentes). O serviço `fetchWithFallback` aplica uma limpeza via regex antes do parse e, se ainda assim falhar, carrega os arquivos locais em `public/`.

---

## 💾 Persistência de novos veículos

Veículos cadastrados pelo formulário são salvos no `localStorage` com a chave `wswork_cars`. Eles são mesclados com os dados das APIs a cada carregamento. Não há backend — a persistência é inteiramente client-side.

---

## 🔒 Segurança

| Medida | Onde |
|---|---|
| Sanitização de input | `VehicleForm` — remove `< > " ' / \` antes de salvar |
| Validação de padrão (regex) | `react-hook-form` — aceita apenas letras, números, espaços e hífens no modelo |
| Limites de valor numérico | Campos `ano` e `valor` têm `min`/`max` no schema de validação |
| `novalidate` + validação client-side | Formulário não depende da validação nativa do browser (inconsistente entre browsers) |
| `aria-modal`, `aria-labelledby` | Modal acessível para leitores de tela |

---

## 🧪 Testes

```bash
npm test
```

```
 Test Files  7 passed (7)
      Tests  49 passed (49)
```

### Arquivos de teste

| Arquivo | O que testa |
|---|---|
| `utils/__tests__/brands.test.ts` | Inferência de marca, mapeamento, formatos hex |
| `utils/__tests__/format.test.ts` | Formatação de moeda, data, cor |
| `services/__tests__/api.test.ts` | Fallback de rede, localStorage corrompido, fetch mockado |
| `VehicleCard/__tests__/` | Renderização de todos os campos do card |
| `VehicleList/__tests__/` | Estados loading/error/vazio, ordenação, agrupamento |
| `VehicleForm/__tests__/` | Validação, segurança (XSS), interação (fechar modal) |
| `hooks/__tests__/useVehicles.test.ts` | Carregamento, deduplicação, addCar, estado de erro |

---

## 🧩 Componente VehicleList — uso rápido

```tsx
import { VehicleList } from "./components/VehicleList/VehicleList";
import { useVehicles } from "./hooks/useVehicles";

function MinhaListagem() {
  const { carsByBrand, loading, error } = useVehicles();

  return (
    <VehicleList
      carsByBrand={carsByBrand}
      loading={loading}
      error={error}
      sortBy="name"   // "name" | "count" | "value"
    />
  );
}
```

> Documentação completa em [`src/components/VehicleList/VehicleList.md`](src/components/VehicleList/VehicleList.md)

---

## 📌 Decisões técnicas

### Por que `localStorage` e não Context/Redux?

O escopo do teste não exige compartilhamento de estado entre múltiplas rotas. O hook `useVehicles` já centraliza toda a lógica; adicionar Redux seria over-engineering para o problema.

### Por que Tailwind CSS v4?

A v4 funciona como plugin do Vite (zero arquivo de configuração separado), integra-se nativamente com PostCSS e gera CSS mínimo. Evita a criação de arquivos `.module.css` para cada componente.

### Por que React Hook Form?

Formulários com muitos campos em React sofrem de re-renders excessivos com `useState`. O RHF usa refs (uncontrolled inputs) internamente, disparando re-renders apenas na validação — ideal para formulários de cadastro.

### Por que inferir marca por nome do modelo?

O endpoint `cars.json` não retorna o campo `brand`. Em vez de descartar esses veículos ou mostrá-los todos em "Sem marca", implementamos uma tabela de mapeamento `modelo → brandId` que cobre as principais montadoras do mercado brasileiro.

---

## 👤 Autor

Desenvolvido por **Otávio Melo** como teste técnico para a WS Work.

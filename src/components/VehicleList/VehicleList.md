# VehicleList

Componente para exibir uma listagem de veículos agrupados por marca. Cada grupo pode ser expandido ou recolhido. Suporta ordenação, estado de carregamento com skeleton animado e estado de erro.

---

## Instalação / dependências

O componente usa apenas dependências internas do projeto. Nenhuma instalação adicional é necessária.

---

## Props

| Prop | Tipo | Padrão | Obrigatório | Descrição |
|---|---|---|---|---|
| `carsByBrand` | `CarsByBrand` | — | ✅ | Mapa de marcas → veículos (veja tipo abaixo) |
| `loading` | `boolean` | `false` | ❌ | Exibe skeleton enquanto os dados carregam |
| `error` | `string \| null` | `null` | ❌ | Mensagem de erro a ser exibida |
| `sortBy` | `"name" \| "count" \| "value"` | `"name"` | ❌ | Critério de ordenação dos grupos de marca |

### Tipo `CarsByBrand`

```ts
interface CarsByBrand {
  [brandId: number]: {
    brand: {
      id: number;
      nome: string;
      logo: string;
      cor: string;       // hex usado na barra colorida do grupo
    };
    cars: Car[];
  };
}
```

### Tipo `Car`

```ts
interface Car {
  id: number;
  timestamp_cadastro: number;   // Unix timestamp (segundos)
  modelo_id: number;
  ano: number;
  combustivel: string;          // "FLEX" | "GASOLINA" | "DIESEL" | ...
  num_portas: number;
  cor: string;                  // "BRANCA" | "AZUL" | "PRETO" | ...
  nome_modelo: string;
  valor: number;                // em reais
  brand?: number;               // id da marca (opcional — inferido se ausente)
}
```

---

## Uso básico

```tsx
import { VehicleList } from "./components/VehicleList/VehicleList";
import { useVehicles } from "./hooks/useVehicles";

function MinhaTela() {
  const { carsByBrand, loading, error } = useVehicles();

  return (
    <VehicleList
      carsByBrand={carsByBrand}
      loading={loading}
      error={error}
    />
  );
}
```

---

## Ordenação dos grupos

```tsx
// Ordenar por nome da marca (padrão)
<VehicleList carsByBrand={carsByBrand} sortBy="name" />

// Ordenar pela quantidade de veículos (maior primeiro)
<VehicleList carsByBrand={carsByBrand} sortBy="count" />

// Ordenar pelo valor total em estoque (maior primeiro)
<VehicleList carsByBrand={carsByBrand} sortBy="value" />
```

---

## Estado de carregamento

Enquanto `loading={true}`, o componente exibe dois grupos de skeleton animados no lugar dos dados reais. Isso evita layout shift e melhora a percepção de performance.

```tsx
<VehicleList carsByBrand={{}} loading={true} />
```

---

## Estado de erro

Quando `error` é uma string não nula, o componente exibe uma mensagem centralizada com ícone de aviso.

```tsx
<VehicleList carsByBrand={{}} error="Não foi possível carregar os veículos." />
```

---

## Estado vazio

Se `carsByBrand` estiver vazio e não houver `loading` nem `error`, o componente exibe uma mensagem amigável indicando que nenhum veículo foi encontrado.

---

## Estrutura de subcomponentes

```
VehicleList
└── BrandGroup          (um por marca)
    └── VehicleCard     (um por veículo)
```

- **`BrandGroup`** — cabeçalho clicável com nome da marca, contagem de veículos, valor médio e botão de colapso.
- **`VehicleCard`** — card individual com modelo, ano, combustível, cor, portas, valor e data de cadastro.

---

## Comportamento de colapso

Por padrão, os 3 primeiros grupos são exibidos expandidos (`defaultOpen={true}`) e os demais iniciam recolhidos. O usuário pode clicar no cabeçalho do grupo para alternar.

---

## Acessibilidade

O botão de colapso de cada grupo usa `aria-expanded` para comunicar o estado ao leitor de tela.

---

## Exemplo completo com dados mockados

```tsx
import { VehicleList } from "./components/VehicleList/VehicleList";

const mockData = {
  1: {
    brand: { id: 1, nome: "Toyota", logo: "🚗", cor: "#EB0A1E" },
    cars: [
      {
        id: 1,
        timestamp_cadastro: 1696539488,
        modelo_id: 12,
        ano: 2022,
        combustivel: "FLEX",
        num_portas: 4,
        cor: "PRATA",
        nome_modelo: "COROLLA",
        valor: 150000,
        brand: 1,
      },
    ],
  },
};

function Demo() {
  return <VehicleList carsByBrand={mockData} />;
}
```

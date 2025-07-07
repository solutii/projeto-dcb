import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
} from "recharts";

interface Conta {
  name: string;
  value: number;
  count: number;
}

const COLORS = ["#10b981", "#f59e0b", "#3b82f6", "#ef4444", "#8b5cf6"];

export function ContasAPagarPieChart({ data }: { data: Conta[] }) {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md shadow-black border border-slate-200 h-[500px] flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-bold text-gray-800">Contas a Pagar</h3>
          <p className="text-sm text-gray-500">Distribuição por categoria</p>
        </div>
        <div className="bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium">
          Total: {formatCurrency(total)}
        </div>
      </div>

      <div className="flex-grow">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={120}
              paddingAngle={2}
              dataKey="value"
              animationBegin={0}
              animationDuration={1000}
              animationEasing="ease-out"
              labelLine={false}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  stroke="#fff"
                  strokeWidth={2}
                  style={{
                    filter: `drop-shadow(0px 2px 4px ${COLORS[index % COLORS.length]}33)`,
                    cursor: "pointer",
                    transition: "opacity 0.3s",
                  }}
                />
              ))}
              <Label
                value={formatCurrency(total)}
                position="center"
                className="text-2xl font-bold fill-gray-700"
              />
            </Pie>
            <Tooltip
              contentStyle={{
                borderRadius: "12px",
                border: "none",
                boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
                background: "#ffffff",
              }}
              formatter={(value, name, props) =>
                `${formatCurrency(Number(value))} (${Math.round(
                  (Number(value) / total) * 100
                )}%) - Qtd: ${props.payload.count}`
              }
              itemStyle={{ fontWeight: "bold" }}
            />
            <Legend
              layout="vertical"
              verticalAlign="middle"
              align="right"
              iconSize={12}
              iconType="circle"
              formatter={(value, entry, index) => (
                <span className="text-gray-600 text-sm">
                  {value} - {Math.round((data[index].value / total) * 100)}%
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {data.map((item, index) => (
          <div key={`badge-${index}`} className="flex items-center">
            <div
              className="w-3 h-3 rounded-full mr-2"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            />
            <span className="text-sm text-gray-600">
              {item.name}: {formatCurrency(item.value)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface ContaMensal {
  mes: string;
  pagas: number;
  aberto: number;
}

export function ContasAnuaisLineChart({ data }: { data: ContaMensal[] }) {
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md shadow-black border border-slate-200 h-[500px] flex flex-col">
      <h3 className="text-lg font-bold text-gray-800 mb-2">Contas Anuais</h3>
      <p className="text-sm text-gray-500 mb-4">Evolução mensal de contas pagas e em aberto</p>
      <div className="flex-grow">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
            <XAxis
              dataKey="mes"
              tick={{ fontSize: 12, fill: "#6b7280" }}
              axisLine={false}
              tickLine={false}
              padding={{ left: 10, right: 10 }}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "#6b7280" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={formatCurrency}
              width={80}
            />
            <Tooltip
              contentStyle={{
                borderRadius: "12px",
                border: "none",
                boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
                background: "#ffffff",
              }}
              formatter={(value) => [formatCurrency(Number(value)), ""]}
              itemStyle={{ fontWeight: "bold" }}
              labelStyle={{ fontWeight: "600", color: "#4b5563" }}
            />
            <Legend verticalAlign="top" height={40} iconType="circle" iconSize={10} />
            <Line
              type="monotone"
              dataKey="pagas"
              stroke="#10b981"
              strokeWidth={3}
              strokeOpacity={0.9}
              dot={{ fill: "#10b981", strokeWidth: 2, r: 5, stroke: "#ffffff" }}
              activeDot={{ r: 7, stroke: "#ffffff", strokeWidth: 3, fill: "#059669" }}
              name="Contas Pagas"
              animationDuration={1500}
            />
            <Line
              type="monotone"
              dataKey="aberto"
              stroke="#f59e0b"
              strokeWidth={3}
              strokeOpacity={0.9}
              dot={{ fill: "#f59e0b", strokeWidth: 2, r: 5, stroke: "#ffffff" }}
              activeDot={{ r: 7, stroke: "#ffffff", strokeWidth: 3, fill: "#d97706" }}
              name="Contas em Aberto"
              animationDuration={1500}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
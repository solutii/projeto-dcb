import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

export function ComprasPorProdutoChart({
  data,
}: {
  data: { produto: string; valor: number }[];
}) {
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);

  const colors = ["#00E096", "#00C897", "#00B4A0", "#00A0A8", "#008CAB"];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md shadow-black border border-slate-200 h-[500px] flex flex-col">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Compras por Produto</h3>
      <div className="flex-grow">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 5, right: 20, bottom: 40, left: 0 }}
            barSize={38}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis
              dataKey="produto"
              tick={{ fontSize: 12, fill: "#6b7280" }}
              axisLine={false}
              tickLine={false}
              angle={-45}
              textAnchor="end"
              height={60}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "#6b7280" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={formatCurrency}
              width={80}
            />
            <Tooltip
              cursor={{ fill: "rgba(0, 184, 160, 0.1)" }}
              contentStyle={{
                borderRadius: "12px",
                border: "none",
                boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
              }}
              formatter={(value) => [formatCurrency(Number(value)), "Valor"]}
              itemStyle={{ color: "#00B4A0", fontWeight: "bold" }}
            />
            <Bar dataKey="valor" radius={[6, 6, 0, 0]} animationDuration={1500}>
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                  style={{
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                  }}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-center mt-4 space-x-2">
        {data.map((item, index) => (
          <div key={`legend-${index}`} className="flex items-center">
            <div
              className="w-3 h-3 rounded-full mr-1"
              style={{ backgroundColor: colors[index % colors.length] }}
            />
            <span className="text-xs text-gray-600">{item.produto}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
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
import { useScreenSize } from "@/hooks/useScreenSize";

interface ContaMensal {
  mes: string;
  pagas: number;
  aberto: number;
}

export function ContasPagarAnoChart({ data }: { data: ContaMensal[] }) {
  const screen = useScreenSize();

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);

  return (
    <div className="bg-white p-3 sm:p-4 lg:p-6 rounded-lg shadow-md shadow-black border border-slate-200 h-[400px] sm:h-[450px] lg:h-[540px] flex flex-col">
      <h3 className="text-sm sm:text-base lg:text-lg font-bold text-gray-800 mb-1 sm:mb-2 uppercase italic tracking-wider">
        Contas a Pagar/Ano
      </h3>
      <p className="text-base text-gray-600 font-semibold italic">
        Evolução mensal de contas pagas e em aberto
      </p>
      <div className="flex-grow">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: screen.isMobile ? 10 : 20,
              left: screen.isMobile ? 5 : 0,
              bottom: 5,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#f3f4f6"
            />
            <XAxis
              dataKey="mes"
              tick={{
                fontSize: screen.tickSize,
                fill: "#6b7280",
              }}
              axisLine={false}
              tickLine={false}
              padding={{ left: 10, right: 10 }}
            />
            <YAxis
              tick={{
                fontSize: screen.tickSize,
                fill: "#6b7280",
              }}
              axisLine={false}
              tickLine={false}
              tickFormatter={formatCurrency}
              width={screen.yAxisWidth}
            />
            <Tooltip
              contentStyle={{
                borderRadius: "12px",
                border: "none",
                boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
                background: "#ffffff",
                fontSize: `${screen.fontSize}px`,
              }}
              formatter={(value) => [formatCurrency(Number(value)), ""]}
              itemStyle={{ fontWeight: "bold" }}
              labelStyle={{
                fontWeight: "600",
                color: "#4b5563",
                fontSize: `${screen.fontSize}px`,
              }}
            />
            <Legend
              verticalAlign="top"
              height={screen.legendHeight}
              iconType="circle"
              iconSize={screen.legendIconSize}
              wrapperStyle={{
                fontSize: screen.legendFontSize,
                paddingBottom: screen.paddingBottom,
              }}
            />
            <Line
              type="monotone"
              dataKey="pagas"
              stroke="#10b981"
              strokeWidth={screen.strokeWidth}
              strokeOpacity={0.9}
              dot={{
                fill: "#10b981",
                strokeWidth: 2,
                r: screen.dotRadius,
                stroke: "#ffffff",
              }}
              activeDot={{
                r: screen.dotActiveRadius,
                stroke: "#ffffff",
                strokeWidth: screen.strokeWidth,
                fill: "#059669",
              }}
              name="Contas Pagas"
              animationDuration={1500}
            />
            <Line
              type="monotone"
              dataKey="aberto"
              stroke="#f59e0b"
              strokeWidth={screen.strokeWidth}
              strokeOpacity={0.9}
              dot={{
                fill: "#f59e0b",
                strokeWidth: 2,
                r: screen.dotRadius,
                stroke: "#ffffff",
              }}
              activeDot={{
                r: screen.dotActiveRadius,
                stroke: "#ffffff",
                strokeWidth: screen.strokeWidth,
                fill: "#d97706",
              }}
              name="Contas em Aberto"
              animationDuration={1500}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

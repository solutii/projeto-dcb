"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
} from "recharts";
import { useScreenSize } from "@/hooks/useScreenSize"; // ajuste o path conforme sua estrutura

interface Conta {
  name: string;
  value: number;
  count: number;
}

const COLORS = ["#10b981", "#f59e0b", "#3b82f6", "#ef4444", "#8b5cf6"];

export function ContasPagarMesChart({ data }: { data: Conta[] }) {
  const screen = useScreenSize();

  const total = data.reduce((sum, item) => sum + item.value, 0);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);

  const innerRadius = screen.isMobile ? 50 : screen.isTablet ? 65 : 80;
  const outerRadius = screen.isMobile ? 80 : screen.isTablet ? 100 : 120;

  return (
    <div className="bg-white p-3 sm:p-4 lg:p-6 rounded-lg shadow-md shadow-black border border-slate-200 h-[400px] sm:h-[450px] lg:h-[540px] flex flex-col">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 sm:mb-3 lg:mb-4">
        <div className="mb-2 sm:mb-0">
          <h3 className="text-sm sm:text-base lg:text-lg font-bold text-gray-800 uppercase italic tracking-wider">
            Contas a Pagar/Mês
          </h3>
          <p className="text-base text-gray-600 font-semibold italic">
            Distribuição por categoria
          </p>
        </div>

        <div className="bg-emerald-50 text-emerald-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium self-start sm:self-auto">
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
              innerRadius={innerRadius}
              outerRadius={outerRadius}
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
                />
              ))}
              <Label
                value={formatCurrency(total)}
                position="center"
                className="font-bold fill-gray-700"
                style={{
                  fontSize: screen.fontSize,
                }}
              />
            </Pie>
            <Tooltip
              contentStyle={{
                borderRadius: "12px",
                border: "none",
                boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
                background: "#ffffff",
                fontSize: screen.fontSize,
              }}
              formatter={(value, name, props) =>
                `${formatCurrency(Number(value))} (${Math.round(
                  (Number(value) / total) * 100
                )}%) - Qtd: ${props.payload.count}`
              }
              itemStyle={{ fontWeight: "bold" }}
            />
            {!screen.isMobile && data.map((entry, index) => (
              
              <Legend
                key={`legend-${index}`}
                layout="vertical"
                verticalAlign="middle"
                align="right"
                iconSize={screen.legendIconSize}
                iconType="circle"
                wrapperStyle={{
                  fontSize: screen.legendFontSize,
                  paddingLeft: "10px",
                }}
              >
                 <span className={`text-gray-600 ${screen.legendFontSize}`}>
                    {data[index].name} - {Math.round((data[index].value / total) * 100)}%
                  </span>
              </Legend>
            ))}
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legenda inferior (mobile/tablet) */}
      <div className="mt-2 sm:mt-3 lg:mt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
          {data.map((item, index) => (
            <div key={`badge-${index}`} className="flex items-center min-w-0">
              <div
                className="w-2 h-2 sm:w-3 sm:h-3 rounded-full mr-2 flex-shrink-0"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              <span className="text-xs sm:text-sm text-gray-600 truncate">
                {item.name}: {formatCurrency(item.value)}
                <span className="ml-1 text-gray-500">
                  ({Math.round((item.value / total) * 100)}%)
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

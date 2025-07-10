"use client";

import React from "react";
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

import { useScreenSize } from "@/hooks/useScreenSize";

export function ComprasPorProdutoChart({
  data,
}: {
  data: { produto: string; valor: number }[];
}) {
  const screen = useScreenSize();

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);

  const colors = ["#00E096", "#00C897", "#00B4A0", "#00A0A8", "#008CAB"];

  return (
    <div className="bg-white p-4 sm:p-4 lg:p-6 rounded-lg shadow-md shadow-black border border-slate-200 h-[400px] sm:h-[450px] lg:h-[540px] flex flex-col">
      <div className="mb-2 sm:mb-0">
        <h3 className="text-sm sm:text-base lg:text-lg font-bold text-gray-800 uppercase italic tracking-wider">
          Compras por Produto
        </h3>
        <p className="text-base text-gray-600 font-semibold italic">
          Distribuição por produto
        </p>
      </div>

      <div className="flex-grow">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 5, right: 10, bottom: 60, left: 10 }}
            barSize={screen.isMobile ? 24 : screen.isTablet ? 30 : 38}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#f0f0f0"
            />
            <XAxis
              dataKey="produto"
              tick={{
                fontSize: screen.isMobile ? 9 : screen.isTablet ? 10 : 12,
                fill: "#6b7280",
              }}
              axisLine={false}
              tickLine={false}
              angle={-45}
              textAnchor="end"
              height={80}
              interval={0}
            />
            <YAxis
              tick={{
                fontSize: screen.isMobile ? 9 : screen.isTablet ? 10 : 12,
                fill: "#6b7280",
              }}
              axisLine={false}
              tickLine={false}
              tickFormatter={formatCurrency}
              width={screen.isMobile ? 60 : screen.isTablet ? 70 : 80}
            />
            <Tooltip
              cursor={{ fill: "rgba(0, 184, 160, 0.1)" }}
              contentStyle={{
                borderRadius: "12px",
                border: "none",
                boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
                fontSize: screen.legendFontSize,
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

      {/* Legenda responsiva */}
      <div className="mt-2 sm:mt-3 lg:mt-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:flex lg:justify-center lg:flex-wrap gap-1 sm:gap-2">
          {data.map((item, index) => (
            <div key={`legend-${index}`} className="flex items-center min-w-0">
              <div
                className="w-2 h-2 sm:w-3 sm:h-3 rounded-full mr-1 flex-shrink-0"
                style={{ backgroundColor: colors[index % colors.length] }}
              />
              <span className="text-xs sm:text-sm text-gray-600 truncate">
                {item.produto}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import { Row, flexRender } from "@tanstack/react-table";
import { ContasAPagarType } from "@/types/financeiro";

interface Props {
  row: Row<ContasAPagarType>;
}

export function TabelaMobile({ row }: Props) {
  const allCells = row.getAllCells();

  const contentCells = allCells.filter((cell) => cell.column.id !== "acoes");
  const actionCell = allCells.find((cell) => cell.column.id === "acoes");

  return (
    <div className="bg-white rounded-lg shadow-sm shadow-black p-2 border border-gray-200 space-y-2 mb-6">
      {contentCells.map((cell) => (
        <div key={cell.id}>
          {/* TÍTULO */}
          <p className="text-xs text-gray-700 italic font-semibold uppercase tracking-wide">
            {cell.column.columnDef.header as string}
          </p>
          {/* VALOR */}
          <p className="text-sm text-gray-800 font-bold italic tracking-wide">
            {cell.renderValue() as string}
          </p>
          <hr className="my-2 border-dashed border-gray-300" />
        </div>
      ))}

      {actionCell && (
        <div className="flex justify-end pt-2">
          {flexRender(
            actionCell.column.columnDef.cell,
            actionCell.getContext()
          )}
        </div>
      )}
    </div>
  );
}

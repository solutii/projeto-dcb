interface ChartCardProps {
  title: string;
  children: React.ReactNode;
  icon: React.ElementType;
}

export function ChartCard({ title, children, icon: Icon }: ChartCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md shadow-black p-6 border border-slate-200">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-emerald-100 rounded-lg">
          <Icon className="w-5 h-5 text-emerald-700" />
        </div>
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      </div>
      {children}
    </div>
  );
}

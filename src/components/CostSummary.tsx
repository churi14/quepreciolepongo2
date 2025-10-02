import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

interface CostSummaryProps {
  fixedCostsTotal: number;
  variableCostsTotal: number;
  operationalCostsTotal: number;
}

const CostSummary: React.FC<CostSummaryProps> = ({ fixedCostsTotal, variableCostsTotal, operationalCostsTotal }) => {
  const allCosts = [
    { type: 'Gastos Fijos', amount: fixedCostsTotal },
    { type: 'Gastos Variables', amount: variableCostsTotal },
    { type: 'Gastos Operativos', amount: operationalCostsTotal },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-md mt-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Resumen de Costos</h2>

      <div className="overflow-x-auto">
        <table className="w-full table-auto text-left border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border-b">Categoría</th>
              <th className="p-2 border-b">Total</th>
            </tr>
          </thead>
          <tbody>
            {allCosts.map((item, index) => (
              <tr key={index}>
                <td className="p-2 border-b">{item.type}</td>
                <td className="p-2 border-b">${item.amount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 h-72">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={allCosts}
              dataKey="amount"
              nameKey="type"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {allCosts.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CostSummary;
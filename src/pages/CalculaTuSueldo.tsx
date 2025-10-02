import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Dialog } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const SALARIO_MINIMO = 313400;
const COLORS = ['#FF8042', '#0088FE', '#00C49F'];

const CalculaTuSueldo = () => {
  const [gastosFijos, setGastosFijos] = useState<number>(0);
  const [gastosVariables, setGastosVariables] = useState<number>(0);
  const [gastosOperativos, setGastosOperativos] = useState<number>(0);
  const [gastosPersonales, setGastosPersonales] = useState<number[]>([]);
  const [nuevoGasto, setNuevoGasto] = useState<number>(0);
  const [usaTarjetas, setUsaTarjetas] = useState(false);
  const [montoTarjetas, setMontoTarjetas] = useState<number>(0);
  const [resultadoVisible, setResultadoVisible] = useState(false);
  const [popupAbierto, setPopupAbierto] = useState(true);

  const totalGastosPersonales = gastosPersonales.reduce((acc, val) => acc + val, 0);
  const totalGastos = gastosFijos + gastosVariables + gastosOperativos + totalGastosPersonales + (usaTarjetas ? montoTarjetas : 0);
  const restoSueldo = SALARIO_MINIMO - totalGastos;

  const data = [
    { name: 'Gastos Totales', value: totalGastos },
    { name: 'Resto del Sueldo', value: restoSueldo < 0 ? 0 : restoSueldo },
  ];

  const agregarGastoPersonal = () => {
    if (!isNaN(nuevoGasto) && nuevoGasto > 0) {
      setGastosPersonales([...gastosPersonales, nuevoGasto]);
      setNuevoGasto(0);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Calculadora de Sueldo Sugerido</h1>

      <div className="grid grid-cols-1 gap-4">
        <input type="number" placeholder="Gastos fijos" onChange={e => setGastosFijos(Number(e.target.value))} className="input" />
        <input type="number" placeholder="Gastos variables" onChange={e => setGastosVariables(Number(e.target.value))} className="input" />
        <input type="number" placeholder="Gastos operativos" onChange={e => setGastosOperativos(Number(e.target.value))} className="input" />

        <div className="flex gap-2">
          <input type="number" placeholder="Gasto personal" value={nuevoGasto} onChange={e => setNuevoGasto(Number(e.target.value))} className="input" />
          <Button onClick={agregarGastoPersonal}>Agregar gasto</Button>
        </div>

        <label className="flex items-center gap-2">
          <input type="checkbox" checked={usaTarjetas} onChange={e => setUsaTarjetas(e.target.checked)} />
          ¿Usás tarjetas?
        </label>

        {usaTarjetas && (
          <input type="number" placeholder="Monto de tarjetas" onChange={e => setMontoTarjetas(Number(e.target.value))} className="input" />
        )}

        <Button className="mt-4" onClick={() => { setResultadoVisible(true); setPopupAbierto(true); }}>
          Calcular
        </Button>

        {resultadoVisible && (
          <div className="bg-gray-100 p-4 rounded-xl mt-6">
            <p className="font-semibold text-lg">Total de gastos: <span className="text-red-600">${totalGastos.toFixed(2)}</span></p>
            <p className="font-semibold text-lg">Resto del sueldo: <span className="text-green-600">${restoSueldo.toFixed(2)}</span></p>

            <div className="h-64 mt-4">
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={data} dataKey="value" nameKey="name" outerRadius={100} label>
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {popupAbierto && (
          <Dialog>
            <div className="bg-white p-4 rounded-xl shadow-md">
              <p className="text-lg font-bold mb-2">¡Gracias por usar nuestra calculadora!</p>
              <p className="mb-2">Seguinos en Instagram para más herramientas útiles.</p>
              <Button className="mr-2">Ir a Instagram</Button>
              <Button variant="ghost" onClick={() => setPopupAbierto(false)}>Cerrar</Button>
            </div>
          </Dialog>
        )}
      </div>
    </div>
  );
};

export default CalculaTuSueldo;

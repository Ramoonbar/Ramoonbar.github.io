import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Target, TrendingUp, Award, BarChart3, Clock } from 'lucide-react';
import { Navigate } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="pt-24 pb-12 min-h-screen bg-light-50">
      <div className="page-container">
        
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-display font-bold text-light-900 flex items-center">
              Panel de Control
              <span className="ml-4 px-3 py-1 bg-warning text-white text-xs rounded-full font-bold uppercase">
                Nivel: {user.level}
              </span>
            </h1>
            <p className="text-light-600 mt-2">Bienvenido de nuevo, {user.name}</p>
          </div>
          <div className="w-16 h-16 bg-primary text-white flex items-center justify-center rounded-full text-2xl font-bold border-4 border-white shadow-md">
            {user.avatar}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card p-6 flex items-center">
            <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mr-4">
              <TrendingUp className="w-6 h-6 text-success" />
            </div>
            <div>
              <p className="text-light-600 text-sm font-medium">Yield Actual</p>
              <h3 className="text-2xl font-bold text-light-900">+12.4%</h3>
            </div>
          </div>
          <div className="card p-6 flex items-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
              <Target className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-light-600 text-sm font-medium">Win Rate</p>
              <h3 className="text-2xl font-bold text-light-900">58%</h3>
            </div>
          </div>
          <div className="card p-6 flex items-center">
            <div className="w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center mr-4">
              <BarChart3 className="w-6 h-6 text-warning" />
            </div>
            <div>
              <p className="text-light-600 text-sm font-medium">Profit Mensual</p>
              <h3 className="text-2xl font-bold text-light-900">+45.2 Uds</h3>
            </div>
          </div>
          <div className="card p-6 flex items-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
              <Award className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-light-600 text-sm font-medium">Posición Ranking</p>
              <h3 className="text-2xl font-bold text-light-900">#14</h3>
            </div>
          </div>
        </div>

        {/* Recent Picks & Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 card p-0 overflow-hidden">
            <div className="p-6 border-b border-light-200 flex justify-between items-center">
              <h2 className="text-xl font-bold text-light-900">Últimos Pronósticos</h2>
              <button className="text-primary text-sm font-bold hover:underline">Ver todos</button>
            </div>
            <div className="divide-y divide-light-100">
              {[1, 2, 3].map(i => (
                <div key={i} className="p-6 flex items-center justify-between hover:bg-light-50 transition-colors">
                  <div className="flex items-center">
                    <div className={`w-2 h-2 rounded-full mr-4 ${i === 1 ? 'bg-success' : i === 2 ? 'bg-danger' : 'bg-warning'}`}></div>
                    <div>
                      <p className="font-bold text-light-900">Real Madrid vs FC Barcelona</p>
                      <p className="text-sm text-light-600 mt-1">Over 2.5 Goles @ 1.85 (Stake 3)</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold ${i === 1 ? 'text-success' : i === 2 ? 'text-danger' : 'text-warning'}`}>
                      {i === 1 ? '+2.55 Uds' : i === 2 ? '-3.00 Uds' : 'Pendiente'}
                    </p>
                    <p className="text-xs text-light-400 mt-1 flex items-center justify-end">
                      <Clock className="w-3 h-3 mr-1" /> Hace 2 días
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="card bg-primary text-white p-6 relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-lg font-bold mb-2">Concurso Trimestral</h3>
                <p className="text-primary-light text-sm mb-4">Quedan 45 días para el reinicio. Estás a 15 Uds del Top 10.</p>
                <div className="w-full bg-white/20 rounded-full h-2 mb-2">
                  <div className="bg-white h-2 rounded-full" style={{ width: '65%' }}></div>
                </div>
                <p className="text-xs text-right text-white/80">65% completado</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;

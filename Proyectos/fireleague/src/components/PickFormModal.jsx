import React, { useState } from 'react';
import { X } from 'lucide-react';

const PickFormModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    sport: 'Fútbol',
    competition: '',
    match: '',
    prediction: '',
    odds: '',
    stake: 5,
    argument: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Pronóstico guardado:', formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-light-900/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-fade-in">
        <div className="flex justify-between items-center p-6 border-b border-light-200 sticky top-0 bg-white z-10">
          <h2 className="text-2xl font-display font-bold text-light-900">Subir Nuevo Pronóstico</h2>
          <button onClick={onClose} className="p-2 text-light-600 hover:text-danger hover:bg-light-100 rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-light-800 mb-2">Deporte</label>
              <select 
                value={formData.sport}
                onChange={(e) => setFormData({...formData, sport: e.target.value})}
                className="w-full bg-light-50 border border-light-200 text-light-900 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="Fútbol">Fútbol</option>
                <option value="Baloncesto">Baloncesto</option>
                <option value="Tenis">Tenis</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-light-800 mb-2">Competición</label>
              <input 
                type="text" 
                placeholder="Ej. LaLiga, Champions..."
                value={formData.competition}
                onChange={(e) => setFormData({...formData, competition: e.target.value})}
                className="w-full bg-light-50 border border-light-200 text-light-900 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-light-800 mb-2">Partido / Evento</label>
            <input 
              type="text" 
              placeholder="Ej. Real Madrid vs FC Barcelona"
              value={formData.match}
              onChange={(e) => setFormData({...formData, match: e.target.value})}
              className="w-full bg-light-50 border border-light-200 text-light-900 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-light-800 mb-2">Pronóstico</label>
              <input 
                type="text" 
                placeholder="Ej. Más de 2.5 Goles"
                value={formData.prediction}
                onChange={(e) => setFormData({...formData, prediction: e.target.value})}
                className="w-full bg-light-50 border border-light-200 text-light-900 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-light-800 mb-2">Cuota</label>
              <input 
                type="number" 
                step="0.01"
                min="1.01"
                placeholder="1.85"
                value={formData.odds}
                onChange={(e) => setFormData({...formData, odds: e.target.value})}
                className="w-full bg-light-50 border border-light-200 text-light-900 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-light-800 mb-2">Stake (1-10)</label>
              <input 
                type="number" 
                min="1" max="10"
                value={formData.stake}
                onChange={(e) => setFormData({...formData, stake: e.target.value})}
                className="w-full bg-light-50 border border-light-200 text-light-900 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-light-800 mb-2">Argumento / Análisis Detallado</label>
            <textarea 
              rows="4"
              placeholder="Explica por qué has elegido este pronóstico..."
              value={formData.argument}
              onChange={(e) => setFormData({...formData, argument: e.target.value})}
              className="w-full bg-light-50 border border-light-200 text-light-900 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              required
            ></textarea>
          </div>

          <div className="pt-4 border-t border-light-200 flex justify-end space-x-4">
            <button type="button" onClick={onClose} className="px-6 py-2 rounded-lg font-bold text-light-600 hover:bg-light-100 transition-colors">
              Cancelar
            </button>
            <button type="submit" className="btn-primary">
              Publicar Pick
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PickFormModal;

import React from 'react';
import { X, Lock, LogIn } from 'lucide-react';

const LoginRequiredModal = ({ isOpen, onClose, onLogin, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-light-900/60 backdrop-blur-md p-4 animate-fade-in">
      <div className="bg-white rounded-[2.5rem] w-full max-w-md p-10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-primary"></div>
        <button onClick={onClose} className="absolute top-6 right-6 p-2 text-light-400 hover:text-danger transition-colors">
          <X className="w-6 h-6" />
        </button>
        
        <div className="text-center">
          <div className="w-20 h-20 bg-primary/10 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-inner">
            <Lock className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-2xl font-display font-black text-light-900 mb-4">{title || 'Acceso Restringido'}</h2>
          <p className="text-light-500 font-medium leading-relaxed mb-10">
            {message || 'Para realizar esta acción primero debes formar parte de nuestra comunidad de analistas verificados.'}
          </p>
          
          <button 
            onClick={() => {
              onClose();
              onLogin();
            }}
            className="btn-primary w-full py-5 rounded-2xl flex items-center justify-center space-x-3 text-lg transform hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20"
          >
            <LogIn className="w-6 h-6" />
            <span>Iniciar Sesión Ahora</span>
          </button>
          
          <button 
            onClick={onClose}
            className="mt-4 text-light-400 font-bold hover:text-light-900 transition-colors text-sm"
          >
            Quizás más tarde
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginRequiredModal;

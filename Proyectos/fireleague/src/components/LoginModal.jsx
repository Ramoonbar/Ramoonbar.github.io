import React, { useState } from 'react';
import { X, LogIn, Loader2, UserPlus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from './LoadingSpinner';

const LoginModal = ({ isOpen, onClose }) => {
  const { login } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (isRegister) {
      alert('¡Registro completado! Ahora puedes iniciar sesión.');
      setIsRegister(false);
    } else {
      login(email, password);
      onClose();
    }
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-light-900/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-[2.5rem] w-full max-w-md p-10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] animate-fade-in relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-primary"></div>
        
        <button onClick={onClose} className="absolute top-6 right-6 p-2 text-light-400 hover:text-danger hover:bg-light-100 rounded-full transition-all">
          <X className="w-6 h-6" />
        </button>
        
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-primary/10 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-inner">
            {isRegister ? <UserPlus className="w-10 h-10 text-primary" /> : <LogIn className="w-10 h-10 text-primary" />}
          </div>
          <h2 className="text-3xl font-display font-black text-light-900 tracking-tight">
            {isRegister ? 'Crear Cuenta' : 'Iniciar Sesión'}
          </h2>
          <p className="text-light-500 text-sm mt-2 font-medium">
            {isRegister ? 'Únete a la élite de los Tipsters' : 'Accede a tu panel de control verificado'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {isRegister && (
            <div className="animate-slide-down">
              <label className="block text-xs font-black text-light-400 uppercase tracking-widest mb-2 ml-1">Nombre de Tipster</label>
              <input 
                type="text" 
                placeholder="Ej: Alex Analyst"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-light-50 border-2 border-light-100 text-light-900 rounded-2xl py-4 px-6 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary font-bold transition-all"
                required
              />
            </div>
          )}
          
          <div>
            <label className="block text-xs font-black text-light-400 uppercase tracking-widest mb-2 ml-1">Correo Electrónico</label>
            <input 
              type="email" 
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-light-50 border-2 border-light-100 text-light-900 rounded-2xl py-4 px-6 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary font-bold transition-all"
              required
            />
          </div>
          
          <div>
            <label className="block text-xs font-black text-light-400 uppercase tracking-widest mb-2 ml-1">Contraseña</label>
            <input 
              type="password" 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-light-50 border-2 border-light-100 text-light-900 rounded-2xl py-4 px-6 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary font-bold transition-all"
              required
            />
          </div>

          <button 
            type="submit" 
            className="btn-primary w-full py-5 rounded-2xl mt-4 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed shadow-xl shadow-primary/20 text-lg transform active:scale-95 transition-all"
            disabled={isLoading}
          >
            {isLoading ? <LoadingSpinner size="sm" /> : (isRegister ? 'Crear mi Cuenta' : 'Entrar al Panel')}
          </button>
        </form>
        
        <div className="mt-8 text-center text-sm text-light-500 font-medium">
          {isRegister ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?'} {' '}
          <button 
            onClick={() => setIsRegister(!isRegister)} 
            className="text-primary font-black hover:underline transition-all"
          >
            {isRegister ? 'Inicia Sesión' : 'Regístrate como Tipster'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;

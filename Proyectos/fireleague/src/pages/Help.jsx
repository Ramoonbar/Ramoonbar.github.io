import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Mail } from 'lucide-react';
import SEO from '../components/SEO';

const faqs = [
  {
    q: '¿Cómo me convierto en Tipster?',
    a: 'Para convertirte en Tipster debes registrarte haciendo clic en "Hazte Tipster". Pasarás por un periodo de prueba de 30 días donde verificaremos tus estadísticas en nuestra plataforma. Una vez superado, obtendrás el nivel "Free" o "Gold" según tu Yield.'
  },
  {
    q: '¿Cómo funciona el Ranking Trimestral?',
    a: 'Nuestro algoritmo clasifica a los tipsters basándose en su Yield, Profit y número de picks. Cada 3 meses el contador se reinicia para dar oportunidades a nuevos analistas. El Top 1 de cada trimestre obtiene premios y destacamos su perfil.'
  },
  {
    q: '¿Qué significan los niveles Free, Gold y Premium?',
    a: 'Indican el rango del Tipster. Free es el nivel de entrada. Gold se otorga tras 150 picks verificados con Yield positivo. Premium es exclusivo para analistas con más de 1 año de historial y más de un 10% de Yield sostenido.'
  },
  {
    q: '¿Es fiable la calculadora de sistemas?',
    a: 'Totalmente. Utiliza las mismas fórmulas matemáticas que las principales casas de apuestas del mundo para calcular combinaciones complejas como Heinz, Goliath o Lucky 63.'
  }
];

const Help = () => {
  const [openId, setOpenId] = useState(0);

  return (
    <div className="pt-24 pb-12 min-h-screen bg-light-50">
      <SEO 
        title="Ayuda y FAQ" 
        description="Centro de soporte de BetMaster Analyst. Encuentra respuestas sobre cómo ser tipster, el ranking y el uso de herramientas."
      />
      <div className="container mx-auto px-4 max-w-4xl">
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-display font-bold text-light-900 mb-4 flex items-center justify-center">
            <HelpCircle className="w-10 h-10 mr-3 text-primary" />
            Centro de <span className="text-primary ml-2">Ayuda</span>
          </h1>
          <p className="text-xl text-light-600">Resuelve tus dudas y contacta con nuestro equipo de soporte.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="md:col-span-2 space-y-4">
            <h2 className="text-2xl font-bold text-light-900 mb-6">Preguntas Frecuentes (FAQ)</h2>
            {faqs.map((faq, index) => (
              <div key={index} className="border border-light-200 rounded-xl bg-white shadow-sm overflow-hidden">
                <button 
                  className="w-full flex justify-between items-center p-5 text-left hover:bg-light-50 transition-colors"
                  onClick={() => setOpenId(openId === index ? null : index)}
                >
                  <span className="font-bold text-light-900">{faq.q}</span>
                  {openId === index ? <ChevronUp className="w-5 h-5 text-primary" /> : <ChevronDown className="w-5 h-5 text-light-400" />}
                </button>
                <div className={`transition-all duration-300 ease-in-out ${openId === index ? 'max-h-96 opacity-100 p-5 pt-0' : 'max-h-0 opacity-0 px-5 py-0'}`}>
                  <p className="text-light-600">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>

          <div>
            <div className="bg-white p-6 rounded-xl border border-light-200 shadow-sm sticky top-28">
              <h2 className="text-xl font-bold text-light-900 mb-4">¿Necesitas más ayuda?</h2>
              <p className="text-light-600 text-sm mb-6">Si no has encontrado la respuesta en nuestras FAQ, contacta con nosotros.</p>
              
              <a href="mailto:soporte@betmaster.com" className="w-full btn-primary py-3 flex items-center justify-center">
                <Mail className="w-5 h-5 mr-2" /> Contactar Soporte
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Help;

import React, { useState } from 'react';
import { Clock, User, Search, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';

// 9 Mock Posts Optimized for SEO and Performance
export const mockPosts = [
  {
    id: 1,
    slug: 'como-analizar-el-valor-ev-en-apuestas-de-futbol',
    title: 'Cómo analizar el valor (EV+) en apuestas de fútbol',
    excerpt: 'Descubre la fórmula matemática definitiva para encontrar apuestas de valor a largo plazo y dejar de depender de la suerte.',
    author: 'Alex BetMaster',
    date: '2026-05-01',
    category: 'Estrategia',
    readTime: '5 min',
    image: '/images/analisis-valor-apuestas-futbol.webp', // Optimized WebP < 100kb
    imageAlt: 'Análisis de Valor en Fútbol | BetMaster Strategy'
  },
  {
    id: 2,
    slug: 'guia-sistemas-apuestas-yankee-trixie',
    title: 'Guía de Sistemas: Cuándo usar una Yankee o una Trixie',
    excerpt: 'Explicamos con ejemplos reales las ventajas de utilizar sistemas complejos frente a las combinadas tradicionales.',
    author: 'Data Analyst',
    date: '2026-04-28',
    category: 'Sistemas',
    readTime: '8 min',
    image: '/images/guia-sistemas-apuestas-calculadora.webp', // Optimized WebP < 100kb
    imageAlt: 'Guía de Sistemas de Apuestas | BetMaster Academy'
  },
  {
    id: 3,
    slug: 'gestion-bankroll-regla-2-por-ciento',
    title: 'Gestión de Bankroll: La regla del 2%',
    excerpt: 'El secreto mejor guardado de los tipsters profesionales para no quebrar tu banca en una mala racha.',
    author: 'Soccer Guru',
    date: '2026-04-25',
    category: 'Gestión',
    readTime: '4 min',
    image: '/images/gestion-bankroll-tipster-profesional.webp', // Optimized WebP < 100kb
    imageAlt: 'Gestión de Bankroll Profesional | BetMaster Analyst'
  },
  {
    id: 4,
    slug: 'psicologia-del-apostador-evitar-tilt',
    title: 'Psicología del Apostador: Cómo evitar entrar en Tilt',
    excerpt: 'Aprende a controlar tus emociones tras una derrota y mantén la mente fría para seguir tu estrategia.',
    author: 'Alex BetMaster',
    date: '2026-04-22',
    category: 'Estrategia',
    readTime: '6 min',
    image: '/images/psicologia-apuestas-deportivas.webp',
    imageAlt: 'Psicología en Apuestas | BetMaster'
  },
  {
    id: 5,
    slug: 'importancia-de-las-cuotas-con-valor',
    title: 'La importancia de las cuotas con valor (Valuebets)',
    excerpt: 'Por qué apostar siempre a cuotas bajas es el camino más rápido hacia la quiebra.',
    author: 'Data Analyst',
    date: '2026-04-18',
    category: 'Estrategia',
    readTime: '7 min',
    image: '/images/valuebets-apuestas-valor.webp',
    imageAlt: 'Valuebets y Cuotas con Valor | BetMaster'
  },
  {
    id: 6,
    slug: 'mercado-de-goles-xg-analisis-profundo',
    title: 'Mercado de Goles: Análisis profundo del xG (Goles Esperados)',
    excerpt: 'Utiliza la métrica más avanzada del fútbol moderno para predecir resultados con mayor precisión.',
    author: 'Soccer Guru',
    date: '2026-04-15',
    category: 'Análisis',
    readTime: '10 min',
    image: '/images/xg-goles-esperados-futbol.webp',
    imageAlt: 'Análisis xG Fútbol | BetMaster'
  },
  {
    id: 7,
    slug: 'como-elegir-una-buena-casa-de-apuestas',
    title: 'Cómo elegir una buena casa de apuestas en 2026',
    excerpt: 'No todas las bookies son iguales. Te enseñamos en qué fijarte: cuotas, límites y mercados.',
    author: 'Alex BetMaster',
    date: '2026-04-10',
    category: 'Gestión',
    readTime: '5 min',
    image: '/images/mejores-casas-apuestas-2026.webp',
    imageAlt: 'Casas de Apuestas Recomendadas | BetMaster'
  },
  {
    id: 8,
    slug: 'arbitraje-deportivo-surebets-guia',
    title: 'Arbitraje Deportivo (Surebets): ¿Es realmente rentable?',
    excerpt: 'Analizamos los riesgos y beneficios de las apuestas seguras en el mercado actual.',
    author: 'Data Analyst',
    date: '2026-04-05',
    category: 'Sistemas',
    readTime: '9 min',
    image: '/images/surebets-arbitraje-deportivo.webp',
    imageAlt: 'Guía Surebets Arbitraje | BetMaster'
  },
  {
    id: 9,
    slug: 'apuestas-en-vivo-estrategias-ganadoras',
    title: 'Apuestas en Vivo: Estrategias ganadoras en directo',
    excerpt: 'Cómo aprovechar los cambios de tendencia durante el partido para cazar cuotas altas.',
    author: 'Soccer Guru',
    date: '2026-04-01',
    category: 'Estrategia',
    readTime: '6 min',
    image: '/images/apuestas-en-vivo-directo.webp',
    imageAlt: 'Estrategias Live Apuestas | BetMaster'
  }
];

const Blog = () => {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('Todas');
  
  const categories = [
    { key: 'Todas', label: t('blog.categories.all') },
    { key: 'Estrategia', label: t('blog.categories.strategy') },
    { key: 'Sistemas', label: t('blog.categories.systems') },
    { key: 'Gestión', label: t('blog.categories.management') },
    { key: 'Análisis', label: 'Análisis' }
  ];

  const filteredPosts = mockPosts.filter(post => {
    const matchSearch = post.title.toLowerCase().includes(search.toLowerCase());
    const matchCat = selectedCat === 'Todas' || post.category === selectedCat;
    return matchSearch && matchCat;
  });

  return (
    <div className="pt-24 pb-12 min-h-screen bg-light-50">
      <SEO title={`${t('blog.title')} | BetMaster Specialist Blog`} description={t('blog.subtitle')} />
      <div className="page-container">
        
        <div className="text-center mb-12">
          <h1>{t('blog.title').split(' ')[0]} <span className="text-primary">{t('blog.title').split(' ').slice(1).join(' ')}</span></h1>
          <p className="text-lg text-light-600 max-w-2xl mx-auto font-medium">{t('blog.subtitle')}</p>
        </div>

        {/* Search and Filters - REMOVED "Filtros" TEXT */}
        <div className="bg-white p-4 rounded-[2rem] shadow-xl border border-light-200 mb-12 flex flex-col lg:flex-row gap-6 items-center">
          <div className="relative w-full lg:w-1/3">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-light-400" />
            <input 
              type="text" 
              placeholder={t('blog.searchPlaceholder')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-14 pr-6 py-4 bg-light-50 border border-light-100 rounded-2xl focus:outline-none focus:border-primary font-black text-sm"
            />
          </div>
          <div className="flex flex-wrap gap-2 w-full lg:w-2/3 items-center lg:justify-end overflow-hidden">
            <div className="flex items-center text-light-200 mr-4 shrink-0">
              <Filter className="w-5 h-5" />
            </div>
            {categories.map(cat => (
              <button 
                key={cat.key}
                onClick={() => setSelectedCat(cat.key)}
                className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${selectedCat === cat.key ? 'bg-primary text-white shadow-xl' : 'bg-light-50 text-light-400 border border-light-100 hover:text-light-900'}`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map(post => (
            <Link to={`/blog/${post.slug}`} key={post.id} className="group bg-white rounded-[2rem] overflow-hidden flex flex-col h-full border border-light-200 hover:border-primary/40 hover:shadow-2xl transition-all duration-500">
              <div className="h-56 bg-light-100 relative overflow-hidden">
                <img src={post.image} alt={post.imageAlt} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute top-6 left-6">
                  <span className="bg-white/90 backdrop-blur-md text-primary text-[10px] font-black px-4 py-2 rounded-xl shadow-lg uppercase tracking-widest">
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <h2 className="text-xl font-black text-light-900 mb-4 group-hover:text-primary transition-colors leading-tight">
                  {post.title}
                </h2>
                <p className="text-sm text-light-500 mb-8 flex-grow leading-relaxed font-medium line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between mt-auto pt-6 border-t border-light-50">
                  <div className="flex items-center gap-3">
                    <User className="w-4 h-4 text-primary" />
                    <span className="text-[10px] font-black text-light-900 uppercase tracking-widest">{post.author}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-black text-light-400 uppercase tracking-widest">
                    <Clock className="w-4 h-4" /> {post.readTime}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;

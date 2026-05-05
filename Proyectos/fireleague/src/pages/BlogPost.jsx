import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, User, Share2 } from 'lucide-react';
import { mockPosts } from './Blog';
import SEO from '../components/SEO';

const BlogPost = () => {
  const { slug } = useParams();
  const currentIndex = mockPosts.findIndex(p => p.slug === slug);
  const post = mockPosts[currentIndex];

  const prevPost = currentIndex > 0 ? mockPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < mockPosts.length - 1 ? mockPosts[currentIndex + 1] : null;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Enlace copiado al portapapeles');
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return (
      <div className="pt-32 pb-12 min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl font-bold text-light-900 mb-4">Artículo no encontrado</h1>
        <p className="text-light-600 mb-8">El artículo que buscas no existe o ha sido movido.</p>
        <Link to="/blog" className="btn-primary">Volver al Blog</Link>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-12 min-h-screen bg-light-50">
      <SEO 
        title={`${post.title} | BetMaster Blog`} 
        description={post.excerpt}
      />
      
      <div className="container mx-auto px-4 max-w-4xl">
        <Link to="/blog" className="inline-flex items-center text-light-500 hover:text-primary transition-colors mb-8 font-bold">
          <ArrowLeft className="w-5 h-5 mr-2" /> Volver a todos los artículos
        </Link>

        <article className="bg-white rounded-3xl shadow-xl overflow-hidden border border-light-200">
          {/* Header Image */}
          <div className="h-64 md:h-96 w-full relative">
            <img 
              src={post.image} 
              alt={post.imageAlt} 
              className="w-full h-full object-cover"
            />
            <div className="absolute top-6 left-6">
              <span className="bg-primary text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg">
                {post.category}
              </span>
            </div>
          </div>

          <div className="p-8 md:p-12">
            <h1 className="text-3xl md:text-5xl font-display font-bold text-light-900 mb-6 leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center justify-between border-b border-light-200 pb-6 mb-8 gap-4">
              <div className="flex items-center space-x-6">
                <div className="flex items-center font-bold text-light-800">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3 text-primary">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm text-light-500 font-medium">Escrito por</div>
                    {post.author}
                  </div>
                </div>
                <div className="flex items-center text-light-500 font-medium space-x-4">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1.5" />
                    {post.readTime}
                  </div>
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </time>
                </div>
              </div>
              <button onClick={handleShare} className="p-2 rounded-full hover:bg-light-100 text-light-500 hover:text-primary transition-colors cursor-pointer" title="Copiar enlace">
                <Share2 className="w-5 h-5" />
              </button>
            </div>

            <div className="prose prose-lg max-w-none text-light-700 leading-relaxed">
              <p className="text-xl font-medium text-light-600 mb-8 italic border-l-4 border-primary pl-4">
                {post.excerpt}
              </p>
              
              <p>{post.content}</p>
              
              {/* Dummy additional content to make it look like a real blog post */}
              <h3 className="text-2xl font-bold text-light-900 mt-8 mb-4">¿Por qué es importante esto?</h3>
              <p>En el mundo de las inversiones deportivas, la falta de una metodología clara es la razón principal por la que el 95% de los apostadores pierden dinero a largo plazo. Aplicar estos conceptos te separa del apostador recreacional y te acerca al perfil de un inversor estructurado.</p>
              
              <h3 className="text-2xl font-bold text-light-900 mt-8 mb-4">Conclusión</h3>
              <p>Recuerda siempre mantener la disciplina. La estrategia es solo un 50% de la ecuación; el otro 50% es la psicología y la capacidad de ejecutar el plan sin desviaciones emocionales. Sigue aprendiendo y mejorando tus métricas diarias.</p>
            </div>
            
            <div className="mt-12 pt-8 border-t border-light-200">
              <div className="bg-light-50 rounded-2xl p-6 flex items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white shrink-0">
                  <User className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-light-900">Sobre {post.author}</h4>
                  <p className="text-light-600 text-sm mt-1">Analista profesional verificado en BetMaster con más de 5 años de experiencia en el sector. Especialista en mercados líquidos y modelos matemáticos aplicados al deporte.</p>
                </div>
              </div>
            </div>

          </div>
        </article>

        {/* Prev / Next Navigation */}
        <div className="mt-8 flex flex-col md:flex-row justify-between gap-4">
          {prevPost ? (
            <Link to={`/blog/${prevPost.slug}`} className="flex-1 bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all border border-light-200 group">
              <div className="text-xs font-bold text-light-400 uppercase tracking-wider mb-2">Artículo Anterior</div>
              <div className="font-bold text-light-900 group-hover:text-primary transition-colors">{prevPost.title}</div>
            </Link>
          ) : <div className="flex-1" />}
          
          {nextPost ? (
            <Link to={`/blog/${nextPost.slug}`} className="flex-1 bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all border border-light-200 group text-right">
              <div className="text-xs font-bold text-light-400 uppercase tracking-wider mb-2">Siguiente Artículo</div>
              <div className="font-bold text-light-900 group-hover:text-primary transition-colors">{nextPost.title}</div>
            </Link>
          ) : <div className="flex-1" />}
        </div>

      </div>
    </div>
  );
};

export default BlogPost;

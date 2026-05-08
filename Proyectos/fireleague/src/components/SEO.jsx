import { useEffect } from 'react';

const SEO = ({ title, description }) => {
  useEffect(() => {
    const fullTitle = `${title} | BetMaster Analyst`;
    document.title = fullTitle;

    // Actualizar meta descripción
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description || "La plataforma profesional definitiva para tipsters y pronósticos deportivos verificados.");

    // Actualizar Open Graph
    const updateMetaProperty = (property, content) => {
      let el = document.querySelector(`meta[property="${property}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('property', property);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    updateMetaProperty('og:title', fullTitle);
    updateMetaProperty('og:description', description);
    updateMetaProperty('og:type', 'website');

    // JSON-LD para SEO Estructurado (Senior level)
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "SportsActivityLocation",
      "name": "BetMaster Analyst",
      "description": description,
      "url": window.location.href,
      "potentialAction": {
        "@type": "SearchAction",
        "target": `${window.location.origin}/tipsters?q={search_term_string}`,
        "query-input": "required name=search_term_string"
      }
    };

    let script = document.getElementById('json-ld');
    if (!script) {
      script = document.createElement('script');
      script.id = 'json-ld';
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.text = JSON.stringify(structuredData);

  }, [title, description]);

  return null;
};

export default SEO;

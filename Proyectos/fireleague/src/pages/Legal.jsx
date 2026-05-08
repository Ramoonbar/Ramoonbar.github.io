import React, { useState, useEffect } from 'react';
import { Shield, Lock, FileText, CheckCircle, Scale, AlertTriangle, Info } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';

// Use standard lucide-react icons
import { Shield as ShieldIcon, Lock as LockIcon, FileText as FileTextIcon, CheckCircle as CheckIcon, Scale as ScaleIcon, AlertTriangle as AlertIcon, Info as InfoIcon } from 'lucide-react';

const Legal = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('aviso');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const tabs = [
    { id: 'aviso', label: 'Aviso Legal', icon: <ScaleIcon className="w-4 h-4" /> },
    { id: 'privacidad', label: 'Privacidad', icon: <LockIcon className="w-4 h-4" /> },
    { id: 'cookies', label: 'Cookies', icon: <ShieldIcon className="w-4 h-4" /> },
    { id: 'terminos', label: 'Términos', icon: <FileTextIcon className="w-4 h-4" /> },
  ];

  const content = {
    aviso: (
      <div className="space-y-8 animate-fade-in text-sm text-light-600 leading-relaxed">
        <section>
          <h3 className="text-xl font-black text-light-900 mb-6 flex items-center uppercase tracking-tight">
            <InfoIcon className="w-5 h-5 text-primary mr-3" />
            1. Información Identificativa y Titularidad
          </h3>
          <p className="mb-4">
            En cumplimiento con el deber de información recogido en el artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y del Comercio Electrónico (LSSICE), el propietario de la web informa de lo siguiente:
          </p>
          <p className="mb-4">
            La titularidad de este sitio web, https://betmaster-analyst.com, (en adelante, el Sitio Web) la ostenta: BetMaster Analyst S.L., provista de NIF: B12345678 e inscrita en el Registro Mercantil de Madrid; Tomo 12345, Folio 123, Sección 8, Hoja M-123456, Inscripción 1ª. Su domicilio social se encuentra en: Calle de la Rentabilidad 42, 28001 Madrid, España.
          </p>
          <p className="mb-4">
            El acceso y el uso de este Sitio Web atribuye la condición de Usuario, que acepta, desde dicho acceso y/o uso, las Condiciones Generales de Uso aquí reflejadas. Las citadas Condiciones serán de aplicación independientemente de las Condiciones Generales de Contratación que en su caso resulten de obligado cumplimiento.
          </p>
          <div className="bg-light-50 p-6 rounded-2xl border border-light-100 font-bold">
            <p>Email de contacto: legal@betmaster.com</p>
            <p>Teléfono: +34 900 000 000</p>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-black text-light-900 mb-6 uppercase tracking-tight">2. Condiciones Generales de Uso</h3>
          <p className="mb-4">
            El Sitio Web proporciona el acceso a multitud de informaciones, servicios, programas o datos (en adelante, "los contenidos") en Internet pertenecientes a BetMaster Analyst o a sus licenciantes a los que el Usuario pueda tener acceso. El Usuario asume la responsabilidad del uso del portal. Dicha responsabilidad se extiende al registro que fuese necesario para acceder a determinados servicios o contenidos.
          </p>
          <p className="mb-4">
            En dicho registro el Usuario será responsable de aportar información veraz y lícita. Como consecuencia de este registro, al Usuario se le puede proporcionar una contraseña de la que será responsable, comprometiéndose a hacer un uso diligente y confidencial de la misma. El Usuario se compromete a hacer un uso adecuado de los contenidos y servicios (como por ejemplo servicios de chat, foros de discusión o grupos de noticias) que BetMaster Analyst ofrece a través de su portal y con carácter enunciativo pero no limitativo, a no emplearlos para:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Incurrir en actividades ilícitas, ilegales o contrarias a la buena fe y al orden público.</li>
            <li>Difundir contenidos o propaganda de carácter racista, xenófobo, pornográfico-ilegal, de apología del terrorismo o atentatorio contra los derechos humanos.</li>
            <li>Provocar daños en los sistemas físicos y lógicos de BetMaster Analyst, de sus proveedores o de terceras personas, introducir o difundir en la red virus informáticos o cualesquiera otros sistemas físicos o lógicos que sean susceptibles de provocar los daños anteriormente mencionados.</li>
            <li>Intentar acceder y, en su caso, utilizar las cuentas de correo electrónico de otros usuarios y modificar o manipular sus mensajes.</li>
          </ul>
        </section>

        <section className="bg-danger/5 p-8 rounded-2xl border border-danger/10">
          <h3 className="text-xl font-black text-danger mb-4 flex items-center uppercase tracking-tight">
            <AlertIcon className="w-5 h-5 mr-3" />
            3. Advertencia de Riesgo y +18
          </h3>
          <p className="font-bold mb-4">
            BetMaster Analyst NO ES UNA CASA DE APUESTAS NI UN OPERADOR DE JUEGO. Proporcionamos exclusivamente servicios de análisis estadístico, verificación de pronósticos y contenido educativo.
          </p>
          <p className="mb-4">
            El juego con dinero real conlleva un riesgo intrínseco de pérdida financiera y de desarrollo de ludopatía. El Usuario declara ser mayor de 18 años (o la edad legal mínima en su jurisdicción) para acceder a los contenidos de esta web. BetMaster Analyst no se hace responsable de las decisiones financieras tomadas por el Usuario basadas en el contenido de esta web.
          </p>
          <p>
            RECUERDE: Juegue con responsabilidad. Si cree que tiene un problema con el juego, busque ayuda profesional inmediatamente en organismos oficiales como JugarBien.es o BeGambleAware.org.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-black text-light-900 mb-6 uppercase tracking-tight">4. Exclusión de Garantías y Responsabilidad</h3>
          <p className="mb-4">
            BetMaster Analyst no se hace responsable, en ningún caso, de los daños y perjuicios de cualquier naturaleza que pudieran ocasionar, a título enunciativo: errores u omisiones en los contenidos, falta de disponibilidad del portal o la transmisión de virus o programas maliciosos o lesivos en los contenidos, a pesar de haber adoptado todas las medidas tecnológicas necesarias para evitarlo.
          </p>
          <p>
            La información sobre pronósticos (picks) es proporcionada por terceros (Tipsters). BetMaster Analyst verifica la autenticidad de las cuotas y resultados en el momento de la publicación, pero no garantiza el éxito ni la rentabilidad futura de dichas estrategias.
          </p>
        </section>
      </div>
    ),
    privacidad: (
      <div className="space-y-8 animate-fade-in text-sm text-light-600 leading-relaxed">
        <section>
          <h3 className="text-xl font-black text-light-900 mb-6 uppercase tracking-tight">1. Política de Privacidad y Protección de Datos</h3>
          <p className="mb-4">
            BetMaster Analyst cumple con las directrices del Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo de 27 de abril de 2016 relativo a la protección de las personas físicas en lo que respecta al tratamiento de datos personales y a la libre circulación de estos datos (RGPD), así como la Ley Orgánica 3/2018, de 5 de diciembre, de Protección de Datos Personales y garantía de los derechos digitales (LOPDGDD).
          </p>
          <h4 className="font-bold text-light-900 mb-2">Responsable del Tratamiento:</h4>
          <p className="mb-4">
            BetMaster Analyst S.L.<br />
            Email: legal@betmaster.com<br />
            Delegado de Protección de Datos (DPD): dpd@betmaster.com
          </p>
        </section>

        <section>
          <h3 className="text-xl font-black text-light-900 mb-6 uppercase tracking-tight">2. Finalidad del Tratamiento de Datos</h3>
          <p className="mb-4">
            Los datos personales recabados a través del registro o formularios de contacto serán tratados con las siguientes finalidades:
          </p>
          <ul className="list-disc pl-6 space-y-4 mb-4">
            <li><span className="font-bold text-light-900">Gestión de la relación contractual:</span> Proporcionar acceso a la plataforma de tipsters, herramientas de cálculo y suscripciones contratadas.</li>
            <li><span className="font-bold text-light-900">Cumplimiento de obligaciones legales:</span> Verificación de la edad (+18) y prevención del fraude.</li>
            <li><span className="font-bold text-light-900">Comunicaciones comerciales:</span> Envío de newsletters, alertas de pronósticos y promociones de casas de apuestas colaboradoras (siempre que el usuario haya otorgado su consentimiento explícito).</li>
            <li><span className="font-bold text-light-900">Análisis estadístico:</span> Mejora de la experiencia de usuario mediante el análisis anónimo de patrones de navegación.</li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-black text-light-900 mb-6 uppercase tracking-tight">3. Legitimación y Conservación</h3>
          <p className="mb-4">
            La base legal para el tratamiento de sus datos es el consentimiento del Usuario, la ejecución de un contrato de servicios y el cumplimiento de obligaciones legales de verificación.
          </p>
          <p>
            Los datos se conservarán mientras exista un interés mutuo para mantener el fin del tratamiento o cuando sea necesario para el cumplimiento de obligaciones legales. Cuando ya no sea necesario para tal fin, se suprimirán con medidas de seguridad adecuadas para garantizar la seudonimización de los datos o la destrucción total de los mismos.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-black text-light-900 mb-6 uppercase tracking-tight">4. Derechos del Usuario (ARCO-POL)</h3>
          <p className="mb-4">
            El Usuario tiene derecho a:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { t: 'Acceso', d: 'Conocer qué datos estamos tratando.' },
              { t: 'Rectificación', d: 'Modificar datos inexactos o incompletos.' },
              { t: 'Supresión', d: 'Solicitar el borrado de sus datos (derecho al olvido).' },
              { t: 'Oposición', d: 'Oponerse a determinados tratamientos como el marketing.' },
              { t: 'Limitación', d: 'Solicitar la suspensión temporal del tratamiento.' },
              { t: 'Portabilidad', d: 'Recibir sus datos en un formato estructurado.' }
            ].map(d => (
              <div key={d.t} className="p-4 bg-light-50 rounded-xl border border-light-100">
                <p className="font-bold text-primary text-xs uppercase tracking-widest mb-1">{d.t}</p>
                <p className="text-xs text-light-500">{d.d}</p>
              </div>
            ))}
          </div>
          <p className="mt-6">
            Para ejercer estos derechos, puede enviar una solicitud a <strong>legal@betmaster.com</strong> adjuntando fotocopia de su DNI o documento equivalente.
          </p>
        </section>
      </div>
    ),
    cookies: (
      <div className="space-y-8 animate-fade-in text-sm text-light-600 leading-relaxed">
        <section>
          <h3 className="text-xl font-black text-light-900 mb-6 uppercase tracking-tight">1. Política de Cookies</h3>
          <p className="mb-4">
            Este Sitio Web utiliza cookies y/o tecnologías similares que almacenan y recuperan información cuando navegas. En general, estas tecnologías pueden servir para finalidades muy diversas, como, por ejemplo, reconocerte como usuario, obtener información sobre tus hábitos de navegación, o personalizar la forma en que se muestra el contenido.
          </p>
          <p>
            BetMaster Analyst utiliza cookies técnicas, de personalización, de análisis y publicitarias. A continuación, detallamos cada una de ellas:
          </p>
        </section>

        <section>
          <h3 className="text-xl font-black text-light-900 mb-6 uppercase tracking-tight">2. Clasificación de las Cookies</h3>
          <div className="space-y-6">
            <div className="p-6 bg-white border border-light-200 rounded-2xl shadow-sm">
              <h4 className="font-black text-light-900 mb-2 uppercase text-xs tracking-widest">Cookies Técnicas (Necesarias)</h4>
              <p className="text-xs mb-4">Son aquellas que permiten al usuario la navegación a través de una página web, plataforma o aplicación y la utilización de las diferentes opciones o servicios que en ella existan. Por ejemplo, controlar el tráfico, identificar la sesión, acceder a partes de acceso restringido o recordar elementos de un pedido.</p>
              <div className="text-[10px] bg-light-50 p-3 rounded-lg border border-light-100 font-mono">
                __session_id, __auth_token, __cookie_consent
              </div>
            </div>
            
            <div className="p-6 bg-white border border-light-200 rounded-2xl shadow-sm">
              <h4 className="font-black text-light-900 mb-2 uppercase text-xs tracking-widest">Cookies de Análisis (Estadísticas)</h4>
              <p className="text-xs mb-4">Son aquellas que, bien tratadas por nosotros o por terceros, nos permiten cuantificar el número de usuarios y así realizar la medición y análisis estadístico de la utilización que hacen los usuarios del servicio ofertado. Para ello se analiza su navegación en nuestra página web con el fin de mejorar la oferta de productos o servicios que le ofrecemos.</p>
              <div className="text-[10px] bg-light-50 p-3 rounded-lg border border-light-100 font-mono">
                _ga, _gid, _gat_gtag (Google Analytics)
              </div>
            </div>

            <div className="p-6 bg-white border border-light-200 rounded-2xl shadow-sm">
              <h4 className="font-black text-light-900 mb-2 uppercase text-xs tracking-widest">Cookies de Marketing</h4>
              <p className="text-xs mb-4">Estas cookies se utilizan para rastrear a los visitantes a través de las páginas web. La intención es mostrar anuncios que sean relevantes y atractivos para el usuario individual y, por tanto, más valiosos para los editores y terceros anunciantes.</p>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-black text-light-900 mb-6 uppercase tracking-tight">3. Desactivación de Cookies</h3>
          <p className="mb-4">
            Usted puede permitir, bloquear o eliminar las cookies instaladas en su equipo mediante la configuración de las opciones del navegador instalado en su ordenador:
          </p>
          <ul className="grid grid-cols-2 gap-2 text-xs font-bold">
            <li className="p-2 bg-light-50 rounded border border-light-100">Google Chrome</li>
            <li className="p-2 bg-light-50 rounded border border-light-100">Mozilla Firefox</li>
            <li className="p-2 bg-light-50 rounded border border-light-100">Safari</li>
            <li className="p-2 bg-light-50 rounded border border-light-100">Microsoft Edge</li>
          </ul>
          <p className="mt-4">
            Tenga en cuenta que si desactiva las cookies técnicas, el funcionamiento de la plataforma (como el inicio de sesión o la calculadora) podría verse gravemente afectado.
          </p>
        </section>
      </div>
    ),
    terminos: (
      <div className="space-y-8 animate-fade-in text-sm text-light-600 leading-relaxed">
        <section>
          <h3 className="text-xl font-black text-light-900 mb-6 uppercase tracking-tight">1. Términos y Condiciones de Servicio</h3>
          <p className="mb-4">
            El presente documento establece las condiciones de uso de la plataforma BetMaster Analyst. Al registrarse como Usuario o Tipster, usted acepta plenamente estos términos sin reservas.
          </p>
          <p>
            BetMaster Analyst se reserva el derecho de modificar unilateralmente estas condiciones en cualquier momento para adaptarlas a novedades legislativas o cambios en el modelo de negocio.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-black text-light-900 mb-6 uppercase tracking-tight">2. Registro de Usuario y Cuentas</h3>
          <p className="mb-4">
            Para utilizar determinadas funciones del Sitio Web, el Usuario debe registrarse y crear una cuenta. El Usuario es responsable de mantener la confidencialidad de su cuenta y contraseña.
          </p>
          <ul className="list-disc pl-6 space-y-4 mb-4">
            <li><span className="font-black text-light-900">Veracidad:</span> El Usuario garantiza que todos los datos facilitados son veraces y están actualizados.</li>
            <li><span className="font-black text-light-900">Uso Personal:</span> Las cuentas son personales e intransferibles. Está prohibida la venta o cesión de perfiles de Tipster a terceros.</li>
            <li><span className="font-black text-light-900">Seguridad:</span> El Usuario debe notificar inmediatamente a BetMaster Analyst cualquier uso no autorizado de su cuenta.</li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-black text-light-900 mb-6 uppercase tracking-tight">3. Normas para Tipsters</h3>
          <p className="mb-4">
            Los usuarios que publiquen pronósticos (Tipsters) deben cumplir con el Código Ético de BetMaster Analyst:
          </p>
          <div className="space-y-4">
            <div className="p-5 bg-light-50 rounded-2xl border border-light-100 flex items-start gap-4">
              <CheckIcon className="w-5 h-5 text-success shrink-0 mt-1" />
              <p><strong>Prohibido el Pasting:</strong> Los Tipsters no pueden copiar pronósticos de otros analistas sin permiso. Cada pick debe ser original.</p>
            </div>
            <div className="p-5 bg-light-50 rounded-2xl border border-light-100 flex items-start gap-4">
              <CheckIcon className="w-5 h-5 text-success shrink-0 mt-1" />
              <p><strong>Cuotas Reales:</strong> No se permite la publicación de cuotas ficticias o de casas de apuestas no licenciadas. Nuestro sistema audita el valor de mercado en tiempo real.</p>
            </div>
            <div className="p-5 bg-light-50 rounded-2xl border border-light-100 flex items-start gap-4">
              <CheckIcon className="w-5 h-5 text-success shrink-0 mt-1" />
              <p><strong>Manipulación:</strong> La manipulación de resultados, el borrado de picks fallados o cualquier alteración del histórico conllevará la expulsión inmediata y permanente de la plataforma.</p>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-black text-light-900 mb-6 uppercase tracking-tight">4. Propiedad de los Datos y Contenidos</h3>
          <p className="mb-4">
            BetMaster Analyst es el propietario exclusivo de la base de datos de picks, rankings y estadísticas generadas en el Sitio Web. El Usuario tiene una licencia de uso personal y no comercial.
          </p>
          <p className="font-bold text-danger">
            Queda estrictamente prohibido el uso de scrapers, bots o cualquier técnica de extracción masiva de datos con fines comerciales sin autorización previa por escrito.
          </p>
        </section>
      </div>
    )
  };

  return (
    <div className="pt-24 pb-20 min-h-screen bg-light-50">
      <SEO title="Información Legal | BetMaster Analyst" description="Aviso legal, política de privacidad y términos de servicio de la plataforma líder en análisis deportivo." />
      
      <div className="page-container">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-display font-black text-light-900 mb-2 tracking-tight">Centro <span className="text-primary">Legal</span></h1>
          <p className="text-light-400 font-bold uppercase tracking-[0.2em] text-[10px]">Documentación Oficial de BetMaster Analyst</p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all
                ${activeTab === tab.id ? 'bg-light-900 text-white shadow-xl scale-105' : 'bg-white text-light-400 border border-light-100 hover:text-light-900'}`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-[2rem] p-8 md:p-14 shadow-2xl border border-light-50 min-h-[600px]">
          {content[activeTab]}
        </div>
      </div>
    </div>
  );
};

export default Legal;

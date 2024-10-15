// Función para agregar un mensaje al chat
function agregarMensaje(contenido, clase) {
    if (typeof contenido !== 'undefined') {
        const chatContainer = document.getElementById("chat-container");
        const mensaje = document.createElement("div");
        mensaje.innerHTML = contenido; // Usa innerHTML para manejar contenido HTML
        mensaje.className = "chat-message " + clase;
        chatContainer.appendChild(mensaje);

        // Desplazar automáticamente hacia abajo para mostrar los últimos mensajes
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }
}




// Función para mostrar "Escribiendo..."
function mostrarEscribiendo() {
    const headerInfo = document.getElementById("last-connection");
    headerInfo.innerHTML = "Escribiendo...";
}

// Función para mostrar la hora actual como "Última conexión"
function mostrarUltimaConexion() {
    const headerInfo = document.getElementById("last-connection");
    const fecha = new Date();
    const hora = fecha.getHours().toString().padStart(2, "0");
    const minutos = fecha.getMinutes().toString().padStart(2, "0");
    headerInfo.textContent = "Última conexión: " + hora + ":" + minutos;
}

// Variables para controlar la velocidad de los mensajes
let ultimoMensajeEnviado = 0;
let ultimoChisteIndex = -1;  // Agregamos esta línea para mantener el índice del último chiste
let solicitandoChiste = false;
const tiempoMinimoEntreMensajes = 1000; // 2000 milisegundos (2 segundos)

// Almacena la lista de chistes
const chistes = [
    "A ver, Pepito, ¿cuánto es 4 por 4?. Empate.",
    "¿Cómo se dice pañuelo en japonés? Saka-moko.",
    "¿Qué hace una abeja en el gimnasio? Zum-ba.",
    "¿Qué le dice un semáforo a otro semáforo? No me mires, me estoy cambiando.",
    "¿Por qué los pájaros no usan Facebook? Porque ya tienen Twitter.",
    "¿Qué hace una abeja en el gimnasio? ¡Zum-ba!",
    "¿Cuál es el colmo de un electricista? No encontrar su corriente de trabajo.",
    "¿Qué hace una abeja en el gimnasio? ¡Zum-ba!",
    "¿Por qué los pájaros no usan Facebook? Porque ya tienen Twitter.",
    "¿Cuál es el colmo de un electricista? No encontrar su corriente de trabajo.",
    // Agrega más chistes aquí
];

// Función para procesar el mensaje del usuario y generar una respuesta
function procesarMensaje(mensaje) {
    mensaje = mensaje.toLowerCase();

    if (mensaje.includes("hola") || mensaje.includes("hola bot")) {
        return "¡Muy buenas! ¿En qué puedo ayudarte?";
    } else if (mensaje.includes("ayuda") || mensaje.includes("opciones")) {
        return "Puedes preguntarme sobre mi 'experiencia', 'formación', 'habilidades' y 'proyectos'.<br><br>" +
            "Si quieres te puedo contar un chiste, pero solo si me lo pides con amabilidad: 'cuéntame un chiste, por favor'.<br><br>" +
            "Y si quieres, puedes ser amable y escribirme, 'hola', 'adiós' y 'gracias'.";
    } else if (mensaje.includes("habilidades") || mensaje.includes("skills")) {
        return "Tengo habilidades en el ámbito del diseño gráfico donde dispongo de conocimiento de todo el software de Adobe.<br><br>" +
            "También tengo conocimientos en el diseño web, donde utilizo los lenguajes de programación HTML, CSS, JavaScript y un software de diseño y prototipado como es Figma.";
    } else if (mensaje.includes("experiencia") || mensaje.includes("trabajo anterior")) {
        mostrarEscribiendo();
    
        setTimeout(function () {
            const experienciaActual = "<em>Actualidad</em> <br><br>" +
                "Estoy realizando funciones como monitor en casales, cursos extraescolares y eventos especiales en el Ayuntamiento de Viladecans. ";
                   
            agregarMensaje(experienciaActual, "bot");
            mostrarUltimaConexion();
    
            const parte1 = "<em>2020 - 2021</em> <br><br>" +
                "<strong>Monitor de pista | Gené Karting </strong> <br><br>" +
                "Atención de cara al público instruyendo para el uso correcto del servicio, asesoramiento e información.";
    
            const parte2 = "<em>2019</em> <br><br>" +
                "<strong>Prácticas  |  FUNDACIÓN VILADECANS</strong><br><br>" +
                "Enseñanza de robótica y alfabetización informática.";
    
            const parte3 = "<em>2019</em> <br><br>" +
                "<strong>Prácticas  |  TV3</strong><br><br>" +
                "Utilización de todo el software de Adobe. Realización de trabajo en equipo y cooperación en el diseño gráfico. <br>" +
                "Mejora de la comunicación efectiva, potenciando la planificación y el conocimiento compartido.";
    
            const parte4 = "<em>2017</em> <br><br>" +
                "<strong>Prácticas  |  FUNDACIÓN VILADECANS</strong><br><br>" +
                "Mejora de la funcionalidad de una de sus páginas web hecha en WordPress, mantenimiento y actualización <br>" +
                "Creación de una web tocando código html, css y javascript con la supervisión pertinente.";
    
            const partes = [parte1, parte2, parte3, parte4];
    
            // Función recursiva para mostrar partes en secuencia
            function mostrarPartes(indice) {
                if (indice < partes.length) {
                    mostrarEscribiendo();
                    setTimeout(function () {
                        agregarMensaje(partes[indice], "bot");
                        mostrarUltimaConexion();
                        mostrarPartes(indice + 1);
                    }, 500);
                }
            }
    
            // Iniciar la secuencia de partes
            mostrarPartes(0);
        }, 500);
    } else if (mensaje.includes("formación") || mensaje.includes("formación academica")) {
        mostrarEscribiendo();
    
        setTimeout(function () {
           
            const parte1 = "<em>2020 - 2024</em> <br><br>" +
                "<strong>ESDAPC Campus Serra i Abella</strong> <br><br>" +
                "Cursando el grado universitario de diseño gráfico.";
    
            const parte2 = "<em>2018 - 2019</em> <br><br>" +
                "<strong>EFA</strong><br><br>" +
                "Título de monitor de tiempo libre.";
    
            const parte3 = "<em>2017 - 2019</em> <br><br>" +
                "<strong>EMAID</strong><br><br>" +
                "Titulado de técnico superior de artes plasticas y diseño.";
    
            const parte4 = "<em>2015 - 2017</em> <br><br>" +
                "<strong>EMAID</strong><br><br>" +
                "Títulado de técnico al producto gráfico interactivo, diseño WEB.";
    
            const partes = [parte1, parte2, parte3, parte4];
    
            // Función recursiva para mostrar partes en secuencia
            function mostrarPartes(indice) {
                if (indice < partes.length) {
                    mostrarEscribiendo();
                    setTimeout(function () {
                        agregarMensaje(partes[indice], "bot");
                        mostrarUltimaConexion();
                        mostrarPartes(indice + 1);
                    }, 500);
                }
            }
    
            // Iniciar la secuencia de partes
            mostrarPartes(0);
        }, 500);
    }   else if (mensaje.includes("proyectos")) {
        // Mostrar "Escribiendo..."
        mostrarEscribiendo();

        // Simular un retraso antes de mostrar los proyectos
        setTimeout(function () {
            const proyectoContainer = document.getElementById("chat-container");

            // Crear un elemento de imagen
            const imagen = document.createElement("img");
            imagen.src = "Assets/img1.jpg"; // Ruta de la imagen
            imagen.alt = "Proyectos";

            // Aplicar estilos CSS para reducir el tamaño de la imagen
            imagen.style.maxWidth = "100%"; // Esto ajustará la imagen al ancho del contenedor

            // Crear un elemento de párrafo para el texto
            const texto = document.createElement("p");

            // Agregar la imagen y el texto al contenedor de chat por separado
            agregarMensaje(imagen.outerHTML, "bot"); // Agrega la imagen

            // Agregar el enlace como un ancla
            const enlace = document.createElement("a");
            enlace.href = "https://www.behance.net/Rdisseny"; // Cambia la URL a tu proyecto
            enlace.textContent = "Ver todos los proyectos"; // Cambia el texto del enlace según tus preferencias
            agregarMensaje(enlace.outerHTML, "bot"); // Agrega el enlace

            // Mostrar la hora actual como "Última conexión"
            mostrarUltimaConexion();
        }, 1000); // Cambia el tiempo de espera según sea necesario

        return "Aquí tienes un ejemplo de uno de mis proyectos donde se creó una tipografía modular que representa el efecto glitch."; // Devolver un mensaje vacío
    } else if (mensaje.includes("adiós") || mensaje.includes("chao")) {
        return "¡Hasta luego! Si tienes más preguntas, no dudes en preguntar.";
    } else if (mensaje.includes("gracias") || mensaje.includes("thanks")) {
        return "De nada, ¡estoy aquí para ayudar!";
    } else if (mensaje.includes("cuéntame un chiste, por favor") || mensaje.includes("chiste")) {
        solicitandoChiste = true; // El usuario está solicitando un chiste
        const chisteAleatorio = chistes[Math.floor(Math.random() * chistes.length)];
        return chisteAleatorio;
    } else if (solicitandoChiste && (mensaje.includes("otro") || mensaje.includes("más"))) {
        const chisteAleatorio = chistes[Math.floor(Math.random() * chistes.length)];
        return chisteAleatorio;
    } else {
        solicitandoChiste = false;
        return "Lo siento, no entiendo qué me quieres decir.";
    }
}






// Función para enviar un mensaje
function enviarMensaje() {
    const userInput = document.getElementById("user-input");
    const mensaje = userInput.value;
    const tiempoActual = new Date().getTime();

    if (mensaje.trim() !== "") {
        if (tiempoActual - ultimoMensajeEnviado < tiempoMinimoEntreMensajes) {
            // El usuario está escribiendo demasiado rápido
            agregarMensaje("Por favor, no vayas tan deprisa. No me da tiempo a pensar.", "bot");
        } else {
            agregarMensaje(mensaje, "user");
            userInput.value = "";

            // Procesar el mensaje del usuario y obtener una respuesta
            const respuestaIA = procesarMensaje(mensaje);

            // Simula una breve pausa antes de la respuesta de la IA
            setTimeout(function() {
                mostrarEscribiendo();
            }, 500);

            // Respuesta de la IA después del retraso
            setTimeout(function() {
                agregarMensaje(respuestaIA, "bot");
                // Mostrar la hora actual como "Última conexión"
                mostrarUltimaConexion();
            }, 1000);

            ultimoMensajeEnviado = tiempoActual;
        }
    }
}

// Controlador de eventos para la tecla "Enter" ----------------------------------
document.getElementById("user-input").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        enviarMensaje();
    }
});

// Mensaje de bienvenida de la IA al cargar la página ----------------------------------
window.onload = function() {
    setTimeout(function() {
        const mensajeBienvenida = "Hola, mi nombre es <strong>Ramon Bartomeu Galan</strong>.\n\n" +
            "Soy estudiante de diseño gráfico y web.\n\n" +
            "Estoy ansioso por conocer posibles oportunidades profesionales. \n\n " +
            "Escribe 'ayuda' para saber más sobre mí.";
        agregarMensajeConSaltos(mensajeBienvenida, "bot");
    }, 1000);
}

// Función para agregar un mensaje con saltos de línea 
function agregarMensajeConSaltos(texto, clase) {
    const chatContainer = document.getElementById("chat-container");
    const mensaje = document.createElement("div");
    mensaje.innerHTML = texto.replace(/\n/g, "<br>"); // Reemplaza saltos de línea con <br>
    mensaje.className = "chat-message " + clase;
    chatContainer.appendChild(mensaje);
}



// Obtén el contenedor del chat ----------------------------------
const chatContainer = document.getElementById("chat-container");

// Habilita el desplazamiento de la rueda del mouse
chatContainer.addEventListener("wheel", (e) => {
    if (e.deltaY < 0) {
        // Desplazarse hacia arriba
        chatContainer.scrollTop -= 80;
    } else {
        // Desplazarse hacia abajo
        chatContainer.scrollTop += 80;
    }
});



// Obtén la imagen de perfil y el lightbox ----------------------------------
const profileImage = document.getElementById("profile-image");
const lightbox = document.createElement("div");
lightbox.className = "lightbox";
const lightboxImage = document.createElement("img");
lightboxImage.className = "lightbox-image";
lightbox.appendChild(lightboxImage);
document.body.appendChild(lightbox);

// Función para mostrar el lightbox
profileImage.addEventListener("click", () => {
    lightboxImage.src = profileImage.src;
    lightbox.style.display = "block";
});

// Función para cerrar el lightbox
function cerrarLightbox() {
    lightbox.style.display = "none";
}

// Detectar el evento "Escape" para cerrar el lightbox
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        cerrarLightbox();
    }
});

lightbox.addEventListener("click", () => {
    cerrarLightbox();
});

lightboxImage.addEventListener("click", (event) => {
    event.stopPropagation(); // Evita que el clic en la imagen cierre el lightbox
});




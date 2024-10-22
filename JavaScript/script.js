


// Función para activar la línea seleccionada y hacer scroll a la sección correspondiente
function activateLine(selectedLine) {
    const lines = document.querySelectorAll('.line'); // Selecciona todas las líneas
    const sections = document.querySelectorAll('section'); // Selecciona todas las secciones

    lines.forEach(line => {
        line.classList.remove('active'); // Elimina la clase 'active' de todas las líneas
    });

    selectedLine.classList.add('active'); // Añade la clase 'active' a la línea seleccionada

    const index = Array.from(lines).indexOf(selectedLine); // Encuentra el índice de la línea seleccionada
    const targetSection = sections[index]; // Selecciona la sección correspondiente

    if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' }); // Desplaza suavemente hacia la sección correspondiente
    }
}

// Función para actualizar la línea activa al hacer scroll
function updateActiveLine() {
    const sections = document.querySelectorAll('section');
    const lines = document.querySelectorAll('.line');
    let currentSectionIndex = Math.round(window.scrollY / window.innerHeight); // Calcula el índice de la sección visible

    lines.forEach((line, index) => {
        if (index === currentSectionIndex) {
            line.classList.add('active'); // Añade la clase 'active' a la línea correspondiente a la sección visible
        } else {
            line.classList.remove('active'); // Elimina la clase 'active' de las demás líneas
        }
    });

    // Oculta o muestra el rectángulo y el texto "Deslizar"
    toggleScrollDownVisibility(sections[currentSectionIndex]);
}

// Función para mostrar/ocultar el rectángulo y el texto "Deslizar"
function toggleScrollDownVisibility(currentSection) {
    const scrollDownContainer = document.querySelector('.scroll-down'); // Selecciona el contenedor de "Deslizar"
    
    // Comprobamos si estamos en la sección 'Perfil'
    if (currentSection && currentSection.id === 'perfil') {
        // Si estamos en 'Perfil', asegúrate de que el contenedor esté visible
        scrollDownContainer.classList.remove('hidden'); // Asegúrate de que el contenedor no esté oculto
        scrollDownContainer.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
        scrollDownContainer.style.transform = 'translateY(0)'; // Vuelve a su posición original
        scrollDownContainer.style.opacity = '1'; // Vuelve a ser visible
    } else {
        // Si no estamos en 'Perfil', anima el desplazamiento hacia abajo
        scrollDownContainer.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
        scrollDownContainer.style.transform = 'translateY(50px)'; // Desplaza hacia abajo
        scrollDownContainer.style.opacity = '0'; // Desaparece suavemente     
    }
}





// Evento para manejar las teclas de flecha arriba y abajo
window.addEventListener('keydown', (e) => {
    const sections = document.querySelectorAll('section');
    let currentSection = Math.round(window.scrollY / window.innerHeight);

    if (e.key === 'ArrowDown' && currentSection < sections.length - 1) {
        e.preventDefault();
        window.scrollTo({ top: (currentSection + 1) * window.innerHeight, behavior: 'smooth' });
    } else if (e.key === 'ArrowUp' && currentSection > 0) {
        e.preventDefault();
        window.scrollTo({ top: (currentSection - 1) * window.innerHeight, behavior: 'smooth' });
    }

    // Actualiza las líneas al usar las teclas
    updateActiveLine();
});

// Evento para actualizar el estado del menú al hacer scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const menuItems = document.querySelectorAll('.menu a');

    sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 150 && rect.bottom >= 150) {
            menuItems.forEach(item => item.classList.remove('active'));
            menuItems[index].classList.add('active');
        }
    });
});

// Evento para actualizar la línea activa al cargar la página o al hacer scroll manualmente
window.addEventListener('scroll', updateActiveLine);

// --- Nueva funcionalidad para el cuadro en los botones de redes sociales ---
// Función para manejar el cuadrado en los botones de redes sociales
const socialButtons = document.querySelectorAll('.social-btn');

function setActiveSocialButton(event) {
    // Elimina la clase 'active' de todos los botones
    socialButtons.forEach(button => button.classList.remove('active'));

    // Añade la clase 'active' al botón actual
    event.currentTarget.classList.add('active');
}

// Añade el evento 'mouseover' a cada botón
socialButtons.forEach(button => {
    button.addEventListener('mouseover', setActiveSocialButton);
});

// --- Activar la primera línea de la izquierda al cargar la página ---
// Función para activar la primera línea
window.onload = () => {
    const firstLine = document.querySelector('.line'); // Selecciona la primera línea
    firstLine.classList.add('active'); // Añade la clase 'active' a la primera línea
};




const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const closeMenu = document.getElementById('close-menu');

hamburger.addEventListener('click', () => {
    mobileMenu.style.display = 'block'; // Muestra el menú
});

closeMenu.addEventListener('click', () => {
    mobileMenu.style.display = 'none'; // Oculta el menú
});

function toggleMenu() {
    const menuPopup = document.getElementById('menu-popup');
    menuPopup.classList.toggle('active'); // Alterna la clase activa
}


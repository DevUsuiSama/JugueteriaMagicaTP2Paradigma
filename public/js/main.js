class JugueteriaMagica {
    constructor() {
        this.inicializar();
    }

    inicializar() {
        this.configurarNavegacion();
        this.configurarInteracciones();
        this.cargarProductosDestacados();
    }

    configurarNavegacion() {

        const paginaActual = window.location.pathname.split('/').pop() || 'index.html';
        const enlaces = document.querySelectorAll('.cabecera__enlace');

        enlaces.forEach(enlace => {
            const href = enlace.getAttribute('href');
            if (href === paginaActual || (paginaActual === '' && href === 'index.html')) {
                enlace.classList.add('cabecera__enlace--activo');
            }
        });
    }

    configurarInteracciones() {

        this.configurarTooltips();


        this.configurarCargadoPerezoso();
    }

    configurarTooltips() {

        const elementosConTooltip = document.querySelectorAll('[data-tooltip]');

        elementosConTooltip.forEach(elemento => {
            elemento.addEventListener('mouseenter', this.mostrarTooltip);
            elemento.addEventListener('mouseleave', this.ocultarTooltip);
        });
    }

    mostrarTooltip(evento) {

    }

    ocultarTooltip(evento) {

    }

    configurarCargadoPerezoso() {

        if ('IntersectionObserver' in window) {
            const observador = new IntersectionObserver((entradas) => {
                entradas.forEach(entrada => {
                    if (entrada.isIntersecting) {
                        const img = entrada.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        observador.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                observador.observe(img);
            });
        }
    }

    cargarProductosDestacados() {

        if (document.querySelector('.destacados__grid')) {

            const productosDestacados = [
                {
                    icono: '🚗',
                    titulo: 'Autos de Juguete',
                    texto: 'Variedad de autos a control remoto y de colección'
                },
                {
                    icono: '🎮',
                    titulo: 'Juegos Educativos',
                    texto: 'Aprendizaje divertido para todas las edades'
                },
                {
                    icono: '🧸',
                    titulo: 'Peluches',
                    texto: 'Los compañeros más suaves y divertidos'
                }
            ];

            this.mostrarProductosDestacados(productosDestacados);
        }
    }

    mostrarProductosDestacados(productos) {
        const contenedor = document.querySelector('.destacados__grid');
        if (!contenedor) return;

        contenedor.innerHTML = productos.map(producto => `
            <div class="tarjeta-destacado">
                <div class="tarjeta-destacado__icono">${producto.icono}</div>
                <h3 class="tarjeta-destacado__titulo">${producto.titulo}</h3>
                <p class="tarjeta-destacado__texto">${producto.texto}</p>
            </div>
        `).join('');
    }
}


document.addEventListener('DOMContentLoaded', () => {
    new JugueteriaMagica();
});
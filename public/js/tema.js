class ManejadorTema {
    constructor() {
        this.temaGuardado = localStorage.getItem('tema');
        this.botonTema = document.getElementById('botonTema');
        this.iconoTema = document.getElementById('iconoTema');
        this.inicializar();
    }

    inicializar() {

        if (this.temaGuardado) {
            this.aplicarTema(this.temaGuardado);
        } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            this.aplicarTema('oscuro');
        } else {
            this.aplicarTema('claro');
        }


        if (this.botonTema) {
            this.botonTema.addEventListener('click', () => this.alternarTema());
        }


        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!this.temaGuardado) {
                this.aplicarTema(e.matches ? 'oscuro' : 'claro');
            }
        });
    }

    aplicarTema(tema) {
        document.documentElement.setAttribute('data-tema', tema);
        this.actualizarIcono(tema);
        localStorage.setItem('tema', tema);
        this.temaGuardado = tema;
    }

    alternarTema() {
        const temaActual = document.documentElement.getAttribute('data-tema');
        const nuevoTema = temaActual === 'oscuro' ? 'claro' : 'oscuro';
        this.aplicarTema(nuevoTema);
    }

    actualizarIcono(tema) {
        if (this.iconoTema) {
            this.iconoTema.textContent = tema === 'oscuro' ? '☀️' : '🌙';
        }
    }
}


document.addEventListener('DOMContentLoaded', () => {
    new ManejadorTema();
});
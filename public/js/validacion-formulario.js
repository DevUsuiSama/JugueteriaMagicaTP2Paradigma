class ValidadorFormulario {
    constructor(formularioId) {
        this.formulario = document.getElementById(formularioId);
        this.campos = {};
        this.inicializar();
    }

    inicializar() {
        if (!this.formulario) return;


        this.formulario.addEventListener('submit', (e) => this.validarEnvio(e));


        const campos = this.formulario.querySelectorAll('input, select, textarea');
        campos.forEach(campo => {
            campo.addEventListener('blur', () => this.validarCampo(campo));
            campo.addEventListener('input', () => this.limpiarError(campo));
        });
    }

    validarCampo(campo) {
        const valor = campo.value.trim();
        const nombre = campo.name;
        let esValido = true;
        let mensaje = '';

        switch (campo.type) {
            case 'text':
                esValido = this.validarTexto(valor);
                mensaje = 'Este campo es requerido';
                break;
            case 'email':
                esValido = this.validarEmail(valor);
                mensaje = 'Por favor ingresa un email válido';
                break;
            case 'tel':
                esValido = this.validarTelefono(valor);
                mensaje = 'Por favor ingresa un teléfono válido';
                break;
            default:
                if (campo.tagName === 'SELECT') {
                    esValido = valor !== '';
                    mensaje = 'Por favor selecciona una opción';
                } else if (campo.tagName === 'TEXTAREA') {
                    esValido = valor.length >= 10;
                    mensaje = 'La descripción debe tener al menos 10 caracteres';
                }
        }

        if (!esValido) {
            this.mostrarError(campo, mensaje);
        } else {
            this.limpiarError(campo);
        }

        return esValido;
    }

    validarEnvio(evento) {
        evento.preventDefault();

        const campos = this.formulario.querySelectorAll('input, select, textarea');
        let formularioEsValido = true;

        campos.forEach(campo => {
            if (!this.validarCampo(campo)) {
                formularioEsValido = false;
            }
        });

        if (formularioEsValido) {
            this.enviarFormulario();
        } else {
            this.mostrarMensaje('Por favor corrige los errores en el formulario', 'error');
        }
    }

    validarTexto(texto) {
        return texto.length >= 2;
    }

    validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    validarTelefono(telefono) {
        const regex = /^[\d\s\-\(\)]+$/;
        return regex.test(telefono) && telefono.replace(/\D/g, '').length >= 8;
    }

    mostrarError(campo, mensaje) {
        campo.classList.add('entrada-formulario--error');

        let elementoError = campo.parentNode.querySelector('.error-formulario');
        if (!elementoError) {
            elementoError = document.createElement('div');
            elementoError.className = 'error-formulario';
            campo.parentNode.appendChild(elementoError);
        }

        elementoError.textContent = mensaje;
        elementoError.classList.add('error-formulario--visible');
    }

    limpiarError(campo) {
        campo.classList.remove('entrada-formulario--error');

        const elementoError = campo.parentNode.querySelector('.error-formulario');
        if (elementoError) {
            elementoError.classList.remove('error-formulario--visible');
        }
    }

    mostrarMensaje(mensaje, tipo = 'info') {

        console.log(`${tipo}: ${mensaje}`);
    }

    enviarFormulario() {
        const datosFormulario = new FormData(this.formulario);
        const datos = Object.fromEntries(datosFormulario);


        console.log('Datos del formulario:', datos);


        this.mostrarMensajeExito();


        setTimeout(() => {
            this.formulario.reset();
            this.ocultarMensajeExito();
        }, 5000);
    }

    mostrarMensajeExito() {
        let mensajeExito = document.getElementById('mensajeExito');
        if (!mensajeExito) {
            mensajeExito = document.createElement('div');
            mensajeExito.id = 'mensajeExito';
            mensajeExito.className = 'exito-formulario';
            this.formulario.parentNode.insertBefore(mensajeExito, this.formulario);
        }

        mensajeExito.textContent = '¡Compra realizada con éxito! Te contactaremos pronto.';
        mensajeExito.classList.add('exito-formulario--visible');
        this.formulario.style.display = 'none';
    }

    ocultarMensajeExito() {
        const mensajeExito = document.getElementById('mensajeExito');
        if (mensajeExito) {
            mensajeExito.classList.remove('exito-formulario--visible');
        }
        this.formulario.style.display = 'block';
    }
}


document.addEventListener('DOMContentLoaded', () => {
    new ValidadorFormulario('formularioCompra');
});
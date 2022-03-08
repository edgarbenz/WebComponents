    class KCounter extends HTMLElement {
        static get observedAttributes() {
            return ["value"];  // I'can observe any attribute of the new tag
        }
        constructor(){         //1. CREATION
            super();
            //configurar el valor inicial
            this._value = 0;
        }
        set value(value){
            this._value = value;
            this.contador.innerText = this._value;
            this.updateEvent();
        }
        get value(){
            return this._value;
        }
        updateEvent() {
            this.dispatchEvent( new CustomEvent('valueChanged', { detail: this._value })); //evento hecho por mi
        }
        //2.ATTRIBUTE UPDATE
        attributeChangedCallback(attrName, oldValue, NewValue) { //check if any attribute changed
            this._value = parseInt(NewValue, 10);
            console.log("attributeName = ", attrName, " NewValue = ", this._value)
            this.updateEvent();
        }
        //3. INSERTION IN THE DOM
        connectedCallback() { // what do I want it to do when I use the new tag <k-counter>
            this.innerHTML = `
                <button id="decrement">&minus</button>
                <span id="value"></span>
                <button id="increment">&plus</button>
            `;

            //me meto al HTML con javascript
            this.menosBoton =this.querySelector('#decrement');
            this.masBoton = this.querySelector('#increment');
            this.contador = this.querySelector('#value');

            this.contador.innerText = this.value; //se activa el get

            this.menosBoton.addEventListener('click', () => {
                this.value --;
                console.log('this._value = ',this._value);
                this.updateEvent();
            });

            this.masBoton.addEventListener('click', () => {
                this.value ++;
                console.log('this._value = ',this._value);
                this.updateEvent();
            });
        }
        disconnetedCallback() {
            this.menosBoton.removeEventListener('click');
            this.masBoton.removeEventListener('click');
        }
    }
    // Now yes, I join the label <k-counter> with my javascript code (class KCounter
    customElements.define('k-counter',KCounter);

    if(!customElements.get('k-counter')) { //si alguien define ese elemento en <body> entonces linkeo la clase en JS con el elemento HTML
        customElements.define('k-counter',KCounter);
    }

    const showAnuncio = document.querySelector('#anuncio');

    const otroContador = document.querySelector('#edgar-counter'); // I position myself in the label for using it like counter
    otroContador.addEventListener('valueChanged', (e) => {
        showAnuncio.innerText = e.detail;
    });

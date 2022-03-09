const template =document.getElementById('plantilla');
const node= document.importNode(template.content, true);
document.body.appendChild(node);

class NuevaTag extends HTMLElement {
    constructor() {
        super();
        this.close = this.close.bind(this);
        this._watchEscape = this._watchEscape.bind(this);
    }

    static get observedAttributes() { //what attributes will be observed
        return ['open'];  // We will work with "Open" attribute
    }

    attributesChangedCallback(attrName, oldValue, newValue) {
        if( newValue!== oldValue ) {
            this[attrName] = this.hasAttribute(attrName) //hasAttribute returns a Boolean: checks if attrName is an attribute of the new tag
        }
    }

    connectedCallback() {
        const template = document.getElementById('plantilla');
        const node =document.importNode(template.content, true);
        this.appendChild(node);

        this.querySelector('button').addEventListener('click', this.close)
        this.querySelector('.overlay').addEventListener('click',this.close);


        //this.innerHTML = '<p>Edgariuse'
    }

    disconnectedCallback(){ //when we finish, clean the listeners
        this.querySelector('button').removeEventListener('click', this.close)
        this.querySelector('.overlay').removeEventListener('click',this.close);
    }

    get open() {
        return this.hasAttribute('open');
    }

    set open(isOpen) {
        this.querySelector('.wrapper').classList.toggle('open', isOpen);
        if(isOpen) {
            this.setAttribute('open', true);
            document.addEventListener('keydown', this._watchEscape)
        } else {
            this.removeAttribute('open');
            document.removeEventListener('keydown', this._watchEscape);
            //this.close();
        }
    }

    close() {
        console.log('el valor de this en el boton close es: ',this);
        if(this.open !== false) {
            this.open = false;
        }

        const closeEvent = new CustomEvent('popup-closed');
        this.dispatchEvent(closeEvent); //disparo el evento
    }

    _watchEscape(event) {
        console.log(event);
        console.log('this es: ',this)
        if(event.key === 'Escape'){
            this.close();
        }
    }

}
if(!customElements.get('edgar-popup')) {

}
customElements.define('edgar-popup', NuevaTag);


const button = document.getElementById('otroBoton');
button.addEventListener('click', (e) => {
    const popup = document.getElementById('mipopup');
    popup.open = true;


    //const wrapper = document.querySelector('.wrapper');
    //const hadFocus =document.activeElement;//who was the active element, ? who had the focus?
    //wrapper.classList.add('open');
    //botonCerrar.focus(); // I give focus to botonCerrar
})
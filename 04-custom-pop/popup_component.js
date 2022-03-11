class NuevaTag extends HTMLElement {
    
    static get observedAttributes() { //what attributes will be observed
        return ['open'];  // We will work with "Open" attribute
    }
    plantilla = `
    <style>
        .wrapper {
            opacity: 0;
            transition: visibility 0s, opacity 0.25s ease-in;
        }

        .wrapper:not(.open) {
            visibility: hidden;
        }

        .wrapper.open {
            position: fixed;
            top: 0;
            left: 0;
            right:0;
            bottom: 0;

            height: 100vh;
            width: 100vw;
            opacity: 1;
            visibility: visible;

            display: flex;
            justify-content: center;
            align-items: center;
        }  
        /* estados del pop up */
        .overlay {
            background: rgba(0, 0, 0, 0.8);
            height: 100;
            width: 100;
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
        }

        .dialog {
            background-color: white;
            max-width: 400px;
            padding: 1em;
            position: fixed;
        }
        
        .boton, #otroBoton{
        background-color: orange;
        border: 0;
        color:white;
        font-family: Arial, Helvetica,sans-serif;
        font-size: 1.5rem;
        padding: 0.5rem 1.5rem;
        position: static;
        }

        button {
            cursor: pointer;
            position:absolute;
            top: 1rem;
            right: 1rem;
        }

        button focus {
            border: 2px solid green;
        }
    </style>
    <div class="wrapper">
        <div class="overlay"></div>
            <div class="dialog">
                <button class="close">&times</button>
                <h1 id="title"><slot name = title></slot></h1>
                <div class="content" id="content">
                    <slot></slot>
                </div>
            </div>
    </div>
    <!----
    
    --->
    `
    constructor() {
        super();
        
        this.shadow = this.attachShadow({mode:'open'});

        this.close = this.close.bind(this);
        this._watchEscape = this._watchEscape.bind(this);
    }

    attributesChangedCallback(attrName, oldValue, newValue) {
        if( newValue!== oldValue ) {
            this[attrName] = this.hasAttribute(attrName) //hasAttribute returns a Boolean: checks if attrName is an attribute of the new tag
            console.log('this[attrName] = ',this[attrName])
        }
    }

    connectedCallback() {

        //const template = document.getElementById('plantilla');
        //const node =document.importNode(template.content, true);
        //this.shadow.appendChild(node);
        this.shadow.innerHTML = this.plantilla;

        this.shadow.querySelector('.overlay').addEventListener('click',this.close);
        this.shadow.querySelector('button').addEventListener('click', this.close)
    }

    disconnectedCallback(){ //when we finish, clean the listeners
        this.querySelector('button').removeEventListener('click', this.close)
        this.querySelector('.overlay').removeEventListener('click',this.close);
    }

    get open() {
        return this.hasAttribute('open');
    }

    set open(isOpen) {
        console.log('this (en set open(isOpen)): ',this);
        this.shadow.querySelector('.wrapper').classList.toggle('open', isOpen);
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
    customElements.define('edgar-popup', NuevaTag);
}
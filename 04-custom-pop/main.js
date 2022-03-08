const template =document.getElementById('plantilla');
const node= document.importNode(template.content, true);
document.body.appendChild(node);

class NuevaTag extends HTMLElement {
    constructor() {
        super();
    }

    static get observedAttributes() { //what attributes will be observed
        return ['open'];  // We will work with "Open" attribute
    }

    get open() {
        return this.hasAttribute('open');
    }

    set open(estaAbierto) {
        if(estaAbierto) {
            this.setAttribute('open', true)
        } else {
            this.removeAttribute('open');
        }
    }

    attributesChangedCallback(attrName, oldValue, newValue) {
        if( newValue!== oldValue ) {
            this[attrName] = this.hasAttribute(attrName) //hasAttribute returns a Boolean: checks if attrName is an attribute of the new tag
        }
    }

    connectedCallback() {
        this.innerHTML = '<p>Edgariuse'
    }
}

customElements.define('edgari-use', NuevaTag);

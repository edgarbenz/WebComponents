const template =document.getElementById('plantilla');
const node= document.importNode(template.content, true);
document.body.appendChild(node);

class NuevaTag extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = '<p>Edgariuse'
    }
}

customElements.define('edgari-use', NuevaTag);

import 'bootstrap';
import hljs from 'highlight.js';


const code = document.querySelector('#code') as HTMLTextAreaElement;
const preview = document.querySelector('#preview') as HTMLElement;
const languagesDropdown = document.querySelector('#languages .dropdown-menu') as HTMLElement;

code.addEventListener('input', (event) => {
    const output = hljs.highlight(code.value, { language: 'html' });
    console.log(output);
    preview.innerHTML = output.value;
});

hljs.listLanguages().forEach(lang => {

    const node = new DOMParser()
        .parseFromString(`<li><a class="dropdown-item" href="#">${lang}</a></li>`, 'text/html').body.firstElementChild;
    languagesDropdown.appendChild(node);
});



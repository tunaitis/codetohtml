import prismjs from 'prismjs';
import { default as hljs } from 'highlight.js';

import './styles/main.scss';

const codeInput = document.querySelector('#code') as HTMLTextAreaElement;
const generatedCodeInput = document.querySelector('#generatedCode') as HTMLTextAreaElement;
const preview = document.querySelector('#preview') as HTMLElement;
const languageInput = document.querySelector('#languages') as HTMLInputElement;
const themeInput = document.querySelector('#themes') as HTMLInputElement;
const autoDetectLanguageInput = document.querySelector('#autoDetectLanguage') as HTMLInputElement;
const languageStyleLink = document.querySelector('#language-style') as HTMLLinkElement;

const languages = ['html'];
const themes = ['default', 'github', 'monokai', 'rainbow'];

const updatePreview = () => {
    hljs.configure({ cssSelector: 'code' });
    const output = hljs.highlight(codeInput.value, { language: 'html' });
    preview.innerHTML = output.value;
    generatedCodeInput.value = output.value;
};

codeInput.addEventListener('input', (event) => {
    updatePreview();
});

console.log('xxx');

autoDetectLanguageInput.addEventListener('change', (event) => {
    languageInput.disabled = autoDetectLanguageInput.checked === true;
});

themeInput.addEventListener('change', (event) => {
    languageStyleLink.href = `/lib/styles/${themeInput.value}.css`;
});

languages.forEach(lang => {
    languageInput.insertAdjacentHTML('beforeend', `<option value="${lang}">${lang}</option>`);
})

themes.forEach(theme => {
    themeInput.insertAdjacentHTML('beforeend', `<option value="${theme}">${theme}</option>`);
});


updatePreview();
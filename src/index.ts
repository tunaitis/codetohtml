import { default as hljs } from 'highlight.js/lib/core';
import xml from 'highlight.js/lib/languages/xml';
import javascript from 'highlight.js/lib/languages/javascript';

/*
import prettier from 'prettier/standalone';
// @ts-ignore
import parserBabel from 'prettier/parser-babel';
// @ts-ignore
import parserHtml from 'prettier/parser-html';
*/

hljs.registerLanguage('xml', xml);
hljs.registerLanguage('javascript', javascript);

import './styles/main.scss';

const codeInput = document.querySelector('#code') as HTMLTextAreaElement;
const generatedCodeInput = document.querySelector('#generatedCode') as HTMLTextAreaElement;
const preview = document.querySelector('#preview') as HTMLElement;
const languageInput = document.querySelector('#languages') as HTMLInputElement;
const themeInput = document.querySelector('#themes') as HTMLInputElement;
const formatCodeInput = document.querySelector('#formatCode') as HTMLInputElement;
const languageStyleLink = document.querySelector('#language-style') as HTMLLinkElement;

const languages = ['html', 'javascript', 'xml'];
const themes = ['default', 'github', 'github-dark', 'github-dark-dimmed', 'monokai', 'rainbow'];

/*
languages.forEach((langName) => {
    const langModule = require(`highlight.js/lib/languages/${langName}`);
    hljs.registerLanguage(langName, langModule);
});*/

const updatePreview = () => {

    hljs.configure({ cssSelector: 'code' });

    /*
    const code = formatCodeInput.checked
        ? prettier.format(codeInput.value, { parser: 'html', plugins: [parserBabel, parserHtml] })
        : codeInput.value;
        */
    const code = codeInput.value;


    const output = hljs.highlight(code, { language: languageInput.value });

    preview.innerHTML = output.value;
    generatedCodeInput.value = output.value;
};

codeInput.addEventListener('input', (event) => {
    updatePreview();
});

formatCodeInput.addEventListener('change', (event) => {
    updatePreview();
});

themeInput.addEventListener('change', (event) => {
    languageStyleLink.href = `/lib/styles/${themeInput.value}.css`;
});

languageInput.addEventListener('change', (event) => {
    updatePreview();
});

languages.forEach(lang => {
    languageInput.insertAdjacentHTML('beforeend', `<option value="${lang}">${lang}</option>`);
})
languageInput.value = 'html';

themes.forEach(theme => {
    themeInput.insertAdjacentHTML('beforeend', `<option value="${theme}">${theme}</option>`);
});


updatePreview();
import '../styles/themes.scss';

const themes = Array.from(document.querySelectorAll<HTMLElement>('.theme')).forEach(theme => {
    theme.addEventListener('click', () => {
        localStorage.setItem('theme', theme.dataset.themeName);
        window.location.href = '/';
    });
});
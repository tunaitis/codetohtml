import '../styles/themes.scss';
import { logThemeSelect } from './utils/analytics';

const themes = Array.from(document.querySelectorAll<HTMLElement>('.theme')).forEach(theme => {
    theme.addEventListener('click', () => {
        logThemeSelect(theme.dataset.themeName);
        localStorage.setItem('theme', theme.dataset.themeName);
        window.location.href = '/';
    });
});

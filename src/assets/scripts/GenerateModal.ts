import { Modal } from 'bootstrap';
import { App } from './App';

export class GenerateModal {
    container: HTMLElement;
    copyCodeToClipboard: HTMLButtonElement;
    downloadCode: HTMLButtonElement;

    modal: Modal;
    app: App;

    constructor(app: App) {
        this.app = app;
        this.initialize(app.container);
    }

    initialize(container: HTMLElement) {
        this.container = container.querySelector('.generate-modal');
        this.modal = new Modal(this.container, {});

        this.copyCodeToClipboard = this.container.querySelector('.btn-copy-to-clipboard');
        this.copyCodeToClipboard.addEventListener('click', this.handleCopyCodeToClipboard.bind(this));

        this.downloadCode = this.container.querySelector('.btn-download');
        this.downloadCode.addEventListener('click', this.handleDownloadCode.bind(this));
    }

    handleCopyCodeToClipboard() {
        this.app.copyToClipboard();
        this.modal.hide();
    }

    handleDownloadCode() {
        this.app.download();
        this.modal.hide();
    }

    show() {
        this.modal.show();
    }
}


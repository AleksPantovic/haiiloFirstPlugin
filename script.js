import { PluginAdapter } from '@coyoapp/plugin-adapter';

export class DemoPlugin {
    constructor() {
        new PluginAdapter().init().then(data => {
            const name = data['ctx.userName'];
            this.changeName(name);
        });
    }

    // Remove the private keyword and type annotation
    changeName(userName) {
        const nameElem = document.getElementById('userName');
        if (nameElem) {
            nameElem.innerText = userName;
        }
    }
}

new DemoPlugin();

import {PluginAdapter} from '@coyoapp/plugin-adapter';

interface PluginData {
    'ctx.userName': string;
    'cfg.background': string;
    'cfg.spotifyLayout': "LARGE" | "COMPACT";
    'cfg.spotifyLink': string;
    // Add other properties as needed
}
export class DemoPlugin {
    constructor() {
        new PluginAdapter().init().then(data => {
            const name = data['ctx.userName'];
            this.changeName(name);

            const background = data['cfg.background'];
            this.setBackgroundColor(background);

            const spotifyLayout = data['cfg.spotifyLayout'];
            const spotifyLink = data['cfg.spotifyLink'];
            if (spotifyLink && spotifyLayout) {
                this.addSpotify(spotifyLink, spotifyLayout);
            }
        });
    }

    private changeName(userName: string) {
        const nameElem = document.getElementById('userName')!;
        if (nameElem) {
            nameElem.innerText = userName;
        }
    }

    private setBackgroundColor(background: string) {
        document.body.style.backgroundColor = background;
    }

    private addSpotify(spotifyLink: string, spotifyLayout: "LARGE" | "COMPACT") {
        const spotifyFrame = document.createElement("iframe");
        spotifyFrame.width = '300';
        spotifyFrame.height = spotifyLayout === "LARGE" ? '380' : '80';
        spotifyFrame.allow = "encrypted-media";
        spotifyFrame.src = spotifyLink.replace('https://open.spotify.com', 'https://open.spotify.com/embed');
        document.body.appendChild(spotifyFrame);
    }
}

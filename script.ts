import {PluginAdapter} from '@coyoapp/plugin-adapter';

export class DemoPlugin {
    constructor() {
        const adapter = new PluginAdapter();
        adapter.init().then(data => {
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
        adapter.observeHeight();
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
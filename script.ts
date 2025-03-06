import { PluginAdapter } from '@coyoapp/plugin-adapter';

export class DemoPlugin {
    private adapter: PluginAdapter;

    constructor() {
        this.adapter = new PluginAdapter();
        this.init();
    }

    private async init() {
        try {
            const data = await this.adapter.init();
            console.log("Plugin initialized:", data);

            // Fetch and display userName
            const name = data['ctx.userName'];
            this.changeName(name);

            // Fetch and set background color
            const background = data['cfg.background'];
            this.setBackgroundColor(background);

            // Fetch and add Spotify link
            const spotifyLayout = data['cfg.spotifyLayout'];
            const spotifyLink = data['cfg.spotifyLink'];
            if (spotifyLink && spotifyLayout) {
                this.addSpotify(spotifyLink, spotifyLayout);
            }

            this.adapter.observeHeight(); // Ensure height adjustments
        } catch (error) {
            console.error("Failed to initialize the plugin:", error);
        }
    }

    private changeName(userName: string) {
        const nameElem = document.getElementById('userName');
        if (nameElem) {
            nameElem.innerText = userName;
        } else {
            console.warn('Element with id userName not found');
        }
    }

    private setBackgroundColor(background: string) {
        if (background) {
            document.body.style.backgroundColor = background;
        } else {
            console.warn('No background color specified');
        }
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

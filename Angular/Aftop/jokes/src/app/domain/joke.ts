export class Joke {
    setup: string;
    punchline: string;
    hide: boolean;

    constructor(setup: string, punchline: string) {
        this.setup = setup;
        this.punchline = punchline;
        this.hide = true;
    }

    toggle() {
        console.log('joke toggle');
        this.hide = !this.hide;
    }
}


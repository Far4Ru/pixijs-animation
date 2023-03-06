import * as PIXI from 'pixi.js'
import { Assets } from './assets'
import { BouncingName } from './bouncingname'
import config from '../static/config.json';

export class Game {

    private isFullscreen = false;

    // Fields
    private bouncingName: BouncingName
    private _pixi: PIXI.Application

    // Properties
    public get pixi(): PIXI.Application { return this._pixi }

    constructor() {
        this._pixi = new PIXI.Application({ width: config.width, height: config.height, backgroundColor: config.color })
        document.getElementById("app").appendChild(this._pixi.view)
        // Create the background sprite with a basic white texture
        let bg = new PIXI.Sprite(PIXI.Texture.WHITE);
        // Set it to fill the screen
        bg.width = this._pixi.screen.width;
        bg.height = this._pixi.screen.height;
        bg.tint = config.color;
        // Add a click handler
        bg.interactive = true;
        bg.on('pointerdown', function(){
            if (!this.isFullscreen) {
                // Enter fullscreen
                if(document.documentElement.requestFullscreen) {
                    document.documentElement.requestFullscreen();
                } else if(document.documentElement.mozRequestFullScreen) {
                    document.documentElement.mozRequestFullScreen();
                } else if(document.documentElement.webkitRequestFullscreen) {
                    document.documentElement.webkitRequestFullscreen();
                } else if(document.documentElement.msRequestFullscreen) {
                    document.documentElement.msRequestFullscreen();
                }
                document.body.style.alignItems = "unset";

                if (window.innerHeight > window.innerWidth) {
                    document.getElementById("app").style.width = "100%";
                    document.getElementById("app").style.maxWidth = "100%";
                } else {
                    document.getElementById("app").style.height = "100%";
                    document.getElementById("app").style.maxHeight = "100%";
                }
                /mobile/i.test(navigator.userAgent) && setTimeout(function(){
                    document.body.style.overflow = "auto";
                    document.body.style.marginTop = "420px";
                    window.scrollTo(0, 420);
                }, 0);
                this.isFullscreen = true;
            } else {
                // Exit fullscreen
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
                document.body.style.alignItems = "center";
                document.getElementById("app").style.width = "unset";
                document.getElementById("app").style.maxWidth = "unset";
                document.getElementById("app").style.height = "unset";
                document.getElementById("app").style.maxHeight = "unset";

                /mobile/i.test(navigator.userAgent) && setTimeout(function(){
                    document.body.style.overflow = "unset";
                    document.body.style.marginTop = "unset";
                    window.scrollTo(0, 0);
                }, 0);

                this.isFullscreen = false;
            }
        });
        // Add it to the stage as the first object
        this._pixi.stage.addChild(bg);

        new Assets(this)

    }

    public loadCompleted() {
        let frames = this.createCatFrames()
        this.bouncingName = new BouncingName(this, frames, 100, 100)

        this._pixi.ticker.add((delta: number) => this.update(delta))
    }

    private update(delta: number) {
        this.bouncingName.update(delta)
    }

    private createCatFrames(): PIXI.Texture[] {
        // Create an array of textures from an image path
        let frames: PIXI.Texture[] = [];

        for (let i = 1; i <= 30; i++) {
            frames.push(PIXI.Texture.from(`poes_${i}.png`));
        }
        return frames
    }
}


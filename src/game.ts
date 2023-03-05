import * as PIXI from 'pixi.js'
import { Assets } from './assets'
import { BouncingName } from './bouncingname'

export class Game {

    // Fields
    private bouncingName: BouncingName
    private _pixi: PIXI.Application

    // Properties
    public get pixi(): PIXI.Application { return this._pixi }

    constructor() {

        this._pixi = new PIXI.Application({ width: 1000, height: 600, backgroundColor: 0x228b22 })
        document.body.appendChild(this._pixi.view)

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


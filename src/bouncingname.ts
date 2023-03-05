import * as PIXI from 'pixi.js'
import { Game } from './game'

export class BouncingName extends PIXI.AnimatedSprite {

    private readonly gravity: number = 0.0981 / 8 //0.0981
    private readonly bounce: number = 0.985  //0.985

    private game: Game
    private speedX: number = 1
    private speedY: number = 2

    constructor(game: Game, textures, x: number, y: number) {
        super(textures)
        this.game = game

        this.x = x
        this.y = y
        this.scale.set(0.7)
        this.animationSpeed = 0.12;
        this.play();

        this.game.pixi.stage.addChild(this);

    }

    public update(delta: number): void {
        super.update(delta)


        this.fall(delta)
        this.keepInScreen()
    }

    private fall(delta): void {
        this.x += this.speedX * delta
        this.y += this.speedY * delta
        this.speedY += this.gravity
    }

    private keepInScreen() {
        if (this.getBounds().left < 0) {
            this.speedX *= -1
            this.x = this.game.pixi.screen.left
        }
        if (this.getBounds().right > this.game.pixi.screen.right) {
            this.speedX *= -1
            this.x = this.game.pixi.screen.right - this.width
        }
        if (this.getBounds().bottom > this.game.pixi.screen.bottom) {
            this.bounceUpFrom(this.game.pixi.screen.bottom - this.height)
        }
    }

    private bounceUpFrom(height: number): void {
        this.y = height
        this.speedY *= -this.bounce
    }
}
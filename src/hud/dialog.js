import { Renderable, Sprite, game, loader } from 'melonjs';
import { TexturesHolder } from '../texturesHolder';

class Dialog extends Renderable {

    constructor(x, y, msgsTexture, messages, onDone) {
        super(x, y, 0, 0);
        let currentY = 80;
        this.sprites = [];

        for (let i = 0; i < messages.length; i++) {
            this.sprites.push(new Sprite(game.viewport.width / 2, currentY, {
                image: msgsTexture,
                region: messages[i].name
            }));

            currentY = currentY + msgsTexture.getRegion(messages[i].name).height;
        }

        this.spritesForRender = [this.sprites[0]];
        let renderIndex = 1;
        let intervalId = setInterval(() => {
            let sprite = this.sprites[renderIndex];
            if (sprite) {
                this.spritesForRender.push(sprite);
                renderIndex++;
            } else {
                clearInterval(intervalId);
                if (onDone) {
                    onDone();
                }
            }
        }, 3000);
    }

    update() {
        return true;
    }

    draw(renderer) {
        for (let i = 0; i < this.spritesForRender.length; i++) {
            this.spritesForRender[i].preDraw(renderer);
            this.spritesForRender[i].draw(renderer);
            this.spritesForRender[i].postDraw(renderer);
        }
    }

}

export {
    Dialog
};
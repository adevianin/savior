import { Renderable, Sprite, game } from 'melonjs';
import { dispatcher } from '../dispatcher';
import { TexturesHolder } from '../texturesHolder';

class CageControllerUseTip extends Renderable {

    constructor(x, y) {
        super(x, y, 102, 20);

        let posX = (game.viewport.width / 2) - 475/2;
        this.renderable = new Sprite(posX, 80, {
            framewidth: 475,
            frameheight: 45,
            image: TexturesHolder.getInstance().generalTextures,
            region: 'cage_controller_tip'
        });

        this.isTipShow = false;
        
        dispatcher.on('playerNearCageController', this.showTip.bind(this));
    }

    draw(renderer) {
        if (this.isTipShow) {
            this.renderable.draw(renderer);
        }
    }

    showTip() {
        this.isTipShow = true;
        setTimeout(() => {
            this.isTipShow = false;
        }, 3000);
    }
}

export {
    CageControllerUseTip
};
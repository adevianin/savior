import { Entity, Sprite, collision, BitmapText, input} from 'melonjs';
import { DataBus } from '../dataBus';
import { dispatcher } from '../dispatcher';
import { TexturesHolder } from '../texturesHolder';

class CageController extends Entity {
    constructor(x, y, settings) {
        super(x, y, settings);

        this.lever = new Sprite(this.width / 2, 135, {
            framewidth: this.width,
            frameheight: this.height,
            image: TexturesHolder.getInstance().generalTextures,
            region: 'lever'
        });

        this.body.ignoreGravity = true;
        this.body.setStatic(true);
        this.body.setCollisionMask(collision.types.NO_OBJECT);

        this.isPlayerNear = false;
        this.controllerFor = settings.controllerFor;
        this.isActivated = false;
        
        if (this.controllerFor === 'horizontalCageCap') {
            this.label = 'вкинуть вариться';
        }

        if (this.controllerFor === 'verticalCageCap') {
            this.label = 'відкрить клітку';
        }
        

        DataBus.getInstance().on('playerEntity', (player) => {
            this._player = player;
        });
    }

    update(dt) {
        if (this._player && this._player.alive) {
            let playerBounds = this._player.getBounds();
            let currentBounds = this.getBounds();

            this._togglePlayerNear(playerBounds.overlaps(currentBounds));
        }

        if (this.isPlayerNear && input.isKeyPressed('activate')) {
            dispatcher.emit('cageCapControllerActivated', this.controllerFor);
            this.isActivated = true;
        }
    }

    draw(renderer, rect) {
        this.lever.flipX(this.isActivated);
        this.lever.preDraw(renderer);
        this.lever.draw(renderer);
        this.lever.postDraw(renderer);
    }

    _togglePlayerNear(status) {
        if (this.isPlayerNear !== status) {
            this.isPlayerNear = status;
            dispatcher.emit('playerNearCageController');
        }
    }

}

export {
    CageController
};
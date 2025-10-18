import { Entity, Sprite, Vector2d} from 'melonjs';
import { dispatcher } from '../dispatcher';
import { searchCaptiveEntity } from '../utils';
import { TexturesHolder } from '../texturesHolder';

class VerticalCageCap extends Entity {
    constructor(x, y, settings) {
        super(x, y, settings);
        this.uid = settings.uid;

        this.renderable = new Sprite(this.width / 2, this.height / 2, {
            framewidth: 10,
            frameheight: 160,
            image: TexturesHolder.getInstance().generalTextures,
            region: 'cage_cap_vertical'
        });
        this.body.setMaxVelocity(15, 15);

        this.body.ignoreGravity = true;
        this.openPosY = y - 160;
        this.closePosY = y;
        this.needToBeOpen = false;

        dispatcher.on('cageCapControllerActivated', (cageType) => {
            if (cageType === 'verticalCageCap') {
                this.open();
            }
        });
    }

    update(dt) {
        if (this.needToBeOpen && this.pos.y > this.openPosY) {
            this.body.vel.y = -this.body.maxVel.y;
        } else {
            this.body.vel.y = 0;
        }

        return true;
    }

    onCollision(resp, other) {
        return false;
    }

    open() {
        this.needToBeOpen = true;
        // dispatcher.emit('cageIsOpened');
        let captive = searchCaptiveEntity();
        captive.playSaveScene();
    }
}

export {
    VerticalCageCap
};
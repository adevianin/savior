import { Entity, Sprite, collision} from 'melonjs';
import { dispatcher } from '../dispatcher';
import { TexturesHolder } from '../texturesHolder';

class HorizontalCageCap extends Entity {
    constructor(x, y, settings) {
        super(x, y, settings);
        this.uid = settings.uid;
        this.gid = settings.gid;

        this.renderable = new Sprite(this.width / 2, this.height / 2, {
            framewidth: 160,
            frameheight: 10,
            image: TexturesHolder.getInstance().generalTextures,
            region: 'cage_cap'
        });

        this.body.setMaxVelocity(3, 15);

        this.body.ignoreGravity = true;
        this.openPosX = x + 160;
        this.closePosX = x;
        this.needToBeOpen = false;
        this.body.collisionType = collision.types.WORLD_SHAPE

        dispatcher.on('cageCapControllerActivated', (cageType) => {
            if (cageType === 'horizontalCageCap') {
                this.open();
            }
        });
    }

    update(dt) {
        if (this.needToBeOpen && this.pos.x < this.openPosX) {
            this.body.vel.x = this.body.maxVel.x;
        } else {
            this.body.vel.x = 0;
        }

        return true;
    }

    onCollision(resp, other) {
        return super.onCollision(resp, other);
        // return true;
    }

    open() {
        this.needToBeOpen = true;
    }

    makeGhost() {
        this.body.collisionType = 0;
    }
}

export {
    HorizontalCageCap
};
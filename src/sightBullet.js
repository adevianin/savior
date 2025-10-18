import { Entity, Sprite, game, collision } from 'melonjs';
import { TexturesHolder } from './texturesHolder';

class SightBullet extends Entity {
    constructor(x, y, flyToRight, onDone, settings) {
        const bulletWidth = 1;
        const bulletHeight = 1;

        if (!flyToRight) {
            x = x - bulletWidth;
        }

        super(x, y, { 
            width: bulletWidth, 
            height: bulletHeight 
        });
        this.z = 5;
        this.flyToRight = flyToRight;

        this.renderable = new Sprite(0, 0, {
            image: TexturesHolder.getInstance().generalTextures,
            region: 'sight_bullet'
        });

        this.body.vel.set(flyToRight ? 25 : -25, 0);
        this.body.collisionType = collision.types.SIGHT_BULLET;
        this.body.ignoreGravity = true;
        this.body.mass = 0;
        this.alwaysUpdate = true;
        this.onDone = onDone;
    }

    update(dt) {
        super.update(dt);

        if (!this.inViewport) {
            game.world.removeChild(this);
            this.onDone(null);
        }

        return true;
    }

    onCollision(resp, other) {
        game.world.removeChild(this);

        if (other.body.collisionType !== collision.types.SIGHT_BULLET) {
            this.onDone(other, this.flyToRight);
        }
        
        return false;
    }
}

export {
    SightBullet
}
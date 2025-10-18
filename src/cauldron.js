import { Entity, Sprite, collision } from 'melonjs';
import { TexturesHolder } from './texturesHolder';

class CauldronEntity extends Entity {
    constructor(x, y, settings) {
        super(x, y, settings);
        this.gid = settings.gid;
        this.isDeadly = settings.isDeadly;

        this.cauldron = new Sprite(this.width / 2, this.height / 2, {
            framewidth: 160,
            frameheight: 166,
            image: TexturesHolder.getInstance().generalTextures,
            region: 'cauldron'
        });

        this.fire = TexturesHolder.getInstance().generalTextures.createAnimationFromName([
            'fire0', 'fire1', 'fire2', 'fire3'
        ], {
            framewidth: 64,
            frameheight: 64,
        });
        this.fire.pos.x = this.width / 2;
        this.fire.pos.y = this.height - 30;

        this.renderable = this.fire;

        this.body.ignoreGravity = true;
        this.body.setStatic(true);
        this.body.collisionType = collision.types.DEATH_ENTITY;
        this.body.setCollisionMask(collision.types.CAPTIVE);

        this.fire.addAnimation("fire",  [0, 1, 2, 3]);
        this.fire.setCurrentAnimation('fire');

        if (!this.isDeadly) {
            this.makeGhost();
        }
    }

    draw(renderer, rect) {
        this.cauldron.preDraw(renderer);
        this.cauldron.draw(renderer);
        this.cauldron.postDraw(renderer);
        this.fire.preDraw(renderer);
        this.fire.draw(renderer);
        this.fire.postDraw(renderer);
    }

    onCollision(resp, other) {
        other.makeDamage(100);

        return false;
    }

    makeGhost() {
        this.isDeadly = false;
        this.body.collisionType = 0;
        
    }
}

export {
    CauldronEntity
}
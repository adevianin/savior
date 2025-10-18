import { Entity, Sprite, game, collision } from 'melonjs';
import { BulletTypes } from './bulletTypes';
import { TexturesHolder } from './texturesHolder';

class Bullet extends Entity {
    
    constructor(x, y, settings) {
        const bulletWidth = 11;
        const bulletHeight = 5;
        const padding = 5;
        let preparedX = settings.isFlyToRight ? x + padding: x - bulletWidth - padding;
        super(preparedX, y, { 
            width: bulletWidth, 
            height: bulletHeight 
        });
        this.type = settings.type;
        this.z = 5;
        const velocity = settings.isFlyToRight ? 16 : -16;

        this.renderable = new Sprite(0, 0, {
            image: TexturesHolder.getInstance().generalTextures,
            region: 'bullet'
        });

        this.body.vel.set(velocity, 0);
        this.body.collisionType = collision.types.PROJECTILE_OBJECT;
        this.body.ignoreGravity = true;
        this.alwaysUpdate = true;
    }

    update(dt) {
        super.update(dt);

        if (!this.inViewport) {
            game.world.removeChild(this);
        }

        return true;
    }

    onCollision(resp, other) {
        if (other.body.collisionType !== collision.types.PROJECTILE_OBJECT) {
            game.world.removeChild(this);
        }
        
        return false;
    }

    getDamage() {
        switch (this.type) {
            case BulletTypes.PLAYER_BULLET:
                return 35;
            case BulletTypes.ENEMY_BULLET:
                return 20;
        }
    }
}

export {
    Bullet
}
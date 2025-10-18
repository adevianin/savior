import { Entity, collision } from 'melonjs';

class DeathEntity extends Entity {
    constructor(x, y, settings) {
        super(x, y, settings);

        this.body.ignoreGravity = true;
        this.body.setStatic(true);
        this.body.collisionType = collision.types.DEATH_ENTITY;
        this.body.setCollisionMask(collision.types.PLAYER_OBJECT | collision.types.CAPTIVE);
    }

    onCollision(resp, other) {
        other.makeDamage(100);

        return false;
    }
}

export {
    DeathEntity
}
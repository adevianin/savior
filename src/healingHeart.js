import { Entity, collision, game } from 'melonjs';
import { TexturesHolder } from './texturesHolder';
 
class HealingHeart extends Entity {
    constructor(x, y, settings) {
        super(x, y, settings);

        this.renderable = TexturesHolder.getInstance().generalTextures.createAnimationFromName(['heart0', 'heart1', 'heart2', 'heart3'], {
            framewidth: 32,
            frameheight: 32,
        });
        this.renderable.pos.x = this.width / 2;
        this.renderable.pos.y = this.height / 2;

        this.body.ignoreGravity = true;
        this.body.setStatic(true);
        this.body.setCollisionMask(collision.types.PLAYER_OBJECT);

        this.renderable.addAnimation('spin',  [0,1,2,3], 140);
        this.renderable.setCurrentAnimation('spin');

        this.healStrength = 40;
    }

    onCollision(resp, player) {
        player.heal(this.healStrength);
        game.world.removeChild(this);
        return false;
    }
}

export { HealingHeart }
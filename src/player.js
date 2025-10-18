import { game, input, collision, level, audio } from 'melonjs';
import { BulletTypes } from './bulletTypes';
import { Warrior } from './warrior';
import { DataBus } from './dataBus';
import { log } from './logger';
  
class PlayerEntity extends Warrior {
    constructor(x, y, settings) {
        settings.animationFrames = ['player_skin0', 'player_skin1', 'player_skin2', 'player_skin3', 'player_skin4', 'player_skin5'];
        settings.bulletType = BulletTypes.PLAYER_BULLET;
        super(x, y, settings);

        this.coffeePlacePosX = 3400;

        game.viewport.follow(this.pos, game.viewport.AXIS.BOTH, 0.05);
        
        this.body.setMaxVelocity(4, 18);
        this.body.setFriction(0.4, 0);
        this.body.collisionType = collision.types.PLAYER_OBJECT;

        this.renderable.addAnimation("walk",  [0, 1, 2, 3, 4, 5]);
        this.renderable.addAnimation("stand",  [0]);


        this._pushPlayerHp();
        this._pushPlayer();

        // this.shoot = throttle(this.shoot.bind(this), 400, true);
    }

    update(dt) {
        if (!this.isControllingFreezed) {
            if (input.isKeyPressed('left')) {
                this.body.force.x = -this.body.maxVel.x;
            } else if (input.isKeyPressed('right')) {
                this.body.force.x = this.body.maxVel.x;
            } else {
                this.body.force.x = 0;
            }

            if (input.isKeyPressed('jump')) {
                if (this.body.vel.y === 0)
                {
                    audio.play('jump', false, null, 0.6);
                    this.body.force.y = -this.body.maxVel.y
                }
            } else {
                this.body.force.y = 0;
            }

            if (input.isKeyPressed('shoot')) {
                this.shoot();
            }
        }

        if (this._isGoingToDest) {
            this._goingToDestination();
        }

        if (this.body.vel.x === 0) {
            if (!this.renderable.isCurrentAnimation("stand")) {
                this.renderable.setCurrentAnimation("stand");
            }
        } else {
            if (!this.renderable.isCurrentAnimation("walk")) {
                this.renderable.setCurrentAnimation("walk");
            }
        }

        if (this.body.vel.x !== 0) {
            this.faceToRight = this.body.vel.x > 0;
            this.renderable.flipX(!this.faceToRight);
        }

        return (super.update(dt) || this.body.vel.x !== 0 || this.body.vel.y !== 0);
    }

    onDie() {
        audio.play('player_died');
        game.viewport.unfollow();
        game.world.removeChild(this);
        setTimeout(() => {
            level.reload();
            log(`player died on ${ level.getCurrentLevelId() }`);
        }, 3000);
    }

    onDamage() {
        this._pushPlayerHp();
    }

    onHeal() {
        this._pushPlayerHp();
    }

    freezeControlling() {
        this.isControllingFreezed = true;
    }

    playCoffeeScene() {
        this.freezeControlling();
        this.goTo(this.coffeePlacePosX).then(()=> { this.goTo(this.pos.x + 20 ); });
    }

    _pushPlayerHp() {
        DataBus.getInstance().push('playerHp', this.hp);
    }

    _pushPlayer() {
        DataBus.getInstance().push('playerEntity', this);
    }

}

export { PlayerEntity }
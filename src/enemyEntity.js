import { game, collision, pool, timer } from 'melonjs';
import { Warrior } from './warrior';
import { BulletTypes } from './bulletTypes';

class EnemyEntity extends Warrior {
    constructor(x, y, settings) {
        settings.animationFrames = [
            'enemy_skin0', 
            'enemy_skin1', 
            'enemy_skin2', 
            'enemy_skin3', 
            'enemy_skin4', 
            'enemy_skin5', 
            'enemy_skin6', 
            'enemy_skin7'
        ];
        settings.bulletType = BulletTypes.ENEMY_BULLET;
        super(x, y, settings);

        this.body.setMaxVelocity(3, 15);
        this.body.setFriction(0.4, 0);
        this.body.collisionType = collision.types.ENEMY_OBJECT;

        this.renderable.addAnimation("walk",  [0, 1, 2, 3, 4, 5, 6, 7]);
        this.renderable.addAnimation("stand",  [0]);

        this.lookIntervalID = setInterval(() => {
            this.lookForward();
        }, 500);

        this.isShooting = false;
    }

    update(dt) {
        if (this.alive && !this.isShooting) {
            this._patrol();
        } else {
            this.body.force.x = 0;
        }

        if (this.body.vel.x == 0) {
            if (!this.renderable.isCurrentAnimation("stand")) {
                this.renderable.setCurrentAnimation("stand");
            }
        } else {
            if (!this.renderable.isCurrentAnimation("walk")) {
                this.renderable.setCurrentAnimation("walk");
            }
        }

        return (super.update(dt) || this.body.vel.x !== 0 || this.body.vel.y !== 0);
    }

    lookForward() {
        let bulletX = this.faceToRight ? this.pos.x + this.width + 5 : this.pos.x - 5;
        let bulletY = this.pos.y + this.height / 2 + 10;
        let isFlyToRight = this.faceToRight;

        game.world.addChild(pool.pull('sightBullet', bulletX, bulletY, isFlyToRight, this.onLookDone.bind(this)));
    }

    destroy() {
        super.destroy();
        clearInterval(this.lookIntervalID);
        this._clearShootingQue();
    }

    onLookDone(other, flyToRight) {
        if (other && other.body.collisionType === collision.types.PLAYER_OBJECT) {
            this.faceToRight = flyToRight;
            this.startShootingQue(2);
            this._startShooting();
        } else {
            this._stopShooting();
        }
    }

    onDie() {
        this.renderable.flicker(500, () => {
            game.world.removeChild(this);
        });
    }

    startShootingQue(times) {
        if (this.shootingIntervalID) {
            return;
        }

        let shootedTimes = 0;
        this.shootingIntervalID = timer.setInterval(() => {
            this.shoot();
            shootedTimes++;
            if (shootedTimes >= times) {
                this._clearShootingQue();
            }
        }, 100);
    }

    _clearShootingQue() {
        timer.clearInterval(this.shootingIntervalID);
        this.shootingIntervalID = null;
    }

    _startShooting() {
        this.isShooting = true;
    }

    _stopShooting() {
        this.isShooting = false;
    }
}

export { EnemyEntity }
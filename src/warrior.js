import { Entity, Sprite, pool, collision, game, audio } from 'melonjs';
import { Saying } from './saying';
import { TexturesHolder } from './texturesHolder';

class Warrior extends Entity {
    constructor(x, y, settings) {
        super(x, y, settings);

        this.faceToRight = true;
        this.gid = settings.gid;
        this.width = settings.width;
        this.height = settings.height;
        this.bulletType = settings.bulletType;
        this.alwaysUpdate = true;
        this.alive = true;
        this.hp = 100;
        this.faceToRight = true;

        this.renderable = TexturesHolder.getInstance().generalTextures.createAnimationFromName(settings.animationFrames, {
            framewidth: 64,
            frameheight: 64,
        });
        this.renderable.pos.x = this.width / 2;
        this.renderable.pos.y = this.height / 2;

        this.maxX = settings.maxX;
        this.minX = settings.minX;

        this._destinationX = null;
        this._isGoingToDest = false;
        this._onDestReachedClb = null;
    }

    shoot() {
        if (!this.alive) {
            return;
        }

        audio.play("shoot");

        let bulletX = this.faceToRight ? this.pos.x + this.width : this.pos.x;
        let bulletY = this.pos.y + this.height / 2;

        game.world.addChild(pool.pull('bullet', bulletX, bulletY, { 
            isFlyToRight: this.faceToRight,
            type: this.bulletType
        }));
    }

    onCollision(resp, other) {
        if (other.body.collisionType === collision.types.SIGHT_BULLET) {
            return false;
        }

        // if (other.body.collisionType === collision.types.ENEMY_OBJECT) {
        //     return false;
        // }

        if (other.body.collisionType === collision.types.PLAYER_OBJECT) {
            return false;
        }

        if (other.body.collisionType === collision.types.PROJECTILE_OBJECT) {
            this.makeDamage(other.getDamage());
            return false;
        }
        
        return true;
    }

    onDie() {}

    makeDamage(damage) {
        if (!this.alive) {
            return;
        }
        this.hp = this.hp - damage;
        if (this.hp <= 0) {
            this.hp = 0;
            this.alive = false;
            this.onDie();
        }
        this.onDamage();
    }

    onDamage() {

    }

    onHeal() {

    }

    heal(healStrength) {
        audio.play('heal');

        this.hp = this.hp + healStrength;
        if (this.hp > 100) {
            this.hp = 100;
        }
        
        this.onHeal();
    }

    draw(renderer) {
        this.renderable.preDraw(renderer);
        this.renderable.draw(renderer);
        this.renderable.postDraw(renderer);
        if (this.saying) {
            this.saying.preDraw(renderer);
            this.saying.draw(renderer);
            this.saying.postDraw(renderer);
        }
    }

    say(msgId, time = 3000) {
        return new Promise((res, rej) => {
            this.saying = new Saying(msgId);
            setTimeout(() => {
                this.saying = null;
                res();
            }, time);
        });
    }

    goTo(posX) {
        this._destinationX = posX;
        this._isGoingToDest = true;

        return new Promise((res, rej) => {
            this._onDestReachedClb = res;
        });
    }

    _goingToDestination() {
        if (Math.abs(this.pos.x - this._destinationX) < 10) {
            this._onDestReachedClb();
            this._isGoingToDest = false;
            this._destinationX = null;
            this._onDestReachedClb = null;
            this.body.force.x = 0;
            return;
        } else if (this.pos.x > this._destinationX) {
            this.body.force.x = -this.body.maxVel.x;
        } else if (this.pos.x < this._destinationX) {
            this.body.force.x = this.body.maxVel.x;
        }

        this._turnFace();
    }

    _patrol() {
        if (this.pos.x >= this.maxX) {
            this.body.force.x = -this.body.maxVel.x;
        } else if (this.pos.x <= this.minX) {
            this.body.force.x = this.body.maxVel.x;
        }

        if (this.body.vel.x === 0) {
            this.body.force.x = this.faceToRight ? this.body.maxVel.x : -this.body.maxVel.x;
        }

        this._turnFace();
    }

    _turnFace() {
        this.faceToRight = this.body.force.x > 0
        this.renderable.flipX(!this.faceToRight);
    }
}

export {
    Warrior
}
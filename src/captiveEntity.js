import { Warrior } from './warrior';
import { audio, collision, game, state, level } from 'melonjs';
import { log } from './logger';
import { CaptiveIsFreeDialogManager } from './inGameDialogs/captiveIsFreeDialogManager';
import { waitForEntity, searchCauldronEntity, searchPlayerEntity, searchHorizontalCageCapEntity } from './utils';

class CaptiveEntity extends Warrior {
    constructor(x, y, settings) {
        settings.animationFrames = [
            'captive_skin0', 
            'captive_skin1', 
            'captive_skin2', 
            'captive_skin3', 
            'captive_skin4', 
            'captive_skin5', 
            'captive_skin6', 
            'captive_skin7'
        ];
        super(x, y, settings);

        this.body.setMaxVelocity(4, 5);
        this.body.setFriction(0.4, 0);

        this.renderable.addAnimation("walk",  [0, 1, 2, 3, 4, 5, 6, 7]);
        this.renderable.addAnimation("stand",  [0]);

        this.renderable.setCurrentAnimation("stand");

        this.body.collisionType = collision.types.CAPTIVE;
        this.body.setCollisionMask(collision.types.WORLD_SHAPE | collision.types.DEATH_ENTITY);

        this.isPatroling = !!settings.maxX && !!settings.minX;
        this.safeX = settings.safeX;

        // dispatcher.on('cageIsOpened', this.onCageOpen.bind(this));

        if (settings.isPushingCauldron) {
            Promise.all([waitForEntity('cauldron'), waitForEntity('player')]).then(vals => {

                this._linkCauldron(vals[0])
                    .then(() => {
                        this._startFollowPlayer(vals[1]);
                    });

            });
        }

        this.coffeCauldronPosX = 3000;

        if (settings.runAheadMsg) {
            this.say('captive_saved_msg8');
        }
    }

    update(dt) {
        super.update(dt);

        if (this.isPatroling && this.alive) {
            this._patrol();
        } else if (this._isGoingToDest) {
            this._goingToDestination();
        } else {
            this.body.force.x = 0;
        }

        if (this._linkedCauldron) {
            this._pushCauldron();
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

        return true;
    }

    // onCollision(resp, other) {
    //     return true;
    // }

    onDie() {
        this.renderable.flicker(100, () => {
            game.world.removeChild(this);

            setTimeout(() => {
                state.change(state.CAPTIVE_DIED);
                log('captive died');
            }, 3000);
        });
    }

    playSaveScene() {
        audio.play('captive_is_free', false, null, 0.7);
        this.isPatroling = false;
        let cauldron = searchCauldronEntity();
        let horCageCap = searchHorizontalCageCapEntity();

        this.goTo(this.safeX).then(() => { 
            cauldron.makeGhost();
            horCageCap.makeGhost();
            log('captive is free');
            return new CaptiveIsFreeDialogManager().play();
        }).then(() => {
            return this.goTo(2850);
        }).then(() => {
            return this.goTo(2690);
        }).then(() => {
            return this._linkCauldron(cauldron);
        }).then(() => {
            return this.goTo(3500);
        });
    }

    _linkCauldron(cauldron) {
        return this.goTo(cauldron.pos.x - 20)
            .then(() => {
                this._linkedCauldron = cauldron;
            });
    }

    _unlinkCauldron() {
        this._linkedCauldron = null;
    }

    _pushCauldron() {
        this._linkedCauldron.pos.x = this.pos.x + 20;
    }

    _startFollowPlayer(player) {
        this.followPlayerInterval = setInterval(() => {
            if (!player.alive) {
                clearInterval(this.followPlayerInterval);
                return;
            }
            let newPosX = player.pos.x - 150;

            if (newPosX > this.coffeCauldronPosX - 200) {
                this._onCaptiveIsNearCoffeCauldronPlace();
            } else {
                if (this.pos.x < newPosX) {
                    this.goTo(newPosX);
                }
            }

        }, 3000);
    }

    _stopFollowingPlayer() {
        clearInterval(this.followPlayerInterval);
    }

    _onCaptiveIsNearCoffeCauldronPlace() {
        let player = searchPlayerEntity();
        let cauldron = searchCauldronEntity();

        this.goTo(this.coffeCauldronPosX)
            .then(() => {
                this._stopFollowingPlayer();
                this._unlinkCauldron();
                player.playCoffeeScene();
                
                this.say('coffee_msg1')
                    .then(() => {
                        return this.goTo(player.pos.x - 50);
                    }).then(() => {
                        return this.say('coffee_msg2');
                    })
                    .then(() => {
                        return this.goTo(cauldron.pos.x);
                    })
                    .then(() => {
                        return this.say('coffee_msg3');
                    })
                    .then(() => {
                        return this.goTo(player.pos.x + 110);
                    })
                    .then(() => {
                        return this.goTo(player.pos.x + 60);
                    })
                    .then(() => {
                        return this.say('coffee_msg4');
                    }).then(() => {
                        return this._sayJokes();
                    })
            });
    }

    _sayJokes() {
        return this.say('joke1')
            .then(() => {
                return this.say('joke2')
            })
            .then(() => {
                return this.say('joke3')
            })
            .then(() => {
                return this.say('joke4')
            })
            .then(() => {
                return this.say('joke5')
            })
            .then(() => {
                return this._sayJokes();
            })
    }

}

export {
    CaptiveEntity
};
import * as me from 'melonjs';
import { resources } from './resources';
import { PlayScreen } from './screens/playScreen';
import { PlayerEntity } from './player';
import { EnemyEntity } from './enemyEntity';
import { Bullet } from './bullet';
import { SightBullet } from './sightBullet';
import { HealingHeart } from './healingHeart';
import { CoffeeBean } from './coffeeBean';
import { CaptiveEntity } from './captiveEntity';
import { HorizontalCageCap } from './cage/horizontalCageCap';
import { VerticalCageCap } from './cage/verticalCageCap';
import { CauldronEntity } from './cauldron';
import { CageController } from './cage/cageController';
import { CaptiveDiedScreen } from './screens/captiveDiedScreen';
import { IntroScreen } from './screens/introScreen';
import { DeathEntity } from './deathEntity';
import { EndScreen } from './screens/endScreen';
import { ReadyToStartScreen } from './screens/readyToStartScreen';
import { log } from './logger';
import { TexturesHolder } from './texturesHolder';

me.device.onReady( function() {
    if (!me.video.init(1280, 720, {parent : "screen"})) {
        alert("Your browser does not support HTML5 canvas.");
        return;
    }

    me.audio.init("mp3");

    me.loader.preload(resources);

    me.loader.onload = function() {
        me.collision.types.SIGHT_BULLET = me.collision.types.USER << 1;
        me.collision.types.HEALING_ENTITY = me.collision.types.USER << 2;
        me.collision.types.CAPTIVE = me.collision.types.USER << 3;
        me.collision.types.DEATH_ENTITY = me.collision.types.USER << 4;

        me.state.CAPTIVE_DIED = me.state.USER + 1;
        me.state.INTRO = me.state.USER + 2;

        me.state.set(me.state.PLAY, new PlayScreen());
        me.state.set(me.state.CAPTIVE_DIED, new CaptiveDiedScreen());
        me.state.set(me.state.INTRO, new IntroScreen());
        me.state.set(me.state.GAME_END, new EndScreen());
        me.state.set(me.state.MENU, new ReadyToStartScreen());

        me.pool.register("player", PlayerEntity);
        me.pool.register("enemy", EnemyEntity);
        me.pool.register("bullet", Bullet);
        me.pool.register("sightBullet", SightBullet);
        me.pool.register("healingHeart", HealingHeart);
        me.pool.register("coffeeBean", CoffeeBean);
        me.pool.register("captive", CaptiveEntity);
        me.pool.register("horizontalCageCap", HorizontalCageCap);
        me.pool.register("verticalCageCap", VerticalCageCap);
        me.pool.register("cageController", CageController);
        me.pool.register("deathEntity", DeathEntity);
        me.pool.register("cauldron", CauldronEntity);

        me.input.bindKey(me.input.KEY.LEFT,  "left");
        me.input.bindKey(me.input.KEY.RIGHT, "right");
        me.input.bindKey(me.input.KEY.UP,  "jump", true);
        me.input.bindKey(me.input.KEY.SPACE,  "shoot", true);
        me.input.bindKey(me.input.KEY.E,  "activate", true);
        me.input.bindKey(me.input.KEY.ENTER, "enter", true);

        TexturesHolder.getInstance().init();

        me.state.change(me.state.MENU);
        // me.state.change(me.state.PLAY);

        log('game loaded');
    }
});

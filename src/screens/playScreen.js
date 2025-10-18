import { Stage, level, game, audio } from 'melonjs';
import { HUD } from '../hud/HUD';
import { log } from '../logger';

class PlayScreen extends Stage {

    onResetEvent() {
        audio.playTrack("soundtrack", 0.25);

        level.load("level1");

        this.hud = new HUD();
        game.world.addChild(this.hud);
        log('play start');
    }

    onDestroyEvent() {
        audio.stopTrack();
        game.world.removeChild(this.hud);
    }
}

export {
    PlayScreen
};
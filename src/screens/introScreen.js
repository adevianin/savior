import { Stage, level, game } from 'melonjs';
import { IntroHUD } from '../hud/introHUD';

class IntroScreen extends Stage {

    onResetEvent() {
        this.hud = new IntroHUD();
        game.world.addChild(this.hud);
    }

    onDestroyEvent() {
        game.world.removeChild(this.hud);
    }
}

export {
    IntroScreen
};
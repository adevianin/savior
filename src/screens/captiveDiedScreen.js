import { Stage, level, game } from 'melonjs';
import { CaptiveIsDeadHUD } from '../hud/captiveIsDeadHUD';

class CaptiveDiedScreen extends Stage {

    onResetEvent() {
        this.hud = new CaptiveIsDeadHUD();
        game.world.addChild(this.hud);
    }

    onDestroyEvent() {
        game.world.removeChild(this.hud);
    }
}

export {
    CaptiveDiedScreen
};
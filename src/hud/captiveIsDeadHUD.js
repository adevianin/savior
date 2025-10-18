import { Container, state } from 'melonjs';
import { Dialog } from './dialog';
import { TexturesHolder } from '../texturesHolder';

class CaptiveIsDeadHUD extends Container {
    constructor() {
		super();
		this.floating = true;
		this.name = "captiveIsDeadHUD";
		let images = [
			{name: 'msg1' },
			{name: 'msg2' },
		];

		let msgsTexture = TexturesHolder.getInstance().captiveDiedMsgs;

		this.addChild(new Dialog(0, 0, msgsTexture, images, () => {
			setTimeout(() => {
				state.change(state.GAME_END);
			}, 1000);
		}));
	}
}

export {
    CaptiveIsDeadHUD
};
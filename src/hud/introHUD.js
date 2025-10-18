import { Container, state} from 'melonjs';
import { Dialog } from './dialog';
import { TexturesHolder } from '../texturesHolder';

class IntroHUD extends Container {
    constructor() {
		super();
		this.floating = true;
		this.name = "IntroHUD";
		let images = [
			{name: 'msg1' },
			{name: 'msg2' },
			{name: 'msg3' },
			{name: 'msg4' }
		];

		let msgsTexture = TexturesHolder.getInstance().introMessages;

		this.addChild(new Dialog(0, 0, msgsTexture, images, ()=> {
			setTimeout(() => {
				state.change(state.PLAY);
			}, 1000);
		}));
	}
}

export {
    IntroHUD
};
import { Container } from 'melonjs';
import { HpIndicator } from './hpIndicator';
import { CageControllerUseTip } from './cageControllerUseTip';

class HUD extends Container {
    constructor() {
		super();
		this.isPersistent = true;
		this.floating = true;
		this.name = "HUD";
		this.addChild(new HpIndicator(0, 0));
		this.addChild(new CageControllerUseTip(0, 0));
	}
}

export {
    HUD
};
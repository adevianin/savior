import { Renderable } from 'melonjs';
import { DataBus } from '../dataBus';

class HpIndicator extends Renderable {

    constructor(x, y) {
        super(x, y, 102, 20);

        this._hp = 0;
        DataBus.getInstance().on('playerHp', (hp) => {
            this._hp = hp;
        })
    }

    // update() {
    //     if (this._hp) {
    //         this.hp = dataBus.playerData.hp || 0;
    //         return true;
    //     }

    //     return false;
    // }

    draw(renderer) {
        renderer.setColor('gray');
        renderer.fillRect(59, 14, 102, 24);
        renderer.setColor('red');
        renderer.fillRect(60, 16, this._hp, 20);
        
    }
}

export {
    HpIndicator
};
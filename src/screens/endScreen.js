import { Stage, game, Sprite } from 'melonjs';

class EndScreen extends Stage {

    onResetEvent() {
        this.sprite = new Sprite(game.viewport.width / 2, game.viewport.height / 2, {
            image: 'the_end'
        })
        game.world.addChild(this.sprite);
    }

    onDestroyEvent() {
        game.world.removeChild(this.sprite);
    }
}

export {
    EndScreen
};
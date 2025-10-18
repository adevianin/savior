import { Stage, game, Sprite, event, state } from 'melonjs';

class ReadyToStartScreen extends Stage {

    onResetEvent() {
        this.sprite = new Sprite(game.viewport.width / 2, game.viewport.height / 2, {
            image: 'title'
        })
        game.world.addChild(this.sprite);

        this.handler = function (action, keyCode, edge) {
            if (action === "enter") {
                state.change(state.INTRO);
            }
        };
        event.on(event.KEYDOWN, this.handler);
    }

    onDestroyEvent() {
        game.world.removeChild(this.sprite);
        event.off(event.KEYDOWN, this.handler);
    }
}

export {
    ReadyToStartScreen
};
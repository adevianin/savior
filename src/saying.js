import { Renderable, Sprite, loader, Polygon, Vector2d, Color } from 'melonjs';
import { TexturesHolder } from './texturesHolder';

class Saying extends Renderable {

    constructor(msgId) {
        super(0, 0, 0, 0);
        this.texture = TexturesHolder.getInstance().inGameMsgs;

        this.bottomTriangleHeight = 10;
        let region = this.texture.getRegion(msgId);

        this.msgBorderBox = {
            x: -region.width / 2,
            y: -region.height - this.bottomTriangleHeight,
            width: region.width,
            height: region.height
        };

        this.renderable = new Sprite(this.msgBorderBox.x, this.msgBorderBox.y - 5, {
            image: this.texture,
            region: msgId
        });
    }

    draw(renderer) {
        renderer.setColor(new Color(153, 204, 255, 0.7));
        renderer.setLineWidth(2);

        renderer.fillPolygon(new Polygon(0, -this.bottomTriangleHeight, [
            new Vector2d(10, this.bottomTriangleHeight), 
            new Vector2d(20, 0), 
            new Vector2d(0, 0)
        ]));

        renderer.fillRect(this.msgBorderBox.x - 5, this.msgBorderBox.y - 15, this.msgBorderBox.width + 10, this.msgBorderBox.height + 15);

        this.renderable.draw(renderer);
    }

}

export {
    Saying
};
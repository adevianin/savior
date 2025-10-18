import { video, loader } from 'melonjs';

let holder = null;

class TexturesHolder {

    static getInstance() {
        if (!holder) {
            holder = new TexturesHolder();
        }

        return holder;
    }

    init() {
        this.inGameMsgs = new video.renderer.Texture(loader.getJSON("in_game_msgs"),  loader.getImage("in_game_msgs"));
        this.generalTextures = new video.renderer.Texture(loader.getJSON("general_textures"),  loader.getImage("general_textures"));
        this.introMessages = new video.renderer.Texture(loader.getJSON("intro_messages"),  loader.getImage("intro_messages"));
        this.captiveDiedMsgs = new video.renderer.Texture(loader.getJSON("captive_died_msgs"),  loader.getImage("captive_died_msgs"));
    }
}

export {
    TexturesHolder
};
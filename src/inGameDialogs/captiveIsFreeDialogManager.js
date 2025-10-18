import { searchPlayerEntity, searchCaptiveEntity } from '../utils';

class CaptiveIsFreeDialogManager {
    play() {
        let player = searchPlayerEntity();
        let captive = searchCaptiveEntity();

        return player.say('captive_saved_msg1')
            .then(() => {
                return captive.say('captive_saved_msg2');
            })
            .then(() => {
                return player.say('captive_saved_msg3');
            })
            .then(() => {
                return captive.say('captive_saved_msg4');
            })
            .then(() => {
                return captive.say('captive_saved_msg5');
            })
            .then(() => {
                return player.say('captive_saved_msg6');
            })
            .then(() => {
                return captive.say('captive_saved_msg7');
            })
    }
}

export {
    CaptiveIsFreeDialogManager
};
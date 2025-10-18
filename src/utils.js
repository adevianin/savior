import { game } from 'melonjs';

function searchPlayerEntity() {
    return game.world.getChildByProp('gid','player')[0];
}

function searchCaptiveEntity() {
    return game.world.getChildByProp('gid','captive')[0];
}

function searchCauldronEntity() {
    return game.world.getChildByProp('gid','cauldron')[0];
}

function searchHorizontalCageCapEntity() {
    return game.world.getChildByProp('gid','horizontalCageCap')[0];
}

function waitForEntity(gid) {
    let counter = 0;
    return new Promise((res, rej) => {
        let interval = setInterval(() => {
            let entity = game.world.getChildByProp('gid', gid)[0];
            if (entity) {
                clearInterval(interval);
                res(entity);
            } else if (counter >= 7) {
                rej();
            }
            counter++;
        }, 500);
    });
}


export {
    searchPlayerEntity,
    searchCaptiveEntity,
    searchCauldronEntity,
    waitForEntity,
    searchHorizontalCageCapEntity
};
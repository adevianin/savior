import { createNanoEvents } from 'nanoevents';

let instance = null;

class DataBus {
    static getInstance() {
        if (!instance) {
            instance = new DataBus(createNanoEvents());
        }
        return instance;
    }

    constructor(emitter) {
        this._emitter = emitter;

        this._dataCache = {};
    }

    push(dataName, value) {
        this._dataCache[dataName] = value;
        this._emitter.emit(dataName, value);
    }

    on(dataName, clb) {
        this._emitter.on(dataName, clb);
        if (this._dataCache[dataName] !== undefined) {
            clb(this._dataCache[dataName]);
        }
    }

}

export {
    DataBus
};
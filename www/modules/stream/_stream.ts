import { Thunk, thunk, action, Action, createStore, StoreProvider, useStore } from 'easy-peasy'

interface StreamModel {
    connected: boolean
    publishing: boolean
    setConnected: Action<StreamModel, boolean>
    togglePublishing: Action<StreamModel, any>
}

export const streamModel = {
    stream: {
        connected: false,
        publishing: false,
        setConnected: action((state, payload) => {
            state.connected = payload
        }),
        togglePublishing: action((state) => {
            state.publishing = !state.publishing
        }),
    } as StreamModel,
}

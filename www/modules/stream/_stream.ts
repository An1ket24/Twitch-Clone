import { Thunk, thunk, action, Action, createStore, StoreProvider, useStore } from 'easy-peasy'

interface StreamModel {
    publishing: boolean
    togglePublishing: Action<StreamModel, any>
}

export const streamModel = {
    stream: {
        publishing: false,
        togglePublishing: action((state) => {
            state.publishing = !state.publishing
        }),
    } as StreamModel,
}

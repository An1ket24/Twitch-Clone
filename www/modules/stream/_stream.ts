import { Thunk, thunk, action, Action, createStore, StoreProvider, useStore } from 'easy-peasy'

import { subscriberSession } from '~/modules/stream/subscribe'

interface StreamModel {
    gift?: object
    // outbound: boolean
    connected: boolean
    publishing: boolean
    setConnected: Action<StreamModel, boolean>
    togglePublishing: Action<StreamModel>
    setGift: Action<StreamModel, string>
    // setOutbound: Action<StreamModel, boolean>
    reset: Action<StreamModel>
    sendGift: Thunk<StreamModel>
}

let init = {
    gift: undefined,
    // outbound: false,
    connected: false,
    publishing: false,
}

export const streamModel = {
    stream: {
        ...init,
        reset: action((state) => {
            Object.assign(state, init)
        }),
        // setOutbound: action((state, payload) => {
        // state.outbound = payload
        // }),
        setConnected: action((state, payload) => {
            state.connected = payload
        }),
        setGift: action((state, payload) => {
            state.gift = {}
        }),
        togglePublishing: action((state) => {
            state.publishing = !state.publishing
        }),
        sendGift: thunk(() => {
            if (!subscriberSession) {
                return
            }
            subscriberSession.signal(
                {
                    type: 'gift',
                    data: '',
                },
                function (err: any) {
                    if (err) {
                        console.log('signal error: ' + err.message)
                    } else {
                        console.log('signal sent')
                    }
                }
            )
        }),
    } as StreamModel,
}

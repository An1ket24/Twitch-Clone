import { Thunk, thunk, action, Action, createStore, StoreProvider, useStore } from 'easy-peasy'

import { subscriberSession } from '~/pages/subscribe'

interface StreamModel {
    gift?: object
    connected: boolean
    publishing: boolean
    setConnected: Action<StreamModel, boolean>
    togglePublishing: Action<StreamModel>
    setGift: Action<StreamModel, string>
    sendGift: Thunk<StreamModel>
}

export const streamModel = {
    stream: {
        gift: undefined,
        connected: false,
        publishing: false,
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

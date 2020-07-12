import { Thunk, thunk, action, Action, createStore, StoreProvider, useStore } from 'easy-peasy'

import { subscriberSession } from '~/modules/stream/subscribe'

type Init = {
    gift?: object
    // outbound: boolean
    serviceRender: boolean
    connected: boolean
    publishing: boolean
    sessionId: string
    image: string
}

interface StreamModel extends Init {
    setConnected: Action<StreamModel, boolean>
    setServiceRender: Action<StreamModel, boolean>
    togglePublishing: Action<StreamModel>
    setGift: Action<StreamModel, string>
    // setOutbound: Action<StreamModel, boolean>
    setSessionId: Action<StreamModel, string>
    setImage: Action<StreamModel, string>
    reset: Action<StreamModel>
    sendGift: Thunk<StreamModel>
}

let init = {
    gift: undefined,
    // outbound: false,
    connected: false,
    publishing: false,

    image: '',
    serviceRender: true,
}

export const streamModel = {
    stream: {
        ...init,
        sessionId: '',
        reset: action((state) => {
            Object.assign(state, init)
        }),
        // setOutbound: action((state, payload) => {
        // state.outbound = payload
        // }),
        setImage: action((state, payload) => {
            state.image = payload
        }),
        setSessionId: action((state, payload) => {
            state.sessionId = payload
        }),
        setConnected: action((state, payload) => {
            state.connected = payload
        }),
        setServiceRender: action((state, payload) => {
            state.serviceRender = payload
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

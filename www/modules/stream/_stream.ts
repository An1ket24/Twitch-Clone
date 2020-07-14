import {
    ThunkOn,
    thunkOn,
    ActionOn,
    actionOn,
    Thunk,
    thunk,
    action,
    Action,
    createStore,
    StoreProvider,
    useStore,
} from 'easy-peasy'

import { subscriberSession } from '~/modules/stream/subscribe'

export type Stream = {
    name: string
    image: string
}
export enum Status {
    IDLE = 'IDLE',
    CONNECTING = 'CONNECTING',
    STREAMING = 'STREAMING',
}

type Init = {
    gift?: object
    serviceRender: boolean
    publishing: boolean
    sessionId: string | undefined
    status: Status
    stream: Stream | undefined
}

let init = {
    gift: undefined,
    publishing: false,
    serviceRender: true,
    status: Status.IDLE,
    stream: undefined,
    sessionId: undefined,
}

type Listeners = {
    onSessionId: ThunkOn<StreamModel>
    onStream: ThunkOn<StreamModel>
}

let listeners: Listeners = {
    onSessionId: thunkOn(
        (actions) => actions.setSessionId,
        (actions) => actions.setStatus(Status.CONNECTING)
    ),
    onStream: thunkOn(
        (actions) => actions.setStream,
        (actions) => actions.setStatus(Status.STREAMING)
    ),
}

export type StreamModel = Init &
    Listeners & {
        setServiceRender: Action<StreamModel, boolean>
        togglePublishing: Action<StreamModel>
        setGift: Action<StreamModel, string>
        setSessionId: Action<StreamModel, string | undefined>
        setStream: Action<StreamModel, Stream>
        setStatus: Action<StreamModel, Status>
        reset: Action<StreamModel>
        sendGift: Thunk<StreamModel>
    }

export const streamModel: StreamModel = {
    ...init,
    sessionId: '',
    reset: action((state) => {
        Object.assign(state, init)
    }),
    ...listeners,
    setSessionId: action((state, payload) => {
        state.sessionId = payload
    }),
    setStream: action((state, stream) => {
        state.stream = stream
    }),
    setStatus: action((state, status) => {
        state.status = status
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
}

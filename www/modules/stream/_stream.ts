import { ThunkOn, thunkOn, Thunk, thunk, action, Action } from 'easy-peasy'

import { subscriberSession } from '~/modules/stream/inbound/subscribe'
import { StoreModel } from '~/store/store'
import { sleep } from '~/utils'
import { inboundModel, InboundModel } from '~/modules/stream/inbound/_inbound'
import { outboundModel, OutboundModel } from '~/modules/stream/outbound/_outbound'

export type Stream = {
    sessionId: string | undefined
    name: string
    image: string
}
export enum Status {
    IDLE = 'IDLE',
    CONNECTING = 'CONNECTING',
    STREAMING = 'STREAMING',
}

type Init = {
    publishing: boolean
    gift?: object
    sessionId: string | undefined
    status: Status
    stream: Stream | undefined
}

let init = {
    publishing: false,
    gift: undefined,
    status: Status.IDLE,
    stream: undefined,
    sessionId: undefined,
}

type Listeners = {
    onSessionId: ThunkOn<InboundModel>
    onStream: ThunkOn<InboundModel>
    onStatus: ThunkOn<InboundModel>
}

let intRef: any

let listeners: Listeners = {
    onSessionId: thunkOn(
        (actions) => actions.setSessionId,
        (actions, target, { getState }) => actions.setStatus(Status.CONNECTING)
    ),
    onStream: thunkOn(
        (actions) => actions.setStream,
        (actions) => actions.setStatus(Status.STREAMING)
    ),
    onStatus: thunkOn(
        (actions) => actions.setStatus,
        (actions, target, { getState }) => {
            let newStatus = target.payload
            if (intRef && newStatus !== Status.CONNECTING) {
                intRef = undefined
            }
            if (!intRef && newStatus === Status.CONNECTING && getState().sessionId) {
                intRef = setTimeout(() => {
                    if (intRef) {
                        console.log('!!!!!!!!!!! onStatus subscriber FORCE REFRESH')
                        actions.refresh()
                    }
                }, 5000)
            }
        }
    ),
}

export type StreamModel = Init &
    Listeners & {
        togglePublishing: Action<OutboundModel>
        setGift: Action<StreamModel, string>
        sendGift: Thunk<StreamModel>
        setSessionId: Action<InboundModel, string | undefined>
        setStream: Action<InboundModel, Stream>
        setStatus: Action<InboundModel, Status>
        refresh: Thunk<InboundModel>
        reset: Action<InboundModel>
    }

export const streamModel: StreamModel = {
    ...init,
    ...listeners,
    reset: action((state) => {
        console.log('RESETTING STREAM')
        Object.assign(state, init)
    }),
    // Intended to reload component -> refresh the session
    refresh: thunk(async (actions, payload, { getState }) => {
        console.log('REFRESHING STREAM')
        let { sessionId } = getState()
        console.log('sessionId', sessionId)
        actions.reset()
        await sleep(1500)
        actions.setSessionId(sessionId)
    }),
    togglePublishing: action((state) => {
        state.publishing = !state.publishing
    }),
    setSessionId: action((state, payload) => {
        state.sessionId = payload
    }),
    setStream: action((state, stream) => {
        state.stream = stream
    }),
    setStatus: action((state, status) => {
        state.status = status
    }),
    setGift: action((state, payload) => {
        state.gift = {}
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

import { ThunkOn, thunkOn, Thunk, thunk, action, Action } from 'easy-peasy'

import { subscriberSession } from '~/modules/stream/inbound/subscribe'
import { StoreModel } from '~/store/store'
import { sleep } from '~/utils'

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
    sessionId: string | undefined
    status: Status
    stream: Stream | undefined
}

let init = {
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
                }, 8000)
            }
        }
    ),
}

export type InboundModel = Init &
    Listeners & {
        setSessionId: Action<InboundModel, string | undefined>
        setStream: Action<InboundModel, Stream>
        setStatus: Action<InboundModel, Status>
        refresh: Thunk<InboundModel>
        reset: Action<InboundModel>
    }

export const inboundModel: InboundModel = {
    ...init,
    ...listeners,
    reset: action((state) => {
        console.log('RESETTING INBOUND')
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
    setSessionId: action((state, payload) => {
        state.sessionId = payload
    }),
    setStream: action((state, stream) => {
        state.stream = stream
    }),
    setStatus: action((state, status) => {
        state.status = status
    }),
}

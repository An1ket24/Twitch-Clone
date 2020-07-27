import { ThunkOn, thunkOn, ActionOn, actionOn, computed, Computed, Thunk, thunk, action, Action } from 'easy-peasy'
import { queryCache } from 'react-query'
import { Stream, Status } from '~/modules/stream/inbound/_inbound'
import { StoreModel } from '~/store/store'
import { ApiFeedAllResult } from '~/pages/api/feed/all'

let init = {
    currentIndex: 0,
    streams: new Map<string | undefined, Stream | undefined>(),
}

export type FeedModel = typeof init &
    Listeners & {
        reset: Action<FeedModel>
        setCurrentIndex: Action<FeedModel, number>
        updateStream: Action<FeedModel, Stream>
        nextIndex: Thunk<FeedModel, void, any, StoreModel>
        getStream: Computed<FeedModel, (sessionId: string | undefined) => Stream | undefined>
    }

let streamStartTime = 0

type Listeners = {
    onStream: ThunkOn<FeedModel, any, StoreModel>
}
let listeners: Listeners = {
    onStream: thunkOn(
        (actions, storeActions) => storeActions.stream.setStream,
        (actions, target) => {
            streamStartTime = new Date().getTime()
            actions.updateStream(target.payload)
        }
    ),
}

export const feedModel: FeedModel = {
    ...init,
    ...listeners,
    reset: action((state) => {
        Object.assign(state, init)
    }),
    getStream: computed((state) => (sessionId) => {
        return sessionId ? state.streams.get(sessionId) : undefined
    }),
    nextIndex: thunk((actions, _, { getState, getStoreState, getStoreActions }) => {
        let feed = queryCache.getQueryData<ApiFeedAllResult>('feed')
        let feedLen = feed?.sessions?.length
        let { status } = getStoreState().stream
        let { sessionId: currentSessionId } = getStoreState().stream
        if (
            feed &&
            feedLen &&
            (status === Status.IDLE ||
                (status === Status.STREAMING && new Date().getTime() - streamStartTime > 1500) ||
                !currentSessionId)
        ) {
            let newIndex = getState().currentIndex < feedLen - 1 ? getState().currentIndex + 1 : 0
            actions.setCurrentIndex(newIndex)

            let newSessionId = feed.sessions[newIndex].id
            if (newSessionId === currentSessionId) {
                // only one publisher -> This intended to reload session -> fresh snapshot
                console.log('%%%%%%%%%% nextIndex subscriber FORCE REFRESH')
                getStoreActions().stream.refresh()
            } else {
                getStoreActions().stream.setSessionId(newSessionId)
            }
        }
    }),
    setCurrentIndex: action((state, payload) => {
        state.currentIndex = payload
    }),
    updateStream: action((state, payload) => {
        state.streams.set(payload.sessionId, payload)
    }),
}

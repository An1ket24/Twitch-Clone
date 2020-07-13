import { ThunkOn, thunkOn, ActionOn, actionOn, computed, Computed, Thunk, thunk, action, Action } from 'easy-peasy'
import { queryCache } from 'react-query'
import { Stream, Status } from '~/modules/stream/_stream'
import { StoreModel } from '~/store/store'
import { ApiFeedAllResult } from '~/pages/api/feed/all'

let init = {
    currentIndex: 0,
    streams: new Map<string | undefined, Stream | undefined>(),
}

export type FeedModel = typeof init & {
    reset: Action<FeedModel>
    setCurrentIndex: Action<FeedModel, number>
    nextIndex: Thunk<FeedModel, void, any, StoreModel>
    getStream: Computed<FeedModel, (sessionId: string | undefined) => Stream | undefined>
    onStreamStatus: ThunkOn<FeedModel, any, StoreModel>
}

let streamStartTime = 0

export const feedModel: FeedModel = {
    ...init,
    reset: action((state) => {
        Object.assign(state, init)
    }),
    onStreamStatus: thunkOn(
        (actions, storeActions) => storeActions.stream.setStatus,
        (actions, target, { getState, getStoreState }) => {
            if (target.payload === Status.STREAMING) {
                streamStartTime = new Date().getTime()
                getState().streams.set(getStoreState().stream.sessionId, getStoreState().stream.stream)
                // actions.nextIndex()
            }
        }
    ),
    getStream: computed((state) => (sessionId) => {
        return sessionId ? state.streams.get(sessionId) : undefined
    }),
    nextIndex: thunk((actions, _, { getState, getStoreState, getStoreActions }) => {
        let feed = queryCache.getQueryData<ApiFeedAllResult>('feed')
        let feedLen = feed?.sessions?.length
        console.log('feed', feed)
        if (
            feed &&
            feedLen &&
            getStoreState().stream.status !== Status.CONNECTING &&
            new Date().getTime() - streamStartTime > 1500
        ) {
            let currentIndex = getState().currentIndex < feedLen - 1 ? getState().currentIndex + 1 : 0
            actions.setCurrentIndex(currentIndex)
            getStoreActions().stream.setSessionId(feed.sessions[currentIndex].id)
        }
    }),
    setCurrentIndex: action((state, payload) => {
        state.currentIndex = payload
    }),
}

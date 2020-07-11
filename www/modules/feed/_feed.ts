import { Thunk, thunk, action, Action, createStore, StoreProvider, useStore } from 'easy-peasy'

type Init = { isGetImageIndex?: number; currentGetImageIndex: number }

interface FeedModel extends Init {
    reset: Action<FeedModel, Init>
    setIsGetImageIndex: Action<FeedModel, number | undefined>
    setCurrentGetImageIndex: Action<FeedModel, number>
    nextIndex: Thunk<FeedModel, { len: number }>
}

export const feedModel = {
    feed: {
        reset: action((state, payload) => {
            Object.assign(state, payload)
        }),
        setIsGetImageIndex: action((state, payload) => {
            state.isGetImageIndex = payload
        }),
        nextIndex: thunk((actions, { len }, { getState }) => {
            if (!getState().isGetImageIndex) {
                let nextInd = getState().currentGetImageIndex < len - 1 ? getState().currentGetImageIndex + 1 : 0
                actions.setIsGetImageIndex(nextInd)
                actions.setCurrentGetImageIndex(nextInd)
            }
        }),
        setCurrentGetImageIndex: action((state, payload) => {
            state.currentGetImageIndex = payload
        }),
    } as FeedModel,
}

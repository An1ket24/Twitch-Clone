import { action, createStore, StoreProvider, useStore } from 'easy-peasy'
import { createTypedHooks } from 'easy-peasy' // 👈import the helper
import { authModel, AuthModel } from './authModel'
import { streamModel, StreamModel } from '~/modules/stream/_stream'
import { feedModel, FeedModel } from '~/modules/feed/_feed'

const storeModel = {
    auth: authModel,
    stream: streamModel,
    feed: feedModel,
}

export type StoreModel = {
    auth: AuthModel
    stream: StreamModel
    feed: FeedModel
}

// Provide our model to the helper      👇
const typedHooks = createTypedHooks<StoreModel>()

// 👇 export the typed hooks
export const useStoreActions = typedHooks.useStoreActions
export const useStoreDispatch = typedHooks.useStoreDispatch
export const useStoreState = typedHooks.useStoreState

export const store = createStore(storeModel, {
    name: 'GlobalStore',
})

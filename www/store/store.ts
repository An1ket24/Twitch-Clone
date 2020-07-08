import { action, createStore, StoreProvider, useStore } from 'easy-peasy'
import { createTypedHooks } from 'easy-peasy' // 👈import the helper
import { authModel } from './authModel'
import { streamModel } from '~/modules/stream/_stream'

const storeModel = {
    ...authModel,
    ...streamModel,
}

// Provide our model to the helper      👇
const typedHooks = createTypedHooks<typeof storeModel>()

// 👇 export the typed hooks
export const useStoreActions = typedHooks.useStoreActions
export const useStoreDispatch = typedHooks.useStoreDispatch
export const useStoreState = typedHooks.useStoreState

export const store = createStore(storeModel, {
    name: 'GlobalStore',
})

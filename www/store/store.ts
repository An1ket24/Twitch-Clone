import { action, createStore, StoreProvider, useStore } from 'easy-peasy'

import { storeModel } from './model'

export const store = createStore(storeModel, {
    name: 'GlobalStore',
})

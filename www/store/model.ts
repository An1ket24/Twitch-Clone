import { Thunk, thunk, action, Action, createStore, StoreProvider, useStore } from 'easy-peasy'
import Router from 'next/router'

export interface StoreModel {
    isAuth?: boolean
    setAuth: Action<StoreModel, boolean>
}

export const storeModel: StoreModel = {
    isAuth: false,
    setAuth: action((state, payload) => {
        state.isAuth = payload
    }),
}

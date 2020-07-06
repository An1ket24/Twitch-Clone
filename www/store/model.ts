import { Thunk, thunk, action, Action, createStore, StoreProvider, useStore } from 'easy-peasy'
import Router from 'next/router'

export interface StoreModel {
    isAuth?: boolean
    PASSWORD?: string
    setAuth: Action<StoreModel, boolean>
    storePassword: Thunk<StoreModel, string>
    readStoredPassword: Thunk<StoreModel, void, any, {}, string | null>
}

let STORAGE_PASSWORD_KEY = 'web-rtc-password'

export const storeModel: StoreModel = {
    isAuth: false,
    PASSWORD: 'ar11',
    setAuth: action((state, payload) => {
        state.isAuth = payload
    }),
    storePassword: thunk((actions, payload) => {
        localStorage.setItem(STORAGE_PASSWORD_KEY, payload)
    }),
    readStoredPassword: thunk((actions, payload) => {
        return localStorage.getItem(STORAGE_PASSWORD_KEY)
    }),
}

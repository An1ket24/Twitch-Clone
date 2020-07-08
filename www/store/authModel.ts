import { Thunk, thunk, action, Action, createStore, StoreProvider, useStore } from 'easy-peasy'
import Router from 'next/router'

interface AuthModel {
    isAuth?: boolean
    PASSWORD?: string
    setAuth: Action<AuthModel, boolean>
    storePassword: Thunk<AuthModel, string>
    readStoredPassword: Thunk<AuthModel, void, any, {}, string | null>
}

let STORAGE_PASSWORD_KEY = 'web-rtc-password'

export const authModel = {
    auth: {
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
    } as AuthModel,
}

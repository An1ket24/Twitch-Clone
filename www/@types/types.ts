import { Workbox } from 'workbox-window'

export type W = typeof Workbox

declare global {
    interface Window {
        workbox: Workbox
    }
}

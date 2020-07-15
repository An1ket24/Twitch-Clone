import { ThunkOn, thunkOn, Thunk, thunk, action, Action } from 'easy-peasy'

import { subscriberSession } from '~/modules/stream/inbound/subscribe'
import { StoreModel } from '~/store/store'
import { sleep } from '~/utils'

type Init = {
    publishing: boolean
}

let init = {
    publishing: false,
}

type Listeners = {}

let listeners: Listeners = {}

export type OutboundModel = Init &
    Listeners & {
        togglePublishing: Action<OutboundModel>
        reset: Action<OutboundModel>
    }

export const outboundModel: OutboundModel = {
    ...init,
    ...listeners,
    reset: action((state) => {
        console.log('RESETTING OUTBOUND')
        Object.assign(state, init)
    }),
    togglePublishing: action((state) => {
        state.publishing = !state.publishing
    }),
}

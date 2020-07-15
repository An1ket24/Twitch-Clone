import { ThunkOn, thunkOn, Thunk, thunk, action, Action } from 'easy-peasy'

import { subscriberSession } from '~/modules/stream/inbound/subscribe'
import { StoreModel } from '~/store/store'
import { sleep } from '~/utils'
import { inboundModel, InboundModel } from '~/modules/stream/inbound/_inbound'
import { outboundModel, OutboundModel } from '~/modules/stream/outbound/_outbound'

type Init = {
    gift?: object
}

let init = {
    gift: undefined,
}

type Listeners = {}

let listeners: Listeners = {}

export type StreamModel = Init &
    Listeners & {
        inbound: InboundModel
        outbound: OutboundModel
        setGift: Action<StreamModel, string>
        reset: Action<StreamModel>
        sendGift: Thunk<StreamModel>
    }

export const streamModel: StreamModel = {
    inbound: inboundModel,
    outbound: outboundModel,
    ...init,
    ...listeners,
    reset: action((state) => {
        console.log('RESETTING STREAM')
        Object.assign(state, init)
    }),
    // Intended to reload component -> refresh the session
    setGift: action((state, payload) => {
        state.gift = {}
    }),
    sendGift: thunk(() => {
        if (!subscriberSession) {
            return
        }
        subscriberSession.signal(
            {
                type: 'gift',
                data: '',
            },
            function (err: any) {
                if (err) {
                    console.log('signal error: ' + err.message)
                } else {
                    console.log('signal sent')
                }
            }
        )
    }),
}

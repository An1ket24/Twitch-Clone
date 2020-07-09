import React from 'react'
import { useState } from 'reinspect'
import { useAutoCallback, useAutoMemo, useAutoEffect, useLayoutAutoEffect } from 'hooks.macro'
import { useStoreState, useStoreActions } from '~/store/store'
import PropTypes from 'prop-types'

import { OTSession, OTPublisher, OTStreams, OTSubscriber, preloadScript } from './_app'
import { API_KEY, SESSION_ID, TOKEN } from './_app'

export let subscriberSession

function Subscriber({ properties }, context) {
    let setConnected = useStoreActions((actions) => actions.stream.setConnected)
    useAutoEffect(() => {
        subscriberSession = context.session
    })

    let subscribeEventHandlers = useAutoMemo({
        connected: () => {
            console.log('subscriber connected')
            setConnected(true)
        },
        disconnected: () => {
            console.log('subscriber disconnected')
            setConnected(false)
        },
        destroyed: () => {
            console.log('subscriber destroyed')
            setConnected(false)
        },
        videoEnabled: () => {
            console.log('subscriber videoEnabled')
        },
        videoDisabled: () => {
            console.log('subscriber videoDisabled')
        },
    })

    return (
        <OTSubscriber
            properties={{
                subscribeToAudio: true,
                subscribeToVideo: true,
                ...properties,
            }}
            onSubscribe={() => {
                console.log('subscribed')
            }}
            onError={(err) => {
                console.log('publisher error', err)
            }}
            eventHandlers={subscribeEventHandlers}
            retry
            maxRetryAttempts={3}
            retryAttemptTimeout={2000}
        />
    )
}
Subscriber.contextTypes = {
    session: PropTypes.shape({ publish: PropTypes.func, subscribe: PropTypes.func }),
    streams: PropTypes.arrayOf(PropTypes.object),
}

export default function Subscribe({ properties }) {
    let eventHandlers = useAutoMemo({
        sessionConnected: () => {
            console.log('subscriber session connected')
        },
        sessionDisconnected: () => {
            console.log('subscriber session disconnected')
        },
    })

    return (
        <OTSession
            apiKey={API_KEY}
            sessionId={SESSION_ID}
            token={TOKEN}
            eventHandlers={eventHandlers}
            onConnect={() => {
                console.log('subscriber session connected')
            }}
            onError={(err) => {
                console.log('subscriber session error', err)
            }}
        >
            <OTStreams>
                <Subscriber properties={properties} />
            </OTStreams>
        </OTSession>
    )
}

import React from 'react'
import { useState } from 'reinspect'
import { useAutoCallback, useAutoMemo, useAutoEffect, useLayoutAutoEffect } from 'hooks.macro'
import { useStoreState, useStoreActions } from '~/store/store'

import { OTSession, OTPublisher, OTStreams, OTSubscriber, preloadScript } from './_app'
import { API_KEY, SESSION_ID, TOKEN } from './_app'

export default function Subscribe({ properties }) {
    let setConnected = useStoreActions((actions) => actions.stream.setConnected)
    let eventHandlers = useAutoMemo({
        sessionConnected: () => {
            console.log('subscriber session connected')
        },
        sessionDisconnected: () => {
            console.log('subscriber session disconnected')
        },
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
        <OTSession apiKey={API_KEY} sessionId={SESSION_ID} token={TOKEN} eventHandlers={eventHandlers}>
            <OTStreams>
                <OTSubscriber
                    properties={{
                        subscribeToAudio: true,
                        subscribeToVideo: true,
                        ...properties,
                    }}
                    onSubscribe={() => {
                        console.log('subscribed')
                    }}
                    eventHandlers={subscribeEventHandlers}
                    retry
                    maxRetryAttempts={3}
                    retryAttemptTimeout={2000}
                />
            </OTStreams>
        </OTSession>
    )
}

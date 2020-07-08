import React from 'react'
import { useState } from 'reinspect'
import { useAutoCallback, useAutoMemo, useAutoEffect, useLayoutAutoEffect } from 'hooks.macro'
import { useStoreState, useStoreActions } from '~/store/store'

import { OTSession, OTPublisher, OTStreams, OTSubscriber, preloadScript } from './_app'
import { API_KEY, SESSION_ID, TOKEN } from './_app'

export default function Publish({ properties }) {
    let setConnected = useStoreActions((actions) => actions.stream.setConnected)

    let eventHandlers = useAutoMemo({
        sessionConnected: () => {
            console.log('publisher session connected')
        },
        sessionDisconnected: () => {
            console.log('publisher session disconnected')
        },
    })
    let publisherEventHandlers = useAutoMemo({
        destroyed: () => {
            console.log('publisher destroyed')
            setConnected(false)
        },
        streamCreated: () => {
            console.log('publisher streamCreated')
            setConnected(true)
        },
        streamDestroyed: () => {
            console.log('publisher streamDestroyed')
            setConnected(false)
        },
    })

    return (
        <OTSession apiKey={API_KEY} sessionId={SESSION_ID} token={TOKEN} eventHandlers={eventHandlers}>
            <OTPublisher
                properties={{
                    publishAudio: true,
                    publishVideo: true,
                    videoSource: undefined,
                    ...properties,
                }}
                eventHandlers={publisherEventHandlers}
            />
        </OTSession>
    )
}

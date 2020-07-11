import React, { useRef } from 'react'
import { useState } from 'reinspect'
import { useAutoCallback, useAutoMemo, useAutoEffect, useLayoutAutoEffect } from 'hooks.macro'
import { useStoreState, useStoreActions } from '~/store/store'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import { useMutation, useQuery } from 'react-query'
import wretch from 'wretch'
import { Box } from '@chakra-ui/core'

import { OTSession, OTPublisher, OTStreams, OTSubscriber, preloadScript } from '../../pages/_app'

export let subscriberSession

function Subscriber(props, context) {
    let setConnected = useStoreActions((actions) => actions.stream.setConnected)
    useAutoEffect(() => {
        subscriberSession = context.session
    })
    let subscriber = useRef()

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
        videoElementCreated: () => {
            console.log('subscriber videoElementCreated')
            props.onImage?.(subscriber.current?.getSubscriber()?.getImgData())
        },
        videoDisabled: () => {
            console.log('subscriber videoDisabled')
        },
    })

    return (
        <Box d={props.onImage ? 'none' : 'block'}>
            <OTSubscriber
                ref={subscriber}
                properties={{
                    subscribeToAudio: props.onImage ? false : true,
                    subscribeToVideo: true,
                    width: '100%',
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
        </Box>
    )
}
Subscriber.contextTypes = {
    session: PropTypes.shape({ publish: PropTypes.func, subscribe: PropTypes.func }),
    streams: PropTypes.arrayOf(PropTypes.object),
}

export default function Subscribe(props) {
    let eventHandlers = useAutoMemo({
        sessionConnected: () => {
            console.log('subscriber session connected')
        },
        sessionDisconnected: () => {
            console.log('subscriber session disconnected')
        },
    })

    let router = useRouter()
    let sessionId = router.query.sessionId || props.sessionId
    let { data, isLoading, error } = useQuery(['getSubscriberToken', sessionId], () =>
        wretch(`/api/session/getToken/subscriber/${sessionId}`).post().json()
    )
    if (!data) {
        return null
    }
    console.log('subscriber data', data)

    return (
        <OTSession
            apiKey={data.apiKey}
            sessionId={data.sessionId}
            token={data.token}
            eventHandlers={eventHandlers}
            onConnect={() => {
                console.log('subscriber session connected')
            }}
            onError={(err) => {
                console.log('subscriber session error', err)
            }}
        >
            <OTStreams>
                <Subscriber {...props} />
            </OTStreams>
        </OTSession>
    )
}

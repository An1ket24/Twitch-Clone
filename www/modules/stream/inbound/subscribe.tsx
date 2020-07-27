import React, { useRef, useEffect } from 'react'
import { useState } from 'reinspect'
import { useUnmount, useUpdateEffect, useMount } from 'react-use'
import { useAutoCallback, useAutoMemo, useAutoEffect } from 'hooks.macro'
import { useStoreState, useStoreActions } from '~/store/store'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import { useMutation, useQuery } from 'react-query'
import wretch from 'wretch'
import { Image, Box } from '@chakra-ui/core'

import { OTSession, OTPublisher, OTStreams, OTSubscriber } from '~/pages/_app'

export let subscriberSession: any

function Subscriber(props: { serviceRender: boolean }, context: any) {
    let setStream = useStoreActions((actions) => actions.stream.setStream)
    let sessionId = useStoreState((state) => state.stream.sessionId)

    let subscriber = useRef<any>()

    let subscribeEventHandlers = useAutoMemo({
        connected: () => {
            console.log('subscriber connected')
        },
        disconnected: () => {
            console.log('subscriber disconnected')
            // setStatus(Status.IDLE)
        },
        destroyed: () => {
            console.log('subscriber destroyed')
            // setStatus(Status.IDLE)
        },
        videoEnabled: () => {
            console.log('subscriber videoEnabled')
        },
        videoElementCreated: () => {
            console.log('subscriber videoElementCreated')
            setStream({
                sessionId,
                image: subscriber.current?.getSubscriber()?.getImgData(),
                name: context?.streams[0]?.name ?? '',
            })
            subscriberSession = context.session
        },
        videoDisabled: () => {
            console.log('subscriber videoDisabled')
        },
    })

    return (
        <OTSubscriber
            ref={subscriber}
            properties={{
                subscribeToAudio: props.serviceRender ? false : true,
                subscribeToVideo: true,
                fitMode: 'contain',
            }}
            onSubscribe={() => {
                console.log('subscribed')
            }}
            onError={(err: any) => {
                console.log('subscriber error', err)
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

export default function Subscribe(props: { serviceRender: boolean }) {
    let setGift = useStoreActions((actions) => actions.stream.setGift)
    let gift = useStoreState((state) => state.stream.gift)
    const [anime, setAnime] = useState(false, 'setAnime')
    useUpdateEffect(() => {
        setAnime(true)
        setTimeout(() => setAnime(false), 4000)
    }, [gift])

    useUnmount(() => {
        console.log('Subscriber UNMOUNTED')
    })
    useMount(() => {
        console.log('Subscriber MOUNTED')
    })

    let eventHandlers = useAutoMemo({
        sessionConnected: () => {
            console.log('subscriber session connected')
        },
        sessionDisconnected: () => {
            console.log('subscriber session disconnected')
        },
        'signal:gift': (e: any) => {
            console.log('gift received: e', e)
            setGift('')
        },
    })

    let sessionId = useStoreState((state) => state.stream.sessionId)

    let { data, isLoading, error } = useQuery(
        ['getSubscriberToken', sessionId],
        () => wretch(`/api/session/getToken/subscriber/${sessionId}`).post().json(),
        { staleTime: 5 * 60 * 1000, refetchOnMount: false }
    )

    if (!data) {
        return null
    }
    console.log('subscriber data', data)

    return (
        <Box d={props.serviceRender ? 'none' : 'flex'} justifyContent='center' pos='relative'>
            <Image
                transition='opacity 0.6s'
                opacity={anime ? 1 : 0}
                src='fireworks1.gif'
                zIndex={100}
                pos='absolute'
                h='100%'
            />
            <OTSession
                apiKey={data.apiKey}
                sessionId={data.sessionId}
                token={data.token}
                eventHandlers={eventHandlers}
                onConnect={() => {
                    console.log('subscriber session connected')
                }}
                onError={(err: any) => {
                    console.log('subscriber session error', err)
                }}
            >
                <OTStreams>
                    <Subscriber {...props} />
                </OTStreams>
            </OTSession>
        </Box>
    )
}

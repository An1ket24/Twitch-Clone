import React, { useRef, useEffect } from 'react'
import { useState } from 'reinspect'
import { useUpdateEffect, useMount } from 'react-use'
import { useAutoCallback, useAutoMemo, useAutoEffect, useLayoutAutoEffect } from 'hooks.macro'
import { useStoreState, useStoreActions } from '~/store/store'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import { useMutation, useQuery } from 'react-query'
import wretch from 'wretch'
import { Image, Box } from '@chakra-ui/core'

import { OTSession, OTPublisher, OTStreams, OTSubscriber, preloadScript } from '../../pages/_app'
import { Status } from '~/modules/stream/_stream'

export let subscriberSession

function Subscriber(props, context) {
    let setConnected = useStoreActions((actions) => actions.stream.setConnected)
    let setStream = useStoreActions((actions) => actions.stream.setStream)
    let setStatus = useStoreActions((actions) => actions.stream.setStatus)
    let subscriber = useRef()

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
        <Box d={props.onImage ? 'none' : 'block'}>
            <OTSubscriber
                ref={subscriber}
                properties={{
                    subscribeToAudio: props.onImage ? false : true,
                    subscribeToVideo: true,
                    // height: '100%',
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

export default function Subscribe() {
    let setGift = useStoreActions((actions) => actions.stream.setGift)
    let gift = useStoreState((state) => state.stream.gift)
    const [anime, setAnime] = useState(false, 'setAnime')
    useUpdateEffect(() => {
        setAnime(true)
        setTimeout(() => setAnime(false), 4000)
    }, [gift])

    let eventHandlers = useAutoMemo({
        sessionConnected: () => {
            console.log('subscriber session connected')
        },
        sessionDisconnected: () => {
            console.log('subscriber session disconnected')
        },
        'signal:gift': (e) => {
            console.log('gift received: e', e)
            setGift('')
        },
    })

    useMount(() => {
        console.log('Subscriber MOUNTED')
    })

    // let router = useRouter()
    let sessionId = useStoreState((state) => state.stream.sessionId)
    // let sessionId = router.query.sessionId || storeSessionId
    // console.log('*** Subscriber sessionId', sessionId)

    let { data, isLoading, error } = useQuery(
        ['getSubscriberToken', sessionId],
        () => wretch(`/api/session/getToken/subscriber/${sessionId}`).post().json(),
        { staleTime: 5 * 60 * 1000, refetchOnMount: false }
    )
    // console.log('-----data', data)

    // const [r, setR] = useState(true, 'setR')
    // useEffect(() => {
    //     setTimeout(() => setR(true), 1000)
    //     return () => setR(false)
    // }, [data])

    if (!data) {
        return null
    }
    console.log('subscriber data', data)

    // console.log('### rendering subscriber', r)
    // if (!r) {
    //     return null
    // }
    return (
        <Box d='flex' justifyContent='center' pos='relative'>
            {anime && (
                <Image
                    src='fireworks1.gif'
                    zIndex={100}
                    pos='absolute'
                    // ml='-17px'
                />
            )}
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
                    <Subscriber />
                </OTStreams>
            </OTSession>
        </Box>
    )
}

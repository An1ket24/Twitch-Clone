import { useEffect, useRef } from 'react'
import { useState } from 'reinspect'
import { useAutoCallback, useAutoMemo, useAutoEffect, useLayoutAutoEffect } from 'hooks.macro'
import { useStoreState, useStoreActions } from '~/store/store'
import { Divider, Image, Box, Text, IconButton, Collapse, Icon } from '@chakra-ui/core'
import { useUnmount, useUpdateEffect, useMount } from 'react-use'
import wretch from 'wretch'
import { useMutation, useQuery } from 'react-query'

import { OTSession, OTPublisher, OTStreams, OTSubscriber, preloadScript } from '~/pages/_app'
import { useRouter } from 'next/router'

export default function Publish() {
    let gift = useStoreState((state) => state.stream.gift)

    let setConnected = useStoreActions((actions) => actions.stream.setConnected)
    let setGift = useStoreActions((actions) => actions.stream.setGift)

    const [anime, setAnime] = useState(false, 'setAnime')
    useUpdateEffect(() => {
        setAnime(true)
        setTimeout(() => setAnime(false), 4000)
    }, [gift])

    let eventHandlers = useAutoMemo({
        sessionConnected: () => {
            console.log('publisher session connected')
        },
        sessionDisconnected: () => {
            console.log('publisher session disconnected')
            setConnected(false)
        },
        'signal:gift': (e) => {
            console.log('gift received: e', e)
            setGift('')
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

    let publisher = useRef()
    let router = useRouter()

    let [createResource, { data, isLoading, error }] = useMutation(() =>
        wretch(
            router.query.sessionId ? `/api/session/getToken/publisher/${router.query.sessionId}` : '/api/session/create'
        )
            .post()
            .json()
    )

    useAutoEffect(() => {
        createResource()
    })
    useAutoEffect(() => {
        if (!router.query.sessionId && data) {
            router.push(`/outbound-stream?sessionId=${data.sessionId}`, undefined, { shallow: true })
        }
    })
    // useUnmount(
    //     () =>
    //         data?._id &&
    //         wretch(`/api/session/delete/${data._id}`)
    //             .post()
    //             .json()
    //             .then((res) => console.log('deleted session', res))
    //             .catch((err) => console.log('session delete error', err))
    // )
    if (!data) {
        return null
    }
    console.log('publisher data', data)
    // if (publisher.current) {
    //     let c = publisher.current.getPublisher().getImgData()
    //     console.log('c', c)
    // }
    // console.log('data', data)
    return (
        <>
            {anime && <Image src='fireworks.gif' zIndex={100} pos='absolute' />}

            <OTSession
                apiKey={data.apiKey}
                token={data.token}
                sessionId={data.sessionId}
                eventHandlers={eventHandlers}
                onConnect={() => {
                    console.log('publisher session connected')
                }}
                onError={(err) => {
                    console.log('publisher session error', err)
                }}
            >
                <OTPublisher
                    ref={publisher}
                    properties={{
                        publishAudio: true,
                        publishVideo: true,
                        videoSource: undefined,
                        width: '100%',
                    }}
                    onPublish={() => {
                        console.log('published')
                    }}
                    onInit={() => {
                        console.log('publisher initialized')
                    }}
                    onError={(err) => {
                        console.log('publisher error', err)
                    }}
                    eventHandlers={publisherEventHandlers}
                />
            </OTSession>
        </>
    )
}
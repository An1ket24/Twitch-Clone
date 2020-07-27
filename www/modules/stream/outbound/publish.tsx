import { useEffect, useRef } from 'react'
import { useState } from 'reinspect'
import { useAutoCallback, useAutoMemo, useAutoEffect } from 'hooks.macro'
import { useStoreState, useStoreActions } from '~/store/store'
import { Divider, Image, Box, Text, IconButton, Collapse, Icon } from '@chakra-ui/core'
import { useUnmount, useUpdateEffect, useMount } from 'react-use'
import wretch from 'wretch'
import { useMutation, useQuery } from 'react-query'
import UAParser from 'ua-parser-js'

import { OTSession, OTPublisher, OTStreams, OTSubscriber } from '~/pages/_app'
import { useRouter } from 'next/router'
import { Status } from '~/modules/stream/_stream'

const getDeviceString = () => {
    let parser = new UAParser()
    let { device, os, browser } = parser.getResult()
    let deviceString = `${browser.name} ${os.name} ${device.model ?? ''}`
    return deviceString
}

export default function Publish() {
    let gift = useStoreState((state) => state.stream.gift)
    let setGift = useStoreActions((actions) => actions.stream.setGift)
    let setStatus = useStoreActions((actions) => actions.stream.setStatus)

    const [anime, setAnime] = useState(false, 'setAnime')
    useUpdateEffect(() => {
        setAnime(true)
        setTimeout(() => setAnime(false), 4000)
    }, [gift])

    useUnmount(() => {
        console.log('Publisher UNMOUNTED')
    })
    useMount(() => {
        console.log('Publisher MOUNTED')
        setStatus(Status.CONNECTING)
    })

    let eventHandlers = useAutoMemo({
        sessionConnected: () => {
            console.log('publisher session connected')
        },
        sessionDisconnected: () => {
            console.log('publisher session disconnected')
            // setConnected(false)
        },
        'signal:gift': (e: any) => {
            console.log('gift received: e', e)
            setGift('')
        },
    })
    let publisher = useRef<any>()
    let publisherEventHandlers = useAutoMemo({
        destroyed: () => {
            console.log('publisher destroyed')
            // setConnected(false)
        },
        streamCreated: () => {
            console.log('publisher streamCreated')
            // setConnected(true)

            let p = publisher.current.getPublisher()
            console.log('publisher videoHeight', p.videoHeight())
            console.log('publisher videoWidth', p.videoWidth())
        },
        streamDestroyed: () => {
            console.log('publisher streamDestroyed')
            // setConnected(false)
        },
        videoElementCreated: () => {
            console.log('subscriber videoElementCreated')
            setStatus(Status.STREAMING)
        },
    })

    let router = useRouter()

    let [createResource, { data, isLoading, error }] = useMutation(() =>
        wretch(
            router.query.sessionId ? `/api/session/getToken/publisher/${router.query.sessionId}` : '/api/session/create'
        )
            .post()
            .json()
    )

    useMount(() => {
        createResource()
    })
    useAutoEffect(() => {
        if (!router.query.sessionId && data) {
            router.push(`/outbound-stream?sessionId=${data.sessionId}`, undefined, { shallow: true })
        }
    })
    if (!data) {
        return null
    }
    console.log('publisher data', data)

    return (
        <Box d='flex' justifyContent='center' pos='relative'>
            <Image
                transition='opacity 0.6s'
                opacity={anime ? 1 : 0}
                src='fireworks1.gif'
                zIndex={100}
                pos='absolute'
                h='100%'
                w='100%'
            />

            <OTSession
                apiKey={data.apiKey}
                token={data.token}
                sessionId={data.sessionId}
                eventHandlers={eventHandlers}
                onConnect={() => {
                    console.log('publisher session connected')
                }}
                onError={(err: any) => {
                    console.log('publisher session error', err)
                }}
            >
                <OTPublisher
                    ref={publisher}
                    properties={{
                        publishAudio: true,
                        publishVideo: true,
                        videoSource: undefined,
                        fitMode: 'contain',
                        name: getDeviceString(),
                    }}
                    onPublish={() => {
                        console.log('published')
                    }}
                    onInit={() => {
                        console.log('publisher initialized')
                    }}
                    onError={(err: any) => {
                        console.log('publisher error', err)
                    }}
                    eventHandlers={publisherEventHandlers}
                />
            </OTSession>
        </Box>
    )
}

// useUnmount(
//     () =>
//         data?._id &&
//         wretch(`/api/session/delete/${data._id}`)
//             .post()
//             .json()
//             .then((res) => console.log('deleted session', res))
//             .catch((err) => console.log('session delete error', err))
// )

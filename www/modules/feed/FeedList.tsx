import { memo, useRef, useCallback, FC, useEffect } from 'react'
import { useState } from 'reinspect'
import { Box, Text, Button, Collapse, Icon, Image } from '@chakra-ui/core'
import { useAutoCallback, useAutoMemo, useAutoEffect } from 'hooks.macro'
import { useVirtual } from 'react-virtual'
import Link from 'next/link'
import faker from 'faker'
import wretch from 'wretch'
import { useMutation, useQuery } from 'react-query'
import { useStoreState, useStoreActions } from '~/store/store'
import { useUnmount, useMount, useEffectOnce } from 'react-use'

import { withDataId } from '~/utils'
import { font10, font16 } from '~/styles/fonts'
import { Head } from '~/svg/Head'
import { Eye } from '~/svg/Eye'
import { ApiFeedAllResult } from '~/pages/api/feed/all'
// import { OT } from '~/pages/_app'

const Container = withDataId('List', font16)
const Views = withDataId('View', { ...font10, borderRadius: '2px', bg: 'black', color: 'white' })

let images = [
    'video2.jpg',
    'video1.jpeg',
    'video.jpg',
    'video3.png',
    'video4.jpg',
    'video5.png',
    'video6.jpg',
    'video7.jpg',
    'video8.jpeg',
    'video9.jpg',
    'video10.jpg',
    'video11.png',
    'video12.jpg',
]

// const Element = memo((props: { index: number; liveLen: number; sessionId: string }) => {
const Element = memo((props: { index: number; sessionId?: string }) => {
    // let isGetImageIndex = useStoreState((state) => state.feed.isGetImageIndex)
    // let storeImage = useStoreState((state) => state.stream.image)
    // let setIsGetImageIndex = useStoreActions((actions) => actions.feed.setIsGetImageIndex)
    // let setSessionId = useStoreActions((actions) => actions.stream.setSessionId)

    // let title = useAutoMemo(() => faker.lorem.sentence())
    // let image = useAutoMemo(images[index % images.length])
    // let { data, isLoading, error } = useQuery('getSubscriberToken', () =>
    //     wretch(`/api/session/getSubscriberToken/${sessionId}`).post().json()
    // )

    // useAutoEffect(() => {
    //     if (data) {
    //         let session = OT.initSession(data.apiKey, sessionId)
    //         OT.connect(data.token, (err) => {})
    //     }
    // })

    // let [image, setImage] = useState('', `setImage at index ${props.index}`)
    // let onImage = useAutoCallback((_image) => {
    //     setImage(_image)
    //     console.log('image', _image.length)
    // })

    // console.log('isGetImageIndex', isGetImageIndex)
    // console.log('props.index', props.index)

    // let isRealStream = props.index < props.liveLen
    // useAutoEffect(() => {
    //     if (isRealStream && isGetImageIndex === props.index) {
    //         setSessionId(props.sessionId)
    //     }
    // })
    // useAutoEffect(() => {
    //     if (isRealStream && isGetImageIndex === props.index) {
    //         if (storeImage) {
    //             console.log('HERE IS AN IMAGE')
    //             console.log('image', storeImage.length)
    //             setIsGetImageIndex(undefined)
    //             setImage(storeImage)
    //         } else {
    //             setSessionId(props.sessionId)
    //         }
    //     }
    // })
    // useAutoEffect(() => {
    //     if (isRealStream && isGetImageIndex === props.index) {
    //         if (storeImage) {
    //             console.log('HERE IS AN IMAGE')
    //             console.log('image', storeImage.length)
    //             setIsGetImageIndex(undefined)
    //             setImage(storeImage)
    //         } else {
    //             setSessionId(props.sessionId)
    //         }
    //     }
    // })

    let stream = useStoreState((state) => state.feed.getStream(props.sessionId))
    let nViews = useAutoMemo(() => Math.floor(Math.random() * 1000))

    let image = stream?.image ? `data:image/png;base64,${stream?.image}` : images[props.index]
    let title = useAutoMemo(() => faker.lorem.sentence())
    title = stream?.name ?? title
    // image = isRealStream ? image && `data:image/png;base64,${image}` : images[props.index - props.liveLen]

    return (
        // <Link href={`/inbound-stream?image=${image}`}>
        <Link href={`/inbound-stream?sessionId=${props.sessionId}`}>
            <a>
                <Box h='198px' bg='#4F4F4F' pos='relative' overflow='hidden' d='flex' justifyContent='center'>
                    <Views p='3px' d='flex' pos='absolute' top='15px' left='15px'>
                        <Box mr='3px'>
                            <Box as={Eye} />
                        </Box>
                        {nViews}
                    </Views>

                    {image && <Image h='full' w={(!stream && 'full') || undefined} src={image} />}
                </Box>
                <Box d='flex' alignItems='center' mt='11px'>
                    <Box mr='15px' ml='3px'>
                        <Box as={Head} />
                    </Box>
                    {title}
                    {/* {isRealStream ? streamName : title} */}
                </Box>
            </a>
        </Link>
    )
})

export function List() {
    const parentRef = useRef()

    let { data, isLoading, error } = useQuery<ApiFeedAllResult, string>(
        'feed',
        () => wretch('/api/feed/all').post().json(),
        {
            refetchInterval: 1000,
        }
    )

    console.log('data', data)

    if (data) {
        data.sessions = data.sessions.sort((a, b) => (a.id < b.id ? 1 : -1))
    }

    let liveLen = data?.sessions.length ?? 0
    const rowVirtualizer = useVirtual({
        size: liveLen + images.length,
        parentRef,
        estimateSize: useAutoCallback(() => 280),
        overscan: 5,
    })

    // This logic intended to render Element/Subscribe component one at a time
    let reset = useStoreActions((actions) => actions.feed.reset)
    let nextIndex = useStoreActions((actions) => actions.feed.nextIndex)
    // const [fetchImageIndex, setFetchImageIndex] = useState(0, 'setFetchImageIndex')
    // const [saveFetchImageIndex, setSaveFetchImageIndex] = useState(0, 'setSaveFetchImageIndex')
    // let onImageSet = useAutoCallback(() => {
    //     // setTimeout(() => setFetchImageIndex(fetchImageIndex >= len - 1 ? 0 : fetchImageIndex + 1), 2000)
    //     setFetchImageIndex(-1) // unmount Subscriber
    // })

    // Mount next Subscriber in order to read snapshot
    // useUnmount(() => {
    // reset()
    // })
    useAutoEffect(() => {
        let intRef = setInterval(() => nextIndex(), 500)
        return () => {
            clearInterval(intRef)
        }
    })
    // useAutoEffect(() => {
    //     if (fetchImageIndex >= len) {
    //         setFetchImageIndex(0)
    //     }
    // })

    return (
        <Container ref={parentRef} w='full' h='full'>
            <Box h={`${rowVirtualizer.totalSize}px`} width='full' pos='relative'>
                {rowVirtualizer.virtualItems.map((virtualRow) => {
                    return (
                        <Box
                            key={virtualRow.index}
                            position='absolute'
                            top={0}
                            left={0}
                            width='full'
                            height={`${virtualRow.size}px`}
                            transform={`translateY(${virtualRow.start}px)`}
                        >
                            <Element
                                index={virtualRow.index}
                                sessionId={data?.sessions?.[virtualRow.index]?.id ?? data?.sessions?.[0]?.id}
                                // liveLen={liveLen}
                            />
                        </Box>
                    )
                })}
            </Box>
        </Container>
    )
}

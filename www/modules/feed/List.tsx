import { memo, useRef, useCallback, FC, useEffect } from 'react'
import { useState } from 'reinspect'
import { Box, Text, Button, Collapse, Icon, Image } from '@chakra-ui/core'
import { useAutoCallback, useAutoMemo, useAutoEffect } from 'hooks.macro'
import { useVirtual } from 'react-virtual'
import Link from 'next/link'
import faker from 'faker'
import wretch from 'wretch'
import { useMutation, useQuery } from 'react-query'

import { withDataId } from '~/utils'
import { font10, font16 } from '~/styles/fonts'
import { Head } from '~/svg/Head'
import { Eye } from '~/svg/Eye'
import { OT } from '~/pages/_app'
import Subscribe from '~/modules/stream/subscribe'

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

const Element: FC<{
    index: number
    sessionId: string
    fetchImageIndex: number
    onImageSet: (index: number) => void
}> = memo(({ index, sessionId, fetchImageIndex, onImageSet }) => {
    let nViews = useAutoMemo(() => Math.floor(Math.random() * 1000))
    let title = useAutoMemo(() => faker.lorem.sentence())
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

    const [image, setImage] = useState(undefined, `setImage at index ${index}`)
    let onImage = useAutoCallback((_image) => {
        console.log('HERE IS AN IMAGE')
        setImage(_image)
        onImageSet(index)
    })
    console.log('index', index)
    console.log('fetchImageIndex', fetchImageIndex)
    console.log('fetchImageIndex === index', fetchImageIndex === index)
    return (
        // <Link href={`/inbound-stream?image=${image}`}>
        <Link href={`/inbound-stream?sessionId=${sessionId}`}>
            <a>
                <Box h='199px' bg='#4F4F4F' pos='relative' overflow='hidden'>
                    <Views p='3px' d='flex' pos='absolute' top='15px' left='15px'>
                        <Box mr='3px'>
                            <Box as={Eye} />
                        </Box>
                        {nViews}
                    </Views>
                    {fetchImageIndex === index && <Subscribe sessionId={sessionId} onImage={onImage} />}
                    {image && <Image w='100%' src={`data:image/png;base64,${image}`} />}
                </Box>
                <Box d='flex' alignItems='center' mt='11px'>
                    <Box mr='15px' ml='3px'>
                        <Box as={Head} />
                    </Box>
                    {title}
                </Box>
            </a>
        </Link>
    )
})

export function List() {
    const parentRef = useRef()

    let { data, isLoading, error } = useQuery('feed', () => wretch('/api/feed/all').post().json(), {
        refetchInterval: 5000,
    })
    console.log('data', data)

    let len = data?.sessions.length ?? 0
    const rowVirtualizer = useVirtual({
        size: len,
        parentRef,
        estimateSize: useAutoCallback(() => 280),
        overscan: 5,
    })

    // This logic intended to render Element/Subscribe component one at a time
    const [fetchImageIndex, setFetchImageIndex] = useState(0, 'setFetchImageIndex')
    let onImageSet = useAutoCallback((_image) => {
        setTimeout(() => setFetchImageIndex(fetchImageIndex >= len - 1 ? 0 : fetchImageIndex + 1), 2000)
        setFetchImageIndex(-1)
    })
    useAutoEffect(() => {
        if (fetchImageIndex >= len) {
            setTimeout(() => setFetchImageIndex(0), 2000)
        }
    })

    return (
        <Container ref={parentRef} w='full' h='full'>
            <Box h={`${rowVirtualizer.totalSize}px`} width='full' pos='relative'>
                {rowVirtualizer.virtualItems.map((virtualRow) => {
                    let id = data?.sessions[virtualRow.index].id
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
                                sessionId={id}
                                fetchImageIndex={fetchImageIndex}
                                onImageSet={onImageSet}
                            />
                        </Box>
                    )
                })}
            </Box>
        </Container>
    )
}

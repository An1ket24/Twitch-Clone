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

const Element = memo((props: { index: number; sessionId?: string }) => {
    let stream = useStoreState((state) => state.feed.getStream(props.sessionId))
    let nViews = useAutoMemo(() => Math.floor(Math.random() * 1000))

    let image = stream?.image ? `data:image/png;base64,${stream?.image}` : images[props.index]
    let title = useAutoMemo(() => faker.lorem.sentence())
    title = stream?.name ?? title

    return (
        <Link href={props.sessionId ? `/inbound-stream?sessionId=${props.sessionId}` : ''}>
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

    let nextIndex = useStoreActions((actions) => actions.feed.nextIndex)
    useAutoEffect(() => {
        let intRef = setInterval(() => nextIndex(), 500)
        return () => {
            clearInterval(intRef)
        }
    })

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
                            />
                        </Box>
                    )
                })}
            </Box>
        </Container>
    )
}

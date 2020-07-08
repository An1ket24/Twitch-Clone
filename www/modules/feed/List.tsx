import { useRef, useCallback, FC } from 'react'
import { useState } from 'reinspect'
import { Box, Text, Button, Collapse, Icon, Image } from '@chakra-ui/core'
import { useAutoCallback, useAutoMemo, useAutoEffect } from 'hooks.macro'
import { useVirtual } from 'react-virtual'
import Link from 'next/link'
import faker from 'faker'

import { withDataId } from '~/utils'
import { font10, font16 } from '~/styles/fonts'
import { Head } from '~/svg/Head'
import { Eye } from '~/svg/Eye'

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

const Element: FC<{ index: number }> = ({ index }) => {
    let nViews = useAutoMemo(() => Math.floor(Math.random() * 1000))
    let title = useAutoMemo(() => faker.lorem.sentence())
    let image = useAutoMemo(images[index % images.length])

    return (
        // <Link href={`/inbound-stream?image=${image}`}>
        <Link href='/inbound-stream'>
            <a>
                <Box h='199px' bg='#4F4F4F' pos='relative' overflow='hidden'>
                    <Views p='3px' d='flex' pos='absolute' top='15px' left='15px'>
                        <Box mr='3px'>
                            <Box as={Eye} />
                        </Box>
                        {nViews}
                    </Views>
                    <Image w='100%' src={image} />
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
}

export function List() {
    const parentRef = useRef()

    const rowVirtualizer = useVirtual({
        size: 30,
        parentRef,
        estimateSize: useAutoCallback(() => 280),
        overscan: 5,
    })

    return (
        <Container ref={parentRef} w='full' h='full'>
            <Box h={`${rowVirtualizer.totalSize}px`} width='full' pos='relative'>
                {rowVirtualizer.virtualItems.map((virtualRow) => (
                    <Box
                        key={virtualRow.index}
                        position='absolute'
                        top={0}
                        left={0}
                        width='full'
                        height={`${virtualRow.size}px`}
                        transform={`translateY(${virtualRow.start}px)`}
                    >
                        <Element index={virtualRow.index} />
                    </Box>
                ))}
            </Box>
        </Container>
    )
}

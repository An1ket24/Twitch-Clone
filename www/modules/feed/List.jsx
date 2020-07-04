import { useRef, useCallback } from 'react'
import { useState } from 'reinspect'
import { Box, Text, Button, Collapse, Icon } from '@chakra-ui/core'
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

const Element = () => {
    let nViews = useAutoMemo(() => Math.floor(Math.random() * 1000))
    let title = useAutoMemo(() => faker.lorem.sentence())

    return (
        <Link href='/stream'>
            <a>
                <Box h='199px' bg='#4F4F4F' pos='relative'>
                    <Views p='3px' d='flex' pos='absolute' top='15px' left='15px'>
                        <Box mr='3px'>
                            <Box as={Eye} />
                        </Box>
                        {nViews}
                    </Views>
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
        size: 10000,
        parentRef,
        estimateSize: useAutoCallback(() => 285),
        overscan: 5,
    })

    return (
        <Container ref={parentRef} w='full' h='full' overflow='auto'>
            <div
                style={{
                    height: `${rowVirtualizer.totalSize}px`,
                    width: '100%',
                    position: 'relative',
                }}
            >
                {rowVirtualizer.virtualItems.map((virtualRow) => (
                    <div
                        key={virtualRow.index}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: `${virtualRow.size}px`,
                            transform: `translateY(${virtualRow.start}px)`,
                        }}
                    >
                        <Element />
                    </div>
                ))}
            </div>
        </Container>
    )
}

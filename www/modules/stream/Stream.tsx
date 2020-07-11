import { useEffect, FC } from 'react'
import { useUnmount } from 'react-use'
import { useState } from 'reinspect'
import { Divider, Image, Box, Text, IconButton, Collapse, Icon } from '@chakra-ui/core'
import { BsChevronLeft } from 'react-icons/bs'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useStoreState, useStoreActions } from '~/store/store'
import { useAutoCallback, useAutoMemo, useAutoEffect } from 'hooks.macro'

import { NewMessage } from './NewMessage'
import { Panel } from './Panel'
import { ChatList } from './ChatList'
import Subscribe from '~/modules/stream/subscribe'
import Publish from '~/modules/stream/publish'

let xPadding = '13px'

export const Stream: FC<{ outbound?: boolean }> = ({ outbound }) => {
    let connected = useStoreState((state) => state.stream.connected)
    let publishing = useStoreState((state) => state.stream.publishing)

    return (
        <Box data-id='Stream' pb='57px' d='flex' flexDir='column' w='100%'>
            <Box pos='fixed' top={0} w='100%' maxW='450px' bg='white' boxShadow='0px 3px 4px rgba(0, 0, 0, 0.25)'>
                <Box pos='relative' minH='200px' bg='black'>
                    <Link href='/'>
                        <IconButton
                            zIndex={100}
                            top='14px'
                            left='0px'
                            pos='absolute'
                            aria-label='Back to Feed'
                            icon={BsChevronLeft}
                            fontSize='50px'
                            variant='ghost'
                            color='gray.300'
                        />
                    </Link>
                    {outbound ? publishing && <Publish /> : <Subscribe />}
                </Box>
                <Box px={xPadding}>
                    <Panel outbound={outbound} />
                </Box>
            </Box>

            <Box px={xPadding} flex={1} w='100%' maxW='450px'>
                {connected && <ChatList />}
            </Box>
            <Box
                px={xPadding}
                boxShadow='0px -2px 4px rgba(0, 0, 0, 0.15)'
                pos='fixed'
                bg='white'
                bottom='0'
                w='100%'
                maxW='450px'
            >
                <NewMessage />
            </Box>
        </Box>
    )
}

// boxShadow='inset 0px 3px 4px -2px rgba(0, 0, 0, 0.25)'
// let router = useRouter()
// let image = (router.query.image as string) ?? 'video.jpg'
{
    /* <Image w='full' src={image} /> */
}

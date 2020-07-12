import { useEffect, FC } from 'react'
import { useUpdateEffect } from 'react-use'
import { useState } from 'reinspect'
import { Divider, Image, Box, Text, IconButton, Collapse, Icon } from '@chakra-ui/core'
import { useRouter } from 'next/router'
import { useStoreState, useStoreActions } from '~/store/store'
import { useAutoCallback, useAutoMemo, useAutoEffect } from 'hooks.macro'

import { NewMessage } from './NewMessage'
import { Panel } from './Panel'
import { ChatList } from './ChatList'
import Subscribe from '~/modules/stream/subscribe'
import Publish from '~/modules/stream/publish'
import { BackLink } from '~/modules/stream/BackLink'

let xPadding = '13px'

export const Stream = () => {
    let connected = useStoreState((state) => state.stream.connected)
    let storeSessionId = useStoreState((state) => state.stream.sessionId)
    let publishing = useStoreState((state) => state.stream.publishing)
    let router = useRouter()
    let reset = useStoreActions((actions) => actions.stream.reset)

    let outbound = router.route === '/outbound-stream'
    let inbound = router.route === '/inbound-stream'
    // Differentiate whether mount only for snapshot or mount as a stream
    let serviceRender = !outbound && !inbound

    let sessionId = router.query.sessionId || storeSessionId
    useUpdateEffect(() => {
        return () => reset()
    }, [reset, sessionId])
    console.log('Stream')

    return (
        <Box
            data-id='Stream'
            // d='flex'
            flexDir='column'
            pb={serviceRender ? undefined : '57px'}
            d={serviceRender ? 'none' : 'flex'}
            w={serviceRender ? 0 : '100%'}
            h={serviceRender ? 0 : undefined}
            pos='relative'
        >
            <Box pos='absolute' top={0} w='100%' maxW='450px' bg='white' boxShadow='0px 3px 4px rgba(0, 0, 0, 0.25)'>
                <Box pos='relative' h='198px' bg='black'>
                    {!serviceRender && <BackLink />}
                    {outbound ? publishing && <Publish /> : sessionId && <Subscribe />}
                </Box>
                {!serviceRender && (
                    <Box px={xPadding}>
                        <Panel outbound={outbound} />
                    </Box>
                )}
            </Box>

            {!serviceRender && (
                <>
                    <Box px={xPadding} flex={1} w='100%' maxW='450px'>
                        {(inbound || (outbound && connected)) && <ChatList />}
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
                </>
            )}
        </Box>
    )
}

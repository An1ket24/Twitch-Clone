import { useEffect, FC } from 'react'
import { useUpdateEffect } from 'react-use'
import { useState } from 'reinspect'
import { Divider, Image, Box, Text, IconButton, Collapse, Icon } from '@chakra-ui/core'
import { useRouter } from 'next/router'
import { useStoreState, useStoreActions } from '~/store/store'
import { useAutoCallback, useAutoMemo, useAutoEffect } from 'hooks.macro'
import { useDelta, useConditionalEffect } from 'react-delta'

import { Panel } from './Panel'
import Subscribe from './subscribe'
import { BackLink } from '../BackLink'
import {
    StreamPanelContainer,
    StreamVideoContainer,
    StreamContainer,
    StreamTopContainer,
    StreamChat,
} from '../StreamComponents'

export const Inbound = () => {
    let sessionId = useStoreState((state) => state.stream.inbound.sessionId)
    let setSessionId = useStoreActions((actions) => actions.stream.inbound.setSessionId)

    // Differentiate whether mount only for snapshot or mount as a stream
    let router = useRouter()
    let serviceRender = router.route === '/'

    const deltaRouterSessionId = useDelta(router.query.sessionId)
    useConditionalEffect(
        () => setSessionId(router.query.sessionId as string),
        !!deltaRouterSessionId && !!deltaRouterSessionId.curr && deltaRouterSessionId.curr !== sessionId
    )

    console.log('Stream sessionId', sessionId)
    return (
        <StreamContainer {...(serviceRender ? { d: 'none', w: 0, h: 0 } : {})}>
            <StreamTopContainer>
                <StreamVideoContainer>
                    {!serviceRender && <BackLink />}
                    {sessionId && <Subscribe serviceRender={serviceRender} />}
                </StreamVideoContainer>
                {!serviceRender && (
                    <StreamPanelContainer>
                        <Panel />
                    </StreamPanelContainer>
                )}
            </StreamTopContainer>

            {!serviceRender && <StreamChat />}
        </StreamContainer>
    )
}

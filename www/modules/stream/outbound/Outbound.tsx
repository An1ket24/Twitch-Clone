import { useEffect, FC } from 'react'
import { useUpdateEffect } from 'react-use'
import { useState } from 'reinspect'
import { Divider, Image, Box, Text, IconButton, Collapse, Icon } from '@chakra-ui/core'
import { useRouter } from 'next/router'
import { useStoreState, useStoreActions } from '~/store/store'
import { useAutoCallback, useAutoMemo, useAutoEffect } from 'hooks.macro'
import { useDelta, useConditionalEffect } from 'react-delta'

import { Panel } from './Panel'
import Publish from './publish'
import { BackLink } from '../BackLink'
import {
    StreamPanelContainer,
    StreamVideoContainer,
    StreamContainer,
    StreamTopContainer,
    StreamChat,
} from '../StreamComponents'

export const OutBound = () => {
    let publishing = useStoreState((state) => state.stream.outbound.publishing)
    let resetOutbound = useStoreActions((actions) => actions.stream.inbound.reset)

    let router = useRouter()
    let outbound = router.route === '/outbound-stream'
    useConditionalEffect(() => resetOutbound(), !!useDelta(outbound))

    return (
        <StreamContainer>
            <StreamTopContainer>
                <StreamVideoContainer>
                    <BackLink />
                    {publishing && <Publish />}
                </StreamVideoContainer>
                <StreamPanelContainer>
                    <Panel />
                </StreamPanelContainer>
            </StreamTopContainer>

            <StreamChat />
        </StreamContainer>
    )
}

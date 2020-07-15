import { FC } from 'react'
import { Box, BoxProps, Text, Button, Collapse, Icon } from '@chakra-ui/core'
import { useAutoCallback, useAutoMemo, useAutoEffect } from 'hooks.macro'
import { useState } from 'reinspect'
import { useStoreState, useStoreActions } from '~/store/store'

import { PanelContainer, PanelLeft, PanelButton, PanelRight } from '~/modules/stream/PanelComponents'

export const Panel: FC = () => {
    let publishing = useStoreState((state) => state.stream.outbound.publishing)
    let togglePublishing = useStoreActions((actions) => actions.stream.outbound.togglePublishing)
    let handleClick = useAutoCallback(() => togglePublishing())

    return (
        <PanelContainer>
            <PanelLeft />
            <PanelRight>
                <PanelButton w='180px' onClick={handleClick}>
                    {publishing ? 'Stop publishing' : 'Publish'}
                </PanelButton>
            </PanelRight>
        </PanelContainer>
    )
}

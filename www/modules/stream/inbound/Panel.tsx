import { FC } from 'react'
import { Box, BoxProps, Text, Button, Collapse, Icon } from '@chakra-ui/core'
import { useAutoCallback, useAutoMemo, useAutoEffect } from 'hooks.macro'
import { useState } from 'reinspect'
import { useStoreState, useStoreActions } from '~/store/store'

import { PanelContainer, PanelLeft, PanelButton, PanelGift, PanelRight } from '~/modules/stream/PanelComponents'

export const Panel: FC = () => {
    let sendGift = useStoreActions((actions) => actions.stream.sendGift)
    let handleClick = useAutoCallback(() => sendGift())

    return (
        <PanelContainer>
            <PanelLeft />
            <PanelRight>
                <PanelGift />
                <PanelButton w='72px' onClick={handleClick}>
                    'Go!'
                </PanelButton>
            </PanelRight>
        </PanelContainer>
    )
}

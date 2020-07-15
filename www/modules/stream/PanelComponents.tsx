import { FC, Children } from 'react'
import { Box, BoxProps, Text, Button, ButtonProps, Collapse, Icon } from '@chakra-ui/core'
import { useAutoCallback, useAutoMemo, useAutoEffect } from 'hooks.macro'
import { useState } from 'reinspect'
import { useStoreState, useStoreActions } from '~/store/store'

import { font20, font18 } from '~/styles/fonts'
import { User, Gift } from '~/svg'

export const PanelContainer: FC = ({ children }) => {
    return (
        <Box data-id='Panel' d='flex' alignItems='center' pt='9px' pb='9px'>
            {children}
        </Box>
    )
}
export const PanelLeft: FC = () => {
    return (
        <Box mr='4px'>
            <Box {...font18}>Live chat</Box>
            <Box d='flex' alignItems='baseline'>
                <User />
                <Box ml='6px' mt='1px' {...font18} lineHeight='21px' color='#606060'>
                    5K
                </Box>
            </Box>
        </Box>
    )
}
export const PanelGift: FC = () => {
    return (
        <>
            <Gift />
            <Box ml='11px' mr='11px' color='#4B4B4B' {...font18} fontWeight='bold'>
                'Give a Free Gift'
            </Box>
        </>
    )
}

export const PanelButton: FC<{ onClick: () => void } & ButtonProps> = ({ onClick, children, ...props }) => {
    let handleClick = useAutoCallback(() => onClick())

    return (
        <Button
            {...font20}
            fontWeight='bold'
            color='white'
            bg='#DF2080'
            borderRadius='3px'
            h='38px'
            {...props}
            onClick={handleClick}
        >
            {children}
        </Button>
    )
}

import { useEffect, FC } from 'react'
import { useUpdateEffect } from 'react-use'
import { useState } from 'reinspect'
import { Divider, Image, Box, Text, IconButton, Collapse, Icon, BoxProps } from '@chakra-ui/core'
import { useRouter } from 'next/router'
import { useStoreState, useStoreActions } from '~/store/store'
import { useAutoCallback, useAutoMemo, useAutoEffect } from 'hooks.macro'
import { useDelta, useConditionalEffect } from 'react-delta'

import { NewMessage } from './NewMessage'
import { ChatList } from './ChatList'

let xPadding = '13px'

export const StreamContainer: FC<BoxProps> = ({ children, ...props }) => {
    return (
        <Box data-id='Stream' flexDir='column' pb='57px' d='flex' w='100%' pos='fixed' {...props}>
            {children}
        </Box>
    )
}

export const StreamChat: FC = ({ children, ...props }) => {
    return (
        <>
            <Box px={xPadding} flex={1} w='100%' maxW='450px'>
                <ChatList />
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
    )
}

export const StreamTopContainer: FC<BoxProps> = ({ children, ...props }) => {
    return (
        <Box w='100%' maxW='450px' bg='white' boxShadow='0px 3px 4px rgba(0, 0, 0, 0.25)' {...props}>
            {children}
        </Box>
    )
}

export const StreamVideoContainer: FC<BoxProps> = ({ children, ...props }) => {
    return (
        <Box pos='relative' h='198px' bg='black' {...props}>
            {children}
        </Box>
    )
}

export const StreamPanelContainer: FC<BoxProps> = ({ children, ...props }) => {
    return (
        <Box px={xPadding} {...props}>
            {children}
        </Box>
    )
}

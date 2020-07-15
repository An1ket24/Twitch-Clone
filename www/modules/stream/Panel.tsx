import { FC } from 'react'
import { Box, BoxProps, Text, Button, Collapse, Icon } from '@chakra-ui/core'
import { useAutoCallback, useAutoMemo, useAutoEffect } from 'hooks.macro'
import { useState } from 'reinspect'
import { useStoreState, useStoreActions } from '~/store/store'

import { font20, font18 } from '~/styles/fonts'
import { User, Gift } from '~/svg'

export const Panel: FC<{ outbound?: boolean }> = ({ outbound }) => {
    let publishing = useStoreState((state) => state.stream.publishing)
    let togglePublishing = useStoreActions((actions) => actions.stream.togglePublishing)
    let sendGift = useStoreActions((actions) => actions.stream.sendGift)
    let handleClick = useAutoCallback(() => (outbound ? togglePublishing() : sendGift()))

    return (
        <Box data-id='Panel' d='flex' alignItems='center' pt='9px' pb='9px'>
            <Box mr='4px'>
                <Box {...font18}>Live chat</Box>
                <Box d='flex' alignItems='baseline'>
                    <User />
                    <Box ml='6px' mt='1px' {...font18} lineHeight='21px' color='#606060'>
                        5K
                    </Box>
                </Box>
            </Box>
            <Box ml='auto' d='flex' alignItems='center'>
                {!outbound && (
                    <>
                        <Gift />
                        <Box ml='11px' mr='11px' color='#4B4B4B' {...font18} fontWeight='bold'>
                            'Give a Free Gift'
                        </Box>
                    </>
                )}
                <Button
                    {...font20}
                    fontWeight='bold'
                    color='white'
                    variantColor='publishButton'
                    // bg='#DF2080'
                    borderRadius='3px'
                    w={outbound ? '180px' : '72px'}
                    h='38px'
                    onClick={handleClick}
                >
                    {outbound ? (publishing ? 'Stop publishing' : 'Publish') : 'Go!'}
                </Button>
            </Box>
        </Box>
    )
}

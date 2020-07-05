import { FC } from 'react'
import { Box, BoxProps, Text, Button, Collapse, Icon } from '@chakra-ui/core'
import { useAutoCallback, useAutoMemo, useAutoEffect } from 'hooks.macro'
import { useState } from 'reinspect'

import { font16 } from '~/styles/fonts'
import { Send, Smiley } from '~/svg'

export function NewMessage() {
    return (
        <Box data-id='NewMessage' d='flex' alignItems='center' py='15px'>
            <Smiley />
            <Box ml='14px' {...font16} color='#A8A8A8'>
                Chat publicly as George Z...
            </Box>
            <Box ml='auto'>
                <Send />
            </Box>
        </Box>
    )
}

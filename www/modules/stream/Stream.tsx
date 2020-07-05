import { Divider, Image, Box, Text, IconButton, Collapse, Icon } from '@chakra-ui/core'
import { BsChevronLeft } from 'react-icons/bs'
import Link from 'next/link'

import { NewMessage } from './NewMessage'
import { Panel } from './Panel'
import { ChatList } from './ChatList'
import { Send, Smiley } from '~/svg'

let xPadding = '13px'

export function Stream() {
    return (
        <Box data-id='Stream' h='100vh' pb='57px' d='flex' flexDir='column'>
            <Box pos='relative'>
                <Link href='/'>
                    <IconButton
                        top='20px'
                        left='0px'
                        pos='absolute'
                        aria-label='Back to Feed'
                        icon={BsChevronLeft}
                        fontSize='50px'
                        variant='ghost'
                        color='gray.300'
                    />
                </Link>
                <Image w='full' src='video.jpg' />
            </Box>
            <Box px={xPadding}>
                <Panel />
            </Box>

            <Box px={xPadding} flex={1} boxShadow='inset 0px 3px 4px -2px rgba(0, 0, 0, 0.25)' overflow='hidden'>
                <ChatList />
            </Box>
            <Box
                px={xPadding}
                boxShadow='0px -2px 4px rgba(0, 0, 0, 0.15)'
                pos='fixed'
                bg='white'
                // zIndex={100}
                bottom='0'
                w='100%'
                maxW='450px'
            >
                <NewMessage />
            </Box>
        </Box>
    )
}

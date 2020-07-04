import { Divider, Image, Box, Text, IconButton, Collapse, Icon } from '@chakra-ui/core'
import { BsChevronLeft } from 'react-icons/bs'
import Link from 'next/link'

import { NewMessage } from './NewMessage'
import { Panel } from './Panel'
import { ChatList } from './ChatList'
import { Send, Smiley } from '~/svg'

let xPadding = '18px'

export function Stream() {
    return (
        <Box data-id='Stream' h='100vh' pb='95px' d='flex' flexDir='column'>
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
            <Box px={xPadding} boxShadow='0px 3px 4px rgba(0, 0, 0, 0.25)'>
                <Panel />
            </Box>

            <Box px={xPadding} mt='10px' flex={1} overflow='hidden'>
                <ChatList />
            </Box>
            <Box
                px={xPadding}
                boxShadow='0px -2px 4px rgba(0, 0, 0, 0.15)'
                pos='fixed'
                bottom='0'
                w='100%'
                maxW='500px'
            >
                <NewMessage />
            </Box>
        </Box>
    )
}

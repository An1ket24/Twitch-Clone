import { Divider, Image, Box, Text, IconButton, Collapse, Icon } from '@chakra-ui/core'
import { BsChevronLeft } from 'react-icons/bs'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { NewMessage } from './NewMessage'
import { Panel } from './Panel'
import { ChatList } from './ChatList'
import Subscribe from '~/pages/subscribe'

let xPadding = '13px'

export function Stream() {
    let router = useRouter()
    let image = (router.query.image as string) ?? 'video.jpg'

    return (
        <Box data-id='Stream' pb='57px' d='flex' flexDir='column' w='100%' maxW='450px' bg='white'>
            <Box pos='fixed' top={0} w='100%' maxW='450px' bg='white ' boxShadow='0px 3px 4px rgba(0, 0, 0, 0.25)'>
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
                    <Subscribe properties={{ width: '100%' }} />
                    {/* <Image w='full' src={image} /> */}
                </Box>
                <Box px={xPadding}>
                    <Panel />
                </Box>
            </Box>

            <Box px={xPadding} flex={1} w='100%' maxW='450px'>
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

// boxShadow='inset 0px 3px 4px -2px rgba(0, 0, 0, 0.25)'

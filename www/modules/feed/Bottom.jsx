import { List } from './FeedList'
import { Avatar, Divider, Box, Text, Button, Collapse, Icon, IconButton } from '@chakra-ui/core'
import { Tags } from './Tags'
import Link from 'next/link'

import { font36, fontRoboto } from '~/styles/fonts'
import { House, Troffee, Star, Svg123, CameraTriangle, CameraSquare } from '~/svg'

export function Bottom() {
    return (
        <Box
            data-id='Bottom'
            d='flex'
            justifyContent='space-between'
            alignItems='center'
            {...font36}
            pl='8px'
            pr='18px'
        >
            <House />
            <Svg123 />
            <Link href='/outbound-stream'>
                <Box bg='white' pos='relative' rounded='full' size='65px' bottom='22px' d='flex'>
                    <Button aria-label='publish stream' variant='ghost' h='4em' w='4.1em' p={0}>
                        <Box bg='#DF2080' pos='relative' rounded='full' size='56px' m='auto'>
                            <Box left='30px' top='13px' pos='absolute'>
                                <CameraTriangle />
                            </Box>
                            <Box left='6px' top='15px' pos='absolute'>
                                <CameraSquare />
                            </Box>
                        </Box>
                    </Button>
                </Box>
            </Link>
            <Star />
            <Troffee />
        </Box>
    )
}

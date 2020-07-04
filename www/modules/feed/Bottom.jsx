import { List } from './List'
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
            <Box bg='white' pos='relative' rounded='full' size='65px' bottom='22px' d='flex'>
                <Box bg='#DF2080' pos='relative' rounded='full' size='56px' m='auto'>
                    <Box left='30px' top='13px' pos='absolute'>
                        <CameraTriangle />
                    </Box>
                    <Box left='6px' top='15px' pos='absolute'>
                        <CameraSquare />
                    </Box>
                </Box>
            </Box>
            <Star />
            <Link href='/stream'>
                <IconButton icon={Troffee} variant='ghost' />
            </Link>
        </Box>
    )
}

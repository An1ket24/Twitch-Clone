import { Divider, Image, Box, Text, IconButton, Collapse, Icon } from '@chakra-ui/core'
import { BsChevronLeft } from 'react-icons/bs'
import Link from 'next/link'

export const BackLink = () => {
    return (
        <Link href='/'>
            <IconButton
                zIndex={100}
                top='14px'
                left='0px'
                pos='absolute'
                aria-label='Back to Feed'
                icon={BsChevronLeft}
                fontSize='50px'
                variant='ghost'
                color='gray.300'
            />
        </Link>
    )
}

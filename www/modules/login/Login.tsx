import React from 'react'
import { useAutoCallback, useAutoMemo, useAutoEffect } from 'hooks.macro'
import { useState } from 'reinspect'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Input,
    Box,
} from '@chakra-ui/core'
import { Password } from './Password'

import { font18 } from '~/styles/fonts'

export const Login = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [value, setValue] = useState('', 'setPasswordValue')
    let handleChange = useAutoCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    })
    let handleSubmit = useAutoCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log('submitting', value)
    })

    useAutoEffect(() => {
        onOpen()
    })

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent rounded='3px' maxW='350px' pt='10px'>
                <form onSubmit={handleSubmit}>
                    {/* <ModalHeader {...font18} fontWeight='bold'>
                        Sign In
                    </ModalHeader> */}
                    {/* <ModalCloseButton /> */}
                    <ModalBody>
                        <Box d='flex' alignItems='flex-end  '>
                            <Password label='Password' value={value} onChange={handleChange} />
                            <Button variantColor='orange' ml={5} type='submit'>
                                Sign In
                            </Button>
                        </Box>
                    </ModalBody>

                    <ModalFooter />
                </form>
            </ModalContent>
        </Modal>
    )
}

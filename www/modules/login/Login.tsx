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
            <ModalContent rounded='3px' w='350px'>
                <form onSubmit={handleSubmit}>
                    <ModalHeader {...font18} fontWeight='bold'>
                        Sign In
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Password label='Password' value={value} onChange={handleChange} />
                    </ModalBody>

                    <ModalFooter>
                        <Button variantColor='orange' mr={3} type='submit'>
                            Submit
                        </Button>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    )
}

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
import { useStoreActions } from '~/store/hooks'

const DEV_PASSWORD = '1'

console.log('process.env.NODE_ENV', process.env.NODE_ENV)
console.log('process.env.PASSWORD', process.env.PASSWORD)

export const Login = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [value, setValue] = useState('', 'setPasswordValue')
    const [error, setError] = useState('', 'setError')
    let setAuth = useStoreActions((state) => state.setAuth)

    let handleChange = useAutoCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    })
    let handleSubmit = useAutoCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log('submitting', value)
        if (process.env.NODE_ENV === 'production' ? value === process.env.PASSWORD : value === DEV_PASSWORD) {
            setAuth(true)
        } else {
            setError('Wrong password')
        }
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
                            <Password label='Password' error={error} value={value} onChange={handleChange} />
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
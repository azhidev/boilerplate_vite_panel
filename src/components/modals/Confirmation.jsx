import {
    Button,
    Modal,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay
} from '@chakra-ui/react';
import React from 'react';

function Confirmation({ isOpen, onClose, handlerDelete, confirmationText }) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered motionPreset='slideInBottom'>
            <ModalOverlay />
            <ModalContent dir='rtl'>
                <ModalHeader>{confirmationText || "آیا اطمینان دارید؟"}</ModalHeader>
                <ModalCloseButton />
                <ModalFooter>
                    <Button onClick={handlerDelete} colorScheme='blue' me={3}>بله</Button>
                    <Button onClick={onClose}>بستن</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default Confirmation
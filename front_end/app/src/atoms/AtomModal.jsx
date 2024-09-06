import React from 'react';
import { Modal, KeyboardAvoidingView } from 'react-native';

const AtomModal = ({ children, modalVisible, setModalVisible, ...props }) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(!modalVisible)}
            {...props}
        >
            <KeyboardAvoidingView behavior={"padding"} style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}>
                {children}
            </KeyboardAvoidingView>
        </Modal>
    );
}

export { AtomModal };

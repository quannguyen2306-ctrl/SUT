import { memo, useState } from 'react';
import { View, StyleSheet, Pressable, Platform } from 'react-native';

import {
    T,
    V,
    Modal,
    DefaultButton,
    ________________________Spacer________________________
} from '../../../atoms/Atoms';

import { formatDate } from '../../../middlewares/middlwares';

import DateTimePicker from "@react-native-community/datetimepicker";
import { spacing, global, colors } from '../../../constants/constants';
import { windowWidth } from '../../../context/context';

import Calendar from '../../../../assets/icons/Calendar.svg'

const ChooseTime = ({ date, setDate }) => {
    const [modalVisible, setModalVisible] = useState(false)
    const today = new Date()

    const maximumDate = new Date(today.getFullYear(), today.getMonth() + 2, today.getDate(), today.getHours(), today.getMinutes())

    if (Platform.OS === 'android') {
        return (
            <V>
                <Pressable style={styles.chooseTimeButton} onPress={() => setModalVisible(true)}>
                    <Calendar width={20} height={20} fill={colors.primary} />
                </Pressable>
                {modalVisible === true ?
                    <DateTimePicker
                        value={date}
                        mode={"date"}
                        display='spinner'
                        minimumDate={today}
                        maximumDate={maximumDate}
                        is24Hour={true}
                        minuteInterval={30}
                        onChange={(e, d) => {
                            setDate(d)
                            {
                                Platform.OS === 'android' ?
                                    setModalVisible(false)
                                    : null
                            }
                        }}
                    />
                    : null}
            </V>
        )
    } else {
        return (
            <V>
                <Pressable style={styles.chooseTimeButton} onPress={() => setModalVisible(true)}>
                    <Calendar width={20} height={20} fill={colors.primary} />
                </Pressable>
                <Modal modalVisible={modalVisible} setModalVisible={setModalVisible} animationType="slide">
                    <V style={styles.modal}>
                        <DateTimePicker
                            value={date}
                            mode={"date"}
                            display='spinner'
                            minimumDate={today}
                            maximumDate={maximumDate}
                            is24Hour={true}
                            minuteInterval={30}
                            onChange={(e, d) => {
                                setDate(d)
                                {
                                    Platform.OS === 'android' ?
                                        setModalVisible(false)
                                        : null
                                }
                            }}
                        />

                        <________________________Spacer________________________ h={4} />
                        <DefaultButton onPress={() => setModalVisible(false)}>
                            <V style={{
                                width: windowWidth - spacing.margin * 4,
                                padding: 7,
                                borderRadius: spacing.brS,
                                backgroundColor: colors.primary,
                                ...global.center,
                            }}>
                                <T color='white'>Xong</T>
                            </V>
                        </DefaultButton>
                    </V>
                </Modal>
            </V>
        );
    }
}

const styles = StyleSheet.create({
    modal: {
        backgroundColor: 'white',
        padding: spacing.margin,
        ...global.center,
        ...global.shadow,
        borderRadius: spacing.brS
    },
    chooseTimeButton: {
        borderRadius: 100,
        height: 50,
        width: 50,
        ...global.center,
        ...global.row,
        backgroundColor: '#FDCDD5'
    }
})

export default memo(ChooseTime);

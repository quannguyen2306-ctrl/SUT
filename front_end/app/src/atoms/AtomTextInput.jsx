import { View, StyleSheet, TextInput } from 'react-native';

import { spacing, global, colors } from '../constants/constants';

const AtomTextInput = ({ style, onChangeText, value, ...props }) => {
    return (
        <TextInput style={{ ...styles.searchContainer, ...style }} onChangeText={onChangeText} value={value}  {...props} />
    );
}

const styles = StyleSheet.create({
    searchContainer: {
        backgroundColor: colors.border,
        height: 50,
        borderRadius: spacing.brS,
        ...global.row,
        alignItems: 'center',
        paddingLeft: spacing.margin,
    },
})

export { AtomTextInput };

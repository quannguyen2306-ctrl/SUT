import { Text, StyleSheet } from "react-native";
import { spacing, colors } from "../constants/constants";

const types = {
    1: {
        fontSize: 28,
        fontFamily: 'Inter-Bold',
    },
    2: {
        fontSize: 20,
        fontFamily: 'Inter-Bold',
        marginBottom: spacing.s5
    },
    3: {
        fontSize: 19,
        fontFamily: 'Inter-SemiBold',
        marginBottom: spacing.s5
    },
    4: {
        fontSize: 16.5,
        fontFamily: 'Inter-SemiBold',
        marginBottom: spacing.s5
    },
    5: { // for body text
        fontSize: 14,
        fontFamily: 'Inter-Regular'
    },
    6: {
        fontSize: 12.5,
        fontFamily: 'Inter-Regular',
        color: colors.gray
    },

};


const weights = {
    1: {
        fontFamily: 'Inter-Bold'
    },
    2: {
        fontFamily: 'Inter-SemiBold'
    },
    3: {
        fontFamily: 'Inter-Medium'
    },
    4: {
        fontFamily: 'Inter-Regular'
    },
    5: {
        fontFamily: 'Inter-Light'
    },
};

function AtomText({ children, h, w, style, ...props }) {
    return (
        <Text style={{
            color: colors.text,
            fontFamily: 'Inter-Regular',
            fontSize: 14,
            ...types[h],
            ...weights[w],
            ...props,
            ...style
        }}>
            {children}
        </Text>
    );
}

export { AtomText };

import { View } from "react-native";

import { BaseButton } from "react-native-gesture-handler";

import { spacing, colors } from "../constants/constants";

const AtomButton = ({ children, onPress, ...props }) => {
    return (
        <BaseButton
            onPress={() => {
                onPress();
            }}
            {...props}
            activeOpacity={0.7}
            rippleColor='transparent'
        >
            <View accessible accessibilityRole="button">
                {children}
            </View>
        </BaseButton>
    );
};

const AtomNormalButton = ({ children, onPress, style, rippleColor, ...props }) => {
    return (
        <BaseButton
            onPress={() => {
                onPress();
            }}
            {...props}
            activeOpacity={0.7}
            rippleColor={rippleColor ?? colors.primary}
            style={{ padding: 15, paddingHorizontal: 45, borderRadius: spacing.brS - 5, ...style }}
        >
            <View accessible accessibilityRole="button">
                {children}
            </View>
        </BaseButton>
    );
};

const AtomUnstyledButton = ({ children, onPress, rippleColor, style, ...props }) => {
    return (
        <BaseButton
            onPress={() => {
                onPress();
            }}
            style={{ borderRadius: spacing.brS, ...style }}
            {...props}
            activeOpacity={0.7}
            rippleColor={rippleColor ?? colors.primary}
        >
            <View accessible accessibilityRole="button">
                {children}
            </View>
        </BaseButton>
    );
}

export { AtomButton, AtomNormalButton, AtomUnstyledButton };

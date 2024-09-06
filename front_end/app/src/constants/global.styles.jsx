import { StyleSheet } from "react-native";
import colors from "./colors";

const global = StyleSheet.create({
    rowBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    row: {
        flexDirection: 'row'
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    shadow: {
        shadowColor: "rgba(0, 0, 0, 0.4)",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        elevation: 10,
    },
    border: {
        borderWidth: 0.8,
        borderColor: colors.primary,
    }
});

export default global;

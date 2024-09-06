import { Linking, Platform } from 'react-native';

const openMapsApp = (address) => {

    const encodedAddress = encodeURIComponent(address);
    const scheme = Platform.select({
        ios: 'maps:0,0?q=',
        android: 'geo:0,0?q=',
    });

    const url = Platform.select({
        ios: `${scheme}${encodedAddress}`,
        android: `${scheme}${encodedAddress}`,
    });

    Linking.openURL(url);
};

export default openMapsApp;

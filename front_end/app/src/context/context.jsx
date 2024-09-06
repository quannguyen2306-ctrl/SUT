import { ApolloClient, InMemoryCache, } from '@apollo/client';
import { Dimensions } from "react-native";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const aspectHeight = (windowWidth * 9) / 25 // 25:9

const imageHeight = 233
const defaultOptions = {
    watchQuery: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'ignore',
    },
    query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
    },
}

const client = new ApolloClient({
    uri: 'https://api-d2ogvmxflq-as.a.run.app/api/v1/graphql/',
    cache: new InMemoryCache(),
    defaultOptions: defaultOptions,
});


const _userId = "8c96e004-a26d-494f-8173-eee94c9270a5"
const userName = "Jow Nguyen"
const userPhone = "0344556835"

export { windowWidth, windowHeight, aspectHeight, imageHeight, client, _userId, userName, userPhone };

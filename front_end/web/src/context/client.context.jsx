import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
    uri: 'https://api-d2ogvmxflq-as.a.run.app/api/v1/graphql/',
    cache: new InMemoryCache(),
});

export default client;
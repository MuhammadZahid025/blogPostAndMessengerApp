import { ApolloClient, ApolloLink, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from "@apollo/client/link/context"
import { onError } from '@apollo/client/link/error';



const httpLink = createHttpLink({
    uri: "http://localhost:3001/graphql",
})

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem("token");
    console.log("token--->", token)

    return {
        headers: {
            ...headers,
            authorization: `Bearer ${token}`
        }
    }
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
        graphQLErrors.forEach(({ message, locations, path }) => {
            if (message === 'Unauthorized') {
                window.location.replace("/signin")
            }
        })
    }

})

export const apolloClient = new ApolloClient({

    // link: authLink.concat(httpLink),
    link: ApolloLink.from([errorLink, authLink, httpLink]),
    cache: new InMemoryCache(),


})
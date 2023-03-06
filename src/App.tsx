import { ApolloProvider } from "@apollo/client";
import { apolloClient } from './apolloClient/Client';
import './App.css';
import Views from "./components/Views";
import { UserLoginProvider } from "./context/AuthContext";


function App() {
 

  return (
    <ApolloProvider client={apolloClient}>
      <UserLoginProvider>
        <Views />
      </UserLoginProvider>
    </ApolloProvider>
  );
}

export default App;

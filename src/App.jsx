import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import { SubscriptionClient } from "subscriptions-transport-ws";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  gql,
  useSubscription,
} from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";

const subscriptionClient = new SubscriptionClient(
  "ws://localhost:3000/graphql",
  {
    reconnect: true,
  }
);

const link = new WebSocketLink(subscriptionClient);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

const MESSAGE_SUBSCRIPTION = gql`
  subscription onUpdate {
    driverLocationUpdated(driverId: "1") {
      lat
      lng
    }
  }
`;

function MessageList() {
  const { data, loading } = useSubscription(MESSAGE_SUBSCRIPTION);
  console.log(data);
  return <></>;
}

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <ApolloProvider client={client}>
        <MessageList />
      </ApolloProvider>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;

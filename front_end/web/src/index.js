import ReactDOM from 'react-dom/client';
import Modal from 'react-modal';
import './index.css';

import App from './App';

import { ApolloProvider } from '@apollo/client';
import client from './context/client.context'

Modal.setAppElement('#root');
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
);


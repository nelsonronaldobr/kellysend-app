import ReactDOM from 'react-dom/client';
import './index.css';
import { KellySendApp } from './KellySendApp.tsx';
import { Provider } from 'react-redux';
import { store } from './store';
import { Toaster } from 'react-hot-toast';
import { UIProvider } from './context/ui/UIProvider.tsx';
import 'tippy.js/dist/tippy.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    //<React.StrictMode>
    <Provider store={store}>
        <UIProvider>
            <Toaster position='top-right' reverseOrder={true} />
            <KellySendApp />
        </UIProvider>
    </Provider>
    //</React.StrictMode>
);

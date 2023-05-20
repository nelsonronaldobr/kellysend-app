import { Spinner } from './components';
import { useCheckoutToken } from './hooks';
import { AppRouter } from './router';

export const KellySendApp = () => {
    const { status } = useCheckoutToken();

    if (status === 'checking') {
        return <Spinner type='spokes' height={80} width={80} color='#f43f5e' />;
    }

    return <AppRouter />;
};

import { useEffect } from 'react';
import { useAuthStore } from '.';

export const useCheckoutToken = () => {
    const { startCheckoutToken, status } = useAuthStore();

    useEffect(() => {
        startCheckoutToken();
    }, []);

    return {
        status
    };
};

import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthStore } from '../../hooks';

export const ConfirmAccount = () => {
    const { startConfirmAccount } = useAuthStore();
    const { token } = useParams();

    useEffect(() => {
        startConfirmAccount(token);
    }, []);

    return <></>;
};

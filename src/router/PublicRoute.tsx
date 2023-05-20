import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../hooks';

interface Props {
    children: JSX.Element | JSX.Element[];
}

export const PublicRoute = ({ children }: Props) => {
    const { status, user } = useAuthStore();
    return status !== 'authenticated' || !user.confirmed ? (
        <>{children}</>
    ) : (
        <Navigate to={'/'} replace={true} />
    );
};

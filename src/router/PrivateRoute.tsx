import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../hooks/useAuthStore';
interface Props {
    children: JSX.Element | JSX.Element[];
}

export const PrivateRoute = ({ children }: Props) => {
    const { status } = useAuthStore();

    return status === 'authenticated' ? (
        <>{children}</>
    ) : (
        <Navigate to={'auth/login'} replace={true} />
    );
};

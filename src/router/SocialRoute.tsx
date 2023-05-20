import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../hooks';

interface Props {
    children: JSX.Element | JSX.Element[];
}

export const SocialRoute = ({ children }: Props) => {
    const { status, hasPhotoProfile } = useAuthStore();

    return status === 'authenticated' && !hasPhotoProfile ? (
        <Navigate to={'/select-profile'} replace={true} />
    ) : (
        <>{children}</>
    );
};

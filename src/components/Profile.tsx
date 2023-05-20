import { useEffect } from 'react';
import { useAuthStore } from '../hooks';
interface Props {
    onClick: (photo: string) => void;
    profile: string;
    className: string;
}

export const Profile = ({ onClick, profile, className }: Props) => {
    const { startSelectedDefault, selected_profile } = useAuthStore();

    useEffect(() => {
        startSelectedDefault();
    }, []);

    const handleClick = () => {
        onClick(profile);
    };

    return (
        <img
            src={profile}
            alt={`Profile`}
            className={`${className} w-32 h-32 duration-100 object-cover transition-all cursor-pointer rounded-full hover:scale-110 ${
                selected_profile === profile
                    ? 'outline outline-rose-500 duration-[60ms] scale-100'
                    : ''
            }`}
            onClick={handleClick}
        />
    );
};

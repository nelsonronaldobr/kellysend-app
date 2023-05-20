import { useEffect } from 'react';
import { useAuthStore, useUIStore } from '../../hooks';
import { Profile, Skeleton } from '../../components';
import { NavLink, useNavigate } from 'react-router-dom';

export const SelectProfile = () => {
    const { profiles, startGetProfiles, loading } = useUIStore();

    const { startSavePhoto, startSelectedPhoto, selected_profile } =
        useAuthStore();

    const navigate = useNavigate();

    useEffect(() => {
        startGetProfiles();
    }, []);

    const handleClick = (profile: string) => {
        startSelectedPhoto(profile);
    };

    const handleSaveProfile = () => {
        startSavePhoto();
        navigate('/', { replace: true });
        console.log('llego');
    };
    return (
        <div className='animate__animated animate__fadeIn flex py-10 xl:py-0 xl:h-screen flex-col gap-10 items-center justify-center'>
            <h1 className='text-3xl font-bold'>Elige tu foto de perfil</h1>

            {loading ? (
                <Skeleton />
            ) : (
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4'>
                    {profiles.map((profile, index) => (
                        <Profile
                            profile={profile}
                            onClick={handleClick}
                            key={index}
                            className={'animate__animated animate__fadeIn'}
                        />
                    ))}
                </div>
            )}

            <div className='flex gap-8'>
                <NavLink to={'/'} className={'button-primary '}>
                    Regresar
                </NavLink>
                <button
                    className='button-primary disabled:opacity-60 disabled:cursor-not-allowed'
                    disabled={!selected_profile}
                    onClick={handleSaveProfile}>
                    Guardar
                </button>
            </div>
        </div>
    );
};

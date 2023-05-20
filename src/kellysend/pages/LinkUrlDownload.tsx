import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSendStore } from '../../hooks';
import { FilesPreviewDownload } from '../../components';

export const LinkURLDownload = () => {
    const { url } = useParams();
    const navigate = useNavigate();
    const {
        startGetFileExist,
        loading,
        link,
        startReset,
        hasPassword,
        startVerifyPassword
    } = useSendStore();

    const [password, setPassword] = useState('');

    useEffect(() => {
        startGetFileExist(url);
    }, []);

    const handleDownloadClick = () => {
        startReset();
        navigate('/', { replace: true });
    };

    if (!link) {
        return <></>;
    }

    const handleChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        startVerifyPassword(password);
    };

    return (
        <div className='md:w-4/5 xl:w-3/5 mx-auto flex mt-6 md:mt-14 container'>
            <div className='h-[calc(100vh_-_200px)] px-6 sm:px-0 flex flex-1 items-center justify-center rounded-lg gap-6 relative'>
                <div className='p-6 flex-1s shadow-input sm:max-w-md md:max-w-lg flex-grow flex items-center justify-center flex-col gap-6 w-full'>
                    {hasPassword ? (
                        <form
                            className='flex flex-col gap-5 animate__animated  animate__fadeIn'
                            onSubmit={handleSubmit}>
                            <p className='text-sm font-semibold'>
                                Este archivo esta protegido, coloca el password
                                a continuación
                            </p>

                            <div>
                                <input
                                    className={`form-control`}
                                    type='password'
                                    placeholder='Ingresa el password'
                                    name='password'
                                    onChange={handleChangePassword}
                                />
                            </div>
                            <div>
                                <button
                                    className='button-primary disabled:opacity-50 disabled:cursor-not-allowed font-bold w-full text-base py-3.5'
                                    type='submit'>
                                    Comprobar password
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className='flex flex-col items-center animate__animated  animate__fadeIn'>
                            <h1 className='text-2xl font-bold'>
                                Descarga tu archivo :
                            </h1>
                            {!loading && link ? (
                                <>
                                    <FilesPreviewDownload link={link} />
                                    <a
                                        onClick={handleDownloadClick}
                                        className='button-primary'
                                        href={`${
                                            import.meta.env.VITE_BACKEND_URL
                                        }/api/files/${link.name}`}>
                                        Descargar
                                    </a>
                                </>
                            ) : (
                                <div className='animate-pulse flex items-center justify-center gap-6 flex-col'>
                                    <div className='w-72 h-20 bg-gray-300 rounded mb-4'></div>
                                    <div className='w-[102px] h-[46px] bg-gray-300 rounded'></div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

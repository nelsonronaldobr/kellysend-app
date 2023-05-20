import { NavLink } from 'react-router-dom';
import { Dropzone } from '../../components';
import { useAuthStore } from '../../hooks';

export const KellySend = () => {
    const { status, isConfirmAccount } = useAuthStore();

    return (
        <div className='md:w-4/5 xl:w-3/5 mx-auto flex mt-6 md:mt-14 container'>
            <div className='grid grid-cols-1 grid-rows-2 lg:grid-rows-1 lg:grid-cols-2 bg-white p-6 md:shadow-input rounded-lg gap-6   animate__animated  animate__fadeIn relative'>
                <Dropzone />

                <div className='col-span-1 h-96 mb-3 mx-2 lg:mt-0 flex flex-col md:justify-center'>
                    <h2 className='text-2xl mb-6 md:mb-4 font-bold'>
                        Comparte archivos de forma sencilla y privada
                    </h2>
                    <p className='text-sm leading-loose'>
                        Con{' '}
                        <span className='text-rose-600 text-base font-bold'>
                            KellySend
                        </span>{' '}
                        puedes compartir archivos con cifrado de extremo a
                        extremo y con la tranquilidad de saber que serán
                        eliminados automáticamente después de su descarga. En
                        nuestra plataforma, puedes mantener tus archivos
                        privados y evitar que permanezcan en línea
                        indefinidamente.
                    </p>
                    {status !== 'authenticated' || !isConfirmAccount ? (
                        <div className='flex items-center justify-center mt-2'>
                            <NavLink
                                to={'auth/login'}
                                className='text-rose-600 font-bold text-sm text-center'>
                                Crea y verifica tu cuenta para mayores
                                beneficios
                            </NavLink>
                        </div>
                    ) : (
                        ''
                    )}
                </div>
            </div>
        </div>
    );
};

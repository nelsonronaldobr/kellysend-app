import PlusIcon from '../assets/plus-svg.svg';
import { useDropzone } from 'react-dropzone';
import { useAuthStore, useSendStore } from '../hooks';
import { Files, Form } from '.';
import { toast } from 'react-hot-toast';

const MAX_FILE = 1;

export const Dropzone = () => {
    const { startUploadFile, startCreateLink, original_name } = useSendStore();

    const { status, isConfirmAccount } = useAuthStore();

    const MAX_SIZE =
        status === 'authenticated' && isConfirmAccount
            ? 1024 * 1024 * 10
            : 1024 * 1024;

    // extraer contenido
    const onDropAccepted = (acceptedFiles: File[]) => {
        startUploadFile(acceptedFiles);
    };
    const onDropRejected = () => {
        toast.error(
            'No se puede subir el limite es de 1MB, obten una cuenta gratis para poder subir archivos de mayor tamaño.',
            {
                duration: 5000
            }
        );
    };

    const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
        useDropzone({
            onDropAccepted,
            onDropRejected,
            maxSize: MAX_SIZE,
            maxFiles: MAX_FILE
        });

    const handleCreateLink = async () => {
        startCreateLink();
    };

    return (
        <div className='col-span-1 relative h-96 xl:h-auto mb-3 mx-2 lg:mt-0 flex flex-col items-center justify-center border-dashed border-gray-400 border-2 p-4'>
            {acceptedFiles.length && original_name ? (
                <div className='flex flex-col gap-4 flex-grow justify-center items-center'>
                    <Files acceptedFiles={acceptedFiles} />

                    {isConfirmAccount ? <Form /> : ''}

                    <button
                        className='button-primary'
                        onClick={handleCreateLink}>
                        Crear Enlace
                    </button>
                </div>
            ) : (
                <div {...getRootProps({ className: 'dropzone w-full' })}>
                    <input
                        className='absolute w-full h-full top-0 left-0'
                        {...getInputProps()}
                    />
                    {isDragActive ? (
                        <div className='text-center'>
                            <p className='font-medium text-base mt-3'>
                                Suelta el archivo
                            </p>
                        </div>
                    ) : (
                        <div className='flex flex-col gap-4 flex-grow justify-center items-center'>
                            <img
                                src={PlusIcon}
                                alt='svg plus logo'
                                className='w-12 select-none object-cover text-rose-500'
                                draggable={false}
                            />
                            <div className='text-center'>
                                <p className='font-medium text-base mt-3'>
                                    Selecciona un archivo y arrastralo aquí
                                </p>

                                <span className='text-sm'>
                                    O click para subir
                                </span>
                            </div>
                            <button className='button-primary'>
                                Selecciona archivos para subir
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

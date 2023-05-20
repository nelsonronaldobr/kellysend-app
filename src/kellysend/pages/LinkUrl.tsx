import { useSendStore } from '../../hooks';
import { MdContentCopy } from 'react-icons/md';
import { IoArrowRedoSharp } from 'react-icons/io5';
import { useEffect, useRef } from 'react';
import { Navigate } from 'react-router-dom';
import tippy, { Instance } from 'tippy.js';

export const LinkUrl = () => {
    const { url } = useSendStore();

    const { handleCopyClick, handleShareClick } = useSendStore();

    const copyRef = useRef<HTMLDivElement>(null);
    const shareRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    let tooltipInstance: Instance | null = null;

    useEffect(() => {
        if (copyRef.current) {
            tooltipInstance = tippy(copyRef.current, {
                content: 'Copiar 📝'
            });
        }
        if (shareRef.current) {
            tooltipInstance = tippy(shareRef.current, {
                content: 'Compartir 😎'
            });
        }
        if (inputRef.current) {
            tooltipInstance = tippy(inputRef.current, {
                content: 'Link Compartir',
                placement: 'bottom'
            });
        }

        return () => {
            if (tooltipInstance) {
                tooltipInstance.destroy();
            }
        };
    }, [url]);

    if (!url) {
        return <Navigate to={'/'} replace={true} />;
    }

    return (
        <div className='md:w-4/5 xl:w-3/5 mx-auto flex mt-6 md:mt-14 container'>
            <div className='h-[calc(100vh_-_200px)] px-6 flex flex-1 items-center justify-center rounded-lg gap-6 animate__animated  animate__fadeIn relative'>
                <div className='p-6 w-full relative form-control-copy'>
                    <input
                        value={`${
                            import.meta.env.VITE_FRONTEND_URL
                        }/link/download/${url}`}
                        className='focus:outline-none w-2/3 sm:w-full text-base overflow-hidden whitespace-nowrap text-ellipsis'
                        readOnly
                        type='text'
                        ref={inputRef}
                    />
                    <div className='absolute top-6 right-12 text-gray-400 flex gap-4'>
                        <p
                            className={
                                'cursor-pointer hover:text-gray-600 transition-colors'
                            }
                            ref={copyRef}
                            onClick={handleCopyClick}>
                            <MdContentCopy size={25} />
                        </p>
                        <p
                            className='rotate-45 cursor-pointer hover:text-gray-600 transition-colors'
                            ref={shareRef}
                            onClick={handleShareClick}>
                            <IoArrowRedoSharp
                                size={25}
                                className={'-rotate-45'}
                            />
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

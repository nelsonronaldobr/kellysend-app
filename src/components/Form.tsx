import { ChangeEvent, useState } from 'react';
import { useSendStore } from '../hooks';

export const Form = () => {
    const { startSetPassword, startSetDownloads } = useSendStore();
    const [checked, setChecked] = useState(false);

    const onChangeChecked = () => {
        setChecked((value) => !value);
    };

    const handleChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
        startSetPassword(event.target.value);
    };
    const handleChangeDownloas = (event: ChangeEvent<HTMLSelectElement>) => {
        startSetDownloads(event.target.value);
    };

    return (
        <div className='w-full bg-gray-100 py-6 px-4 flex flex-col gap-4'>
            <div className='flex flex-col gap-2.5'>
                <label
                    htmlFor='downloads'
                    className='text-sm block text-gray-800 font-semibold'>
                    Eliminar despues de :
                </label>
                <select
                    name='downloads'
                    id='downloads'
                    className='form-control py-3 w-full appearance-none'
                    defaultValue={'0'}
                    onChange={handleChangeDownloas}>
                    <option value='0' disabled className='bg-gray-100'>
                        --Seleccione--
                    </option>
                    <option value='1' className='bg-gray-100'>
                        1 Descarga
                    </option>
                    <option value='5' className='bg-gray-100'>
                        5 Descargas
                    </option>
                    <option value='10' className='bg-gray-100'>
                        10 Descargas
                    </option>
                    <option value='20' className='bg-gray-100'>
                        20 Descargas
                    </option>
                </select>
            </div>
            <div className='flex flex-col gap-1'>
                <div className='flex gap-3'>
                    <label
                        htmlFor='withPassword'
                        className='text-sm block text-center text-gray-800 font-semibold'>
                        Proteger con contraseña
                    </label>
                    <input
                        type='checkbox'
                        name='withPassword'
                        id='withPassword'
                        checked={checked}
                        onChange={onChangeChecked}
                        className='accent-rose-500 text-base'
                    />
                </div>
                {checked ? (
                    <input
                        className={`form-control transition-opacity ease-linear duration-200 py-3 w-full ${
                            checked ? 'opacity-100' : 'opacity-0'
                        }`}
                        type='password'
                        name='password'
                        id='password'
                        onChange={handleChangePassword}
                    />
                ) : (
                    ''
                )}
            </div>
        </div>
    );
};

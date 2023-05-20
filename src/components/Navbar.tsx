import logo from '../assets/logo.png';
import logo_mobile from '../assets/logo-mobile.png';
import { NavLink } from 'react-router-dom';
import { useAuthStore, useSendStore, useUI } from '../hooks';
import { MouseEvent } from 'react';

export const Navbar = () => {
    const { status, startLogout, user, loading } = useAuthStore();
    const { startReset } = useSendStore();

    const { buttonDropdownRef, dropdownRef, show, toggleShow, hiddeDropdown } =
        useUI();

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        toggleShow();
    };

    const handleClickToggle = (event: MouseEvent<HTMLElement>) => {
        event.stopPropagation();
    };

    return (
        <header className='py-4 px-6 md:px-8 shadow-input animate__animated animate__fadeIn animate__faster relative z-10'>
            <nav>
                <ul className='flex justify-between items-center'>
                    <NavLink to={'/'} onClick={startReset}>
                        <img
                            src={logo_mobile}
                            className={`logo-mobile cursor-pointer`}
                        />
                        <img src={logo} className={`logo cursor-pointer`} />
                    </NavLink>
                    {status !== 'authenticated' ? (
                        <li>
                            <div className='flex gap-4'>
                                <NavLink
                                    to={'auth/login'}
                                    className='button-primary'>
                                    Iniciar Sesión
                                </NavLink>
                                <NavLink
                                    to={'auth/register'}
                                    className='button-primary-outline'>
                                    Registro
                                </NavLink>
                            </div>
                        </li>
                    ) : (
                        <div className='relative ml-3'>
                            <div>
                                <button
                                    onClick={handleClick}
                                    ref={buttonDropdownRef}
                                    type='button'
                                    className='flex rounded-full text-sm'>
                                    <span className='sr-only'>
                                        Open user menu
                                    </span>
                                    {loading ? (
                                        <div className='animate-pulse'>
                                            <div className='bg-gray-300 rounded-full h-12 w-12'></div>
                                        </div>
                                    ) : (
                                        <img
                                            className='h-12 w-12 rounded-full'
                                            src={user.photo_profile}
                                            alt=''
                                        />
                                    )}
                                </button>
                            </div>

                            <div
                                className={`absolute ${
                                    show ? 'opacity-100' : 'opacity-0'
                                } right-0 z-10 mt-2 w-48 transition-opacity duration-75 ease-linear rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
                                ref={dropdownRef}
                                onClick={handleClickToggle}>
                                <NavLink
                                    to={'/select-profile'}
                                    className='block px-4 py-2 text-sm text-gray-700'
                                    role='menuitem'
                                    id='user-menu-item-0'
                                    onClick={hiddeDropdown}>
                                    Cambiar Avatar
                                </NavLink>
                                <button
                                    onClick={startLogout}
                                    className='block px-4 w-full text-start py-2 text-sm text-gray-700'
                                    role='menuitem'
                                    id='user-menu-item-2'>
                                    Sign out
                                </button>
                            </div>
                        </div>
                    )}
                </ul>
            </nav>
        </header>
    );
};

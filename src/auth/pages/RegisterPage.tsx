import { NavLink } from 'react-router-dom';
import logo_mobile from '../../assets/logo-mobile.png';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ErrorMessage } from '../components';
import { useState } from 'react';
import { useAuthStore } from '../../hooks';

const initialValues = {
    username: '',
    email: '',
    password: '',
    age: 0
};

const validationSchema = Yup.object().shape({
    username: Yup.string()
        .min(
            2,
            'Por favor ingrese su nombre de usuario (mínimo de 2 caracteres).'
        )
        .max(
            50,
            'Por favor ingrese su nombre de usuario (límite de 200 caracteres).'
        )
        .required(
            'Por favor ingrese su nombre de usuario (mínimo de 2 caracteres).'
        ),
    password: Yup.string()
        .min(
            6,
            'La contraseña es demasiado corta, debe tener un mínimo de 8 caracteres'
        )
        .required(
            'La contraseña es demasiado corta, debe tener un mínimo de 8 caracteres'
        ),
    email: Yup.string()
        .email('Por favor, ingresa una dirección de correo electrónico válida.')
        .required(
            'Por favor, ingresa una dirección de correo electrónico válida.'
        ),
    age: Yup.number()
        .typeError('La edad debe ser un número')
        .positive('Por favor, ingresa una edad válida.')
        .min(18, 'Por favor, ingresa una edad válida.')
        .max(90, 'Por favor, ingresa una edad válida.')
        .required('Por favor, ingresa una edad válida.')
});

export const RegisterPage = () => {
    const [submit, setSubmit] = useState<boolean>(false);
    const { starRegister } = useAuthStore();

    const { handleChange, handleSubmit, errors, isValid, dirty } = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            starRegister(values);
        },
        validateOnChange: submit,
        validateOnBlur: false
    });

    return (
        <div className='relative animate__animated  animate__fadeIn'>
            <div className='absolute -top-16 left-1/2 transform -translate-y-1/2 -translate-x-1/2'>
                <NavLink to={'/'}>
                    <img
                        src={logo_mobile}
                        alt='Logo de la App'
                        className='object-cover w-24'
                    />
                </NavLink>
            </div>
            <div className='text-center mb-6 mt-9'>
                <h1 className='font-bold text-2xl mb-2'>Crea tu cuenta</h1>
                <p className='text-sm'>Para continuar usando Kelly Send</p>
            </div>
            <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
                <div className='relative'>
                    <input
                        className={`form-control ${
                            errors.username ? 'border border-red-600' : ''
                        }`}
                        name='username'
                        type='text'
                        placeholder='Escribe un nombre de usuario'
                        onChange={handleChange}
                    />
                    {errors.username && (
                        <ErrorMessage error={errors.username} />
                    )}
                </div>
                <div>
                    <input
                        className={`form-control ${
                            errors.email ? 'border border-red-600' : ''
                        }`}
                        type='email'
                        placeholder='Escribe tu correo electrónico'
                        name='email'
                        onChange={handleChange}
                    />
                    {errors.email && <ErrorMessage error={errors.email} />}
                </div>
                <div className='relative'>
                    <input
                        className={`form-control ${
                            errors.password ? 'border border-red-600' : ''
                        }`}
                        type='password'
                        placeholder='contraseña'
                        name='password'
                        onChange={handleChange}
                    />
                    <div
                        className={`absolute animate__animated text-gray-600 hidden xl:block left-full top-1/2 z-20 ml-3 -translate-y-1/2 whitespace-nowrap rounded bg-white shadow py-[6px] px-4 text-sm font-semibold ${
                            errors.password
                                ? 'animate__fadeIn opacity-100'
                                : 'opacity-0 '
                        }`}>
                        <span className='absolute left-[-5px] top-1/2 -z-10 h-2 w-2 -translate-y-1/2 rotate-45 rounded-sm bg-white shadow'></span>
                        <div className='py-4'>
                            <p className='text-xs font-normal mb-1'>
                                Requisitos de contraseña
                            </p>
                            <ul className='list-disc text-[11px] px-4 font-normal'>
                                <li>Al menos 6 caracteres</li>
                                <li>
                                    Diferente a tu dirección de correo
                                    electrónico
                                </li>
                            </ul>
                        </div>
                    </div>

                    {errors.password && (
                        <ErrorMessage error={errors.password} />
                    )}
                </div>
                <div>
                    <input
                        className={`form-control ${
                            errors.age ? 'border border-red-600' : ''
                        }`}
                        type='number'
                        min={0}
                        placeholder='¿Qué edad tienes?'
                        name='age'
                        onChange={handleChange}
                    />
                    {errors.age && <ErrorMessage error={errors.age} />}
                </div>
                <div>
                    <button
                        className='button-primary disabled:opacity-50 disabled:cursor-not-allowed font-bold w-full text-base py-3.5'
                        type='submit'
                        onClick={() => setSubmit(true)}
                        disabled={!dirty || !isValid}>
                        Crear Cuenta
                    </button>
                </div>
                <div className='flex justify-center'>
                    <p className='text-[13px] text-gray-500'>
                        ¿Ya tienes cuenta?{' '}
                        <NavLink
                            to={'/auth'}
                            className={
                                'text-rose-500 hover:text-rose-700 underline'
                            }>
                            Inicia Sesión
                        </NavLink>
                    </p>
                </div>
                <div>
                    <p className='text-gray-500 text-xs text-center'>
                        Una cuenta de Kelly Send desbloquea el acceso a más
                        beneficios de protección de privacidad sobre sus
                        archivos.
                    </p>
                </div>
            </form>
        </div>
    );
};

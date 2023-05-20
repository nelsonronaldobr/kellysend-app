import { NavLink } from 'react-router-dom';
import logo_mobile from '../../assets/logo-mobile.png';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { ErrorMessage } from '../components';
import { useAuthStore } from '../../hooks';

const initialValues = {
    email: '',
    password: ''
};

const validationSchema = Yup.object().shape({
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
        )
});

export const LoginPage = () => {
    const [submit, setSubmit] = useState<boolean>(false);

    const { startLogin } = useAuthStore();

    const { handleChange, handleSubmit, errors, isValid, dirty } = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            startLogin(values);
        },
        validateOnChange: submit,
        validateOnBlur: false
    });

    return (
        <div className='relative animate__animated animate__fadeIn'>
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
                <h1 className='font-bold text-2xl mb-2'>
                    Inicia sesión con tu cuenta
                </h1>
                <p className='text-sm'>Para continuar usando Kelly Send</p>
            </div>
            <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
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
                <div>
                    <input
                        className={`form-control ${
                            errors.password ? 'border border-red-600' : ''
                        }`}
                        type='password'
                        placeholder='contraseña'
                        name='password'
                        onChange={handleChange}
                    />
                    {errors.password && (
                        <ErrorMessage error={errors.password} />
                    )}
                </div>
                {/* <div className='flex justify-end'>
                    <NavLink
                        to={'/forgot-password'}
                        className={
                            'text-[13px] text-rose-500 underline hover:text-rose-700'
                        }>
                        ¿Olvidaste tu contraseña?
                    </NavLink>
                </div> */}
                <div>
                    <button
                        className='button-primary disabled:opacity-80 disabled:cursor-not-allowed font-bold w-full text-base py-3.5'
                        type='submit'
                        onClick={() => setSubmit(true)}
                        disabled={!dirty || !isValid}>
                        Inicia Sesión
                    </button>
                </div>
                <div className='flex justify-center'>
                    <p className='text-[13px] text-gray-500'>
                        ¿No tienes cuenta?{' '}
                        <NavLink
                            to={'/auth/register'}
                            className={
                                'text-rose-500 hover:text-rose-700 underline'
                            }>
                            Crear cuenta
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

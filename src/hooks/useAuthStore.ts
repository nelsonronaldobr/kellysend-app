import { toast } from 'react-hot-toast';
import { kellySendApi } from '../api';
import {
    onChecking,
    onLogin,
    onLogout,
    onNotChecking,
    onSelectedPhoto,
    onSetPhoto,
    onLoading
} from '../store/auth';
import { LoginValues, AuthResponse, RegisterValues } from '../store/interfaces';
import {
    ErrorResponse,
    Messages,
    ProfilesResponse
} from '../store/interfaces/auth';
import { useAppDispatch, useAppSelector } from '../store';

export const useAuthStore = () => {
    const { status, user, messages, selected_profile, loading } =
        useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();

    const starRegister = async ({
        username,
        email,
        age,
        password
    }: RegisterValues) => {
        dispatch(onChecking());

        toast.promise(
            kellySendApi.post<AuthResponse>('/auth/register', {
                username,
                email,
                age,
                password
            }),
            {
                loading: 'Loading',
                success: ({ data }) => {
                    dispatch(onNotChecking());
                    return data.messages.msg;
                },
                error: (error: ErrorResponse) => {
                    dispatch(onLogout());
                    return error.response.data.messages.msg;
                }
            }
        );
    };

    const startLogin = async ({ email, password }: LoginValues) => {
        dispatch(onChecking());
        try {
            const { data } = await kellySendApi.post<AuthResponse>('/auth', {
                email,
                password
            });

            localStorage.setItem('token', data.jwt);
            localStorage.setItem(
                'token-init-date',
                new Date().getTime().toString()
            );

            dispatch(onLogin(data));
        } catch (error: any) {
            toast.error((error.response.data?.messages as Messages).msg, {
                duration: 6000
            });
            dispatch(onLogout(error.response.data?.messages as Messages));
        }
    };

    const startCheckoutToken = async () => {
        const token = localStorage.getItem('token');

        if (!token) return dispatch(onLogout());

        dispatch(onChecking());

        try {
            const { data } = await kellySendApi.get<AuthResponse>(
                '/auth/renew'
            );
            localStorage.setItem('token', data.jwt);
            localStorage.setItem(
                'token-init-date',
                new Date().getTime().toString()
            );

            dispatch(onLogin(data));
        } catch (error) {
            localStorage.clear();
            dispatch(onLogout());
        }
    };

    const startLogout = () => {
        localStorage.clear();
        dispatch(onLogout());
    };

    const startConfirmAccount = async (token?: string) => {
        if (!token) return dispatch(onLogout());
        dispatch(onChecking());

        toast.promise(
            kellySendApi.get<AuthResponse>(`/auth/confirm-account/${token}`),
            {
                loading: 'Loading',
                success: ({ data }) => {
                    localStorage.setItem('token', data.jwt);
                    localStorage.setItem(
                        'token-init-date',
                        new Date().getTime().toString()
                    );
                    dispatch(onLogin(data));
                    return data.messages.msg;
                },
                error: (error: ErrorResponse) => {
                    dispatch(onLogout());
                    return error.response.data.messages.msg;
                }
            }
        );
    };

    const getProfilesPhotos = async () => {
        try {
            const {
                data: { imageUrls }
            } = await kellySendApi.get<ProfilesResponse>('/auth/profiles');

            return imageUrls;
        } catch (error: any) {
            console.log(error);
            toast.error((error.response.data?.messages as Messages).msg, {
                duration: 6000
            });
        }
    };

    const startSelectedPhoto = (photo: string) => {
        dispatch(onSelectedPhoto(photo));
    };

    const startSavePhoto = async () => {
        dispatch(onLoading());
        toast.promise(
            kellySendApi.post<AuthResponse>('/auth/profile', {
                photo_profile: selected_profile
            }),
            {
                loading: 'Loading',
                success: ({ data }) => {
                    dispatch(onSetPhoto(selected_profile));
                    return data.messages!.msg;
                },
                error: () => {
                    dispatch(onLogout());
                    return 'Error';
                }
            }
        );
    };

    const startSelectedDefault = () => {
        startSelectedPhoto(user.photo_profile);
    };

    return {
        starRegister,
        status,
        messages,
        startLogin,
        user,
        startCheckoutToken,
        startLogout,
        startConfirmAccount,
        getProfilesPhotos,
        startSavePhoto,
        startSelectedPhoto,
        selected_profile,
        startSelectedDefault,
        loading,
        isConfirmAccount: user && user.confirmed,
        hasPhotoProfile: user && user.photo_profile
    };
};

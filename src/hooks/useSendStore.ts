import toast from 'react-hot-toast';
import { kellySendApi } from '../api';
import {
    ErrorResponse,
    LinkResponse,
    SendResponse,
    onReset,
    onSetDownloads,
    onSetLink,
    onSetPassword,
    onSetUploadFile,
    onSetUrl,
    useAppDispatch,
    useAppSelector
} from '../store';
import { useNavigate } from 'react-router-dom';

export const useSendStore = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { name, original_name, options, url, link, loading } = useAppSelector(
        (state) => state.send
    );

    const startUploadFile = async (file: File[]) => {
        const formData = new FormData();

        formData.append('file', file[0]);

        toast.promise(kellySendApi.post<SendResponse>('/files', formData), {
            loading: 'Loading',
            success: ({ data }) => {
                const name = data.file.filename;
                const original_name = file[0].name;

                dispatch(
                    onSetUploadFile({
                        name,
                        original_name
                    })
                );

                return data.messages.msg;
            },
            error: (error: ErrorResponse) => {
                return error.response.data.messages.msg;
            }
        });
    };

    const startCreateLink = async () => {
        const formData = {
            original_name,
            name,
            options
        };

        toast.promise(kellySendApi.post<SendResponse>('/links', formData), {
            loading: 'Loading',
            success: ({ data }) => {
                dispatch(onSetUrl(data.url));
                navigate(`/link/${data.url}`);
                return data.messages.msg;
            },
            error: (error: ErrorResponse) => {
                navigate('/', { replace: true });
                return error.response.data.messages.msg;
            }
        });
    };

    const handleCopyClick = () => {
        const textToCopy = `${
            import.meta.env.VITE_FRONTEND_URL
        }/link/download/${url}`;

        toast.promise(
            navigator.clipboard.writeText(textToCopy),
            {
                loading: 'Loading',
                success: 'Texto copiado al portapapeles',
                error: 'Error al copiar al portapapeles'
            },
            {
                position: 'top-center'
            }
        );
    };

    const handleShareClick = () => {
        if (navigator.share) {
            navigator.share({
                title: 'Link de descarga',
                text: 'Usa este link para descargar el contenido',
                url: `${import.meta.env.VITE_FRONTEND_URL}/link/download/${url}`
            });
        } else {
            console.log(
                'La API de uso compartido web no es compatible en este navegador.'
            );
        }
    };

    const startGetFileExist = async (url?: string) => {
        if (!url) return navigate('/', { replace: true });

        toast.promise(
            kellySendApi.get<LinkResponse>(`/links/${url}`),
            {
                loading: 'Loading',
                success: ({ data }) => {
                    dispatch(onSetLink(data.link));

                    return data.messages.msg;
                },
                error: (error: ErrorResponse) => {
                    console.log(error);
                    navigate('/', { replace: true });
                    return error.response.data.messages.msg;
                }
            },
            {
                duration: 5000
            }
        );
    };

    const startReset = () => {
        dispatch(onReset());
    };

    const startSetPassword = (password: string) => {
        dispatch(onSetPassword(password));
    };
    const startSetDownloads = (downloads: string) => {
        dispatch(onSetDownloads(downloads));
    };
    const startVerifyPassword = async (password: string) => {
        if (!password) return navigate('/', { replace: true });

        toast.promise(
            kellySendApi.post<LinkResponse>(`/links/${link?.url}`, {
                password
            }),
            {
                loading: 'Loading',
                success: ({ data }) => {
                    dispatch(onSetLink(data.link));
                    return data.messages.msg;
                },
                error: (error: ErrorResponse) => {
                    console.log(error);
                    return error.response.data.messages.msg;
                }
            },
            {
                duration: 5000
            }
        );
    };

    return {
        startUploadFile,
        startCreateLink,
        url,
        handleCopyClick,
        handleShareClick,
        startGetFileExist,
        link,
        loading,
        startReset,
        original_name,
        startSetPassword,
        startSetDownloads,
        hasPassword: link && link?.hasPassword,
        startVerifyPassword
    };
};

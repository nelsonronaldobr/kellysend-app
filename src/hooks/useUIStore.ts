import { toast } from 'react-hot-toast';
import { kellySendApi } from '../api';
import {
    Messages,
    ProfilesResponse,
    onLogout,
    useAppDispatch,
    useAppSelector
} from '../store';
import { onLoading, onSetProfiles } from '../store/ui';

export const useUIStore = () => {
    const dispatch = useAppDispatch();
    const { profiles, loading, photo_profile } = useAppSelector(
        (state) => state.ui
    );

    const startGetProfiles = async () => {
        dispatch(onLoading());

        try {
            const {
                data: { imageUrls }
            } = await kellySendApi.get<ProfilesResponse>('/auth/profiles');

            dispatch(onSetProfiles(imageUrls));
        } catch (error: any) {
            console.log(error);
            toast.error((error.response.data?.messages as Messages).msg, {
                duration: 4000
            });
            dispatch(onLogout());
        }
    };

    return {
        profiles,
        startGetProfiles,
        loading,
        photo_profile
        /* startSelectedPhoto,
        photo_profile */
    };
};

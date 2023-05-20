import { Messages } from '.';

export interface InitialStateUI {
    profiles: string[];
    loading: boolean;
    photo_profile: string;
    messages?: Messages;
}

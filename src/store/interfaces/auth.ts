export type Type = 'error' | 'sucess';

export type Status = 'checking' | 'not-authenticated' | 'authenticated';

export type Messages = { type: Type; msg: string };

export type User = {
    username: string;
    email: string;
    confirmed: boolean;
    age?: number;
    photo_profile: string;
};

export interface InitialStateAuth {
    user: User;
    messages?: Messages;
    status: Status;
    selected_profile: string;
    loading: boolean;
}

export interface RegisterValues {
    username: string;
    email: string;
    password: string;
    age: number;
}
export interface LoginValues {
    email: string;
    password: string;
}

export interface AuthResponse {
    ok: boolean;
    jwt: string;
    user: User;
    messages: Messages;
}

export interface SimpleResponse {
    ok: boolean;
    messages?: Messages;
}
// Generated by https://quicktype.io

export interface ProfilesResponse {
    ok: boolean;
    imageUrls: string[];
}

export interface StateAuth {
    user: User;
}

export interface ErrorResponse {
    response: { data: { messages: { type: Type; msg: string } } };
}
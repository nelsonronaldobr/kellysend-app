import { Messages } from '.';

export interface File {
    filename: string;
}

export interface SendResponse {
    ok: boolean;
    file: File;
    url: string;
    messages: Messages;
}
export interface OptionsSendFile {
    downloads?: string;
    password?: string;
}
export interface InitialStateSend {
    name: string;
    original_name: string;
    options?: OptionsSendFile;
    url?: string;
    link?: Link;
    loading?: boolean;
}
export interface Link {
    downloads: number;
    author: string;
    url: string;
    name: string;
    original_name: string;
    extension: string;
    hasPassword?: boolean;
    verify?: boolean;
}
export interface LinkResponse {
    ok: boolean;
    link: Link;
    messages: Messages;
}

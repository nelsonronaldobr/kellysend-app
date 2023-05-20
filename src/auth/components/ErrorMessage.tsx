interface Props {
    error: string;
}

export const ErrorMessage = ({ error }: Props) => {
    return <div className='text-xs text-red-600 pt-1'>{error}</div>;
};

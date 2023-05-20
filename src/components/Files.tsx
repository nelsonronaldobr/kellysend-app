import { useEffect, useRef, useState } from 'react';
import tippy, { Instance } from 'tippy.js';

import { getImageUrl } from '../helpers';

interface Props {
    acceptedFiles: File[];
}
export const Files = ({ acceptedFiles }: Props) => {
    const [image, setImage] = useState<string>();
    const tooltipRef = useRef<HTMLParagraphElement>(null);
    let tooltipInstance: Instance | null = null;
    useEffect(() => {
        setImage(
            getImageUrl({ acceptedFiles, options: { showOnlyIcon: false } })
        );

        if (tooltipRef.current) {
            tooltipInstance = tippy(tooltipRef.current);
        }

        return () => {
            if (tooltipInstance) {
                tooltipInstance.destroy();
            }
        };
    }, []);

    return (
        <ul>
            {acceptedFiles.map(({ lastModified, size, name }) => (
                <li
                    key={lastModified}
                    className='bg-white flex-1 flex gap-4 items-center p-3 shadow rounded'>
                    <img
                        src={image}
                        alt='image upload'
                        className='w-14 h-14 object-cover'
                    />
                    <div>
                        <p
                            className='font-bold text-sm w-48 text-ellipsis whitespace-nowrap overflow-hidden'
                            data-tippy-content={name}
                            ref={tooltipRef}>
                            {name}
                        </p>
                        <p className='text-xs text-gray-500'>
                            {(size / Math.pow(1024, 2)).toFixed(2)} MB
                        </p>
                    </div>
                </li>
            ))}
        </ul>
    );
};

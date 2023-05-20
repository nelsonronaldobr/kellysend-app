import { useEffect, useRef, useState } from 'react';
import { Link } from '../store';
import { getImageUrl } from '../helpers';
import tippy, { Instance } from 'tippy.js';

interface Props {
    link: Link;
}

export const FilesPreviewDownload = ({ link }: Props) => {
    const [image, setImage] = useState<string>();

    const tooltipRef = useRef<HTMLParagraphElement>(null);
    let tooltipInstance: Instance | null = null;

    useEffect(() => {
        const imageUrl = getImageUrl({
            options: { showOnlyIcon: true, extension: link.extension }
        });
        setImage(imageUrl);

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
            {[link].map(({ name }) => (
                <li
                    key={name}
                    className='flex-1 flex gap-4 items-center p-3 mb-4 shadow rounded'>
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
                    </div>
                </li>
            ))}
        </ul>
    );
};

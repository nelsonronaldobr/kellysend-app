import PDF from '../assets/extensions/pdf.png';
import DEFAULT from '../assets/extensions/default.png';
import PNG from '../assets/extensions/png.png';
import JPG from '../assets/extensions/jpg.png';
import WORD from '../assets/extensions/word.png';
import GIF from '../assets/extensions/webp.png';
import WEBP from '../assets/extensions/webp.png';
import PPT from '../assets/extensions/ppt.png';
import PHOTOSHOP from '../assets/extensions/photoshop.png';
import EXCEL from '../assets/extensions/sheets.png';

type Options =
    | { showOnlyIcon: true; extension: string }
    | { showOnlyIcon: false; extension?: string };

interface ExtensionMap {
    [key: string]: string;
}
interface Props {
    acceptedFiles?: File[];
    options: Options;
}

export const getImageUrl = ({ acceptedFiles, options }: Props): string => {
    let extensionMap = {} as ExtensionMap;
    let type = '';

    if (acceptedFiles) {
        const file = acceptedFiles[0];
        type = file.name
            .substring(file.name.lastIndexOf('.'), file.name.length)
            .slice(1);

        extensionMap = {
            pdf: PDF,
            jpeg: URL.createObjectURL(file),
            jpg: URL.createObjectURL(file),
            png: URL.createObjectURL(file),
            gif: URL.createObjectURL(file),
            webp: URL.createObjectURL(file),
            psd: PHOTOSHOP,
            docx: WORD,
            xlsx: EXCEL,
            csv: EXCEL,
            ppt: PPT
        };
    } else {
        type = options.extension!;

        extensionMap = {
            pdf: PDF,
            jpeg: JPG,
            jpg: JPG,
            png: PNG,
            gif: GIF,
            webp: WEBP,
            docx: WORD,
            xlsx: EXCEL,
            csv: EXCEL,
            ppt: PPT,
            pptx: PPT,
            psd: PHOTOSHOP
        };
    }

    const lowercaseExtension = type.toLowerCase();
    return extensionMap[lowercaseExtension] || DEFAULT;
};

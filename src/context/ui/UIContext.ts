import { RefObject, createContext } from 'react';

interface UIContextProps {
    dropdownRef: RefObject<HTMLDivElement>;
    buttonDropdownRef: RefObject<HTMLButtonElement>;
    containerRef: RefObject<HTMLDivElement>;
    toggleShow: () => void;
    show: boolean;
    hiddeDropdown: () => void;
}

const UIContext = createContext({} as UIContextProps);

export default UIContext;

import { useRef, useState } from 'react';
import { UIContext } from '.';

interface UIProviderProps {
    children: JSX.Element | JSX.Element[];
}

export const UIProvider = ({ children }: UIProviderProps) => {
    const dropdownRef = useRef<HTMLDivElement>(null);
    const buttonDropdownRef = useRef<HTMLButtonElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [show, setshow] = useState(false);

    const toggleShow = () => {
        setshow((show) => !show);
    };

    const hiddeDropdown = () => {
        setshow(false);
    };

    return (
        <UIContext.Provider
            value={{
                dropdownRef,
                buttonDropdownRef,
                containerRef,
                toggleShow,
                show,
                hiddeDropdown
            }}>
            {children}
        </UIContext.Provider>
    );
};

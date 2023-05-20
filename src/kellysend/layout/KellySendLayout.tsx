import { Outlet } from 'react-router-dom';
import { Navbar } from '../../components/Navbar';
import { useUI } from '../../hooks';

export const KellySendLayout = () => {
    const { hiddeDropdown } = useUI();

    const handleClick = () => {
        hiddeDropdown();
    };

    return (
        <div onClick={handleClick}>
            <Navbar />
            <main>
                <Outlet />
            </main>
        </div>
    );
};

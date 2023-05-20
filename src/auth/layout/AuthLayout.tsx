import { Outlet } from 'react-router-dom';

export const AuthLayout = () => {
    return (
        <section className='md:bg-gray-100'>
            <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0'>
                <div className='w-full md:bg-white rounded-lg md:shadow mt-12 sm:max-w-md md:max-w-lg xl:p-0'>
                    <div className='py-6 md:px-8 px-3 space-y-4 md:space-y-6 sm:p-8'>
                        <div>
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

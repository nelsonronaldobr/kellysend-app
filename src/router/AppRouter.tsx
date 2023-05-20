import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { PrivateRoute, PublicRoute, SocialRoute } from '.';
import { AuthLayout } from '../auth/layout';
import { LoginPage, RegisterPage } from '../auth/pages';
import { KellySendLayout } from '../kellysend/layout/KellySendLayout';
import {
    ConfirmAccount,
    KellySend,
    LinkURLDownload,
    LinkUrl,
    SelectProfile
} from '../kellysend/pages';
export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path='/auth/*'
                    element={
                        <PublicRoute>
                            <AuthLayout />
                        </PublicRoute>
                    }>
                    <Route path='login' element={<LoginPage />} />
                    <Route path='register' element={<RegisterPage />} />
                    <Route path='*' element={<Navigate to={'login'} />} />
                    <Route
                        path='confirm-account/:token'
                        element={<ConfirmAccount />}
                    />
                </Route>
                <Route
                    path='/'
                    element={
                        <SocialRoute>
                            <KellySendLayout />
                        </SocialRoute>
                    }>
                    <Route index path='/' element={<KellySend />} />
                    <Route path='/link/:url' element={<LinkUrl />} />
                    <Route
                        path='/link/download/:url'
                        element={<LinkURLDownload />}
                    />
                    <Route path='*' element={<Navigate to={'/'} />} />
                </Route>

                <Route
                    path='/select-profile'
                    element={
                        <PrivateRoute>
                            <SelectProfile />
                        </PrivateRoute>
                    }></Route>
            </Routes>
        </BrowserRouter>
    );
};

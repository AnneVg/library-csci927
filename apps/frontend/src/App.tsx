import {
    BoldOutlined,
    ReadOutlined,
    UserOutlined
} from "@ant-design/icons";
import {
    ErrorComponent,
    ThemedLayoutV2,
    notificationProvider,
} from "@refinedev/antd";
import { Authenticated, Refine } from "@refinedev/core";
import { RefineKbarProvider } from "@refinedev/kbar";
import routerProvider, {
    CatchAllNavigate,
    DocumentTitleHandler,
    NavigateToResource,
    UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import jsonServerDataProvider from "@refinedev/simple-rest";
import React from "react";
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import { authProvider } from "./authProvider";

import "dayjs/locale/de";

import { useTranslation } from "react-i18next";
import { Header, OffLayoutArea, Title } from "./components";
import { ConfigProvider } from "./context";
import { AuthPage } from "./pages/auth";
import { CategoryList } from "./pages/categories";
import {
    MemberCreate,
    MemberEdit,
    MemberList,
} from "./pages/members";

import "@refinedev/antd/dist/reset.css";
import { BookList } from "./pages/books";
import { BorrowCreate, BorrowList } from "./pages/borrow";

const App: React.FC = () => {

    const { REACT_APP_LIBRARY_API_URL } = process.env;
    const libraryApiUrl = `${REACT_APP_LIBRARY_API_URL}/api` || 'http://localhost:4200/api';
    
    const bookProvider = jsonServerDataProvider(libraryApiUrl);

    const { t, i18n } = useTranslation();

    const i18nProvider = {
        translate: (key: string, options: string) => t(key, options),
        changeLocale: (lang: string) => i18n.changeLanguage(lang),
        getLocale: () => i18n.language,
    };

    return (
        <BrowserRouter>
            <ConfigProvider>
                <RefineKbarProvider>
                    <Refine
                        routerProvider={routerProvider}
                        dataProvider={{
                            default: bookProvider,
                            books: bookProvider
                        }}
                        authProvider={authProvider}
                        i18nProvider={i18nProvider}
                        options={{
                            syncWithLocation: true,
                            warnWhenUnsavedChanges: true,
                        }}
                        notificationProvider={notificationProvider}
                        resources={[
                            {
                                name: "books",
                                list: "/books",
                                meta: {
                                    icon: <ReadOutlined />,
                                    dataProviderName: "books"
                                },
                            },
                            {
                                name: "categories",
                                list: "/categories",
                                meta: {
                                    dataProviderName: "books"
                                }
                            },
                            {
                                name: "members",
                                list: "/members",
                                create: "/members/create",
                                edit: "/members/edit/:id",
                                meta: {
                                    icon: <UserOutlined />,
                                    dataProviderName: "books"
                                },
                            },
                            {
                                name: "borrows",
                                list: "/borrows",
                                create: "/borrows/create",
                                edit: "/borrows/edit/:id",
                                meta: {
                                    icon: <BoldOutlined />,
                                    dataProviderName: "books"
                                },
                            },
                        
                        ]}
                    >
                        <Routes>
                            <Route
                                element={
                                    <Authenticated
                                        fallback={
                                            <CatchAllNavigate to="/login" />
                                        }
                                    >
                                        <ThemedLayoutV2
                                            Header={Header}
                                            Title={Title}
                                            OffLayoutArea={OffLayoutArea}
                                        >
                                            <Outlet />
                                        </ThemedLayoutV2>
                                    </Authenticated>
                                }
                            >
                                <Route
                                    index
                                    path="/"
                                    element={<Navigate to="/books" replace />}
                                />
                                
                                <Route
                                    index
                                    path="/books"
                                    element={<BookList />}
                                />

                               

                                <Route
                                    path="/categories"
                                    element={<CategoryList />}
                                />

                                <Route path="/members">
                                    <Route index element={<MemberList />} />
                                    <Route
                                        path="create"
                                        element={<MemberCreate />}
                                    />
                                    <Route
                                        path="edit/:id"
                                        element={<MemberEdit />}
                                    />
                                 
                                </Route>
                                <Route path="/borrows">
                                    <Route index element={<BorrowList />} />
                                    <Route
                                        path="create"
                                        element={<BorrowCreate />}
                                    />
                                    {/* <Route
                                        path="edit/:id"
                                        element={<BorrowEdit />}
                                    /> */}
                                 
                                </Route>
                            </Route>

                            <Route
                                element={
                                    <Authenticated fallback={<Outlet />}>
                                        <NavigateToResource resource="members" />
                                    </Authenticated>
                                }
                            >
                                <Route
                                    path="/login"
                                    element={
                                        <AuthPage
                                            type="login"
                                            formProps={{
                                                initialValues: {
                                                    email: "demo@refine.dev",
                                                    password: "demodemo",
                                                },
                                            }}
                                        />
                                    }
                                />
                                <Route
                                    path="/register"
                                    element={
                                        <AuthPage
                                            type="register"
                                            formProps={{
                                                initialValues: {
                                                    email: "demo@refine.dev",
                                                    password: "demodemo",
                                                },
                                            }}
                                        />
                                    }
                                />
                                <Route
                                    path="/forgot-password"
                                    element={<AuthPage type="forgotPassword" />}
                                />
                                <Route
                                    path="/update-password"
                                    element={<AuthPage type="updatePassword" />}
                                />
                            </Route>

                            <Route
                                element={
                                    <Authenticated>
                                        <ThemedLayoutV2
                                            Header={Header}
                                            Title={Title}
                                            OffLayoutArea={OffLayoutArea}
                                        >
                                            <Outlet />
                                        </ThemedLayoutV2>
                                    </Authenticated>
                                }
                            >
                                <Route path="*" element={<ErrorComponent />} />
                            </Route>
                        </Routes>
                        <UnsavedChangesNotifier />
                        <DocumentTitleHandler />
                    </Refine>
                </RefineKbarProvider>
            </ConfigProvider>
        </BrowserRouter>
    );
};

export default App;

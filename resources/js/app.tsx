import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot, hydrateRoot } from 'react-dom/client';
import {ConfigProvider} from "antd";

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.tsx`,
            import.meta.glob('./Pages/**/*.tsx'),
        ),
    setup({ el, App, props }) {
        if (import.meta.env.SSR) {
            hydrateRoot(el,  <ConfigProvider
                theme={{
                    token: {
                        // Seed Token
                        colorPrimary: '#00b96b',
                        borderRadius: 2,

                        // Alias Token
                        colorBgContainer: '#f6ffed',
                    },
                }}
            >
                <App {...props} />
            </ConfigProvider>);
            return;
        }

        createRoot(el).render( <ConfigProvider
            theme={{
                token: {
                    // Seed Token
                    colorPrimary: '#00b96b',
                    borderRadius: 2,

                    // Alias Token
                    colorBgContainer: '#f6ffed',
                },
            }}
        >
            <App {...props} />
        </ConfigProvider>);
    },
    progress: {
        color: '#4B5563',
    },
});

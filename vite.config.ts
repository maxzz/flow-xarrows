import { createLogger, defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const logger = createLogger();
const loggerInfo = logger.info;

logger.info = (msg, options) => {
    if (msg.includes('Could not Fast Refresh')) {
        return;
    }
    loggerInfo(msg, options);
};

// https://vitejs.dev/config/
export default defineConfig({
    base: '',
    plugins: [react()],
    customLogger: logger,
    server: {
        port: 3000,
    },
});

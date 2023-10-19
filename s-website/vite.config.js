import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "source-map-js": "./src/.junk/builtins_placeholder.tsx",
    }
  },
  plugins: [
    nodePolyfills(),
    react()
  ],
})

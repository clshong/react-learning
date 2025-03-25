import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      filename: './stats.html',
      open: true
    })
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, './src')
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'static',
    manifest: true,
    // 代码分割
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'
          }
        }
      }
    },
    // 压缩配置
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom' // 预加载高频依赖
    ]
  },
  // 开发服务器配置
  server: {
    port: 3000,
    open: true,
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true
      }
    }
  }
})
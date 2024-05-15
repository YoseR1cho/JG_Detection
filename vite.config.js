import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import {viteMockServe} from "vite-plugin-mock";
const isDevelopment = process.env.NODE_ENV === 'development'

// https://vitejs.dev/config/
//配置参数

export default defineConfig({
  base:'./',
  plugins: [
      react(),
      viteMockServe({
        mockPath:'./src/mock',
        enable:true
      })
  ],
  resolve:{
    alias:{
      '@':path.resolve(__dirname,'./src')
    }
  },
  build:{
    target:"es2015"
  },
  server:{
    port:3000,
    open:false,
    proxy:{
      '/api':{
        target:'https://localhost:8080',
        changeOrigin:true,
        secure: false,
        rewrite:(path)=>path.replace(/^\/api/, '')
      },
      '/server':{
        target:'http://localhost:3004',
        changeOrigin:true,
        rewrite:(path)=>path.replace(/^\/server/, '')
      }
    }
  }
})

import { URL, fileURLToPath } from 'node:url'
import path from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite'
import vuesetupExtend from 'vite-plugin-vue-setup-extend'

// import Components from 'unplugin-vue-components/vite'
// import { VantResolver } from 'unplugin-vue-components/resolvers'
import AutoImport from 'unplugin-auto-import/vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  plugins: [
    vue({
      script: {
        defineModel: true,
      },
    }),
    Unocss(),
    vuesetupExtend(),
    vueJsx(),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/svgs')],
      symbolId: 'icon-[dir]-[name]',
    }),
    // Components({
    //   resolvers: [VantResolver()],
    // }),
    AutoImport({
      imports: ['vue'],
      cache: false,
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    minify: false,
    rollupOptions: {
      onwarn: (warning) => {
        if (warning.code === 'PLUGIN_WARNING')
          return
      },
      external: ['vue', '@vueuse/core'],
      output: {
        exports: 'named',
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          'vue': 'Vue',
          '@vueuse/core': 'VueUse',
        },
        plugins: [],
      },
    },
    lib: {
      entry: 'src/index.js',
      name: 'vue3directive',
      fileName: 'vue3directive',
      formats: ['es', 'umd'],
    },
  },
})

import { createRequire } from 'module'

const require = createRequire(import.meta.url)

const { version } = require('./package.json')

const mode = process.env.NODE_ENV || 'development'
const dev = mode === 'development'

const { rmSync, mkdirSync, writeFileSync } = require('fs')
const sass = require('sass')
const esbuild = require('esbuild')

rmSync(`../wwwroot/dist/${version}`, {
  recursive: true,
  force: true
})

const clientResult = await esbuild.build({
  entryPoints: {
    './main': './src/main.js',
    './views/layouts/main': './src/views/layouts/main.js',
    './views/pages/routes-list': './src/views/pages/routes-list.js',
    './views/pages/routes-route': './src/views/pages/routes-route.js'
  },
  outdir: `../wwwroot/dist/${version}/js`,
  format: 'esm',
  target: 'esnext',
  bundle: true,
  splitting: true,
  sourcemap: dev,
  minify: !dev
})

console.log('client - ', clientResult)

const styles = sass.compile('./src/styles/main.scss', {
  style: !dev ? 'compressed' : undefined,
  sourceMap: dev,
  loadPaths: ['node_modules/']
})

const dirPath = `../wwwroot/dist/${version}/css`

mkdirSync(dirPath, {
  recursive: true
})

writeFileSync(
  `${dirPath}/main.css`, 
  styles.css, {
    flag: 'w+'
  }
)

console.log('styles - compiled')

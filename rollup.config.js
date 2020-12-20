import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import { minify } from 'html-minifier-terser';
import minifyHTML from 'rollup-plugin-minify-html-literals';
import strip from '@rollup/plugin-strip';
import copy from 'rollup-plugin-copy';

const packages = [
  { folder: 'forms', name: 'button' },
  { folder: 'forms', name: 'textfield' },
  { folder: 'helpers', name: 'icon' }
];

const htmlCopyTransform = (contentsRaw) => {
  let contents = contentsRaw.toString();
  const out = minify(contents, {
    removeComments: true,
    collapseWhitespace: true,
    minifyCSS: true,
    minifyJS: true
  });
  return out;
};

const configs = [];
packages.forEach((pkg) => {
  const es6 = {
    input: `packages/${pkg.folder}/${pkg.name}/build/cwc-${pkg.name}.js`,
    output: {
      file: `packages/${pkg.folder}/${pkg.name}/cwc-${pkg.name}.js`,
      format: 'es',
      sourcemap: false
    },
    plugins: [
      nodeResolve(),
      strip({ functions: ['console.log'] }),
      minifyHTML(),
      terser(),
      copy({
        targets: [
          {
            src: `packages/${pkg.folder}/${pkg.name}/cwc-${pkg.name}.js`,
            dest: `packages/${pkg.folder}/${pkg.name}`,
            transform: htmlCopyTransform
          },
          {
            src: `packages/${pkg.folder}/${pkg.name}/build/*.d.ts`,
            dest: `packages/${pkg.folder}/${pkg.name}`
          }
        ]
      })
    ],
    watch: {
      include: ['*.ts'],
      exclude: ['node_modules/**']
    }
  };
  configs.push(es6);
});

export default configs;

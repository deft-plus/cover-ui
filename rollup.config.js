import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import { minify } from 'html-minifier-terser';
import minifyHTML from 'rollup-plugin-minify-html-literals';
import strip from '@rollup/plugin-strip';
import copy from 'rollup-plugin-copy';

const packageNames = [
  'cwc-button',
  'cwc-textfield'
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
packageNames.forEach((name) => {
  const es6 = {
    input: `packages/${name}/build/${name}.js`,
    output: {
      file: `packages/${name}/${name}.js`,
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
            src: `packages/${name}/${name}.js`,
            dest: `packages/${name}`,
            transform: htmlCopyTransform
          },
          {
            src: `packages/${name}/build/*.d.ts`,
            dest: `packages/${name}`
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

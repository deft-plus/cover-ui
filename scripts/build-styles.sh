#!/usr/bin/env bash
set -e
sassfiles=(`find packages -name "*.scss"`)
for sassfile in ${sassfiles[@]}; do
  # skip partials
  if [[ `basename ${sassfile}` =~ ^_ ]]; then
    continue
  fi
  cssts=`echo ${sassfile} | sed -e 's/.scss/-css.ts/'`
  echo "Generating ${cssts}"
  node scripts/sass-render.js -s ${sassfile} -o ${cssts}
done
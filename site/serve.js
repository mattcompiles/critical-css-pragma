import path from 'path';
import { promises as fs, existsSync } from 'fs';

import { serve } from 'esbuild';

const outdir = path.join(process.cwd(), 'dist');

if (existsSync(outdir)) {
  await fs.rm(outdir, { recursive: true });
}

await fs.mkdir(outdir);

await serve(
  { servedir: outdir, port: 8080 },
  {
    logLevel: 'info',
    entryPoints: [path.join(process.cwd(), '/src/index.tsx')],
    platform: 'browser',
    outdir,
    bundle: true,
    jsxFactory: 'jsx',
  },
);

await fs.writeFile(
  path.join(outdir, 'index.html'),
  `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <title>App</title>
      </head>
    <body>
      <div id="app"></div>
      <script src="index.js"></script>
    </body>
    </html>
  `,
);

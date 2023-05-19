import json from "@rollup/plugin-json";
import image from "@rollup/plugin-image";
import terser from "@rollup/plugin-terser";
import { rollupPluginHTML as html } from "@web/rollup-plugin-html";
import zip from "rollup-plugin-zip";
import serve from "rollup-plugin-serve";

import path from "path";
import fs from "fs";
import chalk from "chalk";

const bundleSize = function ({ file }) {
  return {
    name: "rollup-plugin-bundle-size",
    writeBundle: {
      secuential: true,
      order: "post",
      async handler(options, bundle) {
        let uncompressedSize = 0;
        for (const file in bundle) {
          const { code, source } = bundle[file];
          uncompressedSize += code?.length || source?.length;
        }

        console.log(
          "total before compression: " +
            chalk.bold(chalk.green(uncompressedSize)) +
            " bytes."
        );

        const asset = path.join(options.dir, file);
        const { size } = fs.statSync(asset);
        const percent = parseInt((size / 13312) * 100, 10);
        const color =
          percent < 50 ? chalk.green : percent < 80 ? chalk.yellow : chalk.red;

        console.log(
          `created bundle ${chalk.cyan(asset)}: ${chalk.bold(
            chalk.cyan(size)
          )} bytes, ${color(percent + "%")} of total game size used.`
        );
      },
    },
  };
};

const zipPlug = zip({ file: "game.zip" });
zipPlug.writeBundle.sequential = true;

/**
 * @type {import('rollup').RollupOptions}
 */
export default {
  input: "public/index.html",
  output: [
    {
      inlineDynamicImports: true,
      dir: "dist",
      format: "iife",
    },
    {
      inlineDynamicImports: true,
      dir: "dist/min",
      format: "iife",
      name: "version",
      plugins: [terser(), zipPlug, bundleSize({ file: "game.zip" })],
    },
  ],
  plugins: [html({ minify: true }), json(), image(), serve("dist/min")],
};

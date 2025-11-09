import { program } from 'commander'

program
  .option('-f, --config <file>', 'use specified config file', './raykit.config.ts')
  .option('-m, --mode <mode>', 'set env mode')

program
  .command('dev', 'start dev server and electron app')
  .alias('serve')
  .option('-w, --watch', 'rebuilds when main process or preload script modules have changed on disk')
  .option('--rendererOnly', 'only dev server for the renderer')
  .action((a, b, c) => {
    console.log(a, b, c)
  })

program.parse()

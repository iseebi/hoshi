import { program } from 'commander';
import { handlePublish } from './handlers';

program.option('-p, --project <projectDir>', 'project root directory', '.');

program
  .command('publish')
  .description('publish translation files')
  .argument('[packages...]', 'publish target package names')
  .option('-v, --version <version>', 'publish translations at version')
  .option('-f, --format <format>', 'publish format')
  .option('-o, --outDir <dir>', 'output directory', '_published')
  .action((packages, _, cmd) => handlePublish({ packages, options: cmd.optsWithGlobals() }).then());

program.parse();

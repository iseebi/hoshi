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
  .action(async (packages, _, cmd) => {
    const result = await handlePublish({ packages, options: cmd.optsWithGlobals() });
    if (result.status === 'error') {
      program.error(result.error);
    }
  });

async function main(): Promise<void> {
  await program.parseAsync(process.argv);
}

main().then();

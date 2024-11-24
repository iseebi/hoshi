import { program } from 'commander';
import detectContext from './context';
import { handleCreatePackage, handleCreateProject, handleCreateVersion, handlePublish } from './handlers';

program.option('-p, --project <projectDir>', 'project root directory');

program
  .command('publish')
  .description('publish translation files')
  .argument('[packages...]', 'publish target package names')
  .option('-v, --version <version>', 'publish translations at version')
  .option('-f, --format <format>', 'publish format')
  .option('-o, --outDir <dir>', 'output directory', '_published')
  .action(async (packages, _, cmd) => {
    const ctx = await detectContext(cmd.optsWithGlobals());
    if (ctx.status !== 'success') {
      program.error(`context error: ${ctx.error.message}`);
    }

    const result = await handlePublish({ packages, context: ctx.data, options: cmd.optsWithGlobals() });
    if (result.status === 'error') {
      program.error(result.error);
    }
  });

const projects = program.command('projects');
projects
  .command('create')
  .description('create a new project')
  .argument('<name>', 'project name')
  .action(async (name, _, cmd) => {
    const result = await handleCreateProject({ name, options: cmd.optsWithGlobals() });
    if (result.status === 'error') {
      program.error(result.error);
    }
  });

const packages = program.command('packages');
packages
  .command('create')
  .description('create a new package')
  .argument('<name>', 'package name')
  .action(async (name, _, cmd) => {
    const ctx = await detectContext(cmd.optsWithGlobals());
    if (ctx.status !== 'success') {
      program.error(`context error: ${ctx.error.message}`);
    }

    const result = await handleCreatePackage({ name, context: ctx.data, options: cmd.optsWithGlobals() });
    if (result.status === 'error') {
      program.error(result.error);
    }
  });

const versions = program.command('versions');
versions
  .command('create')
  .description('create a new version')
  .argument('<name>', 'version name')
  .action(async (name, _, cmd) => {
    const ctx = await detectContext(cmd.optsWithGlobals());
    if (ctx.status !== 'success') {
      program.error(`context error: ${ctx.error.message}`);
    }

    const result = await handleCreateVersion({ name, context: ctx.data, options: cmd.optsWithGlobals() });
    if (result.status === 'error') {
      program.error(result.error);
    }
  });

/*
const debug = program.command('debug');
debug
  .command('context')
  .description('show context')
  .action(async (_, cmd) => {
    const ctx = await detectContext(cmd.optsWithGlobals());
    if (ctx.status !== 'success') {
      program.error(`context error: ${ctx.error.message}`);
    }
    console.log(ctx.data);
  });
 */

async function main(): Promise<void> {
  await program.parseAsync(process.argv);
}

main().then();

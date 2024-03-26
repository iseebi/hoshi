import * as util from 'util';
import * as childProcess from 'child_process';

const exec = util.promisify(childProcess.exec);

const PREFIX = 'HOSHI_META_';

class VariablesDatastore {
  // eslint-disable-next-line class-methods-use-this
  public getVariables(): Record<string, string> {
    return Object.keys(process.env)
      .filter((v) => v.startsWith('HOSHI_META_'))
      .reduce(
        (acc, rawKey) => {
          const k = rawKey.substring(PREFIX.length).toLowerCase();
          acc[k] = process.env[rawKey] as string;
          return acc;
        },
        {} as Record<string, string>,
      );
  }

  public async getGitVariablesAsync(baseDir: string): Promise<Record<string, string>> {
    const commitSha = process.env.GITHUB_SHA || (await this.readGitHeadAsync(baseDir));
    if (!commitSha) {
      return {};
    }
    const commitDate = await this.readGitDateAsync(baseDir, commitSha);
    if (!commitDate) {
      return {};
    }
    return {
      // eslint-disable-next-line prettier/prettier
      commit_sha: commitSha,
      // eslint-disable-next-line prettier/prettier
      commit_date: new Date(commitDate * 1000).toISOString(),
      // eslint-disable-next-line prettier/prettier
      commit_date_timestamp: commitDate.toString(),
    };
  }

  // eslint-disable-next-line class-methods-use-this
  private async readGitHeadAsync(baseDir: string): Promise<string | null> {
    try {
      const result = await exec('git log -n 1 --format=%H', { encoding: 'utf8', cwd: baseDir });
      return result.stdout ? result.stdout : null;
    } catch (e) {
      return null;
    }
  }

  // eslint-disable-next-line class-methods-use-this
  private async readGitDateAsync(baseDir: string, commitSha: string): Promise<number | null> {
    try {
      const result = await exec(`git log -1 --format=%cd --date=unix ${commitSha}`, { encoding: 'utf8', cwd: baseDir });
      if (!result.stdout) {
        return null;
      }
      const ts = parseInt(result.stdout, 10);
      if (Number.isNaN(ts)) {
        return null;
      }
      return ts;
    } catch (e) {
      return null;
    }
  }
}

export default VariablesDatastore;

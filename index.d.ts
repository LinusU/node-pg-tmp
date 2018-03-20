interface ConnectionOptions {
  host: string;
  user: string;
  password: string;
  database: string;
}

function pgTmp(setEnvironment?: boolean, opts?: string[]): Promise<ConnectionOptions>

export = pgTmp

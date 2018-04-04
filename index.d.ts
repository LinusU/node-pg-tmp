interface ConnectionOptions {
  host: string;
  user: string;
  password: string;
  database: string;
}

interface PgTmpOptions {
  setEnvironment?: boolean
  timeout?: number
}

function pgTmp(options?: PgTmpOptions): Promise<ConnectionOptions>

export = pgTmp

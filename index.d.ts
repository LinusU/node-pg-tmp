interface ConnectionOptions {
  host: string;
  user: string;
  password: string;
  database: string;
}

function pgTmp(setEnvironment?: boolean): Promise<ConnectionOptions>

export = pgTmp

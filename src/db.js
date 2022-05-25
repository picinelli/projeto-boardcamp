import pg from 'pg';
import 'dotenv/config'

const {Pool} = pg

const client = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default client

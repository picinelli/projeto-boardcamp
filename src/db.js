import pg from 'pg';
import 'dotenv/config'

const {Pool} = pg

const client = new Pool({
  connectionString: process.env.DATABASE_URL,
});

if(process.env.MODE === "PROD") {
  client.ssl = {
    rejectUnauthorized: false
  }
}

export default client

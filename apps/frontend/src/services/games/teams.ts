import { connect } from "@planetscale/database";

const config = {
  host: import.meta.env.VITE_DATABASE_HOST,
  username: import.meta.env.VITE_DATABASE_USERNAME,
  password: import.meta.env.VITE_DATABASE_PASSWORD,
};

export async function fetchTeams() {
  const conn = connect(config);

  return conn.execute("SELECT * FROM teams");
}

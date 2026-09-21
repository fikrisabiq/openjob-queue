import { Pool } from 'pg';

class AppsService {
  constructor() {
    this._pool = new Pool();
  }

  async getApps(appId) {
    const query = {
      text: `SELECT 
        pelamar.email AS email,
        pelamar.name AS pelamar,
        jobs.title,
        pemilik.name AS pemilik,
        pemilik.email AS target_email,
        companies.name AS perusahaan,
        applications.created_at AS dibuat 
      FROM applications
      INNER JOIN users AS pelamar ON applications.user_id = pelamar.id
      INNER JOIN jobs ON applications.job_id = jobs.id
      INNER JOIN companies ON jobs.company_id = companies.id
      INNER JOIN users AS pemilik ON companies.owner = pemilik.id
      WHERE applications.id = $1`,
      values: [appId],
    };

    const result = await this._pool.query(query);
    return result.rows[0];
  }
}

export default AppsService;
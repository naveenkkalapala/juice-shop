// Minimal custom-rule test fixtures. These are not production source files.
declare const models: any;
declare const req: any;
declare const security: any;

function riskySql() {
  // ruleid: acme-sequelize-template-sql
  models.sequelize.query(`SELECT * FROM Users WHERE email = '${req.body.email}'`);
}

function safeSql() {
  // ok: acme-sequelize-template-sql
  models.sequelize.query('SELECT * FROM Users WHERE email = ?', {
    replacements: [req.body.email]
  });
}

function riskyPassword() {
  // ruleid: acme-hardcoded-password-comparison
  return req.body.password === 'admin123';
}

function safePassword() {
  // ok: acme-hardcoded-password-comparison
  return security.checkPassword(req.body.password);
}

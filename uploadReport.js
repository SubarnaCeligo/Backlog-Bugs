const ftp = require("@celigo/aut-utilities");
const args = process.argv;
ftp.uploadReport(
  process.env["ENV"],
  process.env["FEATURE"]
);
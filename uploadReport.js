const ftp = require("@celigo/aut-utilities");
const args = process.argv;
ftp.uploadReport(
  "IO/PlatformReact/" + args[2],
  args[3],
  args[4],
  args[5]
);

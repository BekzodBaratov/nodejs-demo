const bcrypt = require("bcrypt");

async function getSalt(pwd) {
  const salt = await bcrypt.genSalt();
  const pwdSalt = await bcrypt.hash(pwd, salt);
  console.log(salt);
  console.log(pwdSalt);
}
getSalt("bekzod");

const version = process.versions.node.split(".");
const major = parseInt(version[0], 10);

if (major < 18 || major >= 21) {
  console.error(`❌ Node version ${process.versions.node} not supported. Requires >=18 and <21.`);
  process.exit(1);
}

console.log(`✔ Node version ${process.versions.node} OK`);

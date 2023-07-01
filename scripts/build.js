const { exec } = require("child_process");
const fs = require("fs");
const fse = require("fs-extra");

exec(
  "npx ncc build app.js -o build -m",
  { encoding: "utf8" },
  (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log("Build finished!");
  }
);

const partials = `./src/partials`;
const partialsDist = `./build/partials`;

// To copy a folder or file, select overwrite accordingly
try {
  fse.copySync(partials, partialsDist, { overwrite: true | false });
  console.log("Partical folder copy completed");
} catch (err) {
  console.error(err);
}

const public = `./src/public`;
const publicDist = `./build/public`;

// To copy a folder or file, select overwrite accordingly
try {
  fse.copySync(public, publicDist, { overwrite: true | false });
  console.log("Public folder copy completed");
} catch (err) {
  console.error(err);
}

import { readdir } from "fs";

function listNestedFiles(dir, cb) {
  function handleError(err) {
    if (err.errno !== -20) {
      return cb(err);
    }
  }

  readdir(dir, (err, files) => {
    if (err) {
      handleError(err);
      return;
    }

    cb(null, dir, files);
    files.forEach(file => listNestedFiles(`${dir}/${file}`, cb));
  });
}

listNestedFiles("../chapter-4", (err, parent, files) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log(
    `parent : ${parent}, files : ${files.length !== 0 ? files.join(", ") : "X"}`
  );
});

import { readFile, appendFile } from "fs";

function concatFiles(cb, dest, ...srcFiles) {
  const src = srcFiles.shift();
  if (!src) {
    return cb(null, "No more files to concat\nConcatenation complete");
  }

  readFile(src, "utf8", (err, data) => {
    if (err) {
      return cb(err);
    }
    appendFile(dest, data, "utf8", err => {
      if (err) {
        return cb(err);
      }
      concatFiles(cb, dest, ...srcFiles);
    });
  });
}

concatFiles(
  (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(data);
  },
  "dest.txt",
  "fileA.txt",
  "fileB.txt",
  "fileC.txt"
);

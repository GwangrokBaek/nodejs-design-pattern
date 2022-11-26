import * as fs from "fs";

export function recursiveFind(dir, keyword, queue) {
  queue.pushTask(done => {
    findTask(dir, keyword, queue, done);
  });
}

function findTask(dir, keyword, queue, cb) {
  fs.readdir(dir, (err, files) => {
    if (err) {
      if (err.code !== "ENOTDIR") {
        return cb(err);
      }

      return fs.readFile(dir, "utf8", (err, data) => {
        if (err) {
          return cb(err);
        }

        if (data.includes(keyword)) {
          return cb(null, dir.split("/").pop());
        }
        return cb(null, null);
      });
    }

    files.forEach(file => {
      const path = `${dir}/${file}`;
      recursiveFind(path, keyword, queue, cb);
    });

    return cb(null, null);
  });
}

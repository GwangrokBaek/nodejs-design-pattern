import { EventEmitter } from "events";
import { readFileSync } from "fs";
const emitter = new EventEmitter();

emitter.on("event1", () => {}).on("event2", () => {});

class FindRegex extends EventEmitter {
  constructor(regex) {
    super();
    this.regex = regex;
    this.files = [];
  }

  addList(files) {
    files.forEach(file => this.addFile(file));
    return this;
  }

  find() {
    for (const file of this.files) {
      let content;
      try {
        content = readFileSync(file, "utf8");
      } catch (err) {
        this.emit("error", err);
      }

      this.emit("fileread", file);
      const match = content?.match(this.regex);
      if (match) {
        match.forEach(elem => this.emit("found", file, elem));
      }
    }
    return this;
  }
}

const findRegexInstance = new FindRegex(/hello \w+/);
findRegexInstance
  .addList(["fileA.txt", "fileB.json"])
  .on("found", (file, match) =>
    console.log(`Matched "${match}" in file ${file}`)
  )
  .on("error", err => console.error(`Error emitted: ${err.message}`))
  .find();

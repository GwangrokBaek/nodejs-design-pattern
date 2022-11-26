import { recursiveFind } from "./find.js";
import { TaskQueue } from "./queue.js";

const recursiveFindQueue = new TaskQueue(4);
recursiveFindQueue.on("error", console.error).on("empty", foundList => {
  console.log(foundList);
});

recursiveFind("dirA", "batman", recursiveFindQueue, err => {
  if (err) {
    console.error(err);
    return;
  }
});

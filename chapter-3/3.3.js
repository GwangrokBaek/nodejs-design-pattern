import { EventEmitter } from "events";

function ticker(number, callback) {
  let event = new EventEmitter();
  let count = 0;

  let repeat = (count, callback) => {
    count++;
    event.emit("tick", undefined);

    if ((count - 1) * 50 < number) {
      setTimeout(() => repeat(count, callback), 50);
    } else {
      callback(undefined, count);
    }
  };

  setTimeout(() => {
    event.emit("tick", undefined);
    repeat(count + 1, callback);
  }, 50);

  return event;
}

ticker(300, (err, count) => {
  console.log("done", count);
}).on("tick", () => {
  console.log("tick");
});

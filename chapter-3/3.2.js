import { EventEmitter } from "events";

function ticker(number, callback) {
  let event = new EventEmitter();
  let count = 0;

  let repeat = (count, callback) => {
    count++;
    event.emit("tick", undefined);

    if (count * 50 < number) {
      setTimeout(() => repeat(count, callback), 50);
    } else {
      callback(undefined, count);
    }
  };

  setTimeout(() => {
    repeat(count, callback);
  }, 50);

  return event;
}

ticker(300, (err, count) => {
  console.log("done", count);
}).on("tick", () => {
  console.log("tick");
});

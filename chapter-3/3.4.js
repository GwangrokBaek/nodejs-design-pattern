import { EventEmitter } from "events";

function ticker(number, callback) {
  let event = new EventEmitter();
  let count = 0;

  let repeat = (count, callback) => {
    count++;
    event.emit("tick", undefined);

    let timestamp = Date.now();
    if (timestamp % 5 === 0) {
      event.emit("error", new Error(timestamp));
      return callback(new Error("Error"), count);
    }

    if ((count - 1) * 50 < number) {
      setTimeout(() => repeat(count, callback), 50);
    } else {
      callback(undefined, count);
    }
  };

  setTimeout(() => {
    event.emit("tick", undefined);
    let timestamp = Date.now();
    if (timestamp % 5 === 0) {
      event.emit("error", new Error(timestamp));
      return callback(new Error("Error"), count);
    }
    repeat(count + 1, callback);
  }, 50);

  return event;
}

ticker(300, (err, count) => {
  if (err) {
    console.log("done with error count : ", count);
  } else {
    console.log("done", count);
  }
})
  .on("tick", () => {
    console.log("tick");
  })
  .on("error", err => {
    console.log(`Error emitted at ${err.message}`);
  });

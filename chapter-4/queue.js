import { EventEmitter } from "events";

export class TaskQueue extends EventEmitter {
  constructor(concurrency) {
    super();

    this.concurrency = concurrency;
    this.running = 0;
    this.queue = [];
    this.foundList = [];
  }

  pushTask(task) {
    this.queue.push(task);
    process.nextTick(this.next.bind(this));
    return this;
  }

  next() {
    if (this.running == 0 && this.queue.length === 0) {
      return this.emit("empty", this.foundList);
    }

    while (this.running < this.concurrency && this.queue.length) {
      const task = this.queue.shift();
      task((err, file) => {
        if (err) {
          this.emit("error", err);
        }

        if (file) {
          this.foundList.push(file);
        }

        this.running--;
        process.nextTick(this.next.bind(this));
      });
      this.running++;
    }
  }
}

// Logic file
// RxJS
// - Observable = Stream
// - Subject = Observable on batteries
class Subject {
  subscribers = [];

  subscribe(subscriber) {
    this.subscribers.push(subscriber);
    const unsubscribe = () => {
      const subIndex = this.subscribers.indexOf(subscriber);
      if (subIndex >= 0) {
        this.subscribers.splice(subIndex, 1);
      } else {
        throw new Error('subscriber is not found');
      }
    };
    return { unsubscribe };
  }

  next(value) {
    this._callAction('next', value);
  }

  complete() {
    this._callAction('complete');
    this._clearSubscribers();
  }

  error(reason) {
    this._callAction('error', reason);
    this._clearSubscribers();
  }

  _callAction(actionName, value) {
    this.subscribers.forEach((subscriber) => {
      subscriber[actionName]?.(value);
    });
  }

  _clearSubscribers() {
    this.subscribers.length = 0;
  }
}

module.exports = {
  Subject,
};

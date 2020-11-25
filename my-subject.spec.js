// Test file
const { Subject } = require('./my-subject');

describe('Subject', () => {
  it('should be creatable', () => {
    expect(() => new Subject()).not.toThrowError();
  });

  it('should register subscribers', () => {
    const s = new Subject();
    let counter = 0;
    s.subscribe({
      next(value) {
        counter += value;
      },
    });

    s.next(1);
    s.next(4);
    expect(counter).toEqual(5);
  });

  it('should be possible to complete the stream', () => {
    const s = new Subject();
    let counter = 5;
    s.subscribe({
      complete() {
        counter = 0;
      },
    });
    s.next(2);
    s.next(4);
    s.complete();
    expect(counter).toEqual(0);
  });

  it('should handle error action', () => {
    const s = new Subject();
    let counter = 0;
    s.subscribe({
      next(value) {
        counter += value;
      },
      error() {
        counter = -1;
      },
    });
    s.next(1);
    expect(counter).toEqual(1);
    s.error();
    expect(counter).toEqual(-1);
  });

  it('should ignore next values when stream is complete', () => {
    const s = new Subject();
    let counter = 0;
    s.subscribe({
      next(value) {
        counter += value;
      },
    });
    s.next(1);
    s.next(2);
    expect(counter).toEqual(3);
    s.complete();
    s.next(3);
    expect(counter).toEqual(3);
  });

  it('should ignore next values when stream is error', () => {
    const s = new Subject();
    let counter = 0;
    s.subscribe({
      next(value) {
        counter += value;
      },
    });
    s.next(1);
    s.next(2);
    expect(counter).toEqual(3);
    s.error();
    s.next(3);
    expect(counter).toEqual(3);
  });

  it('should be able to define reason when error occur', () => {
    const s = new Subject();
    let message = '';
    s.subscribe({
      error(value) {
        message = value;
      },
    });
    s.next(123);
    s.error('ups!');
    expect(message).toEqual('ups!');
  });

  it('should unsubscribe subscriber', () => {
    const s = new Subject();
    let counter = 0;
    const subscription = s.subscribe({
      next(value) {
        counter += value;
      },
    });
    s.next(1);
    s.next(1);
    expect(counter).toEqual(2);
    subscription.unsubscribe();
    s.next(1);
    expect(counter).toEqual(2);
  });

  it('should throw an error when unsubscribe method calls more that one', () => {
    const s = new Subject();
    let counter = 0;
    const subscription = s.subscribe({
      next(value) {
        counter += value;
      },
    });
    subscription.unsubscribe();
    expect(() => subscription.unsubscribe()).toThrowError();
  });
});

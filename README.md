# my-subject

My implementation of RxJS `Subject`. I used TDD to create this project.

## Video Tutorial (PL 🇵🇱)

[![](https://i3.ytimg.com/vi/cmFgh73U2zg/maxresdefault.jpg)](https://www.youtube.com/watch?v=cmFgh73U2zg)

## Features

* :white_check_mark: Making a subscription
* :white_check_mark: Pushing a value to all subscriptions

## Usage

```javascript
const sub = new Subject();
sub.subscribe({
  next(value) {
    console.log(value)
  },
});
sub.next(1); // 1
sub.next('cookie'); // "cookie"
```

## Unit tests

```bash
npm test
```

## License

[The MIT License](http://piecioshka.mit-license.org) @ 2020

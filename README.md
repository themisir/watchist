# Watchist
[![npm version](https://badge.fury.io/js/watchist.svg)](https://www.npmjs.com/package/watchist)

Reload browser automatically when file system is changed. Why it's required? Because, reloading browser is really annoying thing.

# How works?
Watchist looks for file system changes using `chokidar` package. And uses long polling technique to detect file system is changed or not.

# Installation
Install package using `npm`.
```batch
$ npm install -g watchist
```

# Documentation
It's very very easy to configure and use watchist on your PC, Mac and Linux.

## 1. Add the script to end of your html file
Add `watchist.min.js` to end of your html file to enable auto refresh.
```html
<script src="https://cdn.jsdelivr.net/npm/watchist/watchist.min.js"></script>
```
If you want to use it with customized parameters then add your parameters to `window.Watchist` object like that.
```html
<script>
window.Watchist = {
    // Custom host (with port number)
    host   : 'http://localhost:2588',
    // Custom reload function
    reload : () => location.reload()
};
</script>
<script src="https://cdn.jsdelivr.net/npm/watchist/watchist.min.js"></script>
```

## 2. Start watchist `cli`
Open your terminal (or command promt in windows) and type this code:
```bash
$ watchist
```
You can customize watchist by adding some parameters.

| **Parameter** | **Alternative** | **Example**   | **Description**                            |
|---------------|-----------------|---------------|--------------------------------------------|
| --port=<PORT> | -p=<PORT>       | `--port=8080` | Defines custom server port (default: 2588) |
| --debug       | -d              | `--debug`     | Enables debug mode                         |
> Warning: You must change host *(`window.Watchist.host = 'http://localhost:<PORT>'`)* in your client script if you have changed the port number

```bash
# Set port number to 8080 and enable debug mode
$ watchlist --port=8080 --debug
# or using alternative arguments
$ watchlist -p=8080 -d
```

> Note: You can also use `watch` comment instead of `wantchist`.
# require-env-var
## Easily require environment variables _or else_

Our projects are litered with environment variables. If we're doing things correctly, we're using a `.env` file and not checking it into source control. We're probably also using something along the lines of `.env.example` to track what variables _should_ be set in our `.env`.

This may be fine when working solo or on a small team, but with larger projects it's easy to miss changes to `.env.example`. Furthermore, undefined environment variables don't always present themselves in the most obvious of ways.

**`require-env-var` is a small library that helps with that.** It allows you to specify which environment variables are _required_, and if they don't exist you get an error message telling you what key is missing. Additionally, it provides support for specifying multiple keys (first one wins) as well as a fallback in case no keys are found.



## Installation

Install using `yarn`:

```
yarn add require-env-var
```

Install using `npm`:

```
npm install --save require-env-var
```



## Usage

`require-env-var` exposes a single function:

```js
const requireEnvVar = require('require-env-var');

const port = requireEnvVar('PORT');
```

You can also use ES6-style imports if you'd like:

```js
import requireEnvVar from 'require-env-var';

const clientId = requireEnvVar('CLIENT_ID');
```

You can provide an array of keys and `require-env-var` will return the first one that is set:

```js
const port = requireEnvVar(['SERVER_PORT', 'PORT']);
```

If none of the keys provided exist, `require-env-var` will throw an error:

```
Required environment variable [SERVER_PORT or PORT] is not set!
```

However, if you specify a fallback, that will be returned instead:

```js
const port = requireEnvVar(['SERVER_PORT', 'PORT'], '8080');

console.log(port) // Suprise, it's `8080`!
```



## License

MIT

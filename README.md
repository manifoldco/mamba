[![Build Status](https://travis-ci.org/manifoldco/mamba.svg?branch=master)](https://travis-ci.org/manifoldco/mamba)
[![codecov](https://codecov.io/gh/manifoldco/mamba/branch/master/graph/badge.svg)](https://codecov.io/gh/manifoldco/mamba)

[![npm (scoped)](https://img.shields.io/npm/v/@arigato/mamba.svg)](https://www.npmjs.com/package/@arigato/mamba)

# mamba

A library for signing URLs using ECDSA P-521 keys and SHA-512 encryption.

## Installation

```
$ npm i @arigato/mamba
```

## Usage

The `sign` function accepts a URL and a private ECDSA P-521 encryption key. It returns the same URL with a timestamp and signature in the query denoted by `ts` and `sig`, respectively. You can use a PEM or a DER key.

### With a PEM key

```js
import { sign } from "@arigato/mamba";

const signedUrl = sign(
  "https://api.manifold.co/v1/users?bar=foo&abc=cba",
  somePrivateKey
);

// https://api.manifold.co/v1/users?bar=foo&abc=cba&ts=1543524418617&sig=MIGIAkIB8w1v%2F8VqdCXRUvKuTM7F%2F%2B8gpUJe5p2ewronH4Uakw3QD8WGGGxIpkX6bXiDdfUHxoc0K14Rl%2FBLEKQVHxK8pXYCQgFxffVMjMCUOaWbPRthEMSGL%2Fy3RuSPZigHs1RoHsqngrEvbSZwPW3ioLMxIPrjfva%2BxeAD7xHznhaaRyKU6ogX%2Bg%3D%3D
```

### With a DER key

Use `formatPrivateDERKey`, which accepts either a string or a buffer.

```js
import { sign, formatPrivateDERKey, KeyType } from "@arigato/mamba";

const signedUrl = sign(
  "https://api.manifold.co/v1/users?bar=foo&abc=cba",
  formatPrivateDERKey(somePrivateKey)
);
```

## Development

Follow the instructions below to contribute.

### Installation

Clone the repo:

```
$ git clone git@github.com:manifoldco/mamba.git
```

Then change into the directory and install dependencies:

```
$ cd mamba
$ npm i
```

### Making Changes

All code files and tests are located in the `src/` folder. After making changes, run the build command:

```
$ npm run build
```

This compiles the TypeScript to JavaScript and places it in the `dist/` folder.

### Testing

Please add tests for any new code you write. Run tests with

```
$ npm test
```

Note: you will need node 10.12.0 or higher in order to run the tests, which generate public and private keys for testing using functionality not available in previous releases.

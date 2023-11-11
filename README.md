# hoshi

Simple translation management software (Work in progress)

## Application Components

### Editor

Localizations editor built with Electron

### CLI

File export workflow tool

#### Publish

```
$ hoshi publish --project . --outDir _published packageName
```

## Development

### Install

```bash
$ npm install
```

### Development

```bash
$ npm run dev
$ npm run cli -- publish --project sample --outDir _published app
```

### Build

```bash
# For windows
$ npm run build:win

# For macOS
$ npm run build:mac

# For Linux
$ npm run build:linux
```

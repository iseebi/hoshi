# hoshi

Simple translation management software (Work in progress)

- Simple management approach inspired by database migration to fit many workflows
- Create outputs for various platforms from a single definition.
- Keep the core simple and create various support tools with scalable data specifications.
- Provide an editor with a GUI aiming for ease of use even for non-engineers.

## Application Components

### CLI

File export workflow tool

#### Publish

```
$ hoshi publish --project . --outDir _published packageName
```

### Editor

Localizations editor built with Electron

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

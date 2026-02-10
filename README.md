# hoshi

Simple translation management software (Work in progress)

- Simple management approach inspired by database migration to fit many workflows
- Create outputs for various platforms from a single definition.
- Keep the core simple and create various support tools with scalable data specifications.
- Provide an editor with a GUI aiming for ease of use even for non-engineers.

## Supported Formats

- .strings (iOS)
- .xml (Android)
- pure JSON
- TypeScript (const object with nested structure) `*`
- i18next JSON
- next-intl JSON `*`

marked `*` format supports nested structure (ex. `HomePage.title: hello!` as `{"HomePage":{"title": "hello!"}}`)

## Application Components

### CLI

File export workflow tool

#### Create Project

```
$ hoshi projects create myProject
```

#### Create Package

```
myProject $ hoshi packages create phoneApp
```

#### Create Version

```
phoneApp $ hoshi versions create 0001000_initial
```

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
$ npm run dev:editor
$ npm run dev:cli -- publish --project sample --outDir _published app
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

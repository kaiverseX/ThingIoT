
# ThingIoT
[ReactJS](https://reactjs.org/) | [Vite](https://vitejs.dev/) | [Mantine UI](https://mantine.dev/)
## Environment Variables

Generate env file.
```bash
  cp env-example .env
```

(Optional) Generate development's env.

```bash
  cp env-example .env.development
```
## Installation

Install dependencies with `pnpm` (recommended), `yarn` or `npm`

```bash
  pnpm i
```

Start the server

```bash
  pnpm dev
```
## Coding convention

Check lint and format.
```bash
  pnpm lint
```

To fix all "auto-fixable" issues.
```bash
  pnpm lint--fix
```
## Build

Build `:mode` is optional.

<sup>
By default, this command will apply environment variables from .env and exec. build for production.
The build artifacts will be stored in the dist/ directory.
</sup>

```bash
  pnpm build[:mode]
```

Preview lastest build on local.
```bash
  pnpm preview
```

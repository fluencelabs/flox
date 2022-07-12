Fluence CLI
===

A tool that makes working with Fluence network more convenient

## Table of contents:

<!-- toc -->
* [Prerequisites](#prerequisites)
* [Currently supported workflow example](#currently-supported-workflow-example)
* [Contributing](#contributing)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->

# Prerequisites

- [Node.js >=16.0.0](https://nodejs.org/)

# Currently supported workflow example

A lot of what is described next will be improved and automated in the future (e.g. development and building of marine services, key-management etc.) Currently Fluence CLI is a convenience wrapper around Aqua CLI

1. Use `fluence init` to initialize new project
2. Write your own service using rust or use an example service from [examples repository](https://github.com/fluencelabs/examples)
3. Use [marine](https://doc.fluence.dev/marine-book/) to build `.wasm` service modules
4. Create a directory with the name of your service in `artifacts` directory (e.g. if your service name is `adder` - create `artifacts/adder` directory)
5. Put `.wasm` files into `artifacts/adder` directory
6. Create `artifacts/adder/deploy.json` file. You can find examples of such files in [examples repository](https://github.com/fluencelabs/examples), where they are usually called `deployment_cfg.json`. The name of the directory and the name of the service in `deploy.json` must match. Example of `artifacts/adder/deploy.json`:

```json
{
  "adder": {
    "modules": [
      {
        "name": "adder",
        "path": "adder.wasm",
        "logger_enabled": true
      }
    ]
  }
}
```

7. Add name of your service to the `fluence.yaml` config. Example of `fluence.yaml`:

```yaml
version: 0
services:
  - name: adder
    count: 2 # Optional. Number of services to deploy
```

8. Execute `fluence deploy` to deploy the application you described in `fluence.yaml`. Random peer will be selected for deployment of all of your services (can be overridden using `--on` flag)
User-level secret key from `~/.fluence/secrets.yaml` will be used to deploy each service (can be overridden using `-k` flag)
You can also add project-level secret key to your project `.fluence/secrets.yaml` manually (key-pair management coming soon)

9. Write some aqua in `src/aqua/main.aqua`. Example `src/aqua/main.aqua`:
```aqua
module Main

import App from "deployed.app.aqua"

export App, add_one

service AddOne:
    add_one: u64 -> u64

func add_one(value: u64) -> u64:
    serviceIds <- App.serviceIds()

    on serviceIds.adder!.peerId:
        AddOne serviceIds.adder!.serviceId
        res <- AddOne.add_one(value)
    <- res
```

10. Execute `fluence run -f 'add_one(1)'`.
Function with this name will be searched inside the `src/aqua/main.aqua` (can be overridden with `--input` flag) and then it will be executed on the peer that was used for deployment  when you executed `fluence deploy` (can be overridden with `--on` flag). `"deployed.app.aqua"` file is located at `.fluence/aqua`. `App.serviceIds()` method returns ids of the previously deployed services that you can utilize in your aqua code (this info is stored at `.fluence/app.yaml`). Alternatively, if you are js developer - import generated `registerApp` function from `.fluence/ts/app.ts` or `.fluence/js/app.js` and execute it after `Fluence.run()` in your js application in order to give access to deployed services ids to your aqua code. Then compile `src/aqua/main.aqua` using Aqua CLI. Import and run `add_one(1)` in your js code.

11. Remove the previously deployed fluence application using `fluence remove`


# Contributing

To run cli in development mode use: `./bin/dev`

To run cli in production mode run `npm run build` first, then use: `./bin/run`

If you are using nvm and want to commit using VSCode - place `.huskyrc` file to your Home directory

Don't name arguments or flags with names that contain underscore symbols, because autogenerated links in markdown will not work

pre-commit runs each time before you commit. It includes prettier and generates this README.md file. 
If you want README.md file to be correctly generated please don't forget to run `npm run build` before committing

# Usage

<!-- usage -->
```sh-session
$ npm install -g @fluencelabs/cli
$ fluence COMMAND
running command...
$ fluence (--version)
@fluencelabs/cli/0.0.0 linux-x64 node-v16.14.0
$ fluence --help [COMMAND]
USAGE
  $ fluence COMMAND
...
```
<!-- usagestop -->

# Commands

<!-- commands -->
* [`fluence autocomplete [SHELL]`](#fluence-autocomplete-shell)
* [`fluence dependency [NAME] [-v] [--use <version | recommended>] [--no-input]`](#fluence-dependency-name--v---use-version--recommended---no-input)
* [`fluence deploy [--on <peer_id>] [--relay <multiaddr>] [--force] [--timeout <milliseconds>] [-k <name>] [--no-input]`](#fluence-deploy---on-peer_id---relay-multiaddr---force---timeout-milliseconds--k-name---no-input)
* [`fluence help [COMMAND]`](#fluence-help-command)
* [`fluence init [PATH] [--no-input]`](#fluence-init-path---no-input)
* [`fluence plugins`](#fluence-plugins)
* [`fluence plugins:install PLUGIN...`](#fluence-pluginsinstall-plugin)
* [`fluence plugins:inspect PLUGIN...`](#fluence-pluginsinspect-plugin)
* [`fluence plugins:install PLUGIN...`](#fluence-pluginsinstall-plugin-1)
* [`fluence plugins:link PLUGIN`](#fluence-pluginslink-plugin)
* [`fluence plugins:uninstall PLUGIN...`](#fluence-pluginsuninstall-plugin)
* [`fluence plugins:uninstall PLUGIN...`](#fluence-pluginsuninstall-plugin-1)
* [`fluence plugins:uninstall PLUGIN...`](#fluence-pluginsuninstall-plugin-2)
* [`fluence plugins update`](#fluence-plugins-update)
* [`fluence remove [--timeout <milliseconds>] [--no-input]`](#fluence-remove---timeout-milliseconds---no-input)
* [`fluence run [--relay <multiaddr>] [--data <json>] [--data-path <path>] [--import <path>] [--json-service <path>] [--on <peer_id>] [-i <path>] [-f <function-call>] [--timeout <milliseconds>] [--no-input]`](#fluence-run---relay-multiaddr---data-json---data-path-path---import-path---json-service-path---on-peer_id--i-path--f-function-call---timeout-milliseconds---no-input)

## `fluence autocomplete [SHELL]`

display autocomplete installation instructions

```
USAGE
  $ fluence autocomplete [SHELL] [-r]

ARGUMENTS
  SHELL  shell type

FLAGS
  -r, --refresh-cache  Refresh cache (ignores displaying instructions)

DESCRIPTION
  display autocomplete installation instructions

EXAMPLES
  $ fluence autocomplete

  $ fluence autocomplete bash

  $ fluence autocomplete zsh

  $ fluence autocomplete --refresh-cache
```

_See code: [@oclif/plugin-autocomplete](https://github.com/oclif/plugin-autocomplete/blob/v1.3.0/src/commands/autocomplete/index.ts)_

## `fluence dependency [NAME] [-v] [--use <version | recommended>] [--no-input]`

Manage dependencies stored inside .fluence directory of the current user

```
USAGE
  $ fluence dependency [NAME] [-v] [--use <version | recommended>] [--no-input]

ARGUMENTS
  NAME  Dependency name. Currently the only dependency is aqua

FLAGS
  -v, --version                  Show current version of the dependency
  --no-input                     Don't interactively ask for any input from the user
  --use=<version | recommended>  Set version of the dependency that you want to use. Use recommended keyword if you want
                                 to use recommended version

DESCRIPTION
  Manage dependencies stored inside .fluence directory of the current user

EXAMPLES
  $ fluence dependency
```

_See code: [dist/commands/dependency.ts](https://github.com/fluencelabs/fluence-cli/blob/v0.0.0/dist/commands/dependency.ts)_

## `fluence deploy [--on <peer_id>] [--relay <multiaddr>] [--force] [--timeout <milliseconds>] [-k <name>] [--no-input]`

Deploy service to the remote peer

```
USAGE
  $ fluence deploy [--on <peer_id>] [--relay <multiaddr>] [--force] [--timeout <milliseconds>] [-k <name>] [--no-input]

FLAGS
  -k, --key-pair-name=<name>  Key pair name
  --force                     Force removing of previously deployed app
  --no-input                  Don't interactively ask for any input from the user
  --on=<peer_id>              PeerId of the peer where you want to deploy
  --relay=<multiaddr>         Relay node MultiAddress
  --timeout=<milliseconds>    Timeout used for command execution

DESCRIPTION
  Deploy service to the remote peer

EXAMPLES
  $ fluence deploy
```

_See code: [dist/commands/deploy.ts](https://github.com/fluencelabs/fluence-cli/blob/v0.0.0/dist/commands/deploy.ts)_

## `fluence help [COMMAND]`

Display help for fluence.

```
USAGE
  $ fluence help [COMMAND] [-n]

ARGUMENTS
  COMMAND  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for fluence.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.1.12/src/commands/help.ts)_

## `fluence init [PATH] [--no-input]`

Initialize fluence project

```
USAGE
  $ fluence init [PATH] [--no-input]

ARGUMENTS
  PATH  Project path

FLAGS
  --no-input  Don't interactively ask for any input from the user

DESCRIPTION
  Initialize fluence project

EXAMPLES
  $ fluence init
```

_See code: [dist/commands/init.ts](https://github.com/fluencelabs/fluence-cli/blob/v0.0.0/dist/commands/init.ts)_

## `fluence plugins`

List installed plugins.

```
USAGE
  $ fluence plugins [--core]

FLAGS
  --core  Show core plugins.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ fluence plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.1.0/src/commands/plugins/index.ts)_

## `fluence plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ fluence plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.

  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.

ALIASES
  $ fluence plugins add

EXAMPLES
  $ fluence plugins:install myplugin 

  $ fluence plugins:install https://github.com/someuser/someplugin

  $ fluence plugins:install someuser/someplugin
```

## `fluence plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ fluence plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ fluence plugins:inspect myplugin
```

## `fluence plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ fluence plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.

  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.

ALIASES
  $ fluence plugins add

EXAMPLES
  $ fluence plugins:install myplugin 

  $ fluence plugins:install https://github.com/someuser/someplugin

  $ fluence plugins:install someuser/someplugin
```

## `fluence plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ fluence plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Links a plugin into the CLI for development.

  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.

EXAMPLES
  $ fluence plugins:link myplugin
```

## `fluence plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ fluence plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ fluence plugins unlink
  $ fluence plugins remove
```

## `fluence plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ fluence plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ fluence plugins unlink
  $ fluence plugins remove
```

## `fluence plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ fluence plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ fluence plugins unlink
  $ fluence plugins remove
```

## `fluence plugins update`

Update installed plugins.

```
USAGE
  $ fluence plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

## `fluence remove [--timeout <milliseconds>] [--no-input]`

Remove previously deployed config

```
USAGE
  $ fluence remove [--timeout <milliseconds>] [--no-input]

FLAGS
  --no-input                Don't interactively ask for any input from the user
  --timeout=<milliseconds>  Timeout used for command execution

DESCRIPTION
  Remove previously deployed config

EXAMPLES
  $ fluence remove
```

_See code: [dist/commands/remove.ts](https://github.com/fluencelabs/fluence-cli/blob/v0.0.0/dist/commands/remove.ts)_

## `fluence run [--relay <multiaddr>] [--data <json>] [--data-path <path>] [--import <path>] [--json-service <path>] [--on <peer_id>] [-i <path>] [-f <function-call>] [--timeout <milliseconds>] [--no-input]`

Run aqua script

```
USAGE
  $ fluence run [--relay <multiaddr>] [--data <json>] [--data-path <path>] [--import <path>] [--json-service <path>]
    [--on <peer_id>] [-i <path>] [-f <function-call>] [--timeout <milliseconds>] [--no-input]

FLAGS
  -f, --func=<function-call>  Function call
  -i, --input=<path>          Path to an aqua file or to a directory that contains aqua files
  --data=<json>               JSON in { [argumentName]: argumentValue } format. You can call a function using these
                              argument names
  --data-path=<path>          Path to a JSON file in { [argumentName]: argumentValue } format. You can call a function
                              using these argument names
  --import=<path>...          Path to a directory to import from. May be used several times
  --json-service=<path>       Path to a file that contains a JSON formatted service
  --no-input                  Don't interactively ask for any input from the user
  --on=<peer_id>              PeerId of a peer where you want to run the function
  --relay=<multiaddr>         Relay node MultiAddress
  --timeout=<milliseconds>    Timeout used for command execution

DESCRIPTION
  Run aqua script

EXAMPLES
  $ fluence run
```

_See code: [dist/commands/run.ts](https://github.com/fluencelabs/fluence-cli/blob/v0.0.0/dist/commands/run.ts)_
<!-- commandsstop -->

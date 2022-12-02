Fluence CLI
===

A tool that makes working with Fluence network more convenient

## Table of contents:

<!-- toc -->
* [Prerequisites](#prerequisites)
* [Usage](#usage)
* [Configs Documentation](#configs-documentation)
* [Currently supported workflow example](#currently-supported-workflow-example)
* [Contributing](#contributing)
* [Commands](#commands)
<!-- tocstop -->

# Prerequisites

- Linux or MacOS (currently have some bugs on windows)
- [Node.js >=16.0.0](https://nodejs.org/)

# Usage

```sh-session
$ npm install -g @fluencelabs/cli
$ fluence COMMAND
running command...
$ fluence
@fluencelabs/cli/0.0.0 linux-x64 node-v16.14.0
$ fluence --help [COMMAND]
USAGE
  $ fluence COMMAND
...
```

# Configs Documentation

[Documentation for all the configs that Fluence CLI uses can be found here](./docs/configs/README.md)

# Currently supported workflow example

1. Run `fluence service add 'https://github.com/fluencelabs/services/blob/master/adder.tar.gz?raw=true'` to add Adder service to your application. Fluence CLI will suggest you to init project if it wasn't already initialized. Choose `ts` template.
1. Run `fluence run -f 'helloWorld("Fluence")'` if you want to run `helloWorld` example aqua function from `src/aqua/main.aqua`.
1. Run `fluence deploy` to deploy the application described in `fluence.yaml`
1. Uncomment Adder and App aqua in `src/aqua/main.aqua`:
    ```aqua
    import App from "deployed.app.aqua"
    import Adder from "services/adder.aqua"
    export App, addOne

    -- snip --

    func addOne(x: u64) -> u64:
        services <- App.services()
        on services.adder.default!.peerId:
            Adder services.adder.default!.serviceId
            res <- Adder.addOne(x)
        <- res
    ```
    `"deployed.app.aqua"` file was generated after you ran `fluence deploy` and it is located at `.fluence/aqua/deployed.app.aqua`. 
    
    `App.services()` method returns ids of the previously deployed services that you can use in your aqua code (info about previously deployed services is stored at `.fluence/app.yaml`).

1. Run `fluence aqua` to compile `src/aqua/main.aqua` to typescript
1. Open `src/ts/src/index.ts` example file and uncomment newly generated imports and code that uses those imports
    ```ts
    import { addOne } from "./aqua/main.ts";
    import { registerApp } from "./aqua/app.ts";

    // ---snip---

      registerApp()
      console.log(await addOne(1))
    ```

1. Go to `src/ts` directory and run `npm run start`. All the functions from `src/aqua/main.aqua` will run and you will see:
    - `Hello, Fluence` as a result of `helloWorld("Fluence")`
    - `2` as a result of `addOne(1)`
1. Run `fluence remove` to remove the previously deployed fluence application

# Contributing

To run cli in development mode use: `./bin/dev`

To run cli in production mode run `npm run build` first, then use: `./bin/run`

If you are using nvm and want to commit using VSCode - place `.huskyrc` file to your Home directory

Don't name arguments or flags with names that contain underscore symbols, because autogenerated links in markdown will not work

pre-commit runs each time before you commit. It includes prettier and generates this README.md file. 
If you want README.md file to be correctly generated please don't forget to run `npm run build` before committing

Pull request and release process:
1. Run `npm run check` to make sure everything ok with the code
2. Only after that commit your changes to trigger pre-commit hook that updates `README.md`. Read `README.md` to make sure it is correctly updated
3. Push your changes
4. Create pull request and merge your changes to `main`
5. Switch to `main` locally and pull merged changes
6. Run `git tag -a v0.0.0 -m ""` with version number that you want instead of `0.0.0`
7. Run `git push origin v0.0.0` with version number that you want instead of `0.0.0` to trigger release

# Commands

<!-- commands -->
* [`fluence autocomplete [SHELL]`](#fluence-autocomplete-shell)
* [`fluence help [COMMAND]`](#fluence-help-command)

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
<!-- commandsstop -->

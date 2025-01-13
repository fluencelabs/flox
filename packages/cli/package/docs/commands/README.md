# Commands
<!-- commands -->
* [`fluence autocomplete [SHELL]`](#fluence-autocomplete-shell)
* [`fluence chain info`](#fluence-chain-info)
* [`fluence default env [ENV]`](#fluence-default-env-env)
* [`fluence help [COMMAND]`](#fluence-help-command)
* [`fluence local down`](#fluence-local-down)
* [`fluence local init`](#fluence-local-init)
* [`fluence local logs`](#fluence-local-logs)
* [`fluence local ps`](#fluence-local-ps)
* [`fluence local up`](#fluence-local-up)
* [`fluence provider cc-activate`](#fluence-provider-cc-activate)
* [`fluence provider cc-create`](#fluence-provider-cc-create)
* [`fluence provider cc-finish`](#fluence-provider-cc-finish)
* [`fluence provider cc-info`](#fluence-provider-cc-info)
* [`fluence provider cc-remove`](#fluence-provider-cc-remove)
* [`fluence provider cc-rewards-withdraw`](#fluence-provider-cc-rewards-withdraw)
* [`fluence provider deal-exit`](#fluence-provider-deal-exit)
* [`fluence provider deal-list`](#fluence-provider-deal-list)
* [`fluence provider deal-rewards-info [DEAL-ADDRESS] [ON-CHAIN-WORKER-ID]`](#fluence-provider-deal-rewards-info-deal-address-on-chain-worker-id)
* [`fluence provider deal-rewards-withdraw`](#fluence-provider-deal-rewards-withdraw)
* [`fluence provider deploy`](#fluence-provider-deploy)
* [`fluence provider gen`](#fluence-provider-gen)
* [`fluence provider info`](#fluence-provider-info)
* [`fluence provider init`](#fluence-provider-init)
* [`fluence provider offer-create`](#fluence-provider-offer-create)
* [`fluence provider offer-info`](#fluence-provider-offer-info)
* [`fluence provider offer-remove`](#fluence-provider-offer-remove)
* [`fluence provider offer-update`](#fluence-provider-offer-update)
* [`fluence provider register`](#fluence-provider-register)
* [`fluence provider tokens-distribute`](#fluence-provider-tokens-distribute)
* [`fluence provider tokens-withdraw`](#fluence-provider-tokens-withdraw)
* [`fluence provider update`](#fluence-provider-update)
* [`fluence update [CHANNEL]`](#fluence-update-channel)

## `fluence autocomplete [SHELL]`

Display autocomplete installation instructions.

```
USAGE
  $ fluence autocomplete [SHELL] [-r]

ARGUMENTS
  SHELL  (zsh|bash|powershell) Shell type

FLAGS
  -r, --refresh-cache  Refresh cache (ignores displaying instructions)

DESCRIPTION
  Display autocomplete installation instructions.

EXAMPLES
  $ fluence autocomplete

  $ fluence autocomplete bash

  $ fluence autocomplete zsh

  $ fluence autocomplete powershell

  $ fluence autocomplete --refresh-cache
```

_See code: [@oclif/plugin-autocomplete](https://github.com/oclif/plugin-autocomplete/blob/v3.2.6/src/commands/autocomplete/index.ts)_

## `fluence chain info`

Show contract addresses for the fluence environment and accounts for the local environment

```
USAGE
  $ fluence chain info [--no-input] [--env <testnet | mainnet | stage | local>] [--priv-key <private-key>]

FLAGS
  --env=<testnet | mainnet | stage | local>  Fluence Environment to use when running the command
  --no-input                                 Don't interactively ask for any input from the user
  --priv-key=<private-key>                   !WARNING! for debug purposes only. Passing private keys through flags is
                                             unsecure. On local env
                                             0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 is used
                                             by default when CLI is used in non-interactive mode

DESCRIPTION
  Show contract addresses for the fluence environment and accounts for the local environment
```

_See code: [src/commands/chain/info.ts](https://github.com/fluencelabs/cli/blob/fluence-cli-v0.24.1/src/commands/chain/info.ts)_

## `fluence default env [ENV]`

Switch default Fluence Environment

```
USAGE
  $ fluence default env [ENV] [--no-input]

ARGUMENTS
  ENV  Fluence Environment to use when running the command

FLAGS
  --no-input  Don't interactively ask for any input from the user

DESCRIPTION
  Switch default Fluence Environment

EXAMPLES
  $ fluence default env
```

_See code: [src/commands/default/env.ts](https://github.com/fluencelabs/cli/blob/fluence-cli-v0.24.1/src/commands/default/env.ts)_

## `fluence help [COMMAND]`

Display help for fluence.

```
USAGE
  $ fluence help [COMMAND...] [-n]

ARGUMENTS
  COMMAND...  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for fluence.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v6.2.15/src/commands/help.ts)_

## `fluence local down`

Stop and remove currently running docker-compose.yaml using docker compose

```
USAGE
  $ fluence local down [--no-input] [-v] [--flags <--flag arg>]

FLAGS
  -v, --volumes             Remove named volumes declared in the "volumes" section of the Compose file and anonymous
                            volumes attached to containers
      --flags=<--flag arg>  Space separated flags to pass to `docker compose`
      --no-input            Don't interactively ask for any input from the user

DESCRIPTION
  Stop and remove currently running docker-compose.yaml using docker compose

EXAMPLES
  $ fluence local down
```

_See code: [src/commands/local/down.ts](https://github.com/fluencelabs/cli/blob/fluence-cli-v0.24.1/src/commands/local/down.ts)_

## `fluence local init`

Init docker-compose.yaml according to provider.yaml

```
USAGE
  $ fluence local init [--no-input] [--env <testnet | mainnet | stage | local>] [--priv-key <private-key>]

FLAGS
  --env=<testnet | mainnet | stage | local>  Fluence Environment to use when running the command
  --no-input                                 Don't interactively ask for any input from the user
  --priv-key=<private-key>                   !WARNING! for debug purposes only. Passing private keys through flags is
                                             unsecure. On local env
                                             0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 is used
                                             by default when CLI is used in non-interactive mode

DESCRIPTION
  Init docker-compose.yaml according to provider.yaml

EXAMPLES
  $ fluence local init
```

_See code: [src/commands/local/init.ts](https://github.com/fluencelabs/cli/blob/fluence-cli-v0.24.1/src/commands/local/init.ts)_

## `fluence local logs`

Display docker-compose.yaml logs

```
USAGE
  $ fluence local logs [--no-input] [--flags <--flag arg>]

FLAGS
  --flags=<--flag arg>  Space separated flags to pass to `docker compose`
  --no-input            Don't interactively ask for any input from the user

DESCRIPTION
  Display docker-compose.yaml logs

EXAMPLES
  $ fluence local logs
```

_See code: [src/commands/local/logs.ts](https://github.com/fluencelabs/cli/blob/fluence-cli-v0.24.1/src/commands/local/logs.ts)_

## `fluence local ps`

List containers using docker compose

```
USAGE
  $ fluence local ps [--no-input] [--flags <--flag arg>]

FLAGS
  --flags=<--flag arg>  Space separated flags to pass to `docker compose`
  --no-input            Don't interactively ask for any input from the user

DESCRIPTION
  List containers using docker compose

EXAMPLES
  $ fluence local ps
```

_See code: [src/commands/local/ps.ts](https://github.com/fluencelabs/cli/blob/fluence-cli-v0.24.1/src/commands/local/ps.ts)_

## `fluence local up`

Run docker-compose.yaml using docker compose and set up provider using all the offers from the 'offers' section in provider.yaml config using default wallet key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80

```
USAGE
  $ fluence local up [--no-input] [--peers <value>] [--timeout <value>] [--priv-key <private-key>]
    [--quiet-pull] [-d] [--build] [--flags <--flag arg>] [-r] [--no-wait] [--no-set-up]

FLAGS
  -d, --detach                  Detached mode: Run containers in the background
  -r, --no-reset                Don't reset docker-compose.yaml to default, don't remove volumes and previous local
                                deployments
      --build                   Build images before starting containers
      --flags=<--flag arg>      Space separated flags to pass to `docker compose`
      --no-input                Don't interactively ask for any input from the user
      --no-set-up               Don't set up provider, offer, commitments and deposit collateral, so there will be no
                                active offer on the network after command is finished
      --no-wait                 Don't wait for services to be running|healthy
      --peers=<value>           Number of peers to generate when a new provider.yaml is created
      --priv-key=<private-key>  !WARNING! for debug purposes only. Passing private keys through flags is unsecure. On
                                local env 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 is used by
                                default when CLI is used in non-interactive mode
      --quiet-pull              Pull without printing progress information
      --timeout=<value>         [default: 120] Timeout in seconds for attempting to register local network on local
                                peers

DESCRIPTION
  Run docker-compose.yaml using docker compose and set up provider using all the offers from the 'offers' section in
  provider.yaml config using default wallet key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80

EXAMPLES
  $ fluence local up
```

_See code: [src/commands/local/up.ts](https://github.com/fluencelabs/cli/blob/fluence-cli-v0.24.1/src/commands/local/up.ts)_

## `fluence provider cc-activate`

Add FLT collateral to capacity commitment to activate it. Alias: fluence provider ca

```
USAGE
  $ fluence provider cc-activate [--no-input] [--env <testnet | mainnet | stage | local>] [--priv-key <private-key>]
    [--peer-names <peer-1,peer-2> | --cc-ids <value>] [--offers <offer-1,offer-2>]

FLAGS
  --cc-ids=<value>                           Comma separated capacity commitment IDs
  --env=<testnet | mainnet | stage | local>  Fluence Environment to use when running the command
  --no-input                                 Don't interactively ask for any input from the user
  --offers=<offer-1,offer-2>                 Comma-separated list of offer names. To use all of your offers: --offers
                                             all
  --peer-names=<peer-1,peer-2>               Comma-separated names of peers from provider.yaml. To use all of your
                                             peers: --peer-names all
  --priv-key=<private-key>                   !WARNING! for debug purposes only. Passing private keys through flags is
                                             unsecure. On local env
                                             0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 is used
                                             by default when CLI is used in non-interactive mode

DESCRIPTION
  Add FLT collateral to capacity commitment to activate it. Alias: fluence provider ca
```

_See code: [src/commands/provider/cc-activate.ts](https://github.com/fluencelabs/cli/blob/fluence-cli-v0.24.1/src/commands/provider/cc-activate.ts)_

## `fluence provider cc-create`

Create Capacity commitment. Alias: fluence provider cc

```
USAGE
  $ fluence provider cc-create [--no-input] [--env <testnet | mainnet | stage | local>] [--priv-key <private-key>]
    [--peer-names <peer-1,peer-2>] [--offers <offer-1,offer-2>]

FLAGS
  --env=<testnet | mainnet | stage | local>  Fluence Environment to use when running the command
  --no-input                                 Don't interactively ask for any input from the user
  --offers=<offer-1,offer-2>                 Comma-separated list of offer names. To use all of your offers: --offers
                                             all
  --peer-names=<peer-1,peer-2>               Comma-separated names of peers from provider.yaml. To use all of your
                                             peers: --peer-names all
  --priv-key=<private-key>                   !WARNING! for debug purposes only. Passing private keys through flags is
                                             unsecure. On local env
                                             0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 is used
                                             by default when CLI is used in non-interactive mode

DESCRIPTION
  Create Capacity commitment. Alias: fluence provider cc
```

_See code: [src/commands/provider/cc-create.ts](https://github.com/fluencelabs/cli/blob/fluence-cli-v0.24.1/src/commands/provider/cc-create.ts)_

## `fluence provider cc-finish`

Move resources from deals, withdraw FLT collateral from capacity commitments, remove compute units from capacity commitments and finish capacity commitments. Aliases: fluence provider ccf, fluence provider cc-collateral-withdraw

```
USAGE
  $ fluence provider cc-finish [--no-input] [--peer-names <peer-1,peer-2> | --cc-ids <value>] [--offers
    <offer-1,offer-2>] [--env <testnet | mainnet | stage | local>] [--priv-key <private-key>]

FLAGS
  --cc-ids=<value>                           Comma separated capacity commitment IDs
  --env=<testnet | mainnet | stage | local>  Fluence Environment to use when running the command
  --no-input                                 Don't interactively ask for any input from the user
  --offers=<offer-1,offer-2>                 Comma-separated list of offer names. To use all of your offers: --offers
                                             all
  --peer-names=<peer-1,peer-2>               Comma-separated names of peers from provider.yaml. To use all of your
                                             peers: --peer-names all
  --priv-key=<private-key>                   !WARNING! for debug purposes only. Passing private keys through flags is
                                             unsecure. On local env
                                             0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 is used
                                             by default when CLI is used in non-interactive mode

DESCRIPTION
  Move resources from deals, withdraw FLT collateral from capacity commitments, remove compute units from capacity
  commitments and finish capacity commitments. Aliases: fluence provider ccf, fluence provider cc-collateral-withdraw
```

_See code: [src/commands/provider/cc-finish.ts](https://github.com/fluencelabs/cli/blob/fluence-cli-v0.24.1/src/commands/provider/cc-finish.ts)_

## `fluence provider cc-info`

Get info about capacity commitments. Alias: fluence provider ci

```
USAGE
  $ fluence provider cc-info [--no-input] [--env <testnet | mainnet | stage | local>] [--priv-key <private-key>]
    [--peer-names <peer-1,peer-2> | --cc-ids <value>] [--offers <offer-1,offer-2>] [--json]

FLAGS
  --cc-ids=<value>                           Comma separated capacity commitment IDs
  --env=<testnet | mainnet | stage | local>  Fluence Environment to use when running the command
  --json                                     Output JSON
  --no-input                                 Don't interactively ask for any input from the user
  --offers=<offer-1,offer-2>                 Comma-separated list of offer names. To use all of your offers: --offers
                                             all
  --peer-names=<peer-1,peer-2>               Comma-separated names of peers from provider.yaml. To use all of your
                                             peers: --peer-names all
  --priv-key=<private-key>                   !WARNING! for debug purposes only. Passing private keys through flags is
                                             unsecure. On local env
                                             0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 is used
                                             by default when CLI is used in non-interactive mode

DESCRIPTION
  Get info about capacity commitments. Alias: fluence provider ci
```

_See code: [src/commands/provider/cc-info.ts](https://github.com/fluencelabs/cli/blob/fluence-cli-v0.24.1/src/commands/provider/cc-info.ts)_

## `fluence provider cc-remove`

Remove Capacity commitment. You can remove it only BEFORE you activated it by depositing collateral. Alias: fluence provider cr

```
USAGE
  $ fluence provider cc-remove [--no-input] [--env <testnet | mainnet | stage | local>] [--priv-key <private-key>]
    [--peer-names <peer-1,peer-2> | --cc-ids <value>] [--offers <offer-1,offer-2>]

FLAGS
  --cc-ids=<value>                           Comma separated capacity commitment IDs
  --env=<testnet | mainnet | stage | local>  Fluence Environment to use when running the command
  --no-input                                 Don't interactively ask for any input from the user
  --offers=<offer-1,offer-2>                 Comma-separated list of offer names. To use all of your offers: --offers
                                             all
  --peer-names=<peer-1,peer-2>               Comma-separated names of peers from provider.yaml. To use all of your
                                             peers: --peer-names all
  --priv-key=<private-key>                   !WARNING! for debug purposes only. Passing private keys through flags is
                                             unsecure. On local env
                                             0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 is used
                                             by default when CLI is used in non-interactive mode

DESCRIPTION
  Remove Capacity commitment. You can remove it only BEFORE you activated it by depositing collateral. Alias: fluence
  provider cr
```

_See code: [src/commands/provider/cc-remove.ts](https://github.com/fluencelabs/cli/blob/fluence-cli-v0.24.1/src/commands/provider/cc-remove.ts)_

## `fluence provider cc-rewards-withdraw`

Withdraw FLT rewards from capacity commitments. Alias: fluence provider crw

```
USAGE
  $ fluence provider cc-rewards-withdraw [--no-input] [--peer-names <peer-1,peer-2> | --cc-ids <value>] [--offers
    <offer-1,offer-2>] [--env <testnet | mainnet | stage | local>] [--priv-key <private-key>]

FLAGS
  --cc-ids=<value>                           Comma separated capacity commitment IDs
  --env=<testnet | mainnet | stage | local>  Fluence Environment to use when running the command
  --no-input                                 Don't interactively ask for any input from the user
  --offers=<offer-1,offer-2>                 Comma-separated list of offer names. To use all of your offers: --offers
                                             all
  --peer-names=<peer-1,peer-2>               Comma-separated names of peers from provider.yaml. To use all of your
                                             peers: --peer-names all
  --priv-key=<private-key>                   !WARNING! for debug purposes only. Passing private keys through flags is
                                             unsecure. On local env
                                             0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 is used
                                             by default when CLI is used in non-interactive mode

DESCRIPTION
  Withdraw FLT rewards from capacity commitments. Alias: fluence provider crw
```

_See code: [src/commands/provider/cc-rewards-withdraw.ts](https://github.com/fluencelabs/cli/blob/fluence-cli-v0.24.1/src/commands/provider/cc-rewards-withdraw.ts)_

## `fluence provider deal-exit`

Exit from deal. Alias: fluence provider de

```
USAGE
  $ fluence provider deal-exit [--no-input] [--env <testnet | mainnet | stage | local>] [--priv-key <private-key>]
    [--deal-ids <id-1,id-2>]

FLAGS
  --deal-ids=<id-1,id-2>                     Comma-separated deal ids
  --env=<testnet | mainnet | stage | local>  Fluence Environment to use when running the command
  --no-input                                 Don't interactively ask for any input from the user
  --priv-key=<private-key>                   !WARNING! for debug purposes only. Passing private keys through flags is
                                             unsecure. On local env
                                             0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 is used
                                             by default when CLI is used in non-interactive mode

DESCRIPTION
  Exit from deal. Alias: fluence provider de
```

_See code: [src/commands/provider/deal-exit.ts](https://github.com/fluencelabs/cli/blob/fluence-cli-v0.24.1/src/commands/provider/deal-exit.ts)_

## `fluence provider deal-list`

List all deals. Alias: fluence provider dl

```
USAGE
  $ fluence provider deal-list [--no-input] [--env <testnet | mainnet | stage | local>] [--priv-key <private-key>]

FLAGS
  --env=<testnet | mainnet | stage | local>  Fluence Environment to use when running the command
  --no-input                                 Don't interactively ask for any input from the user
  --priv-key=<private-key>                   !WARNING! for debug purposes only. Passing private keys through flags is
                                             unsecure. On local env
                                             0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 is used
                                             by default when CLI is used in non-interactive mode

DESCRIPTION
  List all deals. Alias: fluence provider dl
```

_See code: [src/commands/provider/deal-list.ts](https://github.com/fluencelabs/cli/blob/fluence-cli-v0.24.1/src/commands/provider/deal-list.ts)_

## `fluence provider deal-rewards-info [DEAL-ADDRESS] [ON-CHAIN-WORKER-ID]`

Deal rewards info. Alias: fluence provider dri

```
USAGE
  $ fluence provider deal-rewards-info [DEAL-ADDRESS] [ON-CHAIN-WORKER-ID] [--no-input] [--env <testnet | mainnet | stage |
    local>] [--priv-key <private-key>]

ARGUMENTS
  DEAL-ADDRESS        Deal address
  ON-CHAIN-WORKER-ID  On-chain worker id

FLAGS
  --env=<testnet | mainnet | stage | local>  Fluence Environment to use when running the command
  --no-input                                 Don't interactively ask for any input from the user
  --priv-key=<private-key>                   !WARNING! for debug purposes only. Passing private keys through flags is
                                             unsecure. On local env
                                             0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 is used
                                             by default when CLI is used in non-interactive mode

DESCRIPTION
  Deal rewards info. Alias: fluence provider dri
```

_See code: [src/commands/provider/deal-rewards-info.ts](https://github.com/fluencelabs/cli/blob/fluence-cli-v0.24.1/src/commands/provider/deal-rewards-info.ts)_

## `fluence provider deal-rewards-withdraw`

Withdraw USDC rewards from deals. Alias: fluence provider drw

```
USAGE
  $ fluence provider deal-rewards-withdraw [--no-input] [--env <testnet | mainnet | stage | local>] [--priv-key <private-key>]
    [--deal-ids <id-1,id-2>]

FLAGS
  --deal-ids=<id-1,id-2>                     Comma-separated deal ids
  --env=<testnet | mainnet | stage | local>  Fluence Environment to use when running the command
  --no-input                                 Don't interactively ask for any input from the user
  --priv-key=<private-key>                   !WARNING! for debug purposes only. Passing private keys through flags is
                                             unsecure. On local env
                                             0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 is used
                                             by default when CLI is used in non-interactive mode

DESCRIPTION
  Withdraw USDC rewards from deals. Alias: fluence provider drw
```

_See code: [src/commands/provider/deal-rewards-withdraw.ts](https://github.com/fluencelabs/cli/blob/fluence-cli-v0.24.1/src/commands/provider/deal-rewards-withdraw.ts)_

## `fluence provider deploy`

Deploy manifests

```
USAGE
  $ fluence provider deploy [--no-input] [--env <testnet | mainnet | stage | local>] [--priv-key <private-key>]
    [--peer-names <peer-1,peer-2>] [--offers <offer-1,offer-2>]

FLAGS
  --env=<testnet | mainnet | stage | local>  Fluence Environment to use when running the command
  --no-input                                 Don't interactively ask for any input from the user
  --offers=<offer-1,offer-2>                 Comma-separated list of offer names. To use all of your offers: --offers
                                             all
  --peer-names=<peer-1,peer-2>               Comma-separated names of peers from provider.yaml. To use all of your
                                             peers: --peer-names all
  --priv-key=<private-key>                   !WARNING! for debug purposes only. Passing private keys through flags is
                                             unsecure. On local env
                                             0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 is used
                                             by default when CLI is used in non-interactive mode

DESCRIPTION
  Deploy manifests

EXAMPLES
  $ fluence provider deploy
```

_See code: [src/commands/provider/deploy.ts](https://github.com/fluencelabs/cli/blob/fluence-cli-v0.24.1/src/commands/provider/deploy.ts)_

## `fluence provider gen`

Generate Config.toml files according to provider.yaml and secrets according to provider-secrets.yaml

```
USAGE
  $ fluence provider gen [--no-input] [--env <testnet | mainnet | stage | local>] [--priv-key <private-key>]
    [--reset-peer-secrets] [--no-withdraw]

FLAGS
  --env=<testnet | mainnet | stage | local>  Fluence Environment to use when running the command
  --no-input                                 Don't interactively ask for any input from the user
  --no-withdraw                              Is used only when --reset-peer-secrets flag is present. Will not withdraw
                                             tokens from peers (if you don't need it or it fails for some reason)
  --priv-key=<private-key>                   !WARNING! for debug purposes only. Passing private keys through flags is
                                             unsecure. On local env
                                             0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 is used
                                             by default when CLI is used in non-interactive mode
  --reset-peer-secrets                       Withdraw remaining tokens from your peers, backup peer secrets from
                                             .fluence/provider-secrets.yaml and .fluence/secrets (if they exist) to
                                             .fluence/backups and generate new ones

DESCRIPTION
  Generate Config.toml files according to provider.yaml and secrets according to provider-secrets.yaml

EXAMPLES
  $ fluence provider gen
```

_See code: [src/commands/provider/gen.ts](https://github.com/fluencelabs/cli/blob/fluence-cli-v0.24.1/src/commands/provider/gen.ts)_

## `fluence provider info`

Print peer signing wallets and peer ids. Alias: fluence provider i

```
USAGE
  $ fluence provider info [--no-input] [--env <testnet | mainnet | stage | local>] [--priv-key <private-key>]
    [--peer-names <peer-1,peer-2>] [--offers <offer-1,offer-2>] [--json] [--address <address>]

FLAGS
  --address=<address>                        Provider address
  --env=<testnet | mainnet | stage | local>  Fluence Environment to use when running the command
  --json                                     Output JSON
  --no-input                                 Don't interactively ask for any input from the user
  --offers=<offer-1,offer-2>                 Comma-separated list of offer names. To use all of your offers: --offers
                                             all
  --peer-names=<peer-1,peer-2>               Comma-separated names of peers from provider.yaml. To use all of your
                                             peers: --peer-names all
  --priv-key=<private-key>                   !WARNING! for debug purposes only. Passing private keys through flags is
                                             unsecure. On local env
                                             0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 is used
                                             by default when CLI is used in non-interactive mode

DESCRIPTION
  Print peer signing wallets and peer ids. Alias: fluence provider i
```

_See code: [src/commands/provider/info.ts](https://github.com/fluencelabs/cli/blob/fluence-cli-v0.24.1/src/commands/provider/info.ts)_

## `fluence provider init`

Init provider config. Creates a provider.yaml file

```
USAGE
  $ fluence provider init [--no-input] [--peers <value>] [--env <testnet | mainnet | stage | local>] [--priv-key
    <private-key>]

FLAGS
  --env=<testnet | mainnet | stage | local>  Fluence Environment to use when running the command
  --no-input                                 Don't interactively ask for any input from the user
  --peers=<value>                            Number of peers to generate when a new provider.yaml is created
  --priv-key=<private-key>                   !WARNING! for debug purposes only. Passing private keys through flags is
                                             unsecure. On local env
                                             0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 is used
                                             by default when CLI is used in non-interactive mode

DESCRIPTION
  Init provider config. Creates a provider.yaml file
```

_See code: [src/commands/provider/init.ts](https://github.com/fluencelabs/cli/blob/fluence-cli-v0.24.1/src/commands/provider/init.ts)_

## `fluence provider offer-create`

Create offers. You have to be registered as a provider to do that. Alias: fluence provider oc

```
USAGE
  $ fluence provider offer-create [--no-input] [--env <testnet | mainnet | stage | local>] [--priv-key <private-key>]
    [--offers <offer-1,offer-2>]

FLAGS
  --env=<testnet | mainnet | stage | local>  Fluence Environment to use when running the command
  --no-input                                 Don't interactively ask for any input from the user
  --offers=<offer-1,offer-2>                 Comma-separated list of offer names. To use all of your offers: --offers
                                             all
  --priv-key=<private-key>                   !WARNING! for debug purposes only. Passing private keys through flags is
                                             unsecure. On local env
                                             0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 is used
                                             by default when CLI is used in non-interactive mode

DESCRIPTION
  Create offers. You have to be registered as a provider to do that. Alias: fluence provider oc
```

_See code: [src/commands/provider/offer-create.ts](https://github.com/fluencelabs/cli/blob/fluence-cli-v0.24.1/src/commands/provider/offer-create.ts)_

## `fluence provider offer-info`

Get info about offers. Alias: fluence provider oi

```
USAGE
  $ fluence provider offer-info [--no-input] [--offers <offer-1,offer-2> | --offer-ids <id-1,id-2>] [--env <testnet |
    mainnet | stage | local>] [--priv-key <private-key>]

FLAGS
  --env=<testnet | mainnet | stage | local>  Fluence Environment to use when running the command
  --no-input                                 Don't interactively ask for any input from the user
  --offer-ids=<id-1,id-2>                    Comma-separated list of offer ids. Can't be used together with --offers
                                             flag
  --offers=<offer-1,offer-2>                 Comma-separated list of offer names. To use all of your offers: --offers
                                             all
  --priv-key=<private-key>                   !WARNING! for debug purposes only. Passing private keys through flags is
                                             unsecure. On local env
                                             0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 is used
                                             by default when CLI is used in non-interactive mode

DESCRIPTION
  Get info about offers. Alias: fluence provider oi
```

_See code: [src/commands/provider/offer-info.ts](https://github.com/fluencelabs/cli/blob/fluence-cli-v0.24.1/src/commands/provider/offer-info.ts)_

## `fluence provider offer-remove`

Remove offers. Alias: fluence provider or

```
USAGE
  $ fluence provider offer-remove [--no-input] [--offers <offer-1,offer-2> | --offer-ids <id-1,id-2>] [--env <testnet |
    mainnet | stage | local>] [--priv-key <private-key>]

FLAGS
  --env=<testnet | mainnet | stage | local>  Fluence Environment to use when running the command
  --no-input                                 Don't interactively ask for any input from the user
  --offer-ids=<id-1,id-2>                    Comma-separated list of offer ids. Can't be used together with --offers
                                             flag
  --offers=<offer-1,offer-2>                 Comma-separated list of offer names. To use all of your offers: --offers
                                             all
  --priv-key=<private-key>                   !WARNING! for debug purposes only. Passing private keys through flags is
                                             unsecure. On local env
                                             0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 is used
                                             by default when CLI is used in non-interactive mode

DESCRIPTION
  Remove offers. Alias: fluence provider or
```

_See code: [src/commands/provider/offer-remove.ts](https://github.com/fluencelabs/cli/blob/fluence-cli-v0.24.1/src/commands/provider/offer-remove.ts)_

## `fluence provider offer-update`

Update offers. Alias: fluence provider ou

```
USAGE
  $ fluence provider offer-update [--no-input] [--offers <offer-1,offer-2>] [--env <testnet | mainnet | stage | local>]
    [--priv-key <private-key>]

FLAGS
  --env=<testnet | mainnet | stage | local>  Fluence Environment to use when running the command
  --no-input                                 Don't interactively ask for any input from the user
  --offers=<offer-1,offer-2>                 Comma-separated list of offer names. To use all of your offers: --offers
                                             all
  --priv-key=<private-key>                   !WARNING! for debug purposes only. Passing private keys through flags is
                                             unsecure. On local env
                                             0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 is used
                                             by default when CLI is used in non-interactive mode

DESCRIPTION
  Update offers. Alias: fluence provider ou
```

_See code: [src/commands/provider/offer-update.ts](https://github.com/fluencelabs/cli/blob/fluence-cli-v0.24.1/src/commands/provider/offer-update.ts)_

## `fluence provider register`

Register as a provider. Alias: fluence provider r

```
USAGE
  $ fluence provider register [--no-input] [--env <testnet | mainnet | stage | local>] [--priv-key <private-key>]

FLAGS
  --env=<testnet | mainnet | stage | local>  Fluence Environment to use when running the command
  --no-input                                 Don't interactively ask for any input from the user
  --priv-key=<private-key>                   !WARNING! for debug purposes only. Passing private keys through flags is
                                             unsecure. On local env
                                             0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 is used
                                             by default when CLI is used in non-interactive mode

DESCRIPTION
  Register as a provider. Alias: fluence provider r
```

_See code: [src/commands/provider/register.ts](https://github.com/fluencelabs/cli/blob/fluence-cli-v0.24.1/src/commands/provider/register.ts)_

## `fluence provider tokens-distribute`

Distribute FLT tokens to peers. Alias: fluence provider td

```
USAGE
  $ fluence provider tokens-distribute [--no-input] [--env <testnet | mainnet | stage | local>] [--priv-key <private-key>]
    [--peer-names <peer-1,peer-2>] [--offers <offer-1,offer-2>] [--amount <value>]

FLAGS
  --amount=<value>                           Amount of FLT tokens to distribute to peers
  --env=<testnet | mainnet | stage | local>  Fluence Environment to use when running the command
  --no-input                                 Don't interactively ask for any input from the user
  --offers=<offer-1,offer-2>                 Comma-separated list of offer names. To use all of your offers: --offers
                                             all
  --peer-names=<peer-1,peer-2>               Comma-separated names of peers from provider.yaml. To use all of your
                                             peers: --peer-names all
  --priv-key=<private-key>                   !WARNING! for debug purposes only. Passing private keys through flags is
                                             unsecure. On local env
                                             0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 is used
                                             by default when CLI is used in non-interactive mode

DESCRIPTION
  Distribute FLT tokens to peers. Alias: fluence provider td
```

_See code: [src/commands/provider/tokens-distribute.ts](https://github.com/fluencelabs/cli/blob/fluence-cli-v0.24.1/src/commands/provider/tokens-distribute.ts)_

## `fluence provider tokens-withdraw`

Withdraw FLT tokens from peers. Alias: fluence provider tw

```
USAGE
  $ fluence provider tokens-withdraw [--no-input] [--env <testnet | mainnet | stage | local>] [--priv-key <private-key>]
    [--peer-names <peer-1,peer-2>] [--offers <offer-1,offer-2>] [--amount <value>]

FLAGS
  --amount=<value>                           Amount of FLT tokens to withdraw from peers. Use --amount max to withdraw
                                             maximum possible amount
  --env=<testnet | mainnet | stage | local>  Fluence Environment to use when running the command
  --no-input                                 Don't interactively ask for any input from the user
  --offers=<offer-1,offer-2>                 Comma-separated list of offer names. To use all of your offers: --offers
                                             all
  --peer-names=<peer-1,peer-2>               Comma-separated names of peers from provider.yaml. To use all of your
                                             peers: --peer-names all
  --priv-key=<private-key>                   !WARNING! for debug purposes only. Passing private keys through flags is
                                             unsecure. On local env
                                             0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 is used
                                             by default when CLI is used in non-interactive mode

DESCRIPTION
  Withdraw FLT tokens from peers. Alias: fluence provider tw
```

_See code: [src/commands/provider/tokens-withdraw.ts](https://github.com/fluencelabs/cli/blob/fluence-cli-v0.24.1/src/commands/provider/tokens-withdraw.ts)_

## `fluence provider update`

Update provider info. Alias: fluence provider u

```
USAGE
  $ fluence provider update [--no-input] [--env <testnet | mainnet | stage | local>] [--priv-key <private-key>]

FLAGS
  --env=<testnet | mainnet | stage | local>  Fluence Environment to use when running the command
  --no-input                                 Don't interactively ask for any input from the user
  --priv-key=<private-key>                   !WARNING! for debug purposes only. Passing private keys through flags is
                                             unsecure. On local env
                                             0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 is used
                                             by default when CLI is used in non-interactive mode

DESCRIPTION
  Update provider info. Alias: fluence provider u
```

_See code: [src/commands/provider/update.ts](https://github.com/fluencelabs/cli/blob/fluence-cli-v0.24.1/src/commands/provider/update.ts)_

## `fluence update [CHANNEL]`

update the fluence CLI

```
USAGE
  $ fluence update [CHANNEL] [--force |  | [-a | -v <value> | -i]] [-b ]

FLAGS
  -a, --available        See available versions.
  -b, --verbose          Show more details about the available versions.
  -i, --interactive      Interactively select version to install. This is ignored if a channel is provided.
  -v, --version=<value>  Install a specific version.
      --force            Force a re-download of the requested version.

DESCRIPTION
  update the fluence CLI

EXAMPLES
  Update to the stable channel:

    $ fluence update stable

  Update to a specific version:

    $ fluence update --version 1.0.0

  Interactively select version:

    $ fluence update --interactive

  See available versions:

    $ fluence update --available
```

_See code: [@oclif/plugin-update](https://github.com/oclif/plugin-update/blob/v4.6.4/src/commands/update.ts)_
<!-- commandsstop -->

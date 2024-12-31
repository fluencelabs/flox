# env.yaml

Defines project user's preferences

## Properties

| Property        | Type                  | Required | Description                                                                                    |
|-----------------|-----------------------|----------|------------------------------------------------------------------------------------------------|
| `version`       | integer               | **Yes**  | Config version                                                                                 |
| `blockScoutUrl` | string                | No       | BlockScout URL to use                                                                          |
| `chainId`       | number                | No       | Chain ID to use                                                                                |
| `deployment`    | [object](#deployment) | No       | Deployed contract address overrides                                                            |
| `fluenceEnv`    | string                | No       | Fluence environment to connect to Possible values are: `testnet`, `mainnet`, `stage`, `local`. |
| `ipfsGateway`   | string                | No       | IPFS gateway URL to use                                                                        |
| `relays`        | string[]              | No       | List of custom relay multiaddresses to use when connecting to Fluence network                  |
| `rpcUrl`        | string                | No       | RPC URL to use                                                                                 |
| `subgraphUrl`   | string                | No       | Subgraph URL to use                                                                            |

## deployment

Deployed contract address overrides

### Properties

| Property        | Type   | Required | Description |
|-----------------|--------|----------|-------------|
| `balanceKeeper` | string | No       |             |
| `diamond`       | string | No       |             |
| `multicall3`    | string | No       |             |
| `usdc`          | string | No       |             |


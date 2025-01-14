# provider.yaml

Defines provider configuration

## Properties

| Property              | Type                           | Required | Description                                                                  |
|-----------------------|--------------------------------|----------|------------------------------------------------------------------------------|
| `capacityCommitments` | [object](#capacitycommitments) | **Yes**  | A map with computePeer names as keys and capacity commitments as values      |
| `computePeers`        | [object](#computepeers)        | **Yes**  | A map with compute peer names as keys and compute peer configs as values     |
| `offers`              | [object](#offers)              | **Yes**  | A map with offer names as keys and offer configs as values                   |
| `providerName`        | string                         | **Yes**  | Provider name. Must not be empty                                             |
| `version`             | integer                        | **Yes**  | Config version                                                               |
| `resources`           | [object](#resources)           | No       | A map with resource type names as keys and resource details object as values |

## capacityCommitments

A map with computePeer names as keys and capacity commitments as values

### Properties

| Property          | Type                       | Required | Description                   |
|-------------------|----------------------------|----------|-------------------------------|
| `computePeerName` | [object](#computepeername) | No       | Defines a capacity commitment |

### computePeerName

Defines a capacity commitment

#### Properties

| Property       | Type   | Required | Description                                                                   |
|----------------|--------|----------|-------------------------------------------------------------------------------|
| `duration`     | string | **Yes**  | Duration of the commitment in human-readable format. Example: 1 months 1 days |
| `stakerReward` | number | **Yes**  | Staker reward in percent                                                      |
| `delegator`    | string | No       | Delegator address                                                             |

## computePeers

A map with compute peer names as keys and compute peer configs as values

### Properties

| Property          | Type                       | Required | Description            |
|-------------------|----------------------------|----------|------------------------|
| `computePeerName` | [object](#computepeername) | No       | Defines a compute peer |

### computePeerName

Defines a compute peer

#### Properties

| Property         | Type                 | Required | Description                              |
|------------------|----------------------|----------|------------------------------------------|
| `kubeconfigPath` | string               | **Yes**  | Path to the kubeconfig file              |
| `resources`      | [object](#resources) | **Yes**  | Resources available on this compute peer |

#### resources

Resources available on this compute peer

##### Properties

| Property    | Type                 | Required | Description                  |
|-------------|----------------------|----------|------------------------------|
| `bandwidth` | [object](#bandwidth) | **Yes**  | Defines a bandwidth resource |
| `cpu`       | [object](#cpu)       | **Yes**  | Defines a CPU resource       |
| `ip`        | [object](#ip)        | **Yes**  | Defines an IP resource       |
| `ram`       | [object](#ram)       | **Yes**  | Defines a RAM resource       |
| `storage`   | [object](#storage)[] | **Yes**  |                              |

##### bandwidth

Defines a bandwidth resource

###### Properties

| Property | Type   | Required | Description          |
|----------|--------|----------|----------------------|
| `name`   | string | **Yes**  |                      |
| `supply` | string | **Yes**  | Bandwidth per second |

##### cpu

Defines a CPU resource

###### Properties

| Property  | Type               | Required | Description                                                                                             |
|-----------|--------------------|----------|---------------------------------------------------------------------------------------------------------|
| `name`    | string             | **Yes**  |                                                                                                         |
| `supply`  | integer            | **Yes**  | Number of physical cores                                                                                |
| `details` | [object](#details) | No       | Override or extend CPU details not related to matching but visible to the user for information purposes |

###### details

Override or extend CPU details not related to matching but visible to the user for information purposes

**Properties**

| Property | Type   | Required | Description |
|----------|--------|----------|-------------|
| `model`  | string | No       |             |

##### ip

Defines an IP resource

###### Properties

| Property | Type                | Required | Description |
|----------|---------------------|----------|-------------|
| `name`   | string              | **Yes**  |             |
| `supply` | [object](#supply)[] | **Yes**  | IP supply   |

###### supply

Either specify only a `start` property (if you want a single IP) or `start` and `stop` properties (if you want a range) or `cidr` property (if you want a CIDR notation)

| Property | Type | Required | Description |
|----------|------|----------|-------------|

##### ram

Defines a RAM resource

###### Properties

| Property  | Type               | Required | Description                                                                                             |
|-----------|--------------------|----------|---------------------------------------------------------------------------------------------------------|
| `name`    | string             | **Yes**  |                                                                                                         |
| `supply`  | string             | **Yes**  | Amount of RAM                                                                                           |
| `details` | [object](#details) | No       | Override or extend RAM details not related to matching but visible to the user for information purposes |

###### details

Override or extend RAM details not related to matching but visible to the user for information purposes

**Properties**

| Property       | Type    | Required | Description |
|----------------|---------|----------|-------------|
| `ecc`          | boolean | No       |             |
| `manufacturer` | string  | No       |             |
| `model`        | string  | No       |             |
| `speed`        | integer | No       |             |

##### storage

Defines a storage resource

###### Properties

| Property  | Type               | Required | Description                                                                                                 |
|-----------|--------------------|----------|-------------------------------------------------------------------------------------------------------------|
| `name`    | string             | **Yes**  |                                                                                                             |
| `supply`  | string             | **Yes**  | Amount of storage                                                                                           |
| `details` | [object](#details) | No       | Override or extend Storage details not related to matching but visible to the user for information purposes |

###### details

Override or extend Storage details not related to matching but visible to the user for information purposes

**Properties**

| Property               | Type    | Required | Description |
|------------------------|---------|----------|-------------|
| `manufacturer`         | string  | No       |             |
| `model`                | string  | No       |             |
| `sequentialWriteSpeed` | integer | No       |             |

## offers

A map with offer names as keys and offer configs as values

### Properties

| Property    | Type                 | Required | Description              |
|-------------|----------------------|----------|--------------------------|
| `offerName` | [object](#offername) | No       | Defines a provider offer |

### offerName

Defines a provider offer

#### Properties

| Property             | Type                      | Required | Description                                                                        |
|----------------------|---------------------------|----------|------------------------------------------------------------------------------------|
| `computePeers`       | string[]                  | **Yes**  | Compute peers participating in this offer                                          |
| `dataCenterName`     | string                    | **Yes**  | Data center name from top-level dataCenters property                               |
| `resourcePrices`     | [object](#resourceprices) | **Yes**  | Resource prices for the offer                                                      |
| `maxProtocolVersion` | integer                   | No       | Max protocol version. Must be more then or equal to minProtocolVersion. Default: 1 |
| `minProtocolVersion` | integer                   | No       | Min protocol version. Must be less then or equal to maxProtocolVersion. Default: 1 |

#### resourcePrices

Resource prices for the offer

##### Properties

| Property    | Type                 | Required | Description                                                                               |
|-------------|----------------------|----------|-------------------------------------------------------------------------------------------|
| `bandwidth` | [object](#bandwidth) | **Yes**  | A map with bandwidth resource names as keys and prices in the following format as values: |
|             |                      |          | <positive-number> USDC/Mb                                                                 |
| `cpu`       | [object](#cpu)       | **Yes**  | A map with CPU resource names as keys and prices in the following format as values:       |
|             |                      |          | <positive-number> USDC/PhysicalCore                                                       |
| `ip`        | [object](#ip)        | **Yes**  | A map with IP resource names as keys and prices in the following format as values:        |
|             |                      |          | <positive-number> USDC/IP                                                                 |
| `ram`       | [object](#ram)       | **Yes**  | A map with RAM resource names as keys and prices in the following format as values:       |
|             |                      |          | <positive-number> USDC/MiB                                                                |
| `storage`   | [object](#storage)   | **Yes**  | A map with storage resource names as keys and prices in the following format as values:   |
|             |                      |          | <positive-number> USDC/MiB                                                                |

##### bandwidth

A map with bandwidth resource names as keys and prices in the following format as values:
<positive-number> USDC/Mb

| Property | Type | Required | Description |
|----------|------|----------|-------------|

##### cpu

A map with CPU resource names as keys and prices in the following format as values:
<positive-number> USDC/PhysicalCore

| Property | Type | Required | Description |
|----------|------|----------|-------------|

##### ip

A map with IP resource names as keys and prices in the following format as values:
<positive-number> USDC/IP

| Property | Type | Required | Description |
|----------|------|----------|-------------|

##### ram

A map with RAM resource names as keys and prices in the following format as values:
<positive-number> USDC/MiB

| Property | Type | Required | Description |
|----------|------|----------|-------------|

##### storage

A map with storage resource names as keys and prices in the following format as values:
<positive-number> USDC/MiB

| Property | Type | Required | Description |
|----------|------|----------|-------------|

## resources

A map with resource type names as keys and resource details object as values

### Properties

| Property  | Type               | Required | Description                                                                              |
|-----------|--------------------|----------|------------------------------------------------------------------------------------------|
| `cpu`     | [object](#cpu)     | No       | A map with CPU resource names as keys and CPU resource details objects as values         |
| `ram`     | [object](#ram)     | No       | A map with RAM resource names as keys and RAM resource details objects as values         |
| `storage` | [object](#storage) | No       | A map with storage resource names as keys and storage resource details objects as values |

### cpu

A map with CPU resource names as keys and CPU resource details objects as values

#### Properties

| Property          | Type                       | Required | Description                                                                          |
|-------------------|----------------------------|----------|--------------------------------------------------------------------------------------|
| `cpuResourceName` | [object](#cpuresourcename) | No       | CPU details not related to matching but visible to the user for information purposes |

#### cpuResourceName

CPU details not related to matching but visible to the user for information purposes

##### Properties

| Property | Type   | Required | Description |
|----------|--------|----------|-------------|
| `model`  | string | No       |             |

### ram

A map with RAM resource names as keys and RAM resource details objects as values

#### Properties

| Property          | Type                       | Required | Description                                                                          |
|-------------------|----------------------------|----------|--------------------------------------------------------------------------------------|
| `ramResourceName` | [object](#ramresourcename) | No       | RAM details not related to matching but visible to the user for information purposes |

#### ramResourceName

RAM details not related to matching but visible to the user for information purposes

##### Properties

| Property       | Type    | Required | Description |
|----------------|---------|----------|-------------|
| `ecc`          | boolean | No       |             |
| `manufacturer` | string  | No       |             |
| `model`        | string  | No       |             |
| `speed`        | integer | No       |             |

### storage

A map with storage resource names as keys and storage resource details objects as values

#### Properties

| Property              | Type                           | Required | Description                                                                              |
|-----------------------|--------------------------------|----------|------------------------------------------------------------------------------------------|
| `storageResourceName` | [object](#storageresourcename) | No       | Storage details not related to matching but visible to the user for information purposes |

#### storageResourceName

Storage details not related to matching but visible to the user for information purposes

##### Properties

| Property               | Type    | Required | Description |
|------------------------|---------|----------|-------------|
| `manufacturer`         | string  | No       |             |
| `model`                | string  | No       |             |
| `sequentialWriteSpeed` | integer | No       |             |


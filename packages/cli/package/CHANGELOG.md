# Changelog

## [0.24.1](https://github.com/fluencelabs/cli/compare/cli-v0.24.0...cli-v0.24.1) (2025-01-13)


### Features

* support data centers ([#1091](https://github.com/fluencelabs/cli/issues/1091)) ([651f830](https://github.com/fluencelabs/cli/commit/651f8309780649782a1446d66ad3a5076c84b95d))
* write manifest files on gen command only, rename end to stop ([#1089](https://github.com/fluencelabs/cli/issues/1089)) ([26dd8b7](https://github.com/fluencelabs/cli/commit/26dd8b7e1136d7e39d78016a265211551b884f72))

## [0.24.0](https://github.com/fluencelabs/cli/compare/cli-v0.23.0...cli-v0.24.0) (2025-01-08)


### ⚠ BREAKING CHANGES

* new provider.yaml and new contracts v2 [JS-850, JS-851] ([#1082](https://github.com/fluencelabs/cli/issues/1082))

### Features

* new provider.yaml and new contracts v2 [JS-850, JS-851] ([#1082](https://github.com/fluencelabs/cli/issues/1082)) ([3894079](https://github.com/fluencelabs/cli/commit/389407999ada5d002c7eaf026c118535666db863))

## [0.23.0](https://github.com/fluencelabs/cli/compare/cli-v0.22.0...cli-v0.23.0) (2024-12-27)


### ⚠ BREAKING CHANGES

* remove all developer functionality, add kubernetes manifest generation and deployment ([#1076](https://github.com/fluencelabs/cli/issues/1076))

### Features

* add additional caching ([#1062](https://github.com/fluencelabs/cli/issues/1062)) ([59416e4](https://github.com/fluencelabs/cli/commit/59416e4c3ddb891053c5cd989dcdf7f6dd2ab0f3))
* fix deal-exit batching ([#1075](https://github.com/fluencelabs/cli/issues/1075)) ([99a4caf](https://github.com/fluencelabs/cli/commit/99a4cafcfc83f924ecad87df6b40643e4c6dafc4))
* refactor configs [JS-831] ([#1064](https://github.com/fluencelabs/cli/issues/1064)) ([89cbed0](https://github.com/fluencelabs/cli/commit/89cbed0a3e2e6180eb9c835afbbfab79f887bf48))
* remove all developer functionality, add kubernetes manifest generation and deployment ([#1076](https://github.com/fluencelabs/cli/issues/1076)) ([d12ed09](https://github.com/fluencelabs/cli/commit/d12ed090f03d26190ccac4404e3cc5284bcc0963))
* remove main tag ([#1084](https://github.com/fluencelabs/cli/issues/1084)) ([cfb8090](https://github.com/fluencelabs/cli/commit/cfb809057f6620cf32f393686473f476cc0859e3))
* update node.js, oclif, other dependencies and refactor ([#1063](https://github.com/fluencelabs/cli/issues/1063)) ([49dec6d](https://github.com/fluencelabs/cli/commit/49dec6df7e3831035b59707151214ce7b18e8862))
* use default config when config is empty ([#1070](https://github.com/fluencelabs/cli/issues/1070)) ([f8e2e29](https://github.com/fluencelabs/cli/commit/f8e2e2950c2e9946f89ab4c1a8437cfbdd0c89a9))
* use indexer directly [JS-842] ([#1069](https://github.com/fluencelabs/cli/issues/1069)) ([05ab854](https://github.com/fluencelabs/cli/commit/05ab85481d6d6d676213d0847d1602226dabbfd2))


### Bug Fixes

* default number of compute units to fetch from indexer ([#1072](https://github.com/fluencelabs/cli/issues/1072)) ([75da0a2](https://github.com/fluencelabs/cli/commit/75da0a2a1631dd0f43b39507a5e2bfebb7c20120))
* remove ts-reset out of runtime files ([5c619bb](https://github.com/fluencelabs/cli/commit/5c619bb2eb87bcfbe4f1711032d35ea1d829c73d))
* restore docs in configs to avoid possible errors ([#1081](https://github.com/fluencelabs/cli/issues/1081)) ([8cdd6c2](https://github.com/fluencelabs/cli/commit/8cdd6c246c084ec882e0f3023e1315a4770fdbde))
* try uploading not in parallel ([#1066](https://github.com/fluencelabs/cli/issues/1066)) ([d0a6dd6](https://github.com/fluencelabs/cli/commit/d0a6dd69e54b5cfdbde926e6e3aaefadba14bdc6))

## [0.22.0](https://github.com/fluencelabs/cli/compare/fluence-cli-v0.21.0...fluence-cli-v0.22.0) (2024-10-16)


### ⚠ BREAKING CHANGES

* update deal-ts-clients@0.22.0 ([#1061](https://github.com/fluencelabs/cli/issues/1061))
* group cc infos by status, store offer id right after it's created [JS-814, JS-815] ([#1059](https://github.com/fluencelabs/cli/issues/1059))

### Features

* add --reset-nox-secrets flag, improve config validation error messages [JS-812, JS-813] ([#1057](https://github.com/fluencelabs/cli/issues/1057)) ([9697231](https://github.com/fluencelabs/cli/commit/96972316a580c4d5430951ce5129bd64a482217e))
* group cc infos by status, store offer id right after it's created [JS-814, JS-815] ([#1059](https://github.com/fluencelabs/cli/issues/1059)) ([e90c087](https://github.com/fluencelabs/cli/commit/e90c087de568266982011e2b2a29a2ec56bdaf6a))
* update deal-ts-clients@0.22.0 ([#1061](https://github.com/fluencelabs/cli/issues/1061)) ([d760683](https://github.com/fluencelabs/cli/commit/d760683e6562faaa846049b432c485d8b2a6563e))

## [0.21.0](https://github.com/fluencelabs/cli/compare/fluence-cli-v0.20.6...fluence-cli-v0.21.0) (2024-09-23)


### ⚠ BREAKING CHANGES

* use guessTxSizeAndSign in multicall ([#1053](https://github.com/fluencelabs/cli/issues/1053))

### Features

* removeCUFromCC only for units that are not already exited ([#1056](https://github.com/fluencelabs/cli/issues/1056)) ([4981e80](https://github.com/fluencelabs/cli/commit/4981e80a45d1aed1eba48e0c3d55c3e44904f7fa))
* support indexer returning bigint ([#1055](https://github.com/fluencelabs/cli/issues/1055)) ([c71d0ba](https://github.com/fluencelabs/cli/commit/c71d0ba28622e9b4f3dc2da88e4ef67d2f2b3370))
* use guessTxSizeAndSign in multicall ([#1053](https://github.com/fluencelabs/cli/issues/1053)) ([54ba2ea](https://github.com/fluencelabs/cli/commit/54ba2ead4f4e785d0134d34c682b68b4fdc4fe92))

## [0.20.6](https://github.com/fluencelabs/cli/compare/fluence-cli-v0.20.5...fluence-cli-v0.20.6) (2024-09-19)


### Features

* offer-remove --offer-ids flag support, set default stakerReward to 20 ([#1051](https://github.com/fluencelabs/cli/issues/1051)) ([0ca2bd3](https://github.com/fluencelabs/cli/commit/0ca2bd3ef51de7ad24488f03d5965696cf020f9f))

## [0.20.5](https://github.com/fluencelabs/cli/compare/fluence-cli-v0.20.4...fluence-cli-v0.20.5) (2024-09-18)


### Bug Fixes

* raw config merge fix, testnet -&gt; dar for deal-ts-client fix ([#1048](https://github.com/fluencelabs/cli/issues/1048)) ([049e1ab](https://github.com/fluencelabs/cli/commit/049e1abcbd0762ddd27dd7a69803aeeaf132c8ad))

## [0.20.4](https://github.com/fluencelabs/cli/compare/fluence-cli-v0.20.3...fluence-cli-v0.20.4) (2024-09-17)


### Features

* update @fluencelabs/fluence-network-environment@1.2.3 ([#1044](https://github.com/fluencelabs/cli/issues/1044)) ([fe79472](https://github.com/fluencelabs/cli/commit/fe7947278bfb9fceb6daebaac2126d0f3a7fe108))

## [0.20.3](https://github.com/fluencelabs/cli/compare/fluence-cli-v0.20.2...fluence-cli-v0.20.3) (2024-09-17)


### Features

* support vm effector by default, rename cc-collateral-withdraw to cc-finish ([#1042](https://github.com/fluencelabs/cli/issues/1042)) ([07c2cd5](https://github.com/fluencelabs/cli/commit/07c2cd534a1947b83e3179f55e4f5b35466aff69))

## [0.20.2](https://github.com/fluencelabs/cli/compare/fluence-cli-v0.20.1...fluence-cli-v0.20.2) (2024-09-16)


### Features

* estimate gas before sending tx ([#1033](https://github.com/fluencelabs/cli/issues/1033)) ([366e48e](https://github.com/fluencelabs/cli/commit/366e48ec1ef23b23516f357a7191b75b2e1825d3))
* migrate kras and dar to mainnet and testnet ([#1038](https://github.com/fluencelabs/cli/issues/1038)) ([fa332a3](https://github.com/fluencelabs/cli/commit/fa332a38e63543d90d5c4cdc556bbc3d429da868))


### Bug Fixes

* bump deal-ts-clients 0.19.4 ([#1034](https://github.com/fluencelabs/cli/issues/1034)) ([2e5af62](https://github.com/fluencelabs/cli/commit/2e5af62195ae9eb4b0251f291e81ba68e611badb))
* bump deal-ts-clients 0.19.5 ([#1036](https://github.com/fluencelabs/cli/issues/1036)) ([b857da8](https://github.com/fluencelabs/cli/commit/b857da8eb4c77e91e7a90be50868e969bd0431c4))
* bump deal-ts-clients 0.19.6 ([#1037](https://github.com/fluencelabs/cli/issues/1037)) ([6a36182](https://github.com/fluencelabs/cli/commit/6a36182ab5bd01c666863b9877c27e5ca8e9ec05))
* versions in configs ([#1040](https://github.com/fluencelabs/cli/issues/1040)) ([d731360](https://github.com/fluencelabs/cli/commit/d7313603c9b3438548f13f8c3582f2fce9951806))

## [0.20.1](https://github.com/fluencelabs/cli/compare/fluence-cli-v0.20.0...fluence-cli-v0.20.1) (2024-09-13)


### Features

* create one deal per peer with cuCountPerWorker number of compute units ([#1031](https://github.com/fluencelabs/cli/issues/1031)) ([cb2c1aa](https://github.com/fluencelabs/cli/commit/cb2c1aa4c7453d318aeb71a9b4a48bb5fa5bfe62))
* **deals:** support split deal rewards ([#1027](https://github.com/fluencelabs/cli/issues/1027)) ([2a96f20](https://github.com/fluencelabs/cli/commit/2a96f200662251626b05bac79dfdeb7ad0c61e25))

## [0.20.0](https://github.com/fluencelabs/cli/compare/fluence-cli-v0.19.2...fluence-cli-v0.20.0) (2024-09-09)


### ⚠ BREAKING CHANGES

* update default ports ([#1021](https://github.com/fluencelabs/cli/issues/1021))

### Features

* add offer-remove command ([#1018](https://github.com/fluencelabs/cli/issues/1018)) ([200a171](https://github.com/fluencelabs/cli/commit/200a17153acc76cd19f9bbe0f72cc992b0847b5c))
* don't require connecting wallet on provider info if provider address is in provider artifacts for current env ([#1019](https://github.com/fluencelabs/cli/issues/1019)) ([fe63b24](https://github.com/fluencelabs/cli/commit/fe63b2457171bb82d7b1ab63cf4c0f67775c51ce))
* match when not enough workers and running deal deploy, print success message in case of retry ([#1024](https://github.com/fluencelabs/cli/issues/1024)) ([48982b1](https://github.com/fluencelabs/cli/commit/48982b131b5c481ebd1b9ef5d3cb778f60ef3437))
* up deal-ts-clients, show additional cc-info for providers ([#1023](https://github.com/fluencelabs/cli/issues/1023)) ([6a37315](https://github.com/fluencelabs/cli/commit/6a37315f582d9b2fb00255dd74ab2ec131075c7b))
* update default ports ([#1021](https://github.com/fluencelabs/cli/issues/1021)) ([941128d](https://github.com/fluencelabs/cli/commit/941128d4b51bf06ca797384762e0510acf354d47))


### Bug Fixes

* collateral withdraw by doing moveResourcesFromDeal [fixes DXJ-766] ([#1025](https://github.com/fluencelabs/cli/issues/1025)) ([f33d633](https://github.com/fluencelabs/cli/commit/f33d6331750a2adb94f8cc05476ad767f6f0a979))
* **deps:** bump deal-ts-clients to 0.18.7 ([#1026](https://github.com/fluencelabs/cli/issues/1026)) ([bc6d8c9](https://github.com/fluencelabs/cli/commit/bc6d8c931a28a5991acb07ee3198d250995297f4))

## [0.19.2](https://github.com/fluencelabs/cli/compare/fluence-cli-v0.19.1...fluence-cli-v0.19.2) (2024-09-03)


### Features

* use pinned IPFS container version, other improvements ([#1006](https://github.com/fluencelabs/cli/issues/1006)) ([3095b26](https://github.com/fluencelabs/cli/commit/3095b2633b99f448a4faef6cbe7073dc6a8dc589))


### Bug Fixes

* **provider:** rename rewardDelegationRate to stakerReward ([#1017](https://github.com/fluencelabs/cli/issues/1017)) ([efc8acc](https://github.com/fluencelabs/cli/commit/efc8acc25fb7038726f036eec0370f8fd35854fa))
* **vm_config:** add hostSshPort and vmSshPort to Nox's vmConfig ([#1016](https://github.com/fluencelabs/cli/issues/1016)) ([38a281b](https://github.com/fluencelabs/cli/commit/38a281b0f0469bf257d657d76e516ba81235d997))

## [0.19.1](https://github.com/fluencelabs/cli/compare/fluence-cli-v0.19.0...fluence-cli-v0.19.1) (2024-08-29)


### Features

* **vm:** add vmConfig to computePeer.nox ([#1009](https://github.com/fluencelabs/cli/issues/1009)) ([9aa8c2d](https://github.com/fluencelabs/cli/commit/9aa8c2d8c928c3504c18318048069bb2d3d63e5f))


### Bug Fixes

* **chain:** update chain uris to .fluence.dev domains ([#1007](https://github.com/fluencelabs/cli/issues/1007)) ([e1cc1d8](https://github.com/fluencelabs/cli/commit/e1cc1d80a1780d64b3004f0f610322b6c435be7a))

## [0.19.0](https://github.com/fluencelabs/cli/compare/fluence-cli-v0.18.0...fluence-cli-v0.19.0) (2024-08-22)


### ⚠ BREAKING CHANGES

* **marketplace:** many CUs in a worker ([#1001](https://github.com/fluencelabs/cli/issues/1001))

### Features

* **marketplace:** many CUs in a worker ([#1001](https://github.com/fluencelabs/cli/issues/1001)) ([5333eff](https://github.com/fluencelabs/cli/commit/5333eff4ef1529fa6443f25119968d44c0164817))


### Bug Fixes

* add retry to getting offers info from indexer when offer is created ([#998](https://github.com/fluencelabs/cli/issues/998)) ([909d8cb](https://github.com/fluencelabs/cli/commit/909d8cbbc0688a2704e9922ed61887717eff9107))

## [0.18.0](https://github.com/fluencelabs/cli/compare/fluence-cli-v0.17.1...fluence-cli-v0.18.0) (2024-08-13)


### ⚠ BREAKING CHANGES

* **kras:** switch kras chain to raas ([#993](https://github.com/fluencelabs/cli/issues/993))

### Features

* add provider test ([#980](https://github.com/fluencelabs/cli/issues/980)) ([e8be713](https://github.com/fluencelabs/cli/commit/e8be7136bd079604acc42f5b27dd2983cb2e46a4))
* **deps, provider:** deal-ts-clients 0.15.2, integrate new collateral withdrawal [fixes JS-783] ([#992](https://github.com/fluencelabs/cli/issues/992)) ([efab776](https://github.com/fluencelabs/cli/commit/efab7760920eee3bcd5390955877dffa8f8b13fd))
* **kras:** switch kras chain to raas ([#993](https://github.com/fluencelabs/cli/issues/993)) ([ff3da14](https://github.com/fluencelabs/cli/commit/ff3da141ac0d669b6a6dfeb19a2a7e0553712b28))
* nox diamond update, update aqua-lib 0.11.0 ([#995](https://github.com/fluencelabs/cli/issues/995)) ([442b6c8](https://github.com/fluencelabs/cli/commit/442b6c83c36e93411a50e25e4707e2c62d9b3125))
* offer-info updates [fixes DXJ-770] ([#906](https://github.com/fluencelabs/cli/issues/906)) ([f60a390](https://github.com/fluencelabs/cli/commit/f60a3902e4604fd293ca98558441228df37caf39))


### Bug Fixes

* **deps:** deal-ts-clients 0.15.4, new stage & testnet contracts ([#996](https://github.com/fluencelabs/cli/issues/996)) ([a8e1118](https://github.com/fluencelabs/cli/commit/a8e1118e44b48498d1cf123d15f69ac92286db7f))
* **deps:** fluence-network-environment 1.2.2 ([#989](https://github.com/fluencelabs/cli/issues/989)) ([e5a141d](https://github.com/fluencelabs/cli/commit/e5a141d96d41393fdc27238e0162729bf1ac6178))
* don't ensure rust when showing versions ([#999](https://github.com/fluencelabs/cli/issues/999)) ([4200df2](https://github.com/fluencelabs/cli/commit/4200df263134f57ccca549dc53e2fdb4a6c6d91e))

## [0.17.1](https://github.com/fluencelabs/cli/compare/fluence-cli-v0.17.0...fluence-cli-v0.17.1) (2024-07-26)


### Features

* add health check to graph-node ([#981](https://github.com/fluencelabs/cli/issues/981)) ([b43b913](https://github.com/fluencelabs/cli/commit/b43b9131230a62503be89e58431a30f2ee40c7d0))
* add human-readable messages to the CLI connector ([#976](https://github.com/fluencelabs/cli/issues/976)) ([e1fdfa2](https://github.com/fluencelabs/cli/commit/e1fdfa28c6fe11e1912d1692202e5a91a8e5a456))
* allow deploying to all CU of peer ids [BRND-13] ([#982](https://github.com/fluencelabs/cli/issues/982)) ([5406252](https://github.com/fluencelabs/cli/commit/54062523324d200bbb7ad2662a6e565501574de0))
* bump deal-ts-clients 0.14.0 ([#969](https://github.com/fluencelabs/cli/issues/969)) ([2a5f6f2](https://github.com/fluencelabs/cli/commit/2a5f6f27b2aaf282041f3e64e753f7944fc06f38))
* use rust-toolchain.toml ([#975](https://github.com/fluencelabs/cli/issues/975)) ([4f43ec6](https://github.com/fluencelabs/cli/commit/4f43ec66fc8f5f2ec4b7f7e62d1a85f25b694059))


### Bug Fixes

* **deps:** deal-ts-clients 0.15.1, diamond on Dar ([#987](https://github.com/fluencelabs/cli/issues/987)) ([d49a48c](https://github.com/fluencelabs/cli/commit/d49a48c65a0668d2b17900516f298931f5b90291))
* **deps:** ts-clients 0.15.0, diamond on stage ([#986](https://github.com/fluencelabs/cli/issues/986)) ([38ec5c7](https://github.com/fluencelabs/cli/commit/38ec5c7d0505d5b05f789a1d079d565470d666d4))
* documentation links in configs ([#977](https://github.com/fluencelabs/cli/issues/977)) ([dc18d0c](https://github.com/fluencelabs/cli/commit/dc18d0cc016f7c72e9b2c5446534de2faf2e2cd1))

## [0.17.0](https://github.com/fluencelabs/cli/compare/fluence-cli-v0.16.3...fluence-cli-v0.17.0) (2024-06-20)


### ⚠ BREAKING CHANGES

* update rust toolchain and fix toolchain override ([#959](https://github.com/fluencelabs/cli/issues/959))

### Features

* add json flag for provider cc-info ([#955](https://github.com/fluencelabs/cli/issues/955)) ([5887b5f](https://github.com/fluencelabs/cli/commit/5887b5f68084601988e6d886c28ef86cfdd88e5c))
* improve redeploy message ([#945](https://github.com/fluencelabs/cli/issues/945)) ([a5469d3](https://github.com/fluencelabs/cli/commit/a5469d34eb783e447efca20392d31f51bbe0b70b))
* local connector, linter, formatter, CI cache fix [fixes DXJ-409] ([#953](https://github.com/fluencelabs/cli/issues/953)) ([1282089](https://github.com/fluencelabs/cli/commit/1282089d7be6313a6bd5f8cb52c3ccaab0ee5134))
* set up monorepo ([#943](https://github.com/fluencelabs/cli/issues/943)) ([10ab8e1](https://github.com/fluencelabs/cli/commit/10ab8e14b87b9673f1fa4563a6b2eb2854b300c0))
* update marine 0.20.1, mrepl 0.31.0 ([#954](https://github.com/fluencelabs/cli/issues/954)) ([f7e0e0a](https://github.com/fluencelabs/cli/commit/f7e0e0a0bab59913aafa9b95628217aeefa93ba3))
* update nox 0.25.0 ([#951](https://github.com/fluencelabs/cli/issues/951)) ([b896cdd](https://github.com/fluencelabs/cli/commit/b896cddc2f630dddef3b55dc2a1b8818aa3180d0))


### Bug Fixes

* add cc-ids flag to provider cc-rewards-withdraw ([#970](https://github.com/fluencelabs/cli/issues/970)) ([1563e64](https://github.com/fluencelabs/cli/commit/1563e64ecb83b426e7f01401a6779c37d51adb88))
* cli-connector not found ([#965](https://github.com/fluencelabs/cli/issues/965)) ([748fcb3](https://github.com/fluencelabs/cli/commit/748fcb33dbe1f8e6297da48a6dc559c01259c6f9))
* remove cli from monorepo ([#964](https://github.com/fluencelabs/cli/issues/964)) ([5521b54](https://github.com/fluencelabs/cli/commit/5521b5460b4406fd82391324fda7ef4341d88246))
* update rust toolchain and fix toolchain override ([#959](https://github.com/fluencelabs/cli/issues/959)) ([7ed61b9](https://github.com/fluencelabs/cli/commit/7ed61b95dc6ea65e52b90dadffedb8f383ba3bdd))

## [0.16.3](https://github.com/fluencelabs/cli/compare/fluence-cli-v0.16.2...fluence-cli-v0.16.3) (2024-05-20)


### Features

* add payment token update for offers [fixes DXJ-768] ([#899](https://github.com/fluencelabs/cli/issues/899)) ([01a4038](https://github.com/fluencelabs/cli/commit/01a40386b5831ad9d37f1ddcbd1b11f269a89106))
* allow adding spell to any deployment, improve validation [fixes DXJ-762] ([#909](https://github.com/fluencelabs/cli/issues/909)) ([b21f064](https://github.com/fluencelabs/cli/commit/b21f0640773108370c3e8864689c7832613d6cd3))
* allow selecting a deployment when creating a new service [fixes DXJ-776] ([#914](https://github.com/fluencelabs/cli/issues/914)) ([7605eae](https://github.com/fluencelabs/cli/commit/7605eae0960a2b446433b205035cd124f43168e9))
* chunk CUs when withdrawing collateral, add retry for Tendermint RPC error ([#929](https://github.com/fluencelabs/cli/issues/929)) ([d0520c1](https://github.com/fluencelabs/cli/commit/d0520c1079f331ed69d99ea281159c122b095cee))
* decrease retry timeouts [fixes DXJ-764] ([#892](https://github.com/fluencelabs/cli/issues/892)) ([f741245](https://github.com/fluencelabs/cli/commit/f741245156ca5c55d6b57f97974e67bec25f87c7))
* improve offer-update logs [fixes DXJ-760] ([#910](https://github.com/fluencelabs/cli/issues/910)) ([e7f20d5](https://github.com/fluencelabs/cli/commit/e7f20d56d529d1e85fc2ea63ec14319fcdb1734e))
* make it possible to move noxes from one offer to another, improve tx batch types [fixes DXJ-759] ([#913](https://github.com/fluencelabs/cli/issues/913)) ([8192990](https://github.com/fluencelabs/cli/commit/8192990fa612cfab109202cc8d182adf099d8fc0))
* retry indexer client on local network ([#911](https://github.com/fluencelabs/cli/issues/911)) ([0c37a46](https://github.com/fluencelabs/cli/commit/0c37a46662ba249ed3d4026f0bd50763539abc5e))
* set maxPriorityFeePerGas to 0 for all transactions [fixes DXJ-769] ([#902](https://github.com/fluencelabs/cli/issues/902)) ([c92a6c9](https://github.com/fluencelabs/cli/commit/c92a6c968c0624161786abffc6cec13289eafd91))
* temporarily retry some of the flaky tests ([#904](https://github.com/fluencelabs/cli/issues/904)) ([c6a5d80](https://github.com/fluencelabs/cli/commit/c6a5d8050915c7f6875558bd30ae82c733304c7c))
* test improvements ([#923](https://github.com/fluencelabs/cli/issues/923)) ([516644f](https://github.com/fluencelabs/cli/commit/516644fdbc0f71acd8cf731391d15af15fb3a38c))
* up deal repo 0.13.9 ([#901](https://github.com/fluencelabs/cli/issues/901)) ([1b7718b](https://github.com/fluencelabs/cli/commit/1b7718b10617bab413aa93a877e0c8f6ec2f5b61))
* update all dependencies ([#917](https://github.com/fluencelabs/cli/issues/917)) ([0e9f42c](https://github.com/fluencelabs/cli/commit/0e9f42caa5ac714ba188c05e3c3854317a867e54))
* update copyright ([#919](https://github.com/fluencelabs/cli/issues/919)) ([b3a7016](https://github.com/fluencelabs/cli/commit/b3a70164bacd20e2f0ed7b7d8816c3e1e21ffb9a))


### Bug Fixes

* --cc-ids flag not working [fixes DXJ-765] ([#896](https://github.com/fluencelabs/cli/issues/896)) ([c6f33a3](https://github.com/fluencelabs/cli/commit/c6f33a3d12bfe89b0c45afe2753cabdf0a7fe1ea))
* don't interactively ask for the env in `fluence default peers` command when env is provided as an arg [fixes DXJ-775] ([#907](https://github.com/fluencelabs/cli/issues/907)) ([26ca66b](https://github.com/fluencelabs/cli/commit/26ca66bd9a85b4f239be2011b159b5de6ed2d9da))
* filter provider's CUs when exiting from deals. Add CU batching [fixes DXJ-778] ([#931](https://github.com/fluencelabs/cli/issues/931)) ([93acfc1](https://github.com/fluencelabs/cli/commit/93acfc11b10e11eef7eab74d85c331f78b4a9fc0))
* remove duplicate data definitions when services use the same module with some struct [fixes DXJ-751] ([#898](https://github.com/fluencelabs/cli/issues/898)) ([c810588](https://github.com/fluencelabs/cli/commit/c810588a30c338aef17f4d58d00c0fd6f94bd394))
* support rename in deal repo ([#900](https://github.com/fluencelabs/cli/issues/900)) ([540225f](https://github.com/fluencelabs/cli/commit/540225f21157b9b64e745169e358d0e7d4d6a69c))
* use readonly chain client where currently possible [fixes DXJ-750] ([#894](https://github.com/fluencelabs/cli/issues/894)) ([652d2dd](https://github.com/fluencelabs/cli/commit/652d2dd173ce296b23f674170050525918155929))

## [0.16.2](https://github.com/fluencelabs/cli/compare/fluence-cli-v0.16.1...fluence-cli-v0.16.2) (2024-04-04)


### Features

* bump deal-ts-clients 0.13.8 ([#891](https://github.com/fluencelabs/cli/issues/891)) ([6d0d447](https://github.com/fluencelabs/cli/commit/6d0d44725243ce3cc2971b6266669b24fae33952))
* remove env config from default gitignore ([#890](https://github.com/fluencelabs/cli/issues/890)) ([17e1aec](https://github.com/fluencelabs/cli/commit/17e1aec198b015b466228df89008d23662168a62))
* update eslint ([#888](https://github.com/fluencelabs/cli/issues/888)) ([9f71006](https://github.com/fluencelabs/cli/commit/9f71006b407ede062c74d4d17f681b7e4a6adc51))

## [0.16.1](https://github.com/fluencelabs/cli/compare/fluence-cli-v0.16.0...fluence-cli-v0.16.1) (2024-04-04)


### Features

* allow updating peers and CU in offer [DXJ-668] ([#885](https://github.com/fluencelabs/cli/issues/885)) ([6bc05c8](https://github.com/fluencelabs/cli/commit/6bc05c8c581d5366adc72c3165b41288abece251))
* bump fluence-network-environment 0.2.1 ([#887](https://github.com/fluencelabs/cli/issues/887)) ([ef225de](https://github.com/fluencelabs/cli/commit/ef225de808f5d53d9493eac4138ca5dc116d1a06))

## [0.16.0](https://github.com/fluencelabs/cli/compare/fluence-cli-v0.15.28...fluence-cli-v0.16.0) (2024-04-02)


### ⚠ BREAKING CHANGES

* store unmatched deals, rename commands and flags ([#868](https://github.com/fluencelabs/cli/issues/868))

### Features

* add provider tokens-withdraw [fixes DXJ-755] ([#880](https://github.com/fluencelabs/cli/issues/880)) ([1377ee4](https://github.com/fluencelabs/cli/commit/1377ee4b7438f3c4938fdb76465beabd6f803e2a))
* bump @fluencelabs/fluence-network-environment v1.2.0 ([#884](https://github.com/fluencelabs/cli/issues/884)) ([3133c16](https://github.com/fluencelabs/cli/commit/3133c1630ac051e3c84323d38cc1b81e1076ec5d))
* bump deal-ts-clients to 0.13.6 ([#878](https://github.com/fluencelabs/cli/issues/878)) ([3a8865e](https://github.com/fluencelabs/cli/commit/3a8865e0d7d4de178c274dd24f2e583b128b08e5))
* change dar urls; bump deal-ts-clients to 0.13.5 ([#877](https://github.com/fluencelabs/cli/issues/877)) ([f6e9960](https://github.com/fluencelabs/cli/commit/f6e9960d876980088ac49ec37ded838d2eb7d132))
* fix DAR ipfs default multiaddr ([#883](https://github.com/fluencelabs/cli/issues/883)) ([e93712c](https://github.com/fluencelabs/cli/commit/e93712c5c127e50bf3017d16d4abf42aac2ddd68))
* provider artifacts per env [fixes DXJ-756] ([#881](https://github.com/fluencelabs/cli/issues/881)) ([c52ace4](https://github.com/fluencelabs/cli/commit/c52ace4b7bcc45c6ff149809c13e5a9299c76c1a))
* set default price per epoch as 0.33 [fixes DXJ-757] ([#882](https://github.com/fluencelabs/cli/issues/882)) ([b5aac8e](https://github.com/fluencelabs/cli/commit/b5aac8e10eeb4aa1e001f97da0e8d20e47ee512c))
* store unmatched deals, rename commands and flags ([#868](https://github.com/fluencelabs/cli/issues/868)) ([1ec9414](https://github.com/fluencelabs/cli/commit/1ec94145904a0c7327e8da3d97e214e375f8ccf8))
* use cli client, improve cc-info, add deal-list command ([#875](https://github.com/fluencelabs/cli/issues/875)) ([4f6c358](https://github.com/fluencelabs/cli/commit/4f6c3581486ccfac5aac00664276f3489a2725de))


### Bug Fixes

* fix repl facade module being first instead of being last ([#873](https://github.com/fluencelabs/cli/issues/873)) ([fe37bb0](https://github.com/fluencelabs/cli/commit/fe37bb02a1a8f2da9c11e8387be1d5777b061d6e))
* **offer-create:** offer-update suggestion typo ([#876](https://github.com/fluencelabs/cli/issues/876)) ([bdf3f2b](https://github.com/fluencelabs/cli/commit/bdf3f2ba66ea2d5f63a8021fea84085f1c114209))

## [0.15.28](https://github.com/fluencelabs/cli/compare/fluence-cli-v0.15.27...fluence-cli-v0.15.28) (2024-03-20)


### Features

* bump deal-ts-clients 0.13.0 ([#872](https://github.com/fluencelabs/cli/issues/872)) ([739a5bd](https://github.com/fluencelabs/cli/commit/739a5bd0679c1c77767d2403876e8889cca472de))


### Bug Fixes

* change kras ipfs addr ([#869](https://github.com/fluencelabs/cli/issues/869)) ([2e82fcb](https://github.com/fluencelabs/cli/commit/2e82fcb2ef9d8a563d7772816a9212b2efd10be4))
* **ipfs:** /dns4/ipfs.kras.fluence.dev/tcp/5020 ([#871](https://github.com/fluencelabs/cli/issues/871)) ([f4d351c](https://github.com/fluencelabs/cli/commit/f4d351c5061af5b42aa6b5d3d3f4b60b1e36cc21))

## [0.15.27](https://github.com/fluencelabs/cli/compare/fluence-cli-v0.15.26...fluence-cli-v0.15.27) (2024-03-19)


### Bug Fixes

* **provider:** fix default worker_ipfs_multiaddr ([#866](https://github.com/fluencelabs/cli/issues/866)) ([a256ae2](https://github.com/fluencelabs/cli/commit/a256ae2f1958f12666ca83c4f0dd7d4df41ac33b))

## [0.15.26](https://github.com/fluencelabs/cli/compare/fluence-cli-v0.15.25...fluence-cli-v0.15.26) (2024-03-19)


### Features

* fix chain url, bump deal 0.12.2; nox 0.23.6 ([#863](https://github.com/fluencelabs/cli/issues/863)) ([61a2df6](https://github.com/fluencelabs/cli/commit/61a2df68091c60544d94db2c20c7c7dc0493c1d1))


### Bug Fixes

* set public images ([#865](https://github.com/fluencelabs/cli/issues/865)) ([afef746](https://github.com/fluencelabs/cli/commit/afef7461a41fefbcc43ee8f5f20fedea845b243d))

## [0.15.25](https://github.com/fluencelabs/cli/compare/fluence-cli-v0.15.24...fluence-cli-v0.15.25) (2024-03-18)


### Features

* add default fee, up nox, small adjustments in logs, rename offer flag ([#861](https://github.com/fluencelabs/cli/issues/861)) ([9c56555](https://github.com/fluencelabs/cli/commit/9c56555e60f218622b5a3d2f284ba50196731457))
* add kras env back + bump deal-ts-clients 0.12.0 ([#860](https://github.com/fluencelabs/cli/issues/860)) ([6ba7a12](https://github.com/fluencelabs/cli/commit/6ba7a1252d155351aa8292821945426e1d29aa76))
* new modules, gen Config.tomls for services, some refactoring, fix CID ([#855](https://github.com/fluencelabs/cli/issues/855)) ([899a844](https://github.com/fluencelabs/cli/commit/899a844b66988548c5d53a9fc783c66bb9039a2b))
* support deal-ts-clients v0.12.0 ([#862](https://github.com/fluencelabs/cli/issues/862)) ([83f6069](https://github.com/fluencelabs/cli/commit/83f6069980138f9a57d74f69469ce53babdecbba))

## [0.15.24](https://github.com/fluencelabs/cli/compare/fluence-cli-v0.15.23...fluence-cli-v0.15.24) (2024-03-15)


### Features

* bump deal-ts-clients 0.11.2 ([#857](https://github.com/fluencelabs/cli/issues/857)) ([3b77735](https://github.com/fluencelabs/cli/commit/3b777359707bffdc4ca8630fd46646d8b1948331))

## [0.15.23](https://github.com/fluencelabs/cli/compare/fluence-cli-v0.15.22...fluence-cli-v0.15.23) (2024-03-15)


### Features

* add ability for provider to update effectors and add module pack command ([#849](https://github.com/fluencelabs/cli/issues/849)) ([bc862a4](https://github.com/fluencelabs/cli/commit/bc862a485b0ddc5f3d557bdf7a6f7dbcbed424e4))
* bump nox 0.23.4; bump deal-ts-clients 0.11.1 ([#856](https://github.com/fluencelabs/cli/issues/856)) ([07eed08](https://github.com/fluencelabs/cli/commit/07eed08cc3f51c6e6685308f7fd315ede0cdcf51))
* up deal-ts-clients to v0.11 ([#854](https://github.com/fluencelabs/cli/issues/854)) ([e05e8e2](https://github.com/fluencelabs/cli/commit/e05e8e233627a5999b34443913c038754266c37e))

## [0.15.22](https://github.com/fluencelabs/cli/compare/fluence-cli-v0.15.21...fluence-cli-v0.15.22) (2024-03-11)


### Features

* update deal-ts-clients to 0.10.1; nox to 0.23.2 ([#846](https://github.com/fluencelabs/cli/issues/846)) ([d942bbc](https://github.com/fluencelabs/cli/commit/d942bbccc5b71dcbaff92ebb8a52560943c51a97))

## [0.15.21](https://github.com/fluencelabs/cli/compare/fluence-cli-v0.15.20...fluence-cli-v0.15.21) (2024-03-10)


### Bug Fixes

* **ccp-config:** use "./state" as default state path ([#845](https://github.com/fluencelabs/cli/issues/845)) ([ea4a180](https://github.com/fluencelabs/cli/commit/ea4a180c415fe4682f16c185b8f46fa4f0e87087))
* **ci:** dump anvil state at the end ([#843](https://github.com/fluencelabs/cli/issues/843)) ([9a4d679](https://github.com/fluencelabs/cli/commit/9a4d6797ad8f0f693e4d7efe266f70f82319d77b))

## [0.15.20](https://github.com/fluencelabs/cli/compare/fluence-cli-v0.15.19...fluence-cli-v0.15.20) (2024-03-09)


### Features

* add cc-remove and other provider and developer improvements [fixes DXJ-752] ([#840](https://github.com/fluencelabs/cli/issues/840)) ([c1b8157](https://github.com/fluencelabs/cli/commit/c1b8157024faa18082be1c2d28d954891a67e7ab))
* bump deal-ts-clients to 0.10.0 ([#841](https://github.com/fluencelabs/cli/issues/841)) ([4bd26b8](https://github.com/fluencelabs/cli/commit/4bd26b884a8bd55ff10af96d2a87a2c8ef2847a7))

## [0.15.19](https://github.com/fluencelabs/cli/compare/fluence-cli-v0.15.18...fluence-cli-v0.15.19) (2024-03-08)


### Features

* add ccp-configs and improve provider config [fixes DXJ-749] ([#835](https://github.com/fluencelabs/cli/issues/835)) ([0b36a3b](https://github.com/fluencelabs/cli/commit/0b36a3b31b8e4a311a744334ef3e3ca0003127dc))


### Bug Fixes

* **versions.json:** nox 0.22.1, chain 0.9.0 ([e0fff68](https://github.com/fluencelabs/cli/commit/e0fff68a9da702ab3067a5872c76d66ed695ba23))
* **versions.json:** nox 0.22.2, chain 0.9.0 ([#837](https://github.com/fluencelabs/cli/issues/837)) ([e0fff68](https://github.com/fluencelabs/cli/commit/e0fff68a9da702ab3067a5872c76d66ed695ba23))

## [0.15.18](https://github.com/fluencelabs/cli/compare/fluence-cli-v0.15.17...fluence-cli-v0.15.18) (2024-03-07)


### Features

* up deal-ts-clients 0.8.0 ([#834](https://github.com/fluencelabs/cli/issues/834)) ([c4a334b](https://github.com/fluencelabs/cli/commit/c4a334b0e481dec488e30bd70301b5dab0522df0))


### Bug Fixes

* **deps:** update dependency @fluencelabs/deal-ts-clients to v0.9.0 ([#836](https://github.com/fluencelabs/cli/issues/836)) ([4d5ed15](https://github.com/fluencelabs/cli/commit/4d5ed15a1f54d818ac01a4fd71dcfba4dda7a9ed))
* **deps:** update dependency @fluencelabs/js-client to v0.9.0 ([#805](https://github.com/fluencelabs/cli/issues/805)) ([a977f71](https://github.com/fluencelabs/cli/commit/a977f71c2790b7f6e21a820eab89a9a790aefd10))

## [0.15.17](https://github.com/fluencelabs/cli/compare/fluence-cli-v0.15.16...fluence-cli-v0.15.17) (2024-03-03)


### Features

* bump nox to 0.21.4 ([#831](https://github.com/fluencelabs/cli/issues/831)) ([dd02203](https://github.com/fluencelabs/cli/commit/dd0220338348569e127a09c346b4fc2732cb883d))

## [0.15.16](https://github.com/fluencelabs/cli/compare/fluence-cli-v0.15.15...fluence-cli-v0.15.16) (2024-03-03)


### Features

* bump deal-ts-clients to 0.7.3 ([#829](https://github.com/fluencelabs/cli/issues/829)) ([216b52c](https://github.com/fluencelabs/cli/commit/216b52c73dd6e16df2e39b836e6661db1be79bf0))

## [0.15.15](https://github.com/fluencelabs/cli/compare/fluence-cli-v0.15.14...fluence-cli-v0.15.15) (2024-03-02)


### Features

* update deal-ts-clients; change defaults ([#827](https://github.com/fluencelabs/cli/issues/827)) ([e3e8371](https://github.com/fluencelabs/cli/commit/e3e83711e18ed1956a2d907c02918f6b20843f9e))

## [0.15.14](https://github.com/fluencelabs/cli/compare/fluence-cli-v0.15.13...fluence-cli-v0.15.14) (2024-03-01)


### Features

* up deal-ts-clients, log aqua version, remove modules dir nesting by default ([#822](https://github.com/fluencelabs/cli/issues/822)) ([08911d0](https://github.com/fluencelabs/cli/commit/08911d082eb22d375a88257f86ccf69ab21ce904))


### Bug Fixes

* Fix nox healthcheck ([#825](https://github.com/fluencelabs/cli/issues/825)) ([da162f8](https://github.com/fluencelabs/cli/commit/da162f806c98cb1d0014e812e3a3e585d5ffaa10))

## [0.15.13](https://github.com/fluencelabs/cli/compare/fluence-cli-v0.15.12...fluence-cli-v0.15.13) (2024-02-29)


### Bug Fixes

* promise chaining ([#823](https://github.com/fluencelabs/cli/issues/823)) ([30d343e](https://github.com/fluencelabs/cli/commit/30d343e56accf680b7af69cbd4623279f0ea78e3))

## [0.15.12](https://github.com/fluencelabs/cli/compare/fluence-cli-v0.15.11...fluence-cli-v0.15.12) (2024-02-29)


### Features

* add white and black list [fixes DXJ-623] ([#815](https://github.com/fluencelabs/cli/issues/815)) ([3da88ec](https://github.com/fluencelabs/cli/commit/3da88ec0e67f196a65c73ff8b46f82769f88cab1))
* up marine 0.19.7, mrepl 0.30.0, marine-rs-sdk 0.14.0, marine-rs… ([#821](https://github.com/fluencelabs/cli/issues/821)) ([e45ba05](https://github.com/fluencelabs/cli/commit/e45ba05c2af39022e8ea6a88328ecb924e03e8a1))
* update deal-ts-clients ([#817](https://github.com/fluencelabs/cli/issues/817)) ([788e38f](https://github.com/fluencelabs/cli/commit/788e38f6b56110e6fa07a6fc87b313a84b5c773d))

## [0.15.11](https://github.com/fluencelabs/cli/compare/fluence-cli-v0.15.10...fluence-cli-v0.15.11) (2024-02-27)


### Features

* compile all aqua from fluence.yaml each time new aqua is generated ([#813](https://github.com/fluencelabs/cli/issues/813)) ([1e6be90](https://github.com/fluencelabs/cli/commit/1e6be9038f2baaec6a880d338fa36e2c86303fc3))
* up spell v0.7.6, nox v0.21.2; fix aqua from fluence.yaml compilation ([#811](https://github.com/fluencelabs/cli/issues/811)) ([d5445f5](https://github.com/fluencelabs/cli/commit/d5445f57a7e008998e976a02ce0798b99cfa9cea))


### Bug Fixes

* Add healthcheck to nox, persistence to chain-rpc container and set block mining time to 1 ([#816](https://github.com/fluencelabs/cli/issues/816)) ([9e41ec4](https://github.com/fluencelabs/cli/commit/9e41ec4053997d73f58e30ef3fd8f844735d84aa))

## [0.15.10](https://github.com/fluencelabs/cli/compare/fluence-cli-v0.15.9...fluence-cli-v0.15.10) (2024-02-24)


### Features

* decrease ttl, fix typo ([#809](https://github.com/fluencelabs/cli/issues/809)) ([7f80dcf](https://github.com/fluencelabs/cli/commit/7f80dcf33547125edbed6740292b2bc6c224960c))


### Bug Fixes

* Hotfix deals ([#812](https://github.com/fluencelabs/cli/issues/812)) ([4c9f6c1](https://github.com/fluencelabs/cli/commit/4c9f6c1e936890f111f4f908ba2787610da75811))

## [0.15.9](https://github.com/fluencelabs/cli/compare/fluence-cli-v0.15.8...fluence-cli-v0.15.9) (2024-02-24)


### Features

* fix decimals ([#808](https://github.com/fluencelabs/cli/issues/808)) ([162909f](https://github.com/fluencelabs/cli/commit/162909f444d320ae797ff80038d6bd23040f1182))


### Bug Fixes

* ensure rust ([#804](https://github.com/fluencelabs/cli/issues/804)) ([e5cb09b](https://github.com/fluencelabs/cli/commit/e5cb09b535a474721eb715261b511658f75e8e6b))

## [0.15.8](https://github.com/fluencelabs/cli/compare/fluence-cli-v0.15.7...fluence-cli-v0.15.8) (2024-02-23)


### Features

* add chain config ([#801](https://github.com/fluencelabs/cli/issues/801)) ([84434df](https://github.com/fluencelabs/cli/commit/84434df85d59150277776bb5aca45e268402742e))
* up @fluencelabs/deal-ts-clients v0.6.5 ([5163ef1](https://github.com/fluencelabs/cli/commit/5163ef18ca57056c571bab45c4dd1bced8d1f1ad))


### Bug Fixes

* developer ux and other fixes ([#799](https://github.com/fluencelabs/cli/issues/799)) ([b2aaf51](https://github.com/fluencelabs/cli/commit/b2aaf5102a2d460c93fb8f3d6d8269c17cd83c79))

## [0.15.7](https://github.com/fluencelabs/cli/compare/fluence-cli-v0.15.6...fluence-cli-v0.15.7) (2024-02-23)


### Features

* provider ux updates and dev ux fixes ([#790](https://github.com/fluencelabs/cli/issues/790)) ([4bf42e2](https://github.com/fluencelabs/cli/commit/4bf42e2b7378dabf2f3cab995c70284d01fce3bc))


### Bug Fixes

* Doc for Windows installation ([#798](https://github.com/fluencelabs/cli/issues/798)) ([aed0f7d](https://github.com/fluencelabs/cli/commit/aed0f7daa54985cf7f5ff6f442998d1af033ccc1))
* Redirect command on Windows ([#796](https://github.com/fluencelabs/cli/issues/796)) ([733bc9d](https://github.com/fluencelabs/cli/commit/733bc9d3020581424dbacf5453bc921a76f491a4))

## [0.15.6](https://github.com/fluencelabs/cli/compare/fluence-cli-v0.15.5...fluence-cli-v0.15.6) (2024-02-23)


### Bug Fixes

* **deps:** update dependency @fluencelabs/js-client to v0.8.4 ([#793](https://github.com/fluencelabs/cli/issues/793)) ([2a50b77](https://github.com/fluencelabs/cli/commit/2a50b77a2c80559e4efd5883a65a43c37b91681c))
* enable update on Windows ([#789](https://github.com/fluencelabs/cli/issues/789)) ([7235d82](https://github.com/fluencelabs/cli/commit/7235d8248d1fce3011bdee0488ce9bfad39b88b4))
* Redeploy stage contracts and update graph-node url ([#784](https://github.com/fluencelabs/cli/issues/784)) ([1253d44](https://github.com/fluencelabs/cli/commit/1253d44d84a33e37a4df3a226d1608ed3f32d257))
* upload tar on Window ([#792](https://github.com/fluencelabs/cli/issues/792)) ([672386e](https://github.com/fluencelabs/cli/commit/672386e87da06ccd5e06df528b7d70febc14b871))

## [0.15.5](https://github.com/fluencelabs/cli/compare/fluence-cli-v0.15.4...fluence-cli-v0.15.5) (2024-02-21)


### Bug Fixes

* **deps:** update dependency @fluencelabs/deal-ts-clients to v0.6.1 ([#779](https://github.com/fluencelabs/cli/issues/779)) ([6ad43c5](https://github.com/fluencelabs/cli/commit/6ad43c566b9a5ab7c2b403ccba4f333253d22220))

## [0.15.4](https://github.com/fluencelabs/cli/compare/fluence-cli-v0.15.3...fluence-cli-v0.15.4) (2024-02-21)


### Bug Fixes

* **deps:** update dependency @fluencelabs/deal-ts-clients to v0.6.0 ([#777](https://github.com/fluencelabs/cli/issues/777)) ([018383e](https://github.com/fluencelabs/cli/commit/018383e06a12c00c32a059970b5cf4100de6d237))

## [0.15.3](https://github.com/fluencelabs/cli/compare/fluence-cli-v0.15.2...fluence-cli-v0.15.3) (2024-02-21)


### Features

* Intro CLI for Windows [fixes FLU-610] ([#688](https://github.com/fluencelabs/cli/issues/688)) ([de53da8](https://github.com/fluencelabs/cli/commit/de53da889a38ca6c6767fdca0a189a3fb70c75ee))
* up dev and provider ux ([#772](https://github.com/fluencelabs/cli/issues/772)) ([76764ad](https://github.com/fluencelabs/cli/commit/76764addd4464b1e225cb1de5ce5e1c9a70144be))


### Bug Fixes

* Add template structure to README [fixes DXJ-714] ([#768](https://github.com/fluencelabs/cli/issues/768)) ([31e5f3a](https://github.com/fluencelabs/cli/commit/31e5f3aec8e784085a92da4999064a3522129e6a))
* **deps:** nox 0.20.1, enable debug logs for Decider ([#774](https://github.com/fluencelabs/cli/issues/774)) ([91c7f13](https://github.com/fluencelabs/cli/commit/91c7f13bedaf93572e223809c7121d62479bc369))

## [0.15.2](https://github.com/fluencelabs/cli/compare/fluence-cli-v0.15.1...fluence-cli-v0.15.2) (2024-02-20)


### Bug Fixes

* **deps:** use public image chain-rpc 0.5.2 ([#769](https://github.com/fluencelabs/cli/issues/769)) ([e4800fe](https://github.com/fluencelabs/cli/commit/e4800feee19aad344789a515a3bd76898726f1ad))

## [0.15.1](https://github.com/fluencelabs/cli/compare/fluence-cli-v0.15.0...fluence-cli-v0.15.1) (2024-02-19)


### Bug Fixes

* **deps:** use nox 0.20.0 ([#766](https://github.com/fluencelabs/cli/issues/766)) ([c75a1f2](https://github.com/fluencelabs/cli/commit/c75a1f26d1fa25d1a0221697fc298d6969644eb0))

## [0.15.0](https://github.com/fluencelabs/cli/compare/fluence-cli-v0.14.4...fluence-cli-v0.15.0) (2024-02-19)


### ⚠ BREAKING CHANGES

* add capacity commitment ([#654](https://github.com/fluencelabs/cli/issues/654))

### Features

* add capacity commitment ([#654](https://github.com/fluencelabs/cli/issues/654)) ([6b7211a](https://github.com/fluencelabs/cli/commit/6b7211a000ff4710567d1036913b6f8d9af553cc))
* rename deals to deployments ([#764](https://github.com/fluencelabs/cli/issues/764)) ([ed7188a](https://github.com/fluencelabs/cli/commit/ed7188ad2516f3b80e60419fc91fe24ccd3b05d8))

## [0.14.4](https://github.com/fluencelabs/cli/compare/fluence-cli-v0.14.3...fluence-cli-v0.14.4) (2024-02-14)


### Features

* trigger build ([#757](https://github.com/fluencelabs/cli/issues/757)) ([10da9dd](https://github.com/fluencelabs/cli/commit/10da9dd2d38d2392af0d2b04239694d10c00a819))


### Bug Fixes

* change build order ([755c1c6](https://github.com/fluencelabs/cli/commit/755c1c6418bcaa26174f44d222cff5f0bb1d5e2a))
* move exit cli ([#759](https://github.com/fluencelabs/cli/issues/759)) ([e32c927](https://github.com/fluencelabs/cli/commit/e32c927402eb90e6b7257bae591e38802c06a9ce))

## [0.14.3](https://github.com/fluencelabs/cli/compare/fluence-cli-v0.14.2...fluence-cli-v0.14.3) (2024-02-13)


### Bug Fixes

* adapt gateway template to vercel deployment ([#750](https://github.com/fluencelabs/cli/issues/750)) ([4601741](https://github.com/fluencelabs/cli/commit/4601741afcd975bd9c28b762711790aff90c8bac))
* fix aqua compilation path resolution [fixes DXJ-711] ([#751](https://github.com/fluencelabs/cli/issues/751)) ([d44e9e3](https://github.com/fluencelabs/cli/commit/d44e9e35127fe405cc399ef44ce0e9b4f6d01c8f))
* Fix JS environment in Vercel template ([#755](https://github.com/fluencelabs/cli/issues/755)) ([c6eb6f3](https://github.com/fluencelabs/cli/commit/c6eb6f3ac7761d79714509e4780ca83b963480e5))
* improver README [fixes DXJ-624 DXJ-681] ([#753](https://github.com/fluencelabs/cli/issues/753)) ([2956d5d](https://github.com/fluencelabs/cli/commit/2956d5d77db8fdb82c1c8e9e6666264259379831))

## [0.14.2](https://github.com/fluencelabs/cli/compare/fluence-cli-v0.14.1...fluence-cli-v0.14.2) (2024-02-09)


### Bug Fixes

* Adopt new serialization API from JS client ([#747](https://github.com/fluencelabs/cli/issues/747)) ([baff9d5](https://github.com/fluencelabs/cli/commit/baff9d5b9d2449161cec88ed66a4a701cb222cf2))
* **deps:** update dependency @fluencelabs/js-client to v0.8.3 ([#749](https://github.com/fluencelabs/cli/issues/749)) ([40fa9ef](https://github.com/fluencelabs/cli/commit/40fa9effdb33fa1be48c54a533fa964816942795))

## [0.14.1](https://github.com/fluencelabs/cli/compare/fluence-cli-v0.14.0...fluence-cli-v0.14.1) (2024-02-05)


### Features

* add default env for provider ([#744](https://github.com/fluencelabs/cli/issues/744)) ([cbf69fc](https://github.com/fluencelabs/cli/commit/cbf69fc0478f27731817f1bb951e3a5357ad222a))
* support multiple aqua configs [fixes DXJ-641] ([#743](https://github.com/fluencelabs/cli/issues/743)) ([f7213f8](https://github.com/fluencelabs/cli/commit/f7213f893e11dc0df8328740ff8fcc746157c249))
* update aqua to 0.14.0 ([#739](https://github.com/fluencelabs/cli/issues/739)) ([7f81e7e](https://github.com/fluencelabs/cli/commit/7f81e7eecf57f04c3126dee66456a81c160640bb))
* use npm-aqua-compiler 0.0.3 ([#741](https://github.com/fluencelabs/cli/issues/741)) ([c2ee892](https://github.com/fluencelabs/cli/commit/c2ee89282c3ac762459af3c123997945778109d7))


### Bug Fixes

* **deps:** update dependency @fluencelabs/js-client to v0.8.0 ([#742](https://github.com/fluencelabs/cli/issues/742)) ([deeb9ca](https://github.com/fluencelabs/cli/commit/deeb9caf61f6364976f3e370c854f8d1a86323ac))
* Improve gateway template readme content  ([#746](https://github.com/fluencelabs/cli/issues/746)) ([671dab8](https://github.com/fluencelabs/cli/commit/671dab83286cd8a2e5222ec86e25a326eeca9ad2))
* **test:** Add `aqua` header to spell file ([#737](https://github.com/fluencelabs/cli/issues/737)) ([8c23c19](https://github.com/fluencelabs/cli/commit/8c23c19b24c83c75ee77af9d44b046113e102d88))

## [0.14.0](https://github.com/fluencelabs/cli/compare/fluence-cli-v0.13.5...fluence-cli-v0.14.0) (2024-01-26)


### ⚠ BREAKING CHANGES

* **deps:** update dependency @fluencelabs/js-client to v0.7.0 ([#735](https://github.com/fluencelabs/cli/issues/735))

### Features

* Introduce gateway template ([#732](https://github.com/fluencelabs/cli/issues/732)) ([c3e594b](https://github.com/fluencelabs/cli/commit/c3e594b7416ff07a1167822f9946870f7eea0603))


### Bug Fixes

* **deps:** update dependency @fluencelabs/js-client to v0.7.0 ([#735](https://github.com/fluencelabs/cli/issues/735)) ([f56f451](https://github.com/fluencelabs/cli/commit/f56f45177f7bebd939e9148b0c1986b79a63009c))
* maybe fix seed bug [fixes DXJ-639] ([#734](https://github.com/fluencelabs/cli/issues/734)) ([85c5a96](https://github.com/fluencelabs/cli/commit/85c5a966f768d7743b97103e8467a6eda5389b86))
* **tests:** DXJ-617 fix environment problems ([#731](https://github.com/fluencelabs/cli/issues/731)) ([dc4a098](https://github.com/fluencelabs/cli/commit/dc4a098c146d83859636d93dcdfaca5665de382a))

## [0.13.5](https://github.com/fluencelabs/cli/compare/fluence-cli-v0.13.4...fluence-cli-v0.13.5) (2024-01-22)


### Features

* add `dep i` reminder ([#730](https://github.com/fluencelabs/cli/issues/730)) ([256c56c](https://github.com/fluencelabs/cli/commit/256c56c9333a07d9c2a51bfd124adcb675e0b0ed))
* add aqua header to services empty file ([#717](https://github.com/fluencelabs/cli/issues/717)) ([d340813](https://github.com/fluencelabs/cli/commit/d340813470b7cdee3d3fa839c21abf20d397bb7a))
* add SPELL-NAME arg to deal logs ([#718](https://github.com/fluencelabs/cli/issues/718)) ([b20a571](https://github.com/fluencelabs/cli/commit/b20a571b4dbd7700a36b216c49331e4100505772))
* **cli:** Add `aqua` header to `services.aqua` file ([#716](https://github.com/fluencelabs/cli/issues/716)) ([66dd9eb](https://github.com/fluencelabs/cli/commit/66dd9ebb38d077e7fa0a4181851dc2d585865982))
* improve docs and validation for memory limit [fixes DXJ-619 DXJ-546 DXJ-620] ([#713](https://github.com/fluencelabs/cli/issues/713)) ([a939c6e](https://github.com/fluencelabs/cli/commit/a939c6ef8a2f18bbd35d8c7a8c34dca44b591f54))
* set default number of compute units to 32 ([#704](https://github.com/fluencelabs/cli/issues/704)) ([eac6aa3](https://github.com/fluencelabs/cli/commit/eac6aa3fbb0963c71ec1c9a97f83234c6bbaac45))
* simplify dependency related commands and rename dependency related properties in fluence.yaml [fixes DXJ-634 DXJ-598] ([#721](https://github.com/fluencelabs/cli/issues/721)) ([7ee6bd0](https://github.com/fluencelabs/cli/commit/7ee6bd013c6b1f9fd03f5638283b3493456a9c5a))
* **test:** DXJ-574 updating the deal by changing a spell ([#697](https://github.com/fluencelabs/cli/issues/697)) ([c4cc310](https://github.com/fluencelabs/cli/commit/c4cc310ed8de0525a05981dac58e951e1a507b6a))
* up js client 0.6.0 ([#725](https://github.com/fluencelabs/cli/issues/725)) ([c410c7a](https://github.com/fluencelabs/cli/commit/c410c7ab2d946c21908d129f63311b4892e8bd4f))


### Bug Fixes

* **deps:** update spell to v0.6.6 ([#706](https://github.com/fluencelabs/cli/issues/706)) ([6d10586](https://github.com/fluencelabs/cli/commit/6d10586814ac81929897f762aac37d8516a17642))
* **deps:** update spell to v0.6.7 ([#715](https://github.com/fluencelabs/cli/issues/715)) ([f542353](https://github.com/fluencelabs/cli/commit/f542353dc8acfddd5cbb0420cfd342478c14f775))
* **tests:** Add `aqua` header to `smoke.aqua` ([#719](https://github.com/fluencelabs/cli/issues/719)) ([1400b66](https://github.com/fluencelabs/cli/commit/1400b660439838f0a4a45f6beaeaefc407fd73ae))

## [0.13.4](https://github.com/fluencelabs/cli/compare/fluence-cli-v0.13.3...fluence-cli-v0.13.4) (2024-01-11)


### Features

* ensure memory limit of worker services is less then 2GB and pass it to installation spell [fixes DXJ-579 DXJ-545 DXJ-580 DXJ-546] ([#700](https://github.com/fluencelabs/cli/issues/700)) ([88a0e5f](https://github.com/fluencelabs/cli/commit/88a0e5fbf8f267ead868d8b6aeb7d810c5429b83))
* update dependencies ([#701](https://github.com/fluencelabs/cli/issues/701)) ([16e293f](https://github.com/fluencelabs/cli/commit/16e293f803d111c7ff663182df078adc37a7f456))


### Bug Fixes

* module remove ([#703](https://github.com/fluencelabs/cli/issues/703)) ([8103c46](https://github.com/fluencelabs/cli/commit/8103c463b1ff4170906ab4e7bc44197f70096272))
* remove global deps completely ([#698](https://github.com/fluencelabs/cli/issues/698)) ([34bb519](https://github.com/fluencelabs/cli/commit/34bb51965fbbc2e0ed77d43935ad6e8f2dec4523))
* secret key remove ([#702](https://github.com/fluencelabs/cli/issues/702)) ([5216e96](https://github.com/fluencelabs/cli/commit/5216e96f59692b0b5a005a8076dd85f4ac6bdb3b))

## [0.13.3](https://github.com/fluencelabs/cli/compare/fluence-cli-v0.13.2...fluence-cli-v0.13.3) (2024-01-05)


### Features

* add memory limit in mrepl by default ([#696](https://github.com/fluencelabs/cli/issues/696)) ([6de1dea](https://github.com/fluencelabs/cli/commit/6de1deac3af0feec5b9e9cfea8ece9191fb5825f))
* improve provider config management ([#691](https://github.com/fluencelabs/cli/issues/691)) ([8fa0b3e](https://github.com/fluencelabs/cli/commit/8fa0b3efd43dd8a9244ec9bd152c612ac0233aae))
* **test:** DXJ-575 updating the deal by changing a service ([#670](https://github.com/fluencelabs/cli/issues/670)) ([a6c44e6](https://github.com/fluencelabs/cli/commit/a6c44e686a548e783391a3f876958c63ad86e135))
* unhide provider commands ([#694](https://github.com/fluencelabs/cli/issues/694)) ([50972b5](https://github.com/fluencelabs/cli/commit/50972b56ae036b08ca4a64838c2341db6d881595))


### Bug Fixes

* try `local down` only when not in CI ([#692](https://github.com/fluencelabs/cli/issues/692)) ([7f20b8b](https://github.com/fluencelabs/cli/commit/7f20b8b918744e4392bd36d58113bf95782ce616))

## [0.13.2](https://github.com/fluencelabs/cli/compare/fluence-cli-v0.13.1...fluence-cli-v0.13.2) (2023-12-29)


### Features

* **cli:** Add header to default spell aqua ([#671](https://github.com/fluencelabs/cli/issues/671)) ([cc9b841](https://github.com/fluencelabs/cli/commit/cc9b841751d6aa6350abbafce32770fc40153d47))


### Bug Fixes

* **deps:** update dependency @fluencelabs/air-beautify-wasm to v0.3.6 ([#658](https://github.com/fluencelabs/cli/issues/658)) ([6b827d9](https://github.com/fluencelabs/cli/commit/6b827d9b87c08f07df7e9761faf4dc06d28996f9))
* **deps:** update dependency @fluencelabs/aqua-api to v0.13.3 ([#668](https://github.com/fluencelabs/cli/issues/668)) ([a9f8678](https://github.com/fluencelabs/cli/commit/a9f867800cb6ce7bdb3825293f4f719bcd03b0d0))
* **deps:** update dependency @fluencelabs/aqua-to-js to v0.3.5 ([#591](https://github.com/fluencelabs/cli/issues/591)) ([2c82d84](https://github.com/fluencelabs/cli/commit/2c82d84cd6dccd02e7240c868b98c4a30dc22e73))

## [0.13.1](https://github.com/fluencelabs/cli/compare/fluence-cli-v0.13.0...fluence-cli-v0.13.1) (2023-12-28)


### Features

* add secrets config [fixes DXJ-543] ([#645](https://github.com/fluencelabs/cli/issues/645)) ([97a0b9a](https://github.com/fluencelabs/cli/commit/97a0b9aa4561c544eed49e42405c172bcec2ebf4))
* compile all spells on `fluence build` [fixes DXJ-353] ([#634](https://github.com/fluencelabs/cli/issues/634)) ([c18253b](https://github.com/fluencelabs/cli/commit/c18253b7ffd0dd0d44506e28c345ee5f67b6969a))
* create a working local env automatically [fixes DXJ-528] ([#640](https://github.com/fluencelabs/cli/issues/640)) ([6108503](https://github.com/fluencelabs/cli/commit/61085030cafc5d66aa7e21295a652afcdf297ef9))
* deposit check ([#653](https://github.com/fluencelabs/cli/issues/653)) ([6cf91df](https://github.com/fluencelabs/cli/commit/6cf91df2443f2fcf26d7f1dcd1fdf50fe1125a30))
* move some flags into configs for provider and deploy ([#635](https://github.com/fluencelabs/cli/issues/635)) ([93a3588](https://github.com/fluencelabs/cli/commit/93a3588bc38cd961d6abfd88089380a698a58e36))
* remove CID change check ([#647](https://github.com/fluencelabs/cli/issues/647)) ([b917b6e](https://github.com/fluencelabs/cli/commit/b917b6e4a8f5c828d6e1b118330f2f46ee5d3a4c))
* remove exact validation from npm ([#672](https://github.com/fluencelabs/cli/issues/672)) ([7534648](https://github.com/fluencelabs/cli/commit/7534648f8a0ef90d4564ceb2293ea2cd8a1932f7))
* remove vite polyfills ([#646](https://github.com/fluencelabs/cli/issues/646)) ([e31dde5](https://github.com/fluencelabs/cli/commit/e31dde5288ba6d0722d41ae28114fe9804f41e23))
* show spells separately in showSubnet [NET-635] ([#624](https://github.com/fluencelabs/cli/issues/624)) ([d481934](https://github.com/fluencelabs/cli/commit/d4819340deda066dd5729956608f52a21375351f))
* store deployment artifacts per-env [fixes DXJ-500] ([#644](https://github.com/fluencelabs/cli/issues/644)) ([42cd42c](https://github.com/fluencelabs/cli/commit/42cd42c6d9112398dddc7b5adef64779f2d4a0a9))
* update default aqua dependencies ([#667](https://github.com/fluencelabs/cli/issues/667)) ([490e42e](https://github.com/fluencelabs/cli/commit/490e42e6c410256f51feb2bf8f16522067917c2e))
* Use js-client 0.5.0 ([#630](https://github.com/fluencelabs/cli/issues/630)) ([2fa61d0](https://github.com/fluencelabs/cli/commit/2fa61d007c1c91bc77b4c2f4174d68fcecdd317a))
* use new aqua packages [fixes DXJ-534, DXJ-529, DXJ-478, DXJ-370] ([#648](https://github.com/fluencelabs/cli/issues/648)) ([6d1b92e](https://github.com/fluencelabs/cli/commit/6d1b92e74ffb60d3861677cb3f61efa435249fec))


### Bug Fixes

* **deps:** update spell to v0.6.1 ([#664](https://github.com/fluencelabs/cli/issues/664)) ([64f64f7](https://github.com/fluencelabs/cli/commit/64f64f7194889abc6d2eaf2d2d33157953218247))
* **deps:** update spell to v0.6.4 ([#674](https://github.com/fluencelabs/cli/issues/674)) ([a79b6bc](https://github.com/fluencelabs/cli/commit/a79b6bcc6bb58287c2afeefb8bab4dcef1b471b6))
* don't update dependencies that are already present ([#666](https://github.com/fluencelabs/cli/issues/666)) ([213670b](https://github.com/fluencelabs/cli/commit/213670b7c1cbb3a76d831703d328da3ad35fa30a))
* improve errors for configs ([#637](https://github.com/fluencelabs/cli/issues/637)) ([5afc8f5](https://github.com/fluencelabs/cli/commit/5afc8f5c2bc4626fb881c98993c141c6bbd633b2))
* npm to be used by cli internal nodejs executable [fixes DXJ-540] ([#642](https://github.com/fluencelabs/cli/issues/642)) ([df67287](https://github.com/fluencelabs/cli/commit/df67287e9c7d1d8b548ea32917363b456a1cb0db))
* ps output ([#650](https://github.com/fluencelabs/cli/issues/650)) ([fe165d6](https://github.com/fluencelabs/cli/commit/fe165d6f64eafb20417b588cbe78cafb5bf2dd5f))
* raw config to be parsed, improve local up and service new [fixes DXJ-564] ([#649](https://github.com/fluencelabs/cli/issues/649)) ([ca308df](https://github.com/fluencelabs/cli/commit/ca308df6e43fe847665095183f002fcfc53b0d6c))
* service not added to default deal services ([#655](https://github.com/fluencelabs/cli/issues/655)) ([f832f83](https://github.com/fluencelabs/cli/commit/f832f83cf3bae8fa1b6f4caac849c2864191661d))
* Support fire and forget (DXJ-562) ([#652](https://github.com/fluencelabs/cli/issues/652)) ([abf4b74](https://github.com/fluencelabs/cli/commit/abf4b74002365b03dcdf8a4cf22b4031beee2130))
* update deal pkg ([#631](https://github.com/fluencelabs/cli/issues/631)) ([a8e3e9c](https://github.com/fluencelabs/cli/commit/a8e3e9cad48b068119c042717721fed45881a066))

## [0.13.0](https://github.com/fluencelabs/cli/compare/fluence-cli-v0.12.5...fluence-cli-v0.13.0) (2023-11-16)


### ⚠ BREAKING CHANGES

* **deal:** Deal lifecycle

### Features

* **deal:** Deal lifecycle ([f3763e9](https://github.com/fluencelabs/cli/commit/f3763e95136494e70f745a3d04eee5225fc2ff3f))
* improve custom relay error ([#622](https://github.com/fluencelabs/cli/issues/622)) ([8038102](https://github.com/fluencelabs/cli/commit/8038102b4e54d2290fa52d625ee118e567dd1aca))
* update deps ([#623](https://github.com/fluencelabs/cli/issues/623)) ([ae406b4](https://github.com/fluencelabs/cli/commit/ae406b4a8005d01f8b0cb8f190cdfe86d15da9a4))


### Bug Fixes

* generate key after config is generated ([#620](https://github.com/fluencelabs/cli/issues/620)) ([2bff233](https://github.com/fluencelabs/cli/commit/2bff233c14742bd4e637aed4c3d624dedddb6271))
* update ts and js README ([#618](https://github.com/fluencelabs/cli/issues/618)) ([ea208b4](https://github.com/fluencelabs/cli/commit/ea208b463d5a66d59c0fad6a1e6322546aaf194b))

## [0.12.5](https://github.com/fluencelabs/cli/compare/fluence-cli-v0.12.4...fluence-cli-v0.12.5) (2023-11-14)


### Bug Fixes

* Set chain image to public one, configure renovate to bump deal and chain versions ([#619](https://github.com/fluencelabs/cli/issues/619)) ([bc47802](https://github.com/fluencelabs/cli/commit/bc478023f600f8691b62b44f1d62dcd57cf599e1))
* **tests:** Use streams instead of options [LNG-277] ([#617](https://github.com/fluencelabs/cli/issues/617)) ([9ba5e20](https://github.com/fluencelabs/cli/commit/9ba5e20444e199b021d13480cdc5ff01c411a4cf))
* up installation spell ([#615](https://github.com/fluencelabs/cli/issues/615)) ([f8ed578](https://github.com/fluencelabs/cli/commit/f8ed578294455291db0474017943a79b066f1b63))

## [0.12.4](https://github.com/fluencelabs/cli/compare/fluence-cli-v0.12.3...fluence-cli-v0.12.4) (2023-11-10)


### Bug Fixes

* improve docs ([#613](https://github.com/fluencelabs/cli/issues/613)) ([049ba1e](https://github.com/fluencelabs/cli/commit/049ba1e5519c7f18be3ef4941187ab9a4c0e0b6d))

## [0.12.3](https://github.com/fluencelabs/cli/compare/fluence-cli-v0.12.2...fluence-cli-v0.12.3) (2023-11-09)


### Bug Fixes

* update spell and installation-spell ([#611](https://github.com/fluencelabs/cli/issues/611)) ([5bd3563](https://github.com/fluencelabs/cli/commit/5bd35635b0cc9ee750f326ce299adf07506293a1))

## [0.12.2](https://github.com/fluencelabs/cli/compare/fluence-cli-v0.12.1...fluence-cli-v0.12.2) (2023-11-09)


### Features

* restructure templates [fixes DXJ-526] ([#608](https://github.com/fluencelabs/cli/issues/608)) ([185a905](https://github.com/fluencelabs/cli/commit/185a905838e9b8dbb83348070fa022e087ebed80))
* support env variables to override cli dependencies [fixes DXJ-524] ([#605](https://github.com/fluencelabs/cli/issues/605)) ([0dd52bc](https://github.com/fluencelabs/cli/commit/0dd52bc2c9b672176219ae99bda4ddcf8832111e))

## [0.12.1](https://github.com/fluencelabs/cli/compare/fluence-cli-v0.12.0...fluence-cli-v0.12.1) (2023-11-05)


### Features

* improve topic descriptions ([#602](https://github.com/fluencelabs/cli/issues/602)) ([20ad8b4](https://github.com/fluencelabs/cli/commit/20ad8b412a7d983ef0b118466997601e67338d10))
* migrate "workers" property in fluence.yaml directly into "deals" and "hosts" properties [fixes DXJ-507] ([#600](https://github.com/fluencelabs/cli/issues/600)) ([4ed38f4](https://github.com/fluencelabs/cli/commit/4ed38f4b8a0288a03bee5e7ca4fea1ff12ec0e51))
* restructure project templates [fixes DXJ-523] ([#604](https://github.com/fluencelabs/cli/issues/604)) ([0fa6fa5](https://github.com/fluencelabs/cli/commit/0fa6fa5cb7ab5f5fbc9e77593b0070892025c52a))
* support flags in add-peer ([#598](https://github.com/fluencelabs/cli/issues/598)) ([d5b6e1e](https://github.com/fluencelabs/cli/commit/d5b6e1e96755b48b1ed0128cfb7c0c6f9bee57ca))


### Bug Fixes

* fix custom env [fixes DXJ-521] ([#601](https://github.com/fluencelabs/cli/issues/601)) ([af04bd0](https://github.com/fluencelabs/cli/commit/af04bd0f76a87b2a4df9cea05e3486ba8cf2de64))

## [0.12.0](https://github.com/fluencelabs/cli/compare/fluence-cli-v0.11.4...fluence-cli-v0.12.0) (2023-10-30)


### ⚠ BREAKING CHANGES

* **deps:** update dependency @fluencelabs/js-client to v0.4.2

### Features

* allow user to select service from list [fixes DXJ-501] ([#589](https://github.com/fluencelabs/cli/issues/589)) ([428a40c](https://github.com/fluencelabs/cli/commit/428a40c7789205c6b654322fee667be67bbd98bf))
* **deps:** update dependency @fluencelabs/js-client to v0.4.2 ([79985df](https://github.com/fluencelabs/cli/commit/79985df3306dc9aae688f82b15277eeb953f29ce))


### Bug Fixes

* Bump nox to 0.4.0 ([#597](https://github.com/fluencelabs/cli/issues/597)) ([d51d9a7](https://github.com/fluencelabs/cli/commit/d51d9a72b0498e20730527d6cc9c031713a9b858))

## [0.11.4](https://github.com/fluencelabs/cli/compare/fluence-cli-v0.11.3...fluence-cli-v0.11.4) (2023-10-25)


### Features

* update spell template [fixes DXJ-514] ([#587](https://github.com/fluencelabs/cli/issues/587)) ([7560514](https://github.com/fluencelabs/cli/commit/7560514a2dfa852f56eb1771d3538e688d146bb1))


### Bug Fixes

* fix update app cid ([#586](https://github.com/fluencelabs/cli/issues/586)) ([90efcdb](https://github.com/fluencelabs/cli/commit/90efcdb54cd99797050ec7ed80bbc3607b32f065))

## [0.11.3](https://github.com/fluencelabs/cli/compare/fluence-cli-v0.11.2...fluence-cli-v0.11.3) (2023-10-24)


### Features

* add `local logs` [fixes DXJ-513] ([#574](https://github.com/fluencelabs/cli/issues/574)) ([885fce6](https://github.com/fluencelabs/cli/commit/885fce676f6e83046aa89fe6220b783c31dc1444))
* up deal logs and better tests for them ([#560](https://github.com/fluencelabs/cli/issues/560)) ([48a6420](https://github.com/fluencelabs/cli/commit/48a6420cf3802aa940bc94ce79c225cc5e4ffdb2))


### Bug Fixes

* env must not be required when using `--relay` [fixes DXJ-511] ([#570](https://github.com/fluencelabs/cli/issues/570)) ([b8d6c5b](https://github.com/fluencelabs/cli/commit/b8d6c5b9476962805a7fcf6bcc0cfb171089c584))

## [0.11.2](https://github.com/fluencelabs/cli/compare/fluence-cli-v0.11.1...fluence-cli-v0.11.2) (2023-10-20)


### Features

* add provider config [fixes DXJ-470] ([#470](https://github.com/fluencelabs/cli/issues/470)) ([a4706c5](https://github.com/fluencelabs/cli/commit/a4706c59c4263e6528fe8f45fc4b07c293ce540a))
* use aqua-to-js lib [fixes DXJ-489] ([#517](https://github.com/fluencelabs/cli/issues/517)) ([4b41025](https://github.com/fluencelabs/cli/commit/4b41025d18b417807f6d809873db55c8067f3fa6))


### Bug Fixes

* Disable node warnings when running as standalone ([#536](https://github.com/fluencelabs/cli/issues/536)) ([5834e35](https://github.com/fluencelabs/cli/commit/5834e3572562548efabcb289dc3e74adb2009b46))
* js-client error ([#559](https://github.com/fluencelabs/cli/issues/559)) ([214ad91](https://github.com/fluencelabs/cli/commit/214ad91d2bd46c4d87d7f2a1e3fd61d79a1f4a7a))
* mutable configs initing more then once ([#545](https://github.com/fluencelabs/cli/issues/545)) ([d5e3a65](https://github.com/fluencelabs/cli/commit/d5e3a658d897b216cbab4678da5027f7fa808fa4))

## [0.11.1](https://github.com/fluencelabs/cli/compare/fluence-cli-v0.11.0...fluence-cli-v0.11.1) (2023-10-12)


### Bug Fixes

* **chore:** Bump version ([#544](https://github.com/fluencelabs/cli/issues/544)) ([b624ecc](https://github.com/fluencelabs/cli/commit/b624eccf106b7f54d7b8fca138fa9b7692ee68d9))
* **docs:** Bump js-client to 0.2.0 in versions.json ([54ec2c3](https://github.com/fluencelabs/cli/commit/54ec2c317444e9c4a139cfcae51a36d824040fb0))

## [0.11.0](https://github.com/fluencelabs/cli/compare/fluence-cli-v0.10.0...fluence-cli-v0.11.0) (2023-10-11)


### ⚠ BREAKING CHANGES

* update js-client and other dependencies ([#538](https://github.com/fluencelabs/cli/issues/538))

### Features

* update js-client and other dependencies ([#538](https://github.com/fluencelabs/cli/issues/538)) ([fef0b67](https://github.com/fluencelabs/cli/commit/fef0b676b8c49bbc08e807defc73791557003ff0))

## [0.10.0](https://github.com/fluencelabs/cli/compare/fluence-cli-v0.9.1...fluence-cli-v0.10.0) (2023-10-06)


### ⚠ BREAKING CHANGES

* improve fluence env switching [fixes DXJ-473] ([#502](https://github.com/fluencelabs/cli/issues/502))

### Features

* add aqua imports command [fixes DXJ-483] ([#518](https://github.com/fluencelabs/cli/issues/518)) ([419566a](https://github.com/fluencelabs/cli/commit/419566a1cd033bc7d3a9bbf640b4f4f232d700d5))
* improve fluence env switching [fixes DXJ-473] ([#502](https://github.com/fluencelabs/cli/issues/502)) ([a09f39b](https://github.com/fluencelabs/cli/commit/a09f39b0913799dbd54d0cfc08f755f0ec54c988))
* show dev dependencies [fixes DXJ-492] ([#521](https://github.com/fluencelabs/cli/issues/521)) ([8976225](https://github.com/fluencelabs/cli/commit/8976225919051adae217df569103f3dc9ac0f6f3))


### Bug Fixes

* change rpc ([#523](https://github.com/fluencelabs/cli/issues/523)) ([ddfd48f](https://github.com/fluencelabs/cli/commit/ddfd48f6c4fb1af602b443cd43ebf56a2f7feada))
* change rpc ([#524](https://github.com/fluencelabs/cli/issues/524)) ([8c5ab67](https://github.com/fluencelabs/cli/commit/8c5ab67cc169839b970dc79740a95a4f91f1907c))
* **deps:** update dependency @fluencelabs/aqua-api to v0.12.3 ([#501](https://github.com/fluencelabs/cli/issues/501)) ([2525c44](https://github.com/fluencelabs/cli/commit/2525c443867013b1932532e4fbdeb97ad7a2249a))

## [0.9.1](https://github.com/fluencelabs/cli/compare/fluence-cli-v0.9.0...fluence-cli-v0.9.1) (2023-09-29)


### Bug Fixes

* fix deal logs ([#506](https://github.com/fluencelabs/cli/issues/506)) ([90a03e7](https://github.com/fluencelabs/cli/commit/90a03e714a49fa90fbf1ed528ab937c0f33e40bd))

## [0.9.0](https://github.com/fluencelabs/cli/compare/fluence-cli-v0.8.9...fluence-cli-v0.9.0) (2023-09-28)


### ⚠ BREAKING CHANGES

* update deal to 0.2.16 ([#499](https://github.com/fluencelabs/cli/issues/499))

### Bug Fixes

* **template:** fix duplication in showSubnet ([#500](https://github.com/fluencelabs/cli/issues/500)) ([fda823b](https://github.com/fluencelabs/cli/commit/fda823b18aaa762af9db1c434acb527d2932e0cd))
* update deal to 0.2.16 ([#499](https://github.com/fluencelabs/cli/issues/499)) ([5509f09](https://github.com/fluencelabs/cli/commit/5509f092a35e066d28bf6464e0f1e9d428501a6b))

## [0.8.9](https://github.com/fluencelabs/cli/compare/fluence-cli-v0.8.8...fluence-cli-v0.8.9) (2023-09-26)


### Features

* add config formatting ([#486](https://github.com/fluencelabs/cli/issues/486)) ([4767406](https://github.com/fluencelabs/cli/commit/4767406b4396908dc72efad0d4bd402d5cad0bec))
* workers remove ([#480](https://github.com/fluencelabs/cli/issues/480)) ([71acd94](https://github.com/fluencelabs/cli/commit/71acd940f5dec0a1988478caecae42adf79bc8fd))


### Bug Fixes

* **deps:** update dependency @fluencelabs/aqua-api to v0.12.2 ([#498](https://github.com/fluencelabs/cli/issues/498)) ([4fcca42](https://github.com/fluencelabs/cli/commit/4fcca42198818643a94ce152af0a03bf1844ebac))

## [0.8.8](https://github.com/fluencelabs/cli/compare/fluence-cli-v0.8.7...fluence-cli-v0.8.8) (2023-09-25)


### Bug Fixes

* npm not being found when installed with yarn [fixes DXJ-479] ([#484](https://github.com/fluencelabs/cli/issues/484)) ([d0f4b2b](https://github.com/fluencelabs/cli/commit/d0f4b2b153839e19aa2772b86dbfa750690e0e7e))

## [0.8.7](https://github.com/fluencelabs/cli/compare/fluence-cli-v0.8.6...fluence-cli-v0.8.7) (2023-09-22)


### Features

* use Subnet.resolve ([#481](https://github.com/fluencelabs/cli/issues/481)) ([e13a64b](https://github.com/fluencelabs/cli/commit/e13a64beb0b9646e8739c0e99472584ee68a0de3))

## [0.8.6](https://github.com/fluencelabs/cli/compare/fluence-cli-v0.8.5...fluence-cli-v0.8.6) (2023-09-22)


### Features

* add `showSubnet` func ([#478](https://github.com/fluencelabs/cli/issues/478)) ([0b5d8d9](https://github.com/fluencelabs/cli/commit/0b5d8d9cce05313f8ddbaa3d2768bf072848ca99))


### Bug Fixes

* deal update ([#483](https://github.com/fluencelabs/cli/issues/483)) ([fed1933](https://github.com/fluencelabs/cli/commit/fed1933d82f4ac763bd8424acc3f95f4e86b45bd))

## [0.8.5](https://github.com/fluencelabs/cli/compare/fluence-cli-v0.8.4...fluence-cli-v0.8.5) (2023-09-18)


### Features

* format avm errors ([#472](https://github.com/fluencelabs/cli/issues/472)) ([c4a6e2d](https://github.com/fluencelabs/cli/commit/c4a6e2d6b1f5bde72ad38517f3cc15bd03a6ab5f))

## [0.8.4](https://github.com/fluencelabs/cli/compare/fluence-cli-v0.8.3...fluence-cli-v0.8.4) (2023-09-18)


### Features

* update dependencies ([#475](https://github.com/fluencelabs/cli/issues/475)) ([3ef0c85](https://github.com/fluencelabs/cli/commit/3ef0c85b4856456394a001775358d00a55a2b1af))

## [0.8.3](https://github.com/fluencelabs/cli/compare/fluence-cli-v0.8.2...fluence-cli-v0.8.3) (2023-09-13)


### Features

* add more red to error messages ([#467](https://github.com/fluencelabs/cli/issues/467)) ([66b66a4](https://github.com/fluencelabs/cli/commit/66b66a4d570dd9b60da4a6c05990460124fb129c))
* use `use` instead of `import` in generated aqua ([#464](https://github.com/fluencelabs/cli/issues/464)) ([76934c7](https://github.com/fluencelabs/cli/commit/76934c764b557bd35e711817e051138141561a06))

## [0.8.2](https://github.com/fluencelabs/cli/compare/fluence-cli-v0.8.1...fluence-cli-v0.8.2) (2023-09-12)


### Features

* update dep and pin fluencelabs dep ([#462](https://github.com/fluencelabs/cli/issues/462)) ([4713517](https://github.com/fluencelabs/cli/commit/4713517e3788d06dfd3a049a2529e77d50b72dd6))
* update installation spell ([#466](https://github.com/fluencelabs/cli/issues/466)) ([fe3f806](https://github.com/fluencelabs/cli/commit/fe3f806b65faf392de9c1c700493fbf63a086085))

## [0.8.1](https://github.com/fluencelabs/cli/compare/fluence-cli-v0.8.0...fluence-cli-v0.8.1) (2023-09-07)


### Features

* try worker deploy multiple ([#452](https://github.com/fluencelabs/cli/issues/452)) ([adae1fb](https://github.com/fluencelabs/cli/commit/adae1fbb6fd05cdec037f72701ee7e4bf17f01ce))
* update dependencies ([#451](https://github.com/fluencelabs/cli/issues/451)) ([76f6dd2](https://github.com/fluencelabs/cli/commit/76f6dd227571cc295e1f306b74c57e696aa14041))

## [0.8.0](https://github.com/fluencelabs/cli/compare/fluence-cli-v0.7.2...fluence-cli-v0.8.0) (2023-09-07)


### ⚠ BREAKING CHANGES

* add matching and chain networks ([#310](https://github.com/fluencelabs/cli/issues/310))

### Features

* add matching and chain networks ([#310](https://github.com/fluencelabs/cli/issues/310)) ([239bebd](https://github.com/fluencelabs/cli/commit/239bebd03f5b7f32be2383c1aa70117e962a39f3))
* configs without comments by default [fixes DXJ-465] ([#443](https://github.com/fluencelabs/cli/issues/443)) ([73f6bbe](https://github.com/fluencelabs/cli/commit/73f6bbe22e438ffdd738dfa212e15687f41b6b27))
* make docs and examples in the configs optional [fixes DXJ-458] ([#436](https://github.com/fluencelabs/cli/issues/436)) ([6ae4307](https://github.com/fluencelabs/cli/commit/6ae4307c06b88c834a3795a4a2edabc283adb197))
* update dependencies ([#438](https://github.com/fluencelabs/cli/issues/438)) ([84004ae](https://github.com/fluencelabs/cli/commit/84004ae24923af9eca87a6534fb7f357eab5fb31))
* use dummy deal id for workers deploy [fixes DXJ-373] ([#446](https://github.com/fluencelabs/cli/issues/446)) ([8c430a2](https://github.com/fluencelabs/cli/commit/8c430a28e54f50bb6a253678ff1ca5fe993112ae))


### Bug Fixes

* **deps:** update dependency @fluencelabs/js-client to v0.1.1 ([#439](https://github.com/fluencelabs/cli/issues/439)) ([311c0ca](https://github.com/fluencelabs/cli/commit/311c0caac466ce84f7d8d1078b74f949551605fb))

## [0.7.2](https://github.com/fluencelabs/cli/compare/fluence-cli-v0.7.1...fluence-cli-v0.7.2) (2023-08-28)


### Bug Fixes

* experimental warnings ([#434](https://github.com/fluencelabs/cli/issues/434)) ([3acc43f](https://github.com/fluencelabs/cli/commit/3acc43f362071f7690a717f20be808bade989b14))

## [0.7.1](https://github.com/fluencelabs/cli/compare/fluence-cli-v0.7.0...fluence-cli-v0.7.1) (2023-08-25)


### Bug Fixes

* Use latest aqua-api ([#432](https://github.com/fluencelabs/cli/issues/432)) ([730bc4f](https://github.com/fluencelabs/cli/commit/730bc4f7b1eecd595de8a4bc538b26c867a8367a))

## [0.7.0](https://github.com/fluencelabs/cli/compare/fluence-cli-v0.6.2...fluence-cli-v0.7.0) (2023-08-25)


### ⚠ BREAKING CHANGES

* Remove old packages, add new ones ([#424](https://github.com/fluencelabs/cli/issues/424))

### Features

* Remove old packages, add new ones ([#424](https://github.com/fluencelabs/cli/issues/424)) ([875b4fb](https://github.com/fluencelabs/cli/commit/875b4fba082c678a6b95496c2a7959e0e6a34435))
* show aqua compilation error in beforeBuild and other improvements and refactorings ([#429](https://github.com/fluencelabs/cli/issues/429)) ([48d3f73](https://github.com/fluencelabs/cli/commit/48d3f73d603e6cd1881311de183bc19a2a3035c5))

## [0.6.2](https://github.com/fluencelabs/cli/compare/fluence-cli-v0.6.1...fluence-cli-v0.6.2) (2023-08-22)


### Features

* pack CLI [fixes DXJ-443] ([#398](https://github.com/fluencelabs/cli/issues/398)) ([78cdda2](https://github.com/fluencelabs/cli/commit/78cdda2594c280d9165be4cd4a0c4421e417aeb6))
* patch oclif node execution so there are no warnings ([#422](https://github.com/fluencelabs/cli/issues/422)) ([db5d92f](https://github.com/fluencelabs/cli/commit/db5d92fc34f2c161ee97e1e8985c442562af1667))
* use local npm ([#417](https://github.com/fluencelabs/cli/issues/417)) ([a6c62f5](https://github.com/fluencelabs/cli/commit/a6c62f57e7138ef20b9b08193cf734e08691ad3d))


### Bug Fixes

* change description ([#416](https://github.com/fluencelabs/cli/issues/416)) ([4711f7f](https://github.com/fluencelabs/cli/commit/4711f7fb4666767d3731095001c74ff4a918ea32))
* fix worker logs [fixes DXJ-449] ([#418](https://github.com/fluencelabs/cli/issues/418)) ([78521c3](https://github.com/fluencelabs/cli/commit/78521c3bee0ede80373b7a84fa9422f42ac745f4))

## [0.6.1](https://github.com/fluencelabs/cli/compare/fluence-cli-v0.6.0...fluence-cli-v0.6.1) (2023-08-10)


### Bug Fixes

* fix service interface generation [fixes DXJ-445] ([#400](https://github.com/fluencelabs/cli/issues/400)) ([bb104d6](https://github.com/fluencelabs/cli/commit/bb104d6061937a6bca379dbd631b6512605c2c82))

## [0.6.0](https://github.com/fluencelabs/cli/compare/fluence-cli-v0.5.4...fluence-cli-v0.6.0) (2023-08-09)


### ⚠ BREAKING CHANGES

* **deps:** update js-client.api to 0.12.1 and js-client.node to 0.7.1

### Features

* `fluence run` first compile aqua then connect to the network [fixes DXJ-440] ([#387](https://github.com/fluencelabs/cli/issues/387)) ([cf23b52](https://github.com/fluencelabs/cli/commit/cf23b52e9477448805c92a6e81fe7c26a51b6325))
* add READMEs [fixes DXJ-430] ([#375](https://github.com/fluencelabs/cli/issues/375)) ([c86dfb5](https://github.com/fluencelabs/cli/commit/c86dfb59049ac948494cd29de89e6f015a6a8741))
* improve config error messages [fixes DXJ-428] ([#372](https://github.com/fluencelabs/cli/issues/372)) ([cdf732d](https://github.com/fluencelabs/cli/commit/cdf732d1de99f8c07178147304dde69befb5c406))
* improve module new command [fixes DXJ-414] ([#359](https://github.com/fluencelabs/cli/issues/359)) ([52818dd](https://github.com/fluencelabs/cli/commit/52818dd5032557899e335b572af921d57e78111b))
* Leave only workers.yaml, services.aqua, workers.aqua under version control in .fluence dir [fixes DXJ-412] ([#352](https://github.com/fluencelabs/cli/issues/352)) ([c58611d](https://github.com/fluencelabs/cli/commit/c58611d5ed37b375d882d748b2a06b0d5521f78a))
* remove par ([#391](https://github.com/fluencelabs/cli/issues/391)) ([722ddfa](https://github.com/fluencelabs/cli/commit/722ddfab8b9ae696c43dc0ea9dd582d85e1fedc2))
* show dependency override warnings only in `dep v` command [fixes DXJ-427] ([#371](https://github.com/fluencelabs/cli/issues/371)) ([d84800d](https://github.com/fluencelabs/cli/commit/d84800d706ccbc5bf8839073cf483cdafe89977c))
* support cargo args for marine build [fixes DXJ-418] ([#360](https://github.com/fluencelabs/cli/issues/360)) ([edb5ed7](https://github.com/fluencelabs/cli/commit/edb5ed74a210af847b8c96630489deb931bab68f))
* update aqua ([#361](https://github.com/fluencelabs/cli/issues/361)) ([b8dc50c](https://github.com/fluencelabs/cli/commit/b8dc50c5e247245c640fcbb1d01200b55e2e3406))
* update aqua interfaces of the services that cli builds, improve config comments [fixes DXJ-435] ([#380](https://github.com/fluencelabs/cli/issues/380)) ([a34d162](https://github.com/fluencelabs/cli/commit/a34d1624625715f2a2ac73f48b4068fa0af42185))
* update dependencies ([#374](https://github.com/fluencelabs/cli/issues/374)) ([fe7feee](https://github.com/fluencelabs/cli/commit/fe7feeee4d317d9e9610acd9365571e12ee38851))


### Bug Fixes

* **deps:** update dependency @fluencelabs/air-beautify-wasm to v0.3.1 ([#355](https://github.com/fluencelabs/cli/issues/355)) ([94011ab](https://github.com/fluencelabs/cli/commit/94011ab90682e6a94bc1cc2b63ece69172cffc5c))
* **deps:** update dependency @fluencelabs/air-beautify-wasm to v0.3.2 ([#381](https://github.com/fluencelabs/cli/issues/381)) ([a69890e](https://github.com/fluencelabs/cli/commit/a69890ed04c6958d542006755ddc78d4c84b6438))
* **deps:** update js-client.api to 0.12.1 and js-client.node to 0.7.1 ([9309ffa](https://github.com/fluencelabs/cli/commit/9309ffa930c8ecb9bc3ad9bbba3d54e990964a30))
* don't ask to update if already up to date on the latest version [fixes DXJ-411] ([#357](https://github.com/fluencelabs/cli/issues/357)) ([a35e53d](https://github.com/fluencelabs/cli/commit/a35e53d98e39408d54792e511ac32fd2a75ed7db))
* fix spell new --path not working [fixes DXJ-419] ([#370](https://github.com/fluencelabs/cli/issues/370)) ([c5cd522](https://github.com/fluencelabs/cli/commit/c5cd5223a0aa42369603ff35cd55d4bb29b51512))
* log info messages and warnings to stderr [fixes DXJ-416] ([#358](https://github.com/fluencelabs/cli/issues/358)) ([6156b56](https://github.com/fluencelabs/cli/commit/6156b5619d067a8888fa75f455683eb50f410696))

## [0.5.4](https://github.com/fluencelabs/cli/compare/fluence-cli-v0.5.3...fluence-cli-v0.5.4) (2023-07-14)


### Features

* `fluence deal deploy --no-input` to update deal without asking [DXJ-410] ([#328](https://github.com/fluencelabs/cli/issues/328)) ([f35ccc6](https://github.com/fluencelabs/cli/commit/f35ccc6a9cbd8f0c728cfd9300ea1fc12484855b))
* add examples and comments to configs [DXJ-334] ([#327](https://github.com/fluencelabs/cli/issues/327)) ([09d28d6](https://github.com/fluencelabs/cli/commit/09d28d66e66990ac6a59e263111b75c918b3054e))
* improve ts template [DXJ-405] ([#329](https://github.com/fluencelabs/cli/issues/329)) ([d82e147](https://github.com/fluencelabs/cli/commit/d82e1473f08b1352819afe3a78a5292030b4ea35))
* remove legacy deploy remains ([#349](https://github.com/fluencelabs/cli/issues/349)) ([82171cb](https://github.com/fluencelabs/cli/commit/82171cb6fffb1a22bb6256b8154e8522170c2148))
* rename cli back ([#350](https://github.com/fluencelabs/cli/issues/350)) ([42ef863](https://github.com/fluencelabs/cli/commit/42ef86318e451057f69d546a1ed24e063fe7aaad))
* rename to flox [DXJ-381] ([#298](https://github.com/fluencelabs/cli/issues/298)) ([ff5bd0d](https://github.com/fluencelabs/cli/commit/ff5bd0d0d7c17814fbef1148f6e0fc911a4f9eeb))


### Bug Fixes

* **deps:** update dependency ipfs-http-client to v60.0.1 ([#335](https://github.com/fluencelabs/cli/issues/335)) ([97a4d5b](https://github.com/fluencelabs/cli/commit/97a4d5b8359555e844828a4f5ddfeeeb4fccd941))
* **deps:** update dependency semver to v7.5.4 ([#336](https://github.com/fluencelabs/cli/issues/336)) ([56dcb3b](https://github.com/fluencelabs/cli/commit/56dcb3b2210bf0a4c81fde9d18ac712973ae66f6))
* skip generating js and ts files instead of throwing for aqua files that don't export anything ([#341](https://github.com/fluencelabs/cli/issues/341)) ([6fdeb4e](https://github.com/fluencelabs/cli/commit/6fdeb4e23625fae2f4ce9d9b2bbddc1a032f0f47))

## [0.5.3](https://github.com/fluencelabs/fluence-cli/compare/fluence-cli-v0.5.2...fluence-cli-v0.5.3) (2023-07-05)


### Features

* print default dependencies and their versions when using `default` flag [fixes DXJ-398] ([#316](https://github.com/fluencelabs/fluence-cli/issues/316)) ([6f22700](https://github.com/fluencelabs/fluence-cli/commit/6f22700c67b15e8219dd5af0da0d6106850ad414))
* update dependencies ([#320](https://github.com/fluencelabs/fluence-cli/issues/320)) ([f11224e](https://github.com/fluencelabs/fluence-cli/commit/f11224ed1f812a07f065772879ea7fd22af2f400))

## [0.5.2](https://github.com/fluencelabs/fluence-cli/compare/fluence-cli-v0.5.1...fluence-cli-v0.5.2) (2023-07-04)


### Features

* do not remove output dir when compiling aqua [fixes DXJ-403] ([#318](https://github.com/fluencelabs/fluence-cli/issues/318)) ([8decf46](https://github.com/fluencelabs/fluence-cli/commit/8decf464f46ed8057dac44324c5beb60711500ff))
* improve cli output when building project [fixes DXJ-406] ([#317](https://github.com/fluencelabs/fluence-cli/issues/317)) ([1da1fb0](https://github.com/fluencelabs/fluence-cli/commit/1da1fb058137e067723d8ee2ef5a7911c15bef36))

## [0.5.1](https://github.com/fluencelabs/fluence-cli/compare/fluence-cli-v0.5.0...fluence-cli-v0.5.1) (2023-07-03)


### Features

* update some remaining node16 mentions and pin dependencies ([#314](https://github.com/fluencelabs/fluence-cli/issues/314)) ([ce25a71](https://github.com/fluencelabs/fluence-cli/commit/ce25a71ac1b9a72ffd05ce946d1367eca94de46d))

## [0.5.0](https://github.com/fluencelabs/fluence-cli/compare/fluence-cli-v0.4.19...fluence-cli-v0.5.0) (2023-06-30)


### ⚠ BREAKING CHANGES

* **js-client:** update js-client.api to 0.12.0, js-client.node 0.7.0 (https://github.com/fluencelabs/fluence-cli/pull/301)

### Features

* **js-client:** update js-client.api to 0.12.0, js-client.node 0.7.0 (https://github.com/fluencelabs/fluence-cli/pull/301) ([1eb87a2](https://github.com/fluencelabs/fluence-cli/commit/1eb87a24d2e97a33fca9cebd1357207da5b876fd))

## [0.4.19](https://github.com/fluencelabs/fluence-cli/compare/fluence-cli-v0.4.18...fluence-cli-v0.4.19) (2023-06-29)


### Features

* Add quickstart template [fixes DXJ-399] ([#306](https://github.com/fluencelabs/fluence-cli/issues/306)) ([7cb925e](https://github.com/fluencelabs/fluence-cli/commit/7cb925ef6ab6152abb36905449aba79987f0695a))
* recursive aqua file compilation [fixes DXJ-400] ([#311](https://github.com/fluencelabs/fluence-cli/issues/311)) ([3bb3720](https://github.com/fluencelabs/fluence-cli/commit/3bb3720c27b15c65f8bdf9bee2167ebbee377ef6))
* use binary marine and mrepl releases for linux x86_64 and darwin x86_64 [fixes DXJ-121, DXJ-147] ([#307](https://github.com/fluencelabs/fluence-cli/issues/307)) ([a5180b4](https://github.com/fluencelabs/fluence-cli/commit/a5180b43c6acff1aa054cc30bc6a1754075dfcdc))

## [0.4.18](https://github.com/fluencelabs/fluence-cli/compare/fluence-cli-v0.4.17...fluence-cli-v0.4.18) (2023-06-26)


### Features

* add air beautify [fixes DXJ-386] ([#303](https://github.com/fluencelabs/fluence-cli/issues/303)) ([8d91b33](https://github.com/fluencelabs/fluence-cli/commit/8d91b33676a11e426c222d15af2a284057919ee5))
* automatically add spell to fluence.yaml upon creation [fixes DXJ-395] ([#304](https://github.com/fluencelabs/fluence-cli/issues/304)) ([22609ea](https://github.com/fluencelabs/fluence-cli/commit/22609ea2a6fa1d505f0397286d7312531f3b0bdd))

## [0.4.17](https://github.com/fluencelabs/fluence-cli/compare/fluence-cli-v0.4.16...fluence-cli-v0.4.17) (2023-06-16)


### Features

* add tracing for aqua [fixes DXJ-392] ([#290](https://github.com/fluencelabs/fluence-cli/issues/290)) ([865879b](https://github.com/fluencelabs/fluence-cli/commit/865879beccb93a3aca354cda4ce78c4dabb1b441))


### Bug Fixes

* fix init and docs [fixes DXJ-342] ([#294](https://github.com/fluencelabs/fluence-cli/issues/294)) ([eb99d9f](https://github.com/fluencelabs/fluence-cli/commit/eb99d9f77e223075d04ac20bd5efe4e9945f0a6d))

## [0.4.16](https://github.com/fluencelabs/fluence-cli/compare/fluence-cli-v0.4.15...fluence-cli-v0.4.16) (2023-06-15)


### Bug Fixes

* fix aqua compilation ([ef9128b](https://github.com/fluencelabs/fluence-cli/commit/ef9128b62a441b01e4786aac2323307e1cfee31a))
* fix aqua compilation flags ([#292](https://github.com/fluencelabs/fluence-cli/issues/292)) ([ef9128b](https://github.com/fluencelabs/fluence-cli/commit/ef9128b62a441b01e4786aac2323307e1cfee31a))

## [0.4.15](https://github.com/fluencelabs/fluence-cli/compare/fluence-cli-v0.4.14...fluence-cli-v0.4.15) (2023-06-15)


### Features

* ask names instead of path for new services, modules and spells [fixes DXJ-385] ([#287](https://github.com/fluencelabs/fluence-cli/issues/287)) ([21f4ba2](https://github.com/fluencelabs/fluence-cli/commit/21f4ba230037a9b6c33c7b373cf2131e1b9e202c))
* auto-commit ([#263](https://github.com/fluencelabs/fluence-cli/issues/263)) ([1221d0f](https://github.com/fluencelabs/fluence-cli/commit/1221d0fee6f83c818d616770e954e63463d418da))
* deal deploy e2e [fixes DXJ-379] ([#276](https://github.com/fluencelabs/fluence-cli/issues/276)) ([4fe7579](https://github.com/fluencelabs/fluence-cli/commit/4fe7579420162260d26f005f1b26b7a712c20017))
* **docs:** new config docs [fixes DXJ-168] ([#278](https://github.com/fluencelabs/fluence-cli/issues/278)) ([5325e86](https://github.com/fluencelabs/fluence-cli/commit/5325e86246ca0ac083820c0f8f51df98b59d5ec3))
* **ipfs:** add dag upload [fixes DXJ-390] ([#288](https://github.com/fluencelabs/fluence-cli/issues/288)) ([47755de](https://github.com/fluencelabs/fluence-cli/commit/47755de155686afcb2401df167e774d591b6afaf))
* migrate to NodeJS version 18 [fixes DXJ-384] ([#286](https://github.com/fluencelabs/fluence-cli/issues/286)) ([659f00f](https://github.com/fluencelabs/fluence-cli/commit/659f00f30eed9c6d1106839c45408aef8f6494ee))
* remove aqua cli dependency and legacy deploy [fixes DXJ-391] ([#283](https://github.com/fluencelabs/fluence-cli/issues/283)) ([7536772](https://github.com/fluencelabs/fluence-cli/commit/753677270e74d8fc070b16f6c3bf65468a87fd68))
* update deployed workers structure in aqua to use optional values [fixes DXJ-382] ([#279](https://github.com/fluencelabs/fluence-cli/issues/279)) ([377fd86](https://github.com/fluencelabs/fluence-cli/commit/377fd862dceb19dc9014728563d742bb34f52451))


### Bug Fixes

* aqua compilation hanging with Countly on ([#274](https://github.com/fluencelabs/fluence-cli/issues/274)) ([84c33a2](https://github.com/fluencelabs/fluence-cli/commit/84c33a2bf49def8f0e8c55406545570f4c8cbc88))
* set bool flags as false by default ([#289](https://github.com/fluencelabs/fluence-cli/issues/289)) ([99bb8a6](https://github.com/fluencelabs/fluence-cli/commit/99bb8a67715811acbc477dd8f25438f73f61a081))

## [0.4.14](https://github.com/fluencelabs/fluence-cli/compare/fluence-cli-v0.4.13...fluence-cli-v0.4.14) (2023-05-29)


### Features

* **deps:** Update "spell" version in versions.json ([#270](https://github.com/fluencelabs/fluence-cli/issues/270)) ([39a82d0](https://github.com/fluencelabs/fluence-cli/commit/39a82d04471ab58df68c70ee99c7c5132482372f))
* **deps:** update installation-spell version to 0.5.13 ([#272](https://github.com/fluencelabs/fluence-cli/issues/272)) ([70c89e0](https://github.com/fluencelabs/fluence-cli/commit/70c89e0bea20dece74a6813a31e127032b0c5589))

## [0.4.13](https://github.com/fluencelabs/fluence-cli/compare/fluence-cli-v0.4.12...fluence-cli-v0.4.13) (2023-05-28)


### Features

* Update versions.json with new registry version ([ee4e548](https://github.com/fluencelabs/fluence-cli/commit/ee4e548ec1cf31f409fd5a0b3ffb1e5502f6d8bb))

## [0.4.12](https://github.com/fluencelabs/fluence-cli/compare/fluence-cli-v0.4.11...fluence-cli-v0.4.12) (2023-05-22)


### Features

* **installation-spell:** bump to 0.5.12 ([#262](https://github.com/fluencelabs/fluence-cli/issues/262)) ([621f9de](https://github.com/fluencelabs/fluence-cli/commit/621f9de7ccd222c50e0413292632d23f26392678))

## [0.4.11](https://github.com/fluencelabs/fluence-cli/compare/fluence-cli-v0.4.10...fluence-cli-v0.4.11) (2023-05-17)


### Bug Fixes

* don't auto-pin global dependencies [fixes DXJ-380] ([#257](https://github.com/fluencelabs/fluence-cli/issues/257)) ([237e1bb](https://github.com/fluencelabs/fluence-cli/commit/237e1bbb8781bf6b25d4d22f956c86224b51f02d))
* don't print undefined for `run` [fixes DXJ-377] ([#258](https://github.com/fluencelabs/fluence-cli/issues/258)) ([7afe968](https://github.com/fluencelabs/fluence-cli/commit/7afe9681c03cdf41191576abdd9fcdf73455ba87))
* pin @fluencelabs/deal-aurora version ([#260](https://github.com/fluencelabs/fluence-cli/issues/260)) ([68710e6](https://github.com/fluencelabs/fluence-cli/commit/68710e6c46899483676312879ac5bd57d874f416))

## [0.4.10](https://github.com/fluencelabs/fluence-cli/compare/fluence-cli-v0.4.9...fluence-cli-v0.4.10) (2023-05-08)


### Bug Fixes

* fix deal-aurora import ([#255](https://github.com/fluencelabs/fluence-cli/issues/255)) ([4b85a52](https://github.com/fluencelabs/fluence-cli/commit/4b85a52945db7b4ca3a6373b5c0e3c020cd20614))

## [0.4.9](https://github.com/fluencelabs/fluence-cli/compare/fluence-cli-v0.4.8...fluence-cli-v0.4.9) (2023-05-08)


### Features

* add cliVersion property and check for updates [fixes DXJ-358 DXJ-363] ([#242](https://github.com/fluencelabs/fluence-cli/issues/242)) ([add7abd](https://github.com/fluencelabs/fluence-cli/commit/add7abdadb2c2045e0464b2b9c80ff1675d7f977))
* allow aliasing of peers, so you can use kras-00 instead of actual peerId or relay address. Init js-client only after validation is done ([#253](https://github.com/fluencelabs/fluence-cli/issues/253)) ([49585f6](https://github.com/fluencelabs/fluence-cli/commit/49585f6779c4d82e7d16f513b86012e34d0c7d2f))
* easier debugging with arrow-body-style lint rule ([#245](https://github.com/fluencelabs/fluence-cli/issues/245)) ([9279f04](https://github.com/fluencelabs/fluence-cli/commit/9279f04a1c71698e608e757dc3b0a3b7ae5e0265))
* no-build flag [fixes DXJ-368] ([#244](https://github.com/fluencelabs/fluence-cli/issues/244)) ([f6bcc1b](https://github.com/fluencelabs/fluence-cli/commit/f6bcc1b04568317b5ce22480e79d7438bcbf6922))
* support .yml extension for configs [fixes DXJ-350] ([#248](https://github.com/fluencelabs/fluence-cli/issues/248)) ([fefd5fc](https://github.com/fluencelabs/fluence-cli/commit/fefd5fcfab7af616f955fc676cfed12b7271a469))
* **tests:** add workers deploy test, turn off ipfs logs visible by default [fixes DXJ-369] ([#247](https://github.com/fluencelabs/fluence-cli/issues/247)) ([ed63112](https://github.com/fluencelabs/fluence-cli/commit/ed631124fd5e258d289f4f9dec9333bdd6b0b28c))


### Bug Fixes

* check dependencies in fluence.yaml first when warning about dependency overrides ([#251](https://github.com/fluencelabs/fluence-cli/issues/251)) ([e4c9f9d](https://github.com/fluencelabs/fluence-cli/commit/e4c9f9d470b0be986355993baad63683ff59eadb))
* **deps:** update dependency filenamify to v6 ([#250](https://github.com/fluencelabs/fluence-cli/issues/250)) ([b46a472](https://github.com/fluencelabs/fluence-cli/commit/b46a4723a2f0cfcc0a351123c46ed74350c5394d))
* **spell:** update installation-spell to 0.5.11 ([4749c48](https://github.com/fluencelabs/fluence-cli/commit/4749c480ff6041f275cb236ae32741e90b8241ce))
* **spell:** update installation-spell to 0.5.11 ([#254](https://github.com/fluencelabs/fluence-cli/issues/254)) ([b1ef46e](https://github.com/fluencelabs/fluence-cli/commit/b1ef46e2bc68a80e886d78af2ef3cd0b08cc0e1b))

## [0.4.8](https://github.com/fluencelabs/fluence-cli/compare/fluence-cli-v0.4.7...fluence-cli-v0.4.8) (2023-04-14)


### Features

* add -g flag for global dependency management and warn about using dependency overrides [fixes DXJ-362 DXJ-329] ([#238](https://github.com/fluencelabs/fluence-cli/issues/238)) ([31227b7](https://github.com/fluencelabs/fluence-cli/commit/31227b76655ab7c258e155a2d53addfb0acc7fac))

## [0.4.7](https://github.com/fluencelabs/fluence-cli/compare/fluence-cli-v0.4.6...fluence-cli-v0.4.7) (2023-04-13)


### Features

* improve jsToAqua so numbers can be u64, i64 and f64 ([#239](https://github.com/fluencelabs/fluence-cli/issues/239)) ([e9dbf54](https://github.com/fluencelabs/fluence-cli/commit/e9dbf54759f2adc945bba6f68406fabf9edad2df))

## [0.4.6](https://github.com/fluencelabs/fluence-cli/compare/fluence-cli-v0.4.5...fluence-cli-v0.4.6) (2023-04-12)


### Features

* **aqua:** ensure default imports when initing the project [fixes DXJ-365] ([#236](https://github.com/fluencelabs/fluence-cli/issues/236)) ([e3ab6a3](https://github.com/fluencelabs/fluence-cli/commit/e3ab6a3cc9fcd92ab0b712aaf2930cc1aa598e13))
* move contracts to aurora testnet ([#237](https://github.com/fluencelabs/fluence-cli/issues/237)) ([f548ef7](https://github.com/fluencelabs/fluence-cli/commit/f548ef710115fa07c03662b244e6f24dac700bd8))
* mv contracts to aurora testnet ([f548ef7](https://github.com/fluencelabs/fluence-cli/commit/f548ef710115fa07c03662b244e6f24dac700bd8))
* update dependencies ([#234](https://github.com/fluencelabs/fluence-cli/issues/234)) ([50466f8](https://github.com/fluencelabs/fluence-cli/commit/50466f813c2d88a3ff9f7d606e0e5b8eda395e12))

## [0.4.5](https://github.com/fluencelabs/fluence-cli/compare/fluence-cli-v0.4.4...fluence-cli-v0.4.5) (2023-04-11)


### Features

* remove fluence-lock.yaml, simplify dependency management, use versions.json [fixes DXJ-120 DXJ-265 DXJ-284 DXJ-359 DXJ-361] ([#232](https://github.com/fluencelabs/fluence-cli/issues/232)) ([82a7413](https://github.com/fluencelabs/fluence-cli/commit/82a74137e336204d501fb7b3640efeda6ac440b2))

## [0.4.4](https://github.com/fluencelabs/fluence-cli/compare/fluence-cli-v0.4.3...fluence-cli-v0.4.4) (2023-04-10)


### Features

* add versions.json ([#228](https://github.com/fluencelabs/fluence-cli/issues/228)) ([db15cc1](https://github.com/fluencelabs/fluence-cli/commit/db15cc1e71a27a69495295c3e3602c7ba23811fe))


### Bug Fixes

* **spell:** @fluencelabs/installation-spell 0.5.9 ([#230](https://github.com/fluencelabs/fluence-cli/issues/230)) ([7872b0e](https://github.com/fluencelabs/fluence-cli/commit/7872b0ec4c7f26f7bf99945ae7025dacbf1f5dc7))
* **tests:** fix smoke aqua test ([#231](https://github.com/fluencelabs/fluence-cli/issues/231)) ([4bc61ac](https://github.com/fluencelabs/fluence-cli/commit/4bc61ac0e47c543ad979210c5d62fce80fc29382))

## [0.4.3](https://github.com/fluencelabs/fluence-cli/compare/fluence-cli-v0.4.2...fluence-cli-v0.4.3) (2023-04-05)


### Features

* **logs:** Add logs for deals. Improve command descriptions [fixes DXJ-335] ([#219](https://github.com/fluencelabs/fluence-cli/issues/219)) ([7d88b80](https://github.com/fluencelabs/fluence-cli/commit/7d88b80690ff4e2cd3fcd180474f0c9b0287f98b))
* update fluence js-client and remove legacy deploy tests ([#226](https://github.com/fluencelabs/fluence-cli/issues/226)) ([40ad15b](https://github.com/fluencelabs/fluence-cli/commit/40ad15b33c68164c732b5ade32c211e693f73f83))
* use pnpm internally and in ci and tests, improve error messages… [fixes FLU-290] ([#221](https://github.com/fluencelabs/fluence-cli/issues/221)) ([8e964a3](https://github.com/fluencelabs/fluence-cli/commit/8e964a34a044c6491212281abdb1afbd0e653df2))
* use prebuilt marine for tests ([#223](https://github.com/fluencelabs/fluence-cli/issues/223)) ([114aedc](https://github.com/fluencelabs/fluence-cli/commit/114aedc43047a41c7fbbdbfa64aedf63dee20a2b))


### Bug Fixes

* **deploy:** correct type for module config ([#227](https://github.com/fluencelabs/fluence-cli/issues/227)) ([0bd1dfb](https://github.com/fluencelabs/fluence-cli/commit/0bd1dfbf306cee4587668f740549ca1b8dbd3e71))

## [0.4.2](https://github.com/fluencelabs/fluence-cli/compare/fluence-cli-v0.4.1...fluence-cli-v0.4.2) (2023-03-22)


### Bug Fixes

* compile installation spell in release action, add better template for spell, improve error messages ([#217](https://github.com/fluencelabs/fluence-cli/issues/217)) ([151e3ff](https://github.com/fluencelabs/fluence-cli/commit/151e3ffe67d9ed68677c93370c826655aeb4e981))

## [0.4.1](https://github.com/fluencelabs/fluence-cli/compare/fluence-cli-v0.4.0...fluence-cli-v0.4.1) (2023-03-22)


### Features

* support spells [fixes DXJ-340 DXJ-341] ([#216](https://github.com/fluencelabs/fluence-cli/issues/216)) ([8fc6eb3](https://github.com/fluencelabs/fluence-cli/commit/8fc6eb34142ab78d560cbb09d5fe17695c444a75))
* update rust toolchain and marine tool versions ([#207](https://github.com/fluencelabs/fluence-cli/issues/207)) ([a00aec3](https://github.com/fluencelabs/fluence-cli/commit/a00aec3caa4e455584c475fd4a0755d9c5c2d0e4))

## [0.4.0](https://github.com/fluencelabs/fluence-cli/compare/fluence-cli-v0.3.9...fluence-cli-v0.4.0) (2023-03-16)


### ⚠ BREAKING CHANGES

* renamed deployed.yaml to workers.yaml, renamed deals.aqua to workers.aqua.

### Features

* allow running `fluence workers logs` without initializing the project, don't show stack trace for expected errors ([#197](https://github.com/fluencelabs/fluence-cli/issues/197)) ([9a5036e](https://github.com/fluencelabs/fluence-cli/commit/9a5036e6f78602d441fd5f15ce436b45332d0cb9))
* improve service and module removal [fixes DXJ-320] ([#199](https://github.com/fluencelabs/fluence-cli/issues/199)) ([3f7866d](https://github.com/fluencelabs/fluence-cli/commit/3f7866dd0e09acbb2ea3d66ff1cdb9ea9e9516fa))
* minor improvements and refactoring [fixes DXJ-331] ([#202](https://github.com/fluencelabs/fluence-cli/issues/202)) ([bc12cdc](https://github.com/fluencelabs/fluence-cli/commit/bc12cdcaca7aa06904e7e87e3c7c19a0900a6eec))
* rename and extend deployed.yaml config [fixes DXJ-343] ([#205](https://github.com/fluencelabs/fluence-cli/issues/205)) ([b8cd0eb](https://github.com/fluencelabs/fluence-cli/commit/b8cd0eb3ac4523ddef30623f5f5d84117564a689))
* update copyright year ([#200](https://github.com/fluencelabs/fluence-cli/issues/200)) ([72866b5](https://github.com/fluencelabs/fluence-cli/commit/72866b52d076d172cbaeaeecb819d34c07e91e2c))
* update default fluence env in template ([#194](https://github.com/fluencelabs/fluence-cli/issues/194)) ([75c1f98](https://github.com/fluencelabs/fluence-cli/commit/75c1f9893eaa6efb56b1a3e51dc486ed1bc29329))
* update fluence js client [fixes DXJ-244 DXJ-330] ([#203](https://github.com/fluencelabs/fluence-cli/issues/203)) ([29e11cd](https://github.com/fluencelabs/fluence-cli/commit/29e11cd9228fec8f3b57aeddd8c25508df3101b7))
* update marine cli and mrepl  minor versions ([#201](https://github.com/fluencelabs/fluence-cli/issues/201)) ([fd513a8](https://github.com/fluencelabs/fluence-cli/commit/fd513a8c84415e164f0f0064e03b68231834480e))

## [0.3.9](https://github.com/fluencelabs/fluence-cli/compare/fluence-cli-v0.3.8...fluence-cli-v0.3.9) (2023-03-01)


### Features

* add flags for getting worker logs by ids ([#195](https://github.com/fluencelabs/fluence-cli/issues/195)) ([8c15414](https://github.com/fluencelabs/fluence-cli/commit/8c154142c1d945e1eb4adc068af463b1e153b6d1))

## [0.3.8](https://github.com/fluencelabs/fluence-cli/compare/fluence-cli-v0.3.7...fluence-cli-v0.3.8) (2023-02-28)


### Bug Fixes

* lokijs ([#192](https://github.com/fluencelabs/fluence-cli/issues/192)) ([918b301](https://github.com/fluencelabs/fluence-cli/commit/918b30104b97e2e144b8ba00ef4b8088e14dd69f))

## [0.3.7](https://github.com/fluencelabs/fluence-cli/compare/fluence-cli-v0.3.6...fluence-cli-v0.3.7) (2023-02-28)


### Features

* **blockchain:** Migrate to walletconnect v2 ([#190](https://github.com/fluencelabs/fluence-cli/issues/190)) ([9fdbf54](https://github.com/fluencelabs/fluence-cli/commit/9fdbf54828fd91ef9d21209fd5819536f102d565))

## [0.3.6](https://github.com/fluencelabs/fluence-cli/compare/fluence-cli-v0.3.5...fluence-cli-v0.3.6) (2023-02-27)


### Features

* update upload_deploy function [fixes DXJ-323] ([#188](https://github.com/fluencelabs/fluence-cli/issues/188)) ([584f5c8](https://github.com/fluencelabs/fluence-cli/commit/584f5c8133bd107cfce01514fb0c51ba8fa7b36e))


### Bug Fixes

* legacy deploy [fixes DXJ-321] ([#185](https://github.com/fluencelabs/fluence-cli/issues/185)) ([730fa1a](https://github.com/fluencelabs/fluence-cli/commit/730fa1a4e94e879362d709716d2ea73ca7cb06f3))

## [0.3.5](https://github.com/fluencelabs/fluence-cli/compare/fluence-cli-v0.3.4...fluence-cli-v0.3.5) (2023-02-27)


### Bug Fixes

* aqua interface service_id generation [fixes DXJ-322] ([#186](https://github.com/fluencelabs/fluence-cli/issues/186)) ([a4230ae](https://github.com/fluencelabs/fluence-cli/commit/a4230aea7169ecd498019bd9584a8f5c37cbe33c))

## [0.3.4](https://github.com/fluencelabs/fluence-cli/compare/fluence-cli-v0.3.3...fluence-cli-v0.3.4) (2023-02-25)


### Features

* update aqua version [fixes DXJ-317] ([#183](https://github.com/fluencelabs/fluence-cli/issues/183)) ([c0b1457](https://github.com/fluencelabs/fluence-cli/commit/c0b1457e6ad414a4fee451f51dbd31a115d2e618))

## [0.3.3](https://github.com/fluencelabs/fluence-cli/compare/fluence-cli-v0.3.2...fluence-cli-v0.3.3) (2023-02-24)


### Features

* remove spinner, fix relative aqua file compilation, hide some deal-related commands, allow service and module configs not to be called service.yaml and module.yaml (full path to the config with .yaml extension is needed for this to work), don't add serviceName to defaultWorker if it's already there, simplify and refactor building of modules before deploying workers, change uploaded module config so it uses records instead of arrays of tuples [fixes DXJ-316] ([#180](https://github.com/fluencelabs/fluence-cli/issues/180)) ([1cf2b20](https://github.com/fluencelabs/fluence-cli/commit/1cf2b20b1e727297f015b3ad77e999c79c5e866d))

## [0.3.2](https://github.com/fluencelabs/fluence-cli/compare/fluence-cli-v0.3.1...fluence-cli-v0.3.2) (2023-02-24)


### Features

* **blockchain:** change addresses ([#175](https://github.com/fluencelabs/fluence-cli/issues/175)) ([aa34a69](https://github.com/fluencelabs/fluence-cli/commit/aa34a69321fcf3ece70f94d0e339ca84174ecbeb))


### Bug Fixes

* **ci:** Skip husky install when running in CI ([#170](https://github.com/fluencelabs/fluence-cli/issues/170)) ([e9ef7af](https://github.com/fluencelabs/fluence-cli/commit/e9ef7af4c2cd0125359995b3952f0ab60de9f94c))
* **deps:** update dependency @fluencelabs/installation-spell to ^0.5.0 ([#169](https://github.com/fluencelabs/fluence-cli/issues/169)) ([a6c0b45](https://github.com/fluencelabs/fluence-cli/commit/a6c0b455da56aa829e575871aa6d3275c5cf0050))
* **deps:** update dependency @fluencelabs/spell to ^0.5.0 ([#177](https://github.com/fluencelabs/fluence-cli/issues/177)) ([4912def](https://github.com/fluencelabs/fluence-cli/commit/4912def825ce276f3ba1208c004b231d38d59058))
* service interface generation [fixes DXJ-315] ([#179](https://github.com/fluencelabs/fluence-cli/issues/179)) ([175159d](https://github.com/fluencelabs/fluence-cli/commit/175159db57b517019183c999f0cf123fa3a8f116))

## [0.3.1](https://github.com/fluencelabs/fluence-cli/compare/fluence-cli-v0.3.0...fluence-cli-v0.3.1) (2023-02-24)


### Features

* improve error messages for `worker deploy`, infer empty object and empty array as optional instead of throwing an error [fixes DXJ-310] ([#174](https://github.com/fluencelabs/fluence-cli/issues/174)) ([ac01f29](https://github.com/fluencelabs/fluence-cli/commit/ac01f297b2e8171658319a6af08a07f684fb263d))

## [0.3.0](https://github.com/fluencelabs/fluence-cli/compare/fluence-cli-v0.2.46...fluence-cli-v0.3.0) (2023-02-23)


### ⚠ BREAKING CHANGES

* different way of storing service interfaces and merged all configs into one fluence.yaml [fixes DXJ-308]

### Features

* Improvements and fixes for deals flow BREAKING CHANGE: different way of storing service interfaces and merged all configs into one fluence.yaml [fixes DXJ-308] ([#172](https://github.com/fluencelabs/fluence-cli/issues/172)) ([e07ad4d](https://github.com/fluencelabs/fluence-cli/commit/e07ad4dc908acfbf3e05ccae1bd4c08b2b7afd8b))

## [0.2.46](https://github.com/fluencelabs/fluence-cli/compare/fluence-cli-v0.2.45...fluence-cli-v0.2.46) (2023-02-21)


### Bug Fixes

* **blockchain:** fix chainId ([#167](https://github.com/fluencelabs/fluence-cli/issues/167)) ([21bc546](https://github.com/fluencelabs/fluence-cli/commit/21bc5465a97695f0636b69e072522cabfdff78ee))
* fix chainId ([21bc546](https://github.com/fluencelabs/fluence-cli/commit/21bc5465a97695f0636b69e072522cabfdff78ee))

## [0.2.45](https://github.com/fluencelabs/fluence-cli/compare/fluence-cli-v0.2.44...fluence-cli-v0.2.45) (2023-02-21)


### Features

* Add a root Cargo.toml with workspaces, do some refactoring [fixes DXJ-295] ([#165](https://github.com/fluencelabs/fluence-cli/issues/165)) ([538c484](https://github.com/fluencelabs/fluence-cli/commit/538c4842751757f7598dd563e7977482b132ce22))


### Bug Fixes

* **deps:** update dependency @oclif/plugin-autocomplete to v2 ([#155](https://github.com/fluencelabs/fluence-cli/issues/155)) ([95f526a](https://github.com/fluencelabs/fluence-cli/commit/95f526a056dfd01798c1611e38cf68ef7fd01565))

## [0.2.44](https://github.com/fluencelabs/fluence-cli/compare/fluence-cli-v0.2.43...fluence-cli-v0.2.44) (2023-02-20)


### Bug Fixes

* **blockchain:** change testnet ([#163](https://github.com/fluencelabs/fluence-cli/issues/163)) ([ba077d3](https://github.com/fluencelabs/fluence-cli/commit/ba077d32d416f68f3e38225ff546dd09c276fdd2))

## [0.2.43](https://github.com/fluencelabs/fluence-cli/compare/fluence-cli-v0.2.42...fluence-cli-v0.2.43) (2023-02-20)


### Features

* add `fluence default peers` command [fixes DXJ-303] ([#160](https://github.com/fluencelabs/fluence-cli/issues/160)) ([16eba7f](https://github.com/fluencelabs/fluence-cli/commit/16eba7fb08327b9c53770090811dff39ca38357b))
* add `fluence workers logs` command [fixes DXJ-297] ([#153](https://github.com/fluencelabs/fluence-cli/issues/153)) ([53585a2](https://github.com/fluencelabs/fluence-cli/commit/53585a2f999b13585f36bb83a5f77c05a6e52838))


### Bug Fixes

* don't print result of aqua call twice, check that workers have services and that peerIds is not an empty array when deploying workers, prettify error messages  [fixes DXJ-301] ([#161](https://github.com/fluencelabs/fluence-cli/issues/161)) ([afb6d75](https://github.com/fluencelabs/fluence-cli/commit/afb6d75f41eb04d99bf50b92a05093f3a0a8adea))
* migrate to mumbai testnet ([#162](https://github.com/fluencelabs/fluence-cli/issues/162)) ([28f7ce2](https://github.com/fluencelabs/fluence-cli/commit/28f7ce29d2865f1e22151b7f270cbde1f0d4184f))

## [0.2.42](https://github.com/fluencelabs/fluence-cli/compare/fluence-cli-v0.2.41...fluence-cli-v0.2.42) (2023-02-17)


### Features

* move deploy command to `fluence deal deploy`, add `fluence workers upload`, allow deployment of workers that you specified in a comma-separated argument [fixes DXJ-294] ([#150](https://github.com/fluencelabs/fluence-cli/issues/150)) ([ff268ce](https://github.com/fluencelabs/fluence-cli/commit/ff268ce42488c9591ff470cbef36121a2a265c62))


### Bug Fixes

* **deps:** update dependency @fluencelabs/aqua-api to v0.10.1 ([#151](https://github.com/fluencelabs/fluence-cli/issues/151)) ([e92f453](https://github.com/fluencelabs/fluence-cli/commit/e92f453f88221d6b597447520dd327cc6e2513a9))

## [0.2.41](https://github.com/fluencelabs/fluence-cli/compare/fluence-cli-v0.2.40...fluence-cli-v0.2.41) (2023-02-16)


### Features

* Incorporate Aqua v0.10.0 [DXJ-290] ([#148](https://github.com/fluencelabs/fluence-cli/issues/148)) ([97b7dbe](https://github.com/fluencelabs/fluence-cli/commit/97b7dbec63b01f72cee89517e77159c5aadabd45))

## [0.2.40](https://github.com/fluencelabs/fluence-cli/compare/fluence-cli-v0.2.39...fluence-cli-v0.2.40) (2023-02-15)


### Features

* add deployment for workers with deals [fixes DXJ-287] ([#146](https://github.com/fluencelabs/fluence-cli/issues/146)) ([a92b65b](https://github.com/fluencelabs/fluence-cli/commit/a92b65b0700e2ec56bbcbb1f7777077a3f17f7ef))

## [0.2.39](https://github.com/fluencelabs/fluence-cli/compare/fluence-cli-v0.2.38...fluence-cli-v0.2.39) (2023-02-15)


### Bug Fixes

* add ttl flag and increase default timeout for `fluence workers deploy`. Add process.exit after reporting an error ([#144](https://github.com/fluencelabs/fluence-cli/issues/144)) ([1bc9200](https://github.com/fluencelabs/fluence-cli/commit/1bc9200860a97edc30057b4c1ae9886793d2d742))

## [0.2.38](https://github.com/fluencelabs/fluence-cli/compare/fluence-cli-v0.2.37...fluence-cli-v0.2.38) (2023-02-15)


### Features

* add configs for workers (worker.yaml), direct hosting (hosts.yaml) and deployment result (deployed.yaml). Add command for worker deployment. Add command for showing versions of used dependencies. Fix issue with circular imports [fixes DXJ-246 DXJ-247 DXJ-259 DXJ-249 DXJ-270] ([#141](https://github.com/fluencelabs/fluence-cli/issues/141)) ([2659d9d](https://github.com/fluencelabs/fluence-cli/commit/2659d9dfa3ddd6c28c0fc81cb5abba2a900d615b))
* **docs:** README update ([#139](https://github.com/fluencelabs/fluence-cli/issues/139)) ([95a70ec](https://github.com/fluencelabs/fluence-cli/commit/95a70ece5584c0c69b421dd21821aaa159aadd30))
* update pkg @fluencelabs/deal-aurora ([#143](https://github.com/fluencelabs/fluence-cli/issues/143)) ([2a49316](https://github.com/fluencelabs/fluence-cli/commit/2a4931609e7629cd66e4dba5be5bd9785546a0a7))

## [0.2.37](https://github.com/fluencelabs/fluence-cli/compare/fluence-cli-v0.2.36...fluence-cli-v0.2.37) (2023-02-07)


### Features

* migrate to es modules [fixes DXJ-252] ([#133](https://github.com/fluencelabs/fluence-cli/issues/133)) ([5806510](https://github.com/fluencelabs/fluence-cli/commit/58065108f9cfaf2283f62373062bcf5b5b23b269))
* refactor and fix module and service `add` commands, update dependency versions,  enforce rust toolchain  override each time marine and mrepl are used, make dev builds faster by removing type-cheking for dev mode [fixes DXJ-251] ([#131](https://github.com/fluencelabs/fluence-cli/issues/131)) ([53a7446](https://github.com/fluencelabs/fluence-cli/commit/53a74466dc0fbc58596a02d00a136843a0686df2))
* update pkg @fluencelabs/deal-aurora ([#135](https://github.com/fluencelabs/fluence-cli/issues/135)) ([42fa72b](https://github.com/fluencelabs/fluence-cli/commit/42fa72bc66ed31cf9291874fd2986b0c4e7e31c3))


### Bug Fixes

* Countly hanging cli and refactor [fixes DXJ-262] ([#138](https://github.com/fluencelabs/fluence-cli/issues/138)) ([8a642fb](https://github.com/fluencelabs/fluence-cli/commit/8a642fb4426eb14a884c0b7692ffc8a2b6ae28ca))
* update pkg @fluencelabs/deal-aurora to 0.1.3 ([#128](https://github.com/fluencelabs/fluence-cli/issues/128)) ([1641305](https://github.com/fluencelabs/fluence-cli/commit/16413059fbacbb3d20019bbae394906fe3873fba))

## [0.2.36](https://github.com/fluencelabs/fluence-cli/compare/fluence-cli-v0.2.35...fluence-cli-v0.2.36) (2023-01-26)


### Features

* add print particle id flag to fluence run [fixes DXJ-241] ([#122](https://github.com/fluencelabs/fluence-cli/issues/122)) ([ec7f55e](https://github.com/fluencelabs/fluence-cli/commit/ec7f55ed2838ca49e2de557e5653045f26626155))
* update oclif dependencies to latest [fixes DXJ-243] ([#126](https://github.com/fluencelabs/fluence-cli/issues/126)) ([697382c](https://github.com/fluencelabs/fluence-cli/commit/697382c5916ee9d96fab1df5dedc05c4c217b013))


### Bug Fixes

* **deps:** update dependency @fluencelabs/aqua-api to v0.9.3 ([#118](https://github.com/fluencelabs/fluence-cli/issues/118)) ([42d8c30](https://github.com/fluencelabs/fluence-cli/commit/42d8c30012cce21531cc162c8444bbd0fdf2bc49))
* don't print interface definition [fixes DXJ-239] ([#124](https://github.com/fluencelabs/fluence-cli/issues/124)) ([fcfd6e1](https://github.com/fluencelabs/fluence-cli/commit/fcfd6e1d76a16bed9e31fc2416c115a5c24f8a92))
* generate schema file only after making sure config will exist, f… ([#121](https://github.com/fluencelabs/fluence-cli/issues/121)) ([0641bef](https://github.com/fluencelabs/fluence-cli/commit/0641bef952aa337aaf3085199eb4a12814871313))

## [0.2.35](https://github.com/fluencelabs/fluence-cli/compare/fluence-cli-v0.2.34...fluence-cli-v0.2.35) (2023-01-20)


### Features

* **run:** implicitly import aqua lib if not inside fluence project, automatically add to fluence.yaml if missing [fixes DXJ-231] ([#115](https://github.com/fluencelabs/fluence-cli/issues/115)) ([6ab49d4](https://github.com/fluencelabs/fluence-cli/commit/6ab49d4475db94984bec7a29299376c19484e17b))


### Bug Fixes

* **env:** solve issue with undefined env variable [fixes DXJ-237] ([#116](https://github.com/fluencelabs/fluence-cli/issues/116)) ([8029a84](https://github.com/fluencelabs/fluence-cli/commit/8029a847eea950fee7d021320d270d65c9f02e8f))

## [0.2.34](https://github.com/fluencelabs/fluence-cli/compare/fluence-cli-v0.2.33...fluence-cli-v0.2.34) (2023-01-19)


### Features

* **chain:** update url for cli connector [fixes DXJ-234] ([#111](https://github.com/fluencelabs/fluence-cli/issues/111)) ([8f0b001](https://github.com/fluencelabs/fluence-cli/commit/8f0b001f80290b770c7d0e5f0a1137586b7c33b2))
* **dependencies:** remove required dependencies [DXJ-227] ([#87](https://github.com/fluencelabs/fluence-cli/issues/87)) ([7588606](https://github.com/fluencelabs/fluence-cli/commit/7588606a7411db5a2921049774b76ec2f8f3988c))
* **run:** use --input flag to search for project root dir path [fixes DXJ-232] ([#113](https://github.com/fluencelabs/fluence-cli/issues/113)) ([b3c7897](https://github.com/fluencelabs/fluence-cli/commit/b3c789750ad8e87687974ccb47a972db1d0832df))
* **tests:** add env variable for user's fluence dir path [fixes DXJ-228] ([#112](https://github.com/fluencelabs/fluence-cli/issues/112)) ([9193992](https://github.com/fluencelabs/fluence-cli/commit/919399210b4e85fe47b4d253651ded8113731526))


### Bug Fixes

* **dependencies:** update aqua and rust versions [fixes DXJ-236] ([#109](https://github.com/fluencelabs/fluence-cli/issues/109)) ([becb28b](https://github.com/fluencelabs/fluence-cli/commit/becb28b9d7b1ba6451e108ad649d6b0162a15864))

## [0.2.33](https://github.com/fluencelabs/fluence-cli/compare/fluence-cli-v0.2.32...fluence-cli-v0.2.33) (2023-01-18)


### Features

* **deal:** migrate deal cli [fixes DXJ-221] ([9a462a2](https://github.com/fluencelabs/fluence-cli/commit/9a462a2674739e16b93dd41fa6e006c7c4bc453f))
* **dependencies:** update fluence-js and aqua version [fixes DXJ-233] ([#104](https://github.com/fluencelabs/fluence-cli/issues/104)) ([255ff83](https://github.com/fluencelabs/fluence-cli/commit/255ff8359cd787728fcd9342fbca218386a3f75e))


### Bug Fixes

* **deps:** update dependency @fluencelabs/aqua-api to v0.9.2 ([#107](https://github.com/fluencelabs/fluence-cli/issues/107)) ([26b329f](https://github.com/fluencelabs/fluence-cli/commit/26b329fe99b6a5e499b6555766b8e4005df49ff5))

/* eslint-disable */
// @ts-nocheck
/**
 *
 * This file is auto-generated. Do not edit manually: changes may be erased.
 * Generated by Aqua compiler: https://github.com/fluencelabs/aqua/.
 * If you find any bugs, please write an issue on GitHub: https://github.com/fluencelabs/aqua/issues
 * Aqua version: 0.9.4
 *
 */
import { FluencePeer } from "@fluencelabs/fluence";
import type { CallParams$$ } from "@fluencelabs/fluence/dist/internal/compilerSupport/v4.js";
import {
  callFunction$$,
  registerService$$,
} from "@fluencelabs/fluence/dist/internal/compilerSupport/v4.js";

// Services

export interface WDJsonDef {
  parse: (
    json: string,
    callParams: CallParams$$<"json">
  ) =>
    | {
        services: {
          modules: { config: string; wasm: string }[];
          name: string;
        }[];
        spells: {
          config: string;
          init_args: string;
          name: string;
          script: string;
        }[];
      }
    | Promise<{
        services: {
          modules: { config: string; wasm: string }[];
          name: string;
        }[];
        spells: {
          config: string;
          init_args: string;
          name: string;
          script: string;
        }[];
      }>;
  stringify: (
    wd: {
      services: { modules: { config: string; wasm: string }[]; name: string }[];
      spells: {
        config: string;
        init_args: string;
        name: string;
        script: string;
      }[];
    },
    callParams: CallParams$$<"wd">
  ) => string | Promise<string>;
}
export function registerWDJson(service: WDJsonDef): void;
export function registerWDJson(serviceId: string, service: WDJsonDef): void;
export function registerWDJson(peer: FluencePeer, service: WDJsonDef): void;
export function registerWDJson(
  peer: FluencePeer,
  serviceId: string,
  service: WDJsonDef
): void;

export function registerWDJson(...args: any) {
  registerService$$(args, {
    defaultServiceId: "json",
    functions: {
      tag: "labeledProduct",
      fields: {
        parse: {
          tag: "arrow",
          domain: {
            tag: "labeledProduct",
            fields: {
              json: {
                tag: "scalar",
                name: "string",
              },
            },
          },
          codomain: {
            tag: "unlabeledProduct",
            items: [
              {
                tag: "struct",
                name: "WorkerDefinition",
                fields: {
                  services: {
                    tag: "array",
                    type: {
                      tag: "struct",
                      name: "Service",
                      fields: {
                        modules: {
                          tag: "array",
                          type: {
                            tag: "struct",
                            name: "Module",
                            fields: {
                              config: {
                                tag: "scalar",
                                name: "string",
                              },
                              wasm: {
                                tag: "scalar",
                                name: "string",
                              },
                            },
                          },
                        },
                        name: {
                          tag: "scalar",
                          name: "string",
                        },
                      },
                    },
                  },
                  spells: {
                    tag: "array",
                    type: {
                      tag: "struct",
                      name: "Spell",
                      fields: {
                        config: {
                          tag: "scalar",
                          name: "string",
                        },
                        init_args: {
                          tag: "scalar",
                          name: "string",
                        },
                        name: {
                          tag: "scalar",
                          name: "string",
                        },
                        script: {
                          tag: "scalar",
                          name: "string",
                        },
                      },
                    },
                  },
                },
              },
            ],
          },
        },
        stringify: {
          tag: "arrow",
          domain: {
            tag: "labeledProduct",
            fields: {
              wd: {
                tag: "struct",
                name: "WorkerDefinition",
                fields: {
                  services: {
                    tag: "array",
                    type: {
                      tag: "struct",
                      name: "Service",
                      fields: {
                        modules: {
                          tag: "array",
                          type: {
                            tag: "struct",
                            name: "Module",
                            fields: {
                              config: {
                                tag: "scalar",
                                name: "string",
                              },
                              wasm: {
                                tag: "scalar",
                                name: "string",
                              },
                            },
                          },
                        },
                        name: {
                          tag: "scalar",
                          name: "string",
                        },
                      },
                    },
                  },
                  spells: {
                    tag: "array",
                    type: {
                      tag: "struct",
                      name: "Spell",
                      fields: {
                        config: {
                          tag: "scalar",
                          name: "string",
                        },
                        init_args: {
                          tag: "scalar",
                          name: "string",
                        },
                        name: {
                          tag: "scalar",
                          name: "string",
                        },
                        script: {
                          tag: "scalar",
                          name: "string",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          codomain: {
            tag: "unlabeledProduct",
            items: [
              {
                tag: "scalar",
                name: "string",
              },
            ],
          },
        },
      },
    },
  });
}

// Functions
export type Upload_worker_configArgConfig = {
  services: { modules: { config: string; wasm: string }[]; name: string }[];
  spells: {
    config: {
      blockchain: { end_block: number; start_block: number };
      clock: { end_sec: number; period_sec: number; start_sec: number };
      connections: { connect: boolean; disconnect: boolean };
    };
    init_args: any;
    name: string;
    script: string;
  }[];
};

export function upload_worker_config(
  ipfs: string,
  config_: Upload_worker_configArgConfig,
  config?: { ttl?: number }
): Promise<string>;

export function upload_worker_config(
  peer: FluencePeer,
  ipfs: string,
  config_: Upload_worker_configArgConfig,
  config?: { ttl?: number }
): Promise<string>;

export function upload_worker_config(...args: any) {
  let script = `
                    (xor
                     (seq
                      (seq
                       (seq
                        (seq
                         (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
                         (call %init_peer_id% ("getDataSrv" "ipfs") [] ipfs)
                        )
                        (call %init_peer_id% ("getDataSrv" "config") [] config)
                       )
                       (new $services
                        (seq
                         (seq
                          (seq
                           (seq
                            (fold config.$.services! s-0
                             (seq
                              (new $modules
                               (seq
                                (seq
                                 (seq
                                  (fold s-0.$.modules! m-0
                                   (seq
                                    (seq
                                     (seq
                                      (seq
                                       (call %init_peer_id% ("ipfs_client" "upload") [ipfs m-0.$.wasm!] wasm)
                                       (call %init_peer_id% ("ipfs_client" "upload_string") [ipfs m-0.$.config!] cfg)
                                      )
                                      (call %init_peer_id% ("json" "obj") ["config" cfg "wasm" wasm] Module_obj)
                                     )
                                     (ap Module_obj $modules)
                                    )
                                    (next m-0)
                                   )
                                  )
                                  (canon %init_peer_id% $modules  #modules_canon)
                                 )
                                 (call %init_peer_id% ("json" "obj") ["modules" #modules_canon "name" s-0.$.name!] Service_obj)
                                )
                                (ap Service_obj $services)
                               )
                              )
                              (next s-0)
                             )
                            )
                            (canon %init_peer_id% $services  #services_canon)
                           )
                           (call %init_peer_id% ("json" "obj") ["services" #services_canon "spells" []] WorkerDefinition_obj)
                          )
                          (call %init_peer_id% ("json" "stringify") [WorkerDefinition_obj] json)
                         )
                         (call %init_peer_id% ("ipfs_client" "upload_string") [ipfs json] cid)
                        )
                       )
                      )
                      (xor
                       (call %init_peer_id% ("callbackSrv" "response") [cid])
                       (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
                      )
                     )
                     (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
                    )
    `;
  return callFunction$$(
    args,
    {
      functionName: "upload_worker_config",
      arrow: {
        tag: "arrow",
        domain: {
          tag: "labeledProduct",
          fields: {
            ipfs: {
              tag: "scalar",
              name: "string",
            },
            config: {
              tag: "struct",
              name: "LocalWorkerConfig",
              fields: {
                services: {
                  tag: "array",
                  type: {
                    tag: "struct",
                    name: "LocalService",
                    fields: {
                      modules: {
                        tag: "array",
                        type: {
                          tag: "struct",
                          name: "LocalModule",
                          fields: {
                            config: {
                              tag: "scalar",
                              name: "string",
                            },
                            wasm: {
                              tag: "scalar",
                              name: "string",
                            },
                          },
                        },
                      },
                      name: {
                        tag: "scalar",
                        name: "string",
                      },
                    },
                  },
                },
                spells: {
                  tag: "array",
                  type: {
                    tag: "struct",
                    name: "LocalSpell",
                    fields: {
                      config: {
                        tag: "struct",
                        name: "TriggerConfig",
                        fields: {
                          blockchain: {
                            tag: "struct",
                            name: "BlockChainConfig",
                            fields: {
                              end_block: {
                                tag: "scalar",
                                name: "u32",
                              },
                              start_block: {
                                tag: "scalar",
                                name: "u32",
                              },
                            },
                          },
                          clock: {
                            tag: "struct",
                            name: "ClockConfig",
                            fields: {
                              end_sec: {
                                tag: "scalar",
                                name: "u32",
                              },
                              period_sec: {
                                tag: "scalar",
                                name: "u32",
                              },
                              start_sec: {
                                tag: "scalar",
                                name: "u32",
                              },
                            },
                          },
                          connections: {
                            tag: "struct",
                            name: "ConnectionPoolConfig",
                            fields: {
                              connect: {
                                tag: "scalar",
                                name: "bool",
                              },
                              disconnect: {
                                tag: "scalar",
                                name: "bool",
                              },
                            },
                          },
                        },
                      },
                      init_args: {
                        tag: "topType",
                      },
                      name: {
                        tag: "scalar",
                        name: "string",
                      },
                      script: {
                        tag: "scalar",
                        name: "string",
                      },
                    },
                  },
                },
              },
            },
          },
        },
        codomain: {
          tag: "unlabeledProduct",
          items: [
            {
              tag: "scalar",
              name: "string",
            },
          ],
        },
      },
      names: {
        relay: "-relay-",
        getDataSrv: "getDataSrv",
        callbackSrv: "callbackSrv",
        responseSrv: "callbackSrv",
        responseFnName: "response",
        errorHandlingSrv: "errorHandlingSrv",
        errorFnName: "error",
      },
    },
    script
  );
}

export type UploadArgConfig = {
  installation_script: string;
  installation_trigger: {
    blockchain: { end_block: number; start_block: number };
    clock: { end_sec: number; period_sec: number; start_sec: number };
    connections: { connect: boolean; disconnect: boolean };
  };
  workers: {
    config: {
      services: { modules: { config: string; wasm: string }[]; name: string }[];
      spells: {
        config: {
          blockchain: { end_block: number; start_block: number };
          clock: { end_sec: number; period_sec: number; start_sec: number };
          connections: { connect: boolean; disconnect: boolean };
        };
        init_args: any;
        name: string;
        script: string;
      }[];
    };
    hosts: string[];
    name: string;
  }[];
};
export type UploadResult = {
  installation_script: string;
  installation_trigger: {
    blockchain: { end_block: number; start_block: number };
    clock: { end_sec: number; period_sec: number; start_sec: number };
    connections: { connect: boolean; disconnect: boolean };
  };
  workers: { definition: string; hosts: string[]; name: string }[];
};
export function upload(
  config_: UploadArgConfig,
  config?: { ttl?: number }
): Promise<UploadResult>;

export function upload(
  peer: FluencePeer,
  config_: UploadArgConfig,
  config?: { ttl?: number }
): Promise<UploadResult>;

export function upload(...args: any) {
  let script = `
                    (xor
                     (seq
                      (seq
                       (seq
                        (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
                        (call %init_peer_id% ("getDataSrv" "config") [] config)
                       )
                       (new $deploy_defs
                        (seq
                         (seq
                          (fold config.$.workers! w-0
                           (seq
                            (seq
                             (seq
                              (new $services
                               (seq
                                (seq
                                 (seq
                                  (seq
                                   (fold w-0.$.config.services! s-0
                                    (seq
                                     (new $modules
                                      (seq
                                       (seq
                                        (seq
                                         (fold s-0.$.modules! m-0
                                          (seq
                                           (seq
                                            (seq
                                             (seq
                                              (call %init_peer_id% ("ipfs_client" "upload") ["/dns4/ipfs.fluence.dev/tcp/5001" m-0.$.wasm!] wasm)
                                              (call %init_peer_id% ("ipfs_client" "upload_string") ["/dns4/ipfs.fluence.dev/tcp/5001" m-0.$.config!] cfg)
                                             )
                                             (call %init_peer_id% ("json" "obj") ["config" cfg "wasm" wasm] Module_obj)
                                            )
                                            (ap Module_obj $modules)
                                           )
                                           (next m-0)
                                          )
                                         )
                                         (canon %init_peer_id% $modules  #modules_canon)
                                        )
                                        (call %init_peer_id% ("json" "obj") ["modules" #modules_canon "name" s-0.$.name!] Service_obj)
                                       )
                                       (ap Service_obj $services)
                                      )
                                     )
                                     (next s-0)
                                    )
                                   )
                                   (canon %init_peer_id% $services  #services_canon)
                                  )
                                  (call %init_peer_id% ("json" "obj") ["services" #services_canon "spells" []] WorkerDefinition_obj)
                                 )
                                 (call %init_peer_id% ("json" "stringify") [WorkerDefinition_obj] json)
                                )
                                (call %init_peer_id% ("ipfs_client" "upload_string") ["/dns4/ipfs.fluence.dev/tcp/5001" json] cid)
                               )
                              )
                              (call %init_peer_id% ("json" "obj") ["definition" cid "hosts" w-0.$.hosts! "name" w-0.$.name!] WorkerDeployDefinition_obj)
                             )
                             (ap WorkerDeployDefinition_obj $deploy_defs)
                            )
                            (next w-0)
                           )
                          )
                          (canon %init_peer_id% $deploy_defs  #deploy_defs_canon)
                         )
                         (call %init_peer_id% ("json" "obj") ["installation_script" config.$.installation_script! "installation_trigger" config.$.installation_trigger! "workers" #deploy_defs_canon] AppDeployDefinition_obj)
                        )
                       )
                      )
                      (xor
                       (call %init_peer_id% ("callbackSrv" "response") [AppDeployDefinition_obj])
                       (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
                      )
                     )
                     (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
                    )
    `;
  return callFunction$$(
    args,
    {
      functionName: "upload",
      arrow: {
        tag: "arrow",
        domain: {
          tag: "labeledProduct",
          fields: {
            config: {
              tag: "struct",
              name: "LocalAppDeployConfig",
              fields: {
                installation_script: {
                  tag: "scalar",
                  name: "string",
                },
                installation_trigger: {
                  tag: "struct",
                  name: "TriggerConfig",
                  fields: {
                    blockchain: {
                      tag: "struct",
                      name: "BlockChainConfig",
                      fields: {
                        end_block: {
                          tag: "scalar",
                          name: "u32",
                        },
                        start_block: {
                          tag: "scalar",
                          name: "u32",
                        },
                      },
                    },
                    clock: {
                      tag: "struct",
                      name: "ClockConfig",
                      fields: {
                        end_sec: {
                          tag: "scalar",
                          name: "u32",
                        },
                        period_sec: {
                          tag: "scalar",
                          name: "u32",
                        },
                        start_sec: {
                          tag: "scalar",
                          name: "u32",
                        },
                      },
                    },
                    connections: {
                      tag: "struct",
                      name: "ConnectionPoolConfig",
                      fields: {
                        connect: {
                          tag: "scalar",
                          name: "bool",
                        },
                        disconnect: {
                          tag: "scalar",
                          name: "bool",
                        },
                      },
                    },
                  },
                },
                workers: {
                  tag: "array",
                  type: {
                    tag: "struct",
                    name: "LocalWorkerDeployConfig",
                    fields: {
                      config: {
                        tag: "struct",
                        name: "LocalWorkerConfig",
                        fields: {
                          services: {
                            tag: "array",
                            type: {
                              tag: "struct",
                              name: "LocalService",
                              fields: {
                                modules: {
                                  tag: "array",
                                  type: {
                                    tag: "struct",
                                    name: "LocalModule",
                                    fields: {
                                      config: {
                                        tag: "scalar",
                                        name: "string",
                                      },
                                      wasm: {
                                        tag: "scalar",
                                        name: "string",
                                      },
                                    },
                                  },
                                },
                                name: {
                                  tag: "scalar",
                                  name: "string",
                                },
                              },
                            },
                          },
                          spells: {
                            tag: "array",
                            type: {
                              tag: "struct",
                              name: "LocalSpell",
                              fields: {
                                config: {
                                  tag: "struct",
                                  name: "TriggerConfig",
                                  fields: {
                                    blockchain: {
                                      tag: "struct",
                                      name: "BlockChainConfig",
                                      fields: {
                                        end_block: {
                                          tag: "scalar",
                                          name: "u32",
                                        },
                                        start_block: {
                                          tag: "scalar",
                                          name: "u32",
                                        },
                                      },
                                    },
                                    clock: {
                                      tag: "struct",
                                      name: "ClockConfig",
                                      fields: {
                                        end_sec: {
                                          tag: "scalar",
                                          name: "u32",
                                        },
                                        period_sec: {
                                          tag: "scalar",
                                          name: "u32",
                                        },
                                        start_sec: {
                                          tag: "scalar",
                                          name: "u32",
                                        },
                                      },
                                    },
                                    connections: {
                                      tag: "struct",
                                      name: "ConnectionPoolConfig",
                                      fields: {
                                        connect: {
                                          tag: "scalar",
                                          name: "bool",
                                        },
                                        disconnect: {
                                          tag: "scalar",
                                          name: "bool",
                                        },
                                      },
                                    },
                                  },
                                },
                                init_args: {
                                  tag: "topType",
                                },
                                name: {
                                  tag: "scalar",
                                  name: "string",
                                },
                                script: {
                                  tag: "scalar",
                                  name: "string",
                                },
                              },
                            },
                          },
                        },
                      },
                      hosts: {
                        tag: "array",
                        type: {
                          tag: "scalar",
                          name: "string",
                        },
                      },
                      name: {
                        tag: "scalar",
                        name: "string",
                      },
                    },
                  },
                },
              },
            },
          },
        },
        codomain: {
          tag: "unlabeledProduct",
          items: [
            {
              tag: "struct",
              name: "AppDeployDefinition",
              fields: {
                installation_script: {
                  tag: "scalar",
                  name: "string",
                },
                installation_trigger: {
                  tag: "struct",
                  name: "TriggerConfig",
                  fields: {
                    blockchain: {
                      tag: "struct",
                      name: "BlockChainConfig",
                      fields: {
                        end_block: {
                          tag: "scalar",
                          name: "u32",
                        },
                        start_block: {
                          tag: "scalar",
                          name: "u32",
                        },
                      },
                    },
                    clock: {
                      tag: "struct",
                      name: "ClockConfig",
                      fields: {
                        end_sec: {
                          tag: "scalar",
                          name: "u32",
                        },
                        period_sec: {
                          tag: "scalar",
                          name: "u32",
                        },
                        start_sec: {
                          tag: "scalar",
                          name: "u32",
                        },
                      },
                    },
                    connections: {
                      tag: "struct",
                      name: "ConnectionPoolConfig",
                      fields: {
                        connect: {
                          tag: "scalar",
                          name: "bool",
                        },
                        disconnect: {
                          tag: "scalar",
                          name: "bool",
                        },
                      },
                    },
                  },
                },
                workers: {
                  tag: "array",
                  type: {
                    tag: "struct",
                    name: "WorkerDeployDefinition",
                    fields: {
                      definition: {
                        tag: "scalar",
                        name: "string",
                      },
                      hosts: {
                        tag: "array",
                        type: {
                          tag: "scalar",
                          name: "string",
                        },
                      },
                      name: {
                        tag: "scalar",
                        name: "string",
                      },
                    },
                  },
                },
              },
            },
          ],
        },
      },
      names: {
        relay: "-relay-",
        getDataSrv: "getDataSrv",
        callbackSrv: "callbackSrv",
        responseSrv: "callbackSrv",
        responseFnName: "response",
        errorHandlingSrv: "errorHandlingSrv",
        errorFnName: "error",
      },
    },
    script
  );
}

export declare const idl: {
    version: string;
    name: string;
    instructions: ({
        name: string;
        accounts: ({
            name: string;
            isMut: boolean;
            isSigner: boolean;
            isOptional?: never;
        } | {
            name: string;
            isMut: boolean;
            isSigner: boolean;
            isOptional: boolean;
        })[];
        args: ({
            name: string;
            type: string;
        } | {
            name: string;
            type: {
                option: string;
            };
        } | {
            name: string;
            type: {
                option: {
                    vec: {
                        defined: string;
                    };
                    defined?: never;
                };
            };
        } | {
            name: string;
            type: {
                option: {
                    defined: string;
                    vec?: never;
                };
            };
        })[];
    } | {
        name: string;
        accounts: ({
            name: string;
            isMut: boolean;
            isSigner: boolean;
            isOptional?: never;
        } | {
            name: string;
            isMut: boolean;
            isSigner: boolean;
            isOptional: boolean;
        })[];
        args: ({
            name: string;
            type: {
                option: string;
            };
        } | {
            name: string;
            type: {
                option: {
                    defined: string;
                    array?: never;
                };
            };
        } | {
            name: string;
            type: {
                option: {
                    array: (string | number)[];
                    defined?: never;
                };
            };
        })[];
    } | {
        name: string;
        accounts: {
            name: string;
            isMut: boolean;
            isSigner: boolean;
        }[];
        args: ({
            name: string;
            type: {
                vec: {
                    defined: string;
                };
                array?: never;
                option?: never;
            };
        } | {
            name: string;
            type: {
                array: (string | number)[];
                vec?: never;
                option?: never;
            };
        } | {
            name: string;
            type: {
                option: {
                    defined: string;
                };
                vec?: never;
                array?: never;
            };
        })[];
    } | {
        name: string;
        accounts: ({
            name: string;
            isMut: boolean;
            isSigner: boolean;
            isOptional?: never;
            docs?: never;
        } | {
            name: string;
            isMut: boolean;
            isSigner: boolean;
            isOptional: boolean;
            docs?: never;
        } | {
            name: string;
            isMut: boolean;
            isSigner: boolean;
            docs: string[];
            isOptional?: never;
        } | {
            name: string;
            isMut: boolean;
            isSigner: boolean;
            isOptional: boolean;
            docs: string[];
        })[];
        args: ({
            name: string;
            type: string;
        } | {
            name: string;
            type: {
                array: (string | number)[];
                defined?: never;
            };
        } | {
            name: string;
            type: {
                defined: string;
                array?: never;
            };
        })[];
    } | {
        name: string;
        accounts: {
            name: string;
            isMut: boolean;
            isSigner: boolean;
        }[];
        args: {
            name: string;
            type: {
                vec: string;
            };
        }[];
    } | {
        name: string;
        accounts: ({
            name: string;
            isMut: boolean;
            isSigner: boolean;
            docs: string[];
            isOptional?: never;
        } | {
            name: string;
            isMut: boolean;
            isSigner: boolean;
            docs?: never;
            isOptional?: never;
        } | {
            name: string;
            isMut: boolean;
            isSigner: boolean;
            isOptional: boolean;
            docs?: never;
        })[];
        args: ({
            name: string;
            type: {
                option: {
                    defined: string;
                };
                defined?: never;
            };
        } | {
            name: string;
            type: string;
        } | {
            name: string;
            type: {
                defined: string;
                option?: never;
            };
        })[];
    })[];
    accounts: ({
        name: string;
        type: {
            kind: string;
            fields: ({
                name: string;
                type: {
                    defined: string;
                    array?: never;
                    option?: never;
                    vec?: never;
                };
            } | {
                name: string;
                type: {
                    array: (string | number)[];
                    defined?: never;
                    option?: never;
                    vec?: never;
                };
            } | {
                name: string;
                type: string;
            } | {
                name: string;
                type: {
                    option: {
                        defined: string;
                    };
                    defined?: never;
                    array?: never;
                    vec?: never;
                };
            } | {
                name: string;
                type: {
                    vec: {
                        defined: string;
                    };
                    defined?: never;
                    array?: never;
                    option?: never;
                };
            })[];
        };
    } | {
        name: string;
        type: {
            kind: string;
            fields: ({
                name: string;
                type: {
                    defined: string;
                    array?: never;
                    vec?: never;
                };
            } | {
                name: string;
                type: string;
            } | {
                name: string;
                type: {
                    array: (string | number)[];
                    defined?: never;
                    vec?: never;
                };
            } | {
                name: string;
                type: {
                    vec: {
                        defined: string;
                    };
                    defined?: never;
                    array?: never;
                };
            } | {
                name: string;
                type: {
                    vec: string;
                    defined?: never;
                    array?: never;
                };
            })[];
        };
    })[];
    types: ({
        name: string;
        type: {
            kind: string;
            variants: {
                name: string;
                fields: ({
                    name: string;
                    type: string;
                } | {
                    name: string;
                    type: {
                        vec: {
                            defined: string;
                        };
                    };
                })[];
            }[];
            fields?: never;
        };
    } | {
        name: string;
        type: {
            kind: string;
            variants: {
                name: string;
                fields: ({
                    name: string;
                    type: string;
                } | {
                    name: string;
                    type: {
                        vec: string;
                    };
                })[];
            }[];
            fields?: never;
        };
    } | {
        name: string;
        type: {
            kind: string;
            fields: ({
                name: string;
                type: string;
            } | {
                name: string;
                type: {
                    vec: string;
                };
            })[];
            variants?: never;
        };
    } | {
        name: string;
        type: {
            kind: string;
            variants: {
                name: string;
                fields: ({
                    name: string;
                    type: {
                        vec: {
                            defined: string;
                        };
                        defined?: never;
                    };
                } | {
                    name: string;
                    type: {
                        defined: string;
                        vec?: never;
                    };
                })[];
            }[];
            fields?: never;
        };
    } | {
        name: string;
        type: {
            kind: string;
            variants: ({
                name: string;
                fields?: never;
            } | {
                name: string;
                fields: {
                    name: string;
                    type: string;
                }[];
            })[];
            fields?: never;
        };
    } | {
        name: string;
        type: {
            kind: string;
            fields: ({
                name: string;
                type: string;
            } | {
                name: string;
                type: {
                    option: string;
                };
            } | {
                name: string;
                type: {
                    option: {
                        defined: string;
                        vec?: never;
                    };
                };
            } | {
                name: string;
                type: {
                    option: {
                        vec: {
                            defined: string;
                        };
                        defined?: never;
                    };
                };
            })[];
            variants?: never;
        };
    } | {
        name: string;
        type: {
            kind: string;
            fields: ({
                name: string;
                type: string;
            } | {
                name: string;
                type: {
                    option: string;
                    vec?: never;
                    array?: never;
                };
            } | {
                name: string;
                type: {
                    vec: {
                        defined: string;
                    };
                    option?: never;
                    array?: never;
                };
            } | {
                name: string;
                type: {
                    array: (string | number)[];
                    option?: never;
                    vec?: never;
                };
            })[];
            variants?: never;
        };
    } | {
        name: string;
        type: {
            kind: string;
            fields: ({
                name: string;
                docs: string[];
                type: string;
            } | {
                name: string;
                type: string;
                docs?: never;
            } | {
                name: string;
                docs: string[];
                type: {
                    option: string;
                    defined?: never;
                    vec?: never;
                };
            } | {
                name: string;
                docs: string[];
                type: {
                    option: {
                        defined: string;
                    };
                    defined?: never;
                    vec?: never;
                };
            } | {
                name: string;
                type: {
                    defined: string;
                    option?: never;
                    vec?: never;
                };
                docs?: never;
            } | {
                name: string;
                type: {
                    vec: {
                        defined: string;
                    };
                    option?: never;
                    defined?: never;
                };
                docs?: never;
            })[];
            variants?: never;
        };
    })[];
    metadata: {
        address: string;
    };
};
//# sourceMappingURL=idl.d.ts.map
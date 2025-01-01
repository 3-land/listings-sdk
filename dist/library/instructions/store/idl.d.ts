export declare const idl: {
    version: string;
    name: string;
    instructions: ({
        name: string;
        accounts: ({
            name: string;
            isMut: boolean;
            isSigner: boolean;
            isOptional?: undefined;
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
                    defined?: undefined;
                };
            };
        } | {
            name: string;
            type: {
                option: {
                    defined: string;
                    vec?: undefined;
                };
            };
        })[];
    } | {
        name: string;
        accounts: ({
            name: string;
            isMut: boolean;
            isSigner: boolean;
            isOptional?: undefined;
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
                    array?: undefined;
                };
            };
        } | {
            name: string;
            type: {
                option: {
                    array: (string | number)[];
                    defined?: undefined;
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
                array?: undefined;
                option?: undefined;
            };
        } | {
            name: string;
            type: {
                array: (string | number)[];
                vec?: undefined;
                option?: undefined;
            };
        } | {
            name: string;
            type: {
                option: {
                    defined: string;
                };
                vec?: undefined;
                array?: undefined;
            };
        })[];
    } | {
        name: string;
        accounts: ({
            name: string;
            isMut: boolean;
            isSigner: boolean;
            isOptional?: undefined;
            docs?: undefined;
        } | {
            name: string;
            isMut: boolean;
            isSigner: boolean;
            isOptional: boolean;
            docs?: undefined;
        } | {
            name: string;
            isMut: boolean;
            isSigner: boolean;
            docs: string[];
            isOptional?: undefined;
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
                defined?: undefined;
            };
        } | {
            name: string;
            type: {
                defined: string;
                array?: undefined;
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
            isOptional?: undefined;
        } | {
            name: string;
            isMut: boolean;
            isSigner: boolean;
            docs?: undefined;
            isOptional?: undefined;
        } | {
            name: string;
            isMut: boolean;
            isSigner: boolean;
            isOptional: boolean;
            docs?: undefined;
        })[];
        args: ({
            name: string;
            type: {
                option: {
                    defined: string;
                };
                defined?: undefined;
            };
        } | {
            name: string;
            type: string;
        } | {
            name: string;
            type: {
                defined: string;
                option?: undefined;
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
                    array?: undefined;
                    option?: undefined;
                    vec?: undefined;
                };
            } | {
                name: string;
                type: {
                    array: (string | number)[];
                    defined?: undefined;
                    option?: undefined;
                    vec?: undefined;
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
                    defined?: undefined;
                    array?: undefined;
                    vec?: undefined;
                };
            } | {
                name: string;
                type: {
                    vec: {
                        defined: string;
                    };
                    defined?: undefined;
                    array?: undefined;
                    option?: undefined;
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
                    array?: undefined;
                    vec?: undefined;
                };
            } | {
                name: string;
                type: string;
            } | {
                name: string;
                type: {
                    array: (string | number)[];
                    defined?: undefined;
                    vec?: undefined;
                };
            } | {
                name: string;
                type: {
                    vec: {
                        defined: string;
                    };
                    defined?: undefined;
                    array?: undefined;
                };
            } | {
                name: string;
                type: {
                    vec: string;
                    defined?: undefined;
                    array?: undefined;
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
            fields?: undefined;
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
            fields?: undefined;
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
            variants?: undefined;
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
                        defined?: undefined;
                    };
                } | {
                    name: string;
                    type: {
                        defined: string;
                        vec?: undefined;
                    };
                })[];
            }[];
            fields?: undefined;
        };
    } | {
        name: string;
        type: {
            kind: string;
            variants: ({
                name: string;
                fields?: undefined;
            } | {
                name: string;
                fields: {
                    name: string;
                    type: string;
                }[];
            })[];
            fields?: undefined;
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
                        vec?: undefined;
                    };
                };
            } | {
                name: string;
                type: {
                    option: {
                        vec: {
                            defined: string;
                        };
                        defined?: undefined;
                    };
                };
            })[];
            variants?: undefined;
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
                    vec?: undefined;
                    array?: undefined;
                };
            } | {
                name: string;
                type: {
                    vec: {
                        defined: string;
                    };
                    option?: undefined;
                    array?: undefined;
                };
            } | {
                name: string;
                type: {
                    array: (string | number)[];
                    option?: undefined;
                    vec?: undefined;
                };
            })[];
            variants?: undefined;
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
                docs?: undefined;
            } | {
                name: string;
                docs: string[];
                type: {
                    option: string;
                    defined?: undefined;
                    vec?: undefined;
                };
            } | {
                name: string;
                docs: string[];
                type: {
                    option: {
                        defined: string;
                    };
                    defined?: undefined;
                    vec?: undefined;
                };
            } | {
                name: string;
                type: {
                    defined: string;
                    option?: undefined;
                    vec?: undefined;
                };
                docs?: undefined;
            } | {
                name: string;
                type: {
                    vec: {
                        defined: string;
                    };
                    option?: undefined;
                    defined?: undefined;
                };
                docs?: undefined;
            })[];
            variants?: undefined;
        };
    })[];
    metadata: {
        address: string;
    };
};

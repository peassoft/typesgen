'use strict';

module.exports = {
  TestEntity1: {
    type: 'object',
    properties: {
      prop1: {
        type: 'number',
        format: 'double',
        description: 'jsdoc for prop1',
        required: true,
        nullable: false,
      },
      prop2: {
        type: 'string',
        description: 'jsdoc for prop2',
        required: false,
        nullable: false,
      },
      prop3: {
        type: 'boolean',
        required: true,
        nullable: false,
      },
      prop4: {
        type: 'string',
        required: true,
        nullable: true,
      },
      prop5: {
        type: 'boolean',
        required: true,
        nullable: true,
      },
      prop6: {
        type: 'array',
        required: true,
        nullable: false,
        items: {
          type: 'number',
          format: 'double',
        },
      },
      prop7: {
        type: 'array',
        required: false,
        nullable: false,
        items: {
          type: 'string',
        },
      },
      prop8: {
        type: 'array',
        required: true,
        nullable: true,
        items: {
          type: 'boolean',
        },
      },
      prop9: {
        type: 'array',
        required: true,
        nullable: true,
        items: {
          type: 'boolean',
        },
      },
      prop10: {
        type: 'object',
        required: true,
        nullable: false,
        properties: {
          prop1: {
            type: 'object',
            description: 'jsdoc for prop1',
            required: true,
            nullable: false,
            properties: {
              p1: {
                type: 'number',
                format: 'double',
                required: true,
                nullable: false,
              },
              p2: {
                type: 'array',
                required: false,
                nullable: true,
                items: {
                  type: 'boolean',
                },
              },
              p3: {
                type: 'array',
                required: true,
                nullable: false,
                items: {
                  type: 'object',
                  properties: {
                    p4: {
                      type: 'string',
                      required: true,
                      nullable: false,
                    },
                  },
                },
              },
              p5: {
                type: 'string',
                required: true,
                nullable: false,
                enum: [
                  'foo',
                  'bar',
                ],
              },
            },
          },
        },
      },
      prop11: {
        type: 'object',
        required: true,
        nullable: false,
        additionalProperties: {
          type: 'string',
        },
      },
      prop12: {
        type: 'object',
        required: true,
        nullable: false,
        additionalProperties: {
          type: 'number',
          format: 'double',
        },
      },
      prop13: {
        type: 'object',
        required: true,
        nullable: false,
        additionalProperties: {
          type: 'boolean',
        },
      },
      prop14: {
        type: 'object',
        required: true,
        nullable: false,
        additionalProperties: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
      },
      prop15: {
        type: 'object',
        required: true,
        nullable: false,
        additionalProperties: {
          type: 'array',
          items: {
            type: 'number',
            format: 'double',
          },
        },
      },
      prop16: {
        type: 'object',
        required: true,
        nullable: false,
        additionalProperties: {
          type: 'array',
          items: {
            type: 'boolean',
          },
        },
      },
      prop17: {
        type: 'object',
        required: true,
        nullable: false,
        additionalProperties: {
          type: 'object',
          properties: {
            prop1: {
              type: 'object',
              description: 'jsdoc for prop1',
              required: true,
              nullable: false,
              properties: {
                p1: {
                  type: 'number',
                  format: 'double',
                  required: true,
                  nullable: false,
                },
                p2: {
                  type: 'array',
                  required: false,
                  nullable: true,
                  items: {
                    type: 'boolean',
                  },
                },
                p3: {
                  type: 'array',
                  required: true,
                  nullable: false,
                  items: {
                    type: 'object',
                    properties: {
                      p4: {
                        type: 'string',
                        required: true,
                        nullable: false,
                      },
                    },
                  },
                },
                p5: {
                  type: 'string',
                  required: true,
                  nullable: false,
                  enum: [
                    'foo',
                    'bar',
                  ],
                },
              },
            },
          },
        },
      },
      prop18: {
        type: 'object',
        required: true,
        nullable: false,
        additionalProperties: {
          type: 'array',
          items: {
            type: 'object',
              properties: {
                prop1: {
                  type: 'object',
                  description: 'jsdoc for prop1',
                  required: true,
                  nullable: false,
                  properties: {
                    p1: {
                      type: 'number',
                      format: 'double',
                      required: true,
                      nullable: false,
                    },
                    p2: {
                      type: 'array',
                      required: false,
                      nullable: true,
                      items: {
                        type: 'boolean',
                      },
                    },
                    p3: {
                      type: 'array',
                      required: true,
                      nullable: false,
                      items: {
                        type: 'object',
                        properties: {
                          p4: {
                            type: 'string',
                            required: true,
                            nullable: false,
                          },
                        },
                      },
                    },
                    p5: {
                      type: 'string',
                      required: true,
                      nullable: false,
                      enum: [
                        'foo',
                        'bar',
                      ],
                    },
                  },
                },
              },
          },
        },
      },
      prop19: {
        type: 'object',
        required: true,
        nullable: false,
        additionalProperties: {
          type: 'object',
          properties: {
            p1: {
              type: 'string',
              required: true,
              nullable: false,
            },
          },
        },
      },
      prop20: {
        type: 'object',
        required: true,
        nullable: false,
        additionalProperties: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              p1: {
                type: 'string',
                required: true,
                nullable: false,
              },
            },
          },
        },
      },
      prop21: {
        type: 'object',
        required: true,
        nullable: false,
        additionalProperties: {
          type: 'object',
          additionalProperties: {
            type: 'number',
            format: 'double',
          },
        },
      },
      prop22: {
        type: 'object',
        required: true,
        nullable: false,
        additionalProperties: {
          type: 'array',
          items: {
            type: 'object',
            additionalProperties: {
              type: 'number',
              format: 'double',
            },
          },
        },
      },
      prop23: {
        type: 'number',
        format: 'int32',
        required: true,
        nullable: false,
      },
      prop24: {
        type: 'array',
        required: true,
        nullable: false,
        items: {
          type: 'number',
          format: 'int32',
        },
      },
      prop25: {
        type: 'object',
        required: true,
        nullable: false,
        additionalProperties: {
          type: 'number',
          format: 'int32',
        },
      },
      prop26: {
        type: 'object',
        required: true,
        nullable: false,
        additionalProperties: {
          type: 'array',
          items: {
            type: 'number',
            format: 'int32',
          },
        },
      },
      prop27: {
        type: 'string',
        format: 'date-time',
        required: true,
        nullable: false,
      },
      prop28: {
        type: 'array',
        required: true,
        nullable: false,
        items: {
          type: 'string',
          format: 'date-time',
        },
      },
      prop29: {
        type: 'object',
        required: true,
        nullable: false,
        additionalProperties: {
          type: 'string',
          format: 'date-time',
        },
      },
      prop30: {
        type: 'object',
        required: true,
        nullable: false,
        additionalProperties: {
          type: 'array',
          items: {
            type: 'string',
            format: 'date-time',
          },
        },
      },
      prop31: {
        type: 'string',
        required: true,
        nullable: false,
      },
      prop32: {
        type: 'array',
        required: true,
        nullable: false,
        items: {
          type: 'string',
        },
      },
      prop33: {
        type: 'object',
        required: true,
        nullable: false,
        additionalProperties: {
          type: 'string',
        },
      },
      prop34: {
        type: 'object',
        required: true,
        nullable: false,
        additionalProperties: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
      },
      prop35: {
        type: 'object',
        required: true,
        nullable: false,
        additionalProperties: {
          type: 'string',
        },
      },
      prop36: {
        type: 'object',
        required: true,
        nullable: false,
        additionalProperties: {
          type: 'string',
        },
      },
      prop37: {
        type: 'object',
        required: true,
        nullable: true,
        additionalProperties: {
          type: 'string',
        },
      },
      prop38: {
        type: 'array',
        required: true,
        nullable: false,
        items: {
          type: 'object',
          additionalProperties: {
            type: 'string',
          },
        },
      },
      prop39: {
        type: 'string',
        required: true,
        nullable: true,
        enum: [
          'foo',
          'bar',
        ],
      },
      prop40: {
        type: 'array',
        required: true,
        nullable: false,
        items: {
          type: 'string',
          enum: [
            'foo',
            'bar',
          ],
        },
      },
    },
  },
};

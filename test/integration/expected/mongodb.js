export default {
  TestEntity1: {
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: [
          'prop1',
          'prop3',
          'prop4',
          'prop5',
          'prop6',
          'prop8',
          'prop9',
          'prop10',
          'prop11',
          'prop12',
          'prop13',
          'prop14',
          'prop15',
          'prop16',
          'prop17',
          'prop18',
          'prop19',
          'prop20',
          'prop21',
          'prop22',
          'prop23',
          'prop24',
          'prop25',
          'prop26',
          'prop27',
          'prop28',
          'prop29',
          'prop30',
          'prop31',
          'prop32',
          'prop33',
          'prop34',
          'prop35',
          'prop36',
          'prop37',
          'prop38',
          'prop39',
          'prop40',
          'prop41',
        ],
        properties: {
          prop1: {
            bsonType: 'double',
          },
          prop2: {
            bsonType: 'string',
          },
          prop3: {
            bsonType: 'bool',
          },
          prop4: {
            bsonType: ['null', 'string'],
          },
          prop5: {
            bsonType: ['null', 'bool'],
          },
          prop6: {
            bsonType: 'array',
            items: {
              bsonType: 'double',
            },
          },
          prop7: {
            bsonType: 'array',
            items: {
              bsonType: 'string',
            },
          },
          prop8: {
            bsonType: ['null', 'array'],
            items: {
              bsonType: 'bool',
            },
          },
          prop9: {
            bsonType: ['null', 'array'],
            items: {
              bsonType: 'bool',
            },
          },
          prop10: {
            bsonType: 'object',
            required: [
              'prop1',
            ],
            properties: {
              prop1: {
                bsonType: 'object',
                required: [
                  'p1',
                  'p3',
                  'p5',
                ],
                properties: {
                  p1: {
                    bsonType: 'double',
                  },
                  p2: {
                    bsonType: ['null', 'array'],
                    items: {
                      bsonType: 'bool',
                    },
                  },
                  p3: {
                    bsonType: 'array',
                    items: {
                      bsonType: 'object',
                      required: [
                        'p4',
                      ],
                      properties: {
                        p4: {
                          bsonType: 'string',
                        },
                      },
                    },
                  },
                  p5: {
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
            bsonType: 'object',
          },
          prop12: {
            bsonType: 'object',
          },
          prop13: {
            bsonType: 'object',
          },
          prop14: {
            bsonType: 'object',
          },
          prop15: {
            bsonType: 'object',
          },
          prop16: {
            bsonType: 'object',
          },
          prop17: {
            bsonType: 'object',
          },
          prop18: {
            bsonType: 'object',
          },
          prop19: {
            bsonType: 'object',
          },
          prop20: {
            bsonType: 'object',
          },
          prop21: {
            bsonType: 'object',
          },
          prop22: {
            bsonType: 'object',
          },
          prop23: {
            bsonType: 'int',
          },
          prop24: {
            bsonType: 'array',
            items: {
              bsonType: 'int',
            },
          },
          prop25: {
            bsonType: 'object',
          },
          prop26: {
            bsonType: 'object',
          },
          prop27: {
            bsonType: 'date',
          },
          prop28: {
            bsonType: 'array',
            items: {
              bsonType: 'date',
            },
          },
          prop29: {
            bsonType: 'object',
          },
          prop30: {
            bsonType: 'object',
          },
          prop31: {
            bsonType: 'string',
          },
          prop32: {
            bsonType: 'array',
            items: {
              bsonType: 'string',
            },
          },
          prop33: {
            bsonType: 'object',
          },
          prop34: {
            bsonType: 'object',
          },
          prop35: {
            bsonType: 'object',
          },
          prop36: {
            bsonType: 'object',
          },
          prop37: {
            bsonType: ['null', 'object'],
          },
          prop38: {
            bsonType: 'array',
            items: {
              bsonType: 'object',
            },
          },
          prop39: {
            enum: [
              null,
              'foo',
              'bar',
            ],
          },
          prop40: {
            bsonType: 'array',
            items: {
              enum: [
                'foo',
                'bar',
              ],
            },
          },
          prop41: {
            bsonType: 'array',
            items: {
              bsonType: 'object',
              required: [
                'foo',
              ],
              properties: {
                foo: {
                  bsonType: 'string',
                },
                bar: {
                  bsonType: 'double',
                },
              },
            },
          },
        },
      },
    },
  },
};

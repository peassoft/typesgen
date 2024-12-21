import jdv from '@peassoft/jdv';

export default {
  TestEntity1: jdv.object('TestEntity1 must be an object').keys({
    prop1: jdv
      .number('TestEntity1.prop1 must be a number')
      .required('TestEntity1.prop1 is required'),
    prop2: jdv
      .string('TestEntity1.prop2 must be a string'),
    prop3: jdv
      .boolean('TestEntity1.prop3 must be a boolean')
      .required('TestEntity1.prop3 is required'),
    prop4: jdv
      .string('TestEntity1.prop4 must be a string')
      .required('TestEntity1.prop4 is required')
      .nullable(),
    prop5: jdv
      .boolean('TestEntity1.prop5 must be a boolean')
      .required('TestEntity1.prop5 is required')
      .nullable(),
    prop6: jdv
      .array({
        schema: jdv
          .number('TestEntity1.prop6[i] must be a number'),
        msg: 'TestEntity1.prop6 must be an array',
      })
      .required('TestEntity1.prop6 is required'),
    prop7: jdv
      .array({
        schema: jdv
          .string('TestEntity1.prop7[i] must be a string'),
        msg: 'TestEntity1.prop7 must be an array',
      }),
    prop8: jdv
      .array({
        schema: jdv
          .boolean('TestEntity1.prop8[i] must be a boolean'),
        msg: 'TestEntity1.prop8 must be an array',
      })
      .required('TestEntity1.prop8 is required')
      .nullable(),
    prop9: jdv
      .array({
        schema: jdv
          .boolean('TestEntity1.prop9[i] must be a boolean'),
        msg: 'TestEntity1.prop9 must be an array',
      })
      .required('TestEntity1.prop9 is required')
      .nullable(),
    prop10: jdv
      .object('TestEntity1.prop10 must be an object').keys({
        prop1: jdv
          .object('TestEntity1.prop10.prop1 must be an object').keys({
            p1: jdv
              .number('TestEntity1.prop10.prop1.p1 must be a number')
              .required('TestEntity1.prop10.prop1.p1 is required'),
            p2: jdv
              .array({
                schema: jdv
                  .boolean('TestEntity1.prop10.prop1.p2[i] must be a boolean'),
                msg: 'TestEntity1.prop10.prop1.p2 must be an array',
              })
              .nullable(),
            p3: jdv
              .array({
                schema: jdv
                  .object('TestEntity1.prop10.prop1.p3[i] must be an object').keys({
                    p4: jdv
                      .string('TestEntity1.prop10.prop1.p3[i].p4 must be a string')
                      .required('TestEntity1.prop10.prop1.p3[i].p4 is required'),
                  }),
                msg: 'TestEntity1.prop10.prop1.p3 must be an array',
              })
              .required('TestEntity1.prop10.prop1.p3 is required'),
            p5: jdv
              .string('TestEntity1.prop10.prop1.p5 must be a string')
              .required('TestEntity1.prop10.prop1.p5 is required'),
          })
          .required('TestEntity1.prop10.prop1 is required'),
      })
      .required('TestEntity1.prop10 is required'),
    prop11: jdv
      .record({
        schemaForKey: jdv
          .string('TestEntity1.prop11[key] must be a string'),
        schemaForValue: jdv
          .string('TestEntity1.prop11[value] must be a string'),
        msg: 'TestEntity1.prop11 must be a record',
      })
      .required('TestEntity1.prop11 is required'),
    prop12: jdv
      .record({
        schemaForKey: jdv
          .string('TestEntity1.prop12[key] must be a string'),
        schemaForValue: jdv
          .number('TestEntity1.prop12[value] must be a number'),
        msg: 'TestEntity1.prop12 must be a record',
      })
      .required('TestEntity1.prop12 is required'),
    prop13: jdv
      .record({
        schemaForKey: jdv
          .string('TestEntity1.prop13[key] must be a string'),
        schemaForValue: jdv
          .boolean('TestEntity1.prop13[value] must be a boolean'),
        msg: 'TestEntity1.prop13 must be a record',
      })
      .required('TestEntity1.prop13 is required'),
    prop14: jdv
      .record({
        schemaForKey: jdv
          .string('TestEntity1.prop14[key] must be a string'),
        schemaForValue: jdv
          .array({
            schema: jdv
              .string('TestEntity1.prop14[value][i] must be a string'),
            msg: 'TestEntity1.prop14[value] must be an array',
          }),
        msg: 'TestEntity1.prop14 must be a record',
      })
      .required('TestEntity1.prop14 is required'),
    prop15: jdv
      .record({
        schemaForKey: jdv
          .string('TestEntity1.prop15[key] must be a string'),
        schemaForValue: jdv
          .array({
            schema: jdv
              .number('TestEntity1.prop15[value][i] must be a number'),
            msg: 'TestEntity1.prop15[value] must be an array',
          }),
        msg: 'TestEntity1.prop15 must be a record',
      })
      .required('TestEntity1.prop15 is required'),
    prop16: jdv
      .record({
        schemaForKey: jdv
          .string('TestEntity1.prop16[key] must be a string'),
        schemaForValue: jdv
          .array({
            schema: jdv
              .boolean('TestEntity1.prop16[value][i] must be a boolean'),
            msg: 'TestEntity1.prop16[value] must be an array',
          }),
        msg: 'TestEntity1.prop16 must be a record',
      })
      .required('TestEntity1.prop16 is required'),
    prop17: jdv
      .record({
        schemaForKey: jdv
          .string('TestEntity1.prop17[key] must be a string'),
        schemaForValue: jdv
          .object('TestEntity1.prop17[value] must be an object').keys({
            prop1: jdv
              .object('TestEntity1.prop17[value].prop1 must be an object').keys({
                p1: jdv
                  .number('TestEntity1.prop17[value].prop1.p1 must be a number')
                  .required('TestEntity1.prop17[value].prop1.p1 is required'),
                p2: jdv
                  .array({
                    schema: jdv
                      .boolean('TestEntity1.prop17[value].prop1.p2[i] must be a boolean'),
                    msg: 'TestEntity1.prop17[value].prop1.p2 must be an array',
                  })
                  .nullable(),
                p3: jdv
                  .array({
                    schema: jdv
                      .object('TestEntity1.prop17[value].prop1.p3[i] must be an object').keys({
                        p4: jdv
                          .string('TestEntity1.prop17[value].prop1.p3[i].p4 must be a string')
                          .required('TestEntity1.prop17[value].prop1.p3[i].p4 is required'),
                      }),
                    msg: 'TestEntity1.prop17[value].prop1.p3 must be an array',
                  })
                  .required('TestEntity1.prop17[value].prop1.p3 is required'),
                p5: jdv
                  .string('TestEntity1.prop17[value].prop1.p5 must be a string')
                  .required('TestEntity1.prop17[value].prop1.p5 is required'),
              })
              .required('TestEntity1.prop17[value].prop1 is required'),
          }),
        msg: 'TestEntity1.prop17 must be a record',
      })
      .required('TestEntity1.prop17 is required'),
    prop18: jdv
      .record({
        schemaForKey: jdv
          .string('TestEntity1.prop18[key] must be a string'),
        schemaForValue: jdv
          .array({
            schema: jdv
              .object('TestEntity1.prop18[value][i] must be an object').keys({
                prop1: jdv
                  .object('TestEntity1.prop18[value][i].prop1 must be an object').keys({
                    p1: jdv
                      .number('TestEntity1.prop18[value][i].prop1.p1 must be a number')
                      .required('TestEntity1.prop18[value][i].prop1.p1 is required'),
                    p2: jdv
                      .array({
                        schema: jdv
                          .boolean('TestEntity1.prop18[value][i].prop1.p2[i] must be a boolean'),
                        msg: 'TestEntity1.prop18[value][i].prop1.p2 must be an array',
                      })
                      .nullable(),
                    p3: jdv
                      .array({
                        schema: jdv
                          .object('TestEntity1.prop18[value][i].prop1.p3[i] must be an object').keys({
                            p4: jdv
                              .string('TestEntity1.prop18[value][i].prop1.p3[i].p4 must be a string')
                              .required('TestEntity1.prop18[value][i].prop1.p3[i].p4 is required'),
                          }),
                        msg: 'TestEntity1.prop18[value][i].prop1.p3 must be an array',
                      })
                      .required('TestEntity1.prop18[value][i].prop1.p3 is required'),
                    p5: jdv
                      .string('TestEntity1.prop18[value][i].prop1.p5 must be a string')
                      .required('TestEntity1.prop18[value][i].prop1.p5 is required'),
                  })
                  .required('TestEntity1.prop18[value][i].prop1 is required'),
              }),
            msg: 'TestEntity1.prop18[value] must be an array',
          }),
        msg: 'TestEntity1.prop18 must be a record',
      })
      .required('TestEntity1.prop18 is required'),
    prop19: jdv
      .record({
        schemaForKey: jdv
          .string('TestEntity1.prop19[key] must be a string'),
        schemaForValue: jdv
          .object('TestEntity1.prop19[value] must be an object').keys({
            p1: jdv
              .string('TestEntity1.prop19[value].p1 must be a string')
              .required('TestEntity1.prop19[value].p1 is required'),
          }),
        msg: 'TestEntity1.prop19 must be a record',
      })
      .required('TestEntity1.prop19 is required'),
    prop20: jdv
      .record({
        schemaForKey: jdv
          .string('TestEntity1.prop20[key] must be a string'),
        schemaForValue: jdv
          .array({
            schema: jdv
              .object('TestEntity1.prop20[value][i] must be an object').keys({
                p1: jdv
                  .string('TestEntity1.prop20[value][i].p1 must be a string')
                  .required('TestEntity1.prop20[value][i].p1 is required'),
              }),
            msg: 'TestEntity1.prop20[value] must be an array',
          }),
        msg: 'TestEntity1.prop20 must be a record',
      })
      .required('TestEntity1.prop20 is required'),
    prop21: jdv
      .record({
        schemaForKey: jdv
          .string('TestEntity1.prop21[key] must be a string'),
        schemaForValue: jdv
          .record({
            schemaForKey: jdv
              .string('TestEntity1.prop21[value][key] must be a string'),
            schemaForValue: jdv
              .number('TestEntity1.prop21[value][value] must be a number'),
            msg: 'TestEntity1.prop21[value] must be a record',
          }),
        msg: 'TestEntity1.prop21 must be a record',
      })
      .required('TestEntity1.prop21 is required'),
    prop22: jdv
      .record({
        schemaForKey: jdv
          .string('TestEntity1.prop22[key] must be a string'),
        schemaForValue: jdv
          .array({
            schema: jdv
              .record({
                schemaForKey: jdv
                  .string('TestEntity1.prop22[value][i][key] must be a string'),
                schemaForValue: jdv
                  .number('TestEntity1.prop22[value][i][value] must be a number'),
                msg: 'TestEntity1.prop22[value][i] must be a record',
              }),
            msg: 'TestEntity1.prop22[value] must be an array',
          }),
        msg: 'TestEntity1.prop22 must be a record',
      })
      .required('TestEntity1.prop22 is required'),
    prop23: jdv
      .integer('TestEntity1.prop23 must be an integer')
      .required('TestEntity1.prop23 is required'),
    prop24: jdv
      .array({
        schema: jdv
          .integer('TestEntity1.prop24[i] must be an integer'),
        msg: 'TestEntity1.prop24 must be an array',
      })
      .required('TestEntity1.prop24 is required'),
    prop25: jdv
      .record({
        schemaForKey: jdv
          .string('TestEntity1.prop25[key] must be a string'),
        schemaForValue: jdv
          .integer('TestEntity1.prop25[value] must be an integer'),
        msg: 'TestEntity1.prop25 must be a record',
      })
      .required('TestEntity1.prop25 is required'),
    prop26: jdv
      .record({
        schemaForKey: jdv
          .string('TestEntity1.prop26[key] must be a string'),
        schemaForValue: jdv
          .array({
            schema: jdv
              .integer('TestEntity1.prop26[value][i] must be an integer'),
            msg: 'TestEntity1.prop26[value] must be an array',
          }),
        msg: 'TestEntity1.prop26 must be a record',
      })
      .required('TestEntity1.prop26 is required'),
    prop27: jdv
      .ISODateString('TestEntity1.prop27 must be a string in ISO date format')
      .required('TestEntity1.prop27 is required'),
    prop28: jdv
      .array({
        schema: jdv
          .ISODateString('TestEntity1.prop28[i] must be a string in ISO date format'),
        msg: 'TestEntity1.prop28 must be an array',
      })
      .required('TestEntity1.prop28 is required'),
    prop29: jdv
      .record({
        schemaForKey: jdv
          .string('TestEntity1.prop29[key] must be a string'),
        schemaForValue: jdv
          .ISODateString('TestEntity1.prop29[value] must be a string in ISO date format'),
        msg: 'TestEntity1.prop29 must be a record',
      })
      .required('TestEntity1.prop29 is required'),
    prop30: jdv
      .record({
        schemaForKey: jdv
          .string('TestEntity1.prop30[key] must be a string'),
        schemaForValue: jdv
          .array({
            schema: jdv
              .ISODateString('TestEntity1.prop30[value][i] must be a string in ISO date format'),
            msg: 'TestEntity1.prop30[value] must be an array',
          }),
        msg: 'TestEntity1.prop30 must be a record',
      })
      .required('TestEntity1.prop30 is required'),
    prop31: jdv
      .uuid('TestEntity1.prop31 must be a string representation of UUID')
      .required('TestEntity1.prop31 is required'),
    prop32: jdv
      .array({
        schema: jdv
          .uuid('TestEntity1.prop32[i] must be a string representation of UUID'),
        msg: 'TestEntity1.prop32 must be an array',
      })
      .required('TestEntity1.prop32 is required'),
    prop33: jdv
      .record({
        schemaForKey: jdv
          .string('TestEntity1.prop33[key] must be a string'),
        schemaForValue: jdv
          .uuid('TestEntity1.prop33[value] must be a string representation of UUID'),
        msg: 'TestEntity1.prop33 must be a record',
      })
      .required('TestEntity1.prop33 is required'),
    prop34: jdv
      .record({
        schemaForKey: jdv
          .string('TestEntity1.prop34[key] must be a string'),
        schemaForValue: jdv
          .array({
            schema: jdv
              .uuid('TestEntity1.prop34[value][i] must be a string representation of UUID'),
            msg: 'TestEntity1.prop34[value] must be an array',
          }),
        msg: 'TestEntity1.prop34 must be a record',
      })
      .required('TestEntity1.prop34 is required'),
    prop35: jdv
      .record({
        schemaForKey: jdv
          .uuid('TestEntity1.prop35[key] must be a string representation of UUID'),
        schemaForValue: jdv
          .string('TestEntity1.prop35[value] must be a string'),
        msg: 'TestEntity1.prop35 must be a record',
      })
      .required('TestEntity1.prop35 is required'),
    prop36: jdv
      .record({
        schemaForKey: jdv
          .ISODateString('TestEntity1.prop36[key] must be a string in ISO date format'),
        schemaForValue: jdv
          .string('TestEntity1.prop36[value] must be a string'),
        msg: 'TestEntity1.prop36 must be a record',
      })
      .required('TestEntity1.prop36 is required'),
    prop37: jdv
      .record({
        schemaForKey: jdv
          .string('TestEntity1.prop37[key] must be a string'),
        schemaForValue: jdv
          .string('TestEntity1.prop37[value] must be a string'),
        msg: 'TestEntity1.prop37 must be a record',
      })
      .required('TestEntity1.prop37 is required')
      .nullable(),
    prop38: jdv
      .array({
        schema: jdv
          .record({
            schemaForKey: jdv
              .string('TestEntity1.prop38[i][key] must be a string'),
            schemaForValue: jdv
              .string('TestEntity1.prop38[i][value] must be a string'),
            msg: 'TestEntity1.prop38[i] must be a record',
          }),
        msg: 'TestEntity1.prop38 must be an array',
      })
      .required('TestEntity1.prop38 is required'),
    prop39: jdv
      .string('TestEntity1.prop39 must be a string')
      .required('TestEntity1.prop39 is required')
      .nullable(),
    prop40: jdv
      .array({
        schema: jdv
          .string('TestEntity1.prop40[i] must be a string'),
        msg: 'TestEntity1.prop40 must be an array',
      })
      .required('TestEntity1.prop40 is required'),
    prop41: jdv
      .array({
        schema: jdv
          .object('TestEntity1.prop41[i] must be an object').keys({
            foo: jdv
              .string('TestEntity1.prop41[i].foo must be a string')
              .required('TestEntity1.prop41[i].foo is required'),
            bar: jdv
              .number('TestEntity1.prop41[i].bar must be a number'),
          }),
        msg: 'TestEntity1.prop41 must be an array',
      })
      .required('TestEntity1.prop41 is required'),
  }),
};

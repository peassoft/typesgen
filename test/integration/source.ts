type Integer = number;
type ISODateString = string;
type UUID = string;

export type TestEntity1 = {
  /** jsdoc for prop1 */
  prop1: number;
  /**
   * jsdoc
   *
   * for
   * prop2
   */
  prop2?: string;
  prop3: boolean;
  prop4: string | null;
  prop5: string | boolean | null;
  prop6: number[];
  prop7?: string[];
  prop8: boolean[] | null;
  prop9: string[] | boolean[] | null;
  prop10: TestEntity2;
  prop11: Record<string, string>;
  prop12: Record<string, number>;
  prop13: Record<string, boolean>;
  prop14: Record<string, string[]>;
  prop15: Record<string, number[]>;
  prop16: Record<string, boolean[]>;
  prop17: Record<string, TestEntity2>;
  prop18: Record<string, TestEntity2[]>;
  prop19: Record<string, { p1: string }>;
  prop20: Record<string, { p1: string }[]>;
  prop21: Record<string, Record<string, number>>;
  prop22: Record<string, Record<string, number>[]>;
  prop23: Integer;
  prop24: Integer[];
  prop25: Record<string, Integer>;
  prop26: Record<string, Integer[]>;
  prop27: ISODateString;
  prop28: ISODateString[];
  prop29: Record<string, ISODateString>;
  prop30: Record<string, ISODateString[]>;
  prop31: UUID;
  prop32: UUID[];
  prop33: Record<string, UUID>;
  prop34: Record<string, UUID[]>;
  prop35: Record<UUID, string>;
  prop36: Record<ISODateString, string>;
  prop37: Record<string, string> | null;
  prop38: Record<string, string>[];
  prop39: MyEnum | null;
  prop40: MyEnum[];
  prop41: TestEntity3[];
};

/** jsdoc for TestEntity2 */
type TestEntity2 = {
  /** jsdoc for prop1 */
  prop1: {
    p1: number;
    p2?: boolean[] | null;
    p3: {
      p4: string;
    }[];
    p5: MyEnum;
  };
}

type TestEntity3 = {
  foo: string;
  bar?: number;
};

/** Description for MyEnum */
export enum MyEnum {
  /** Description for Foo */
  Foo = 'foo',
  Bar = 'bar',
}

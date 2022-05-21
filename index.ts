
//#region 区域描述
const greeting = "hello word"
console.log(greeting);
//#endregion 区域描述




{
  /**
   * Partial<T>
   */
  type Partial<T> = {
    [P in keyof T]?: T[P];
  };
  interface A {
    x: number;
    y: number;
  }
  type T = Partial<A>; // {x?number; y?:number}}
}

{
  /**
 * Required<T>
 */
  type Required<T> = {
    [P in keyof T]-?: T[P];
  };

  interface A {
    x?: number;
    y: number;
  }

  type T = Required<A>; // {x:number; y:number}}
}


{
  /**
   * Readonly<T>
   */
  type Readonly<T> = {
    readonly [P in keyof T]: T[P];
  };

  interface A {
    x: number;
    y: number;
  }

  type T = Readonly<A>; // {x:number; y:number}}
  const a: T = { x: 0, y: 0 }
  // a.x = 1  无法分配到 "x" ，因为它是只读属性
  // a.y = 1  无法分配到 "y" ，因为它是只读属性
}

{
  /**
  * Record<K, T>
  */
  type Record<K extends keyof any, T> = {
    [P in K]: T;
  };
  type K = 'x' | 'y';
  type T = number;
  type R = Record<K, T>; // {x:number; y:number}} 
  const a: R = { x: 0, y: 0 }
}


{
  /**
   * Exclude<T, U>
   */
  type Exclude<T, U> = T extends U ? never : T;

  type T0 = Exclude<"a" | "b", 'x'>; // "a" | "b"
  type T1 = Exclude<string | (() => void), Function>; // string
}

{
  /**
   * Extract<T, U>
   */
  type Extract<T, U> = T extends U ? T : never;

  type T0 = Extract<"a" | "b", 'a'>;  // "a"
  type T1 = Extract<string | (() => void), Function>; // () => void
  type T2 = Extract<"a" | "b", 'c'>;  // never
}

{
  /**
   * Omit<T, K>
   */
  type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

  interface A {
    x: number;
    y: number;
  }

  type T0 = Omit<A, 'x'>; // {y:number}
  type T1 = Omit<A, 'x' | 'y'>; // {}
  type T3 = Omit<A, 'z'>; // {}
}

{
  /**
   * Pick<T, K>
   */
  type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
  };

  interface A {
    x: number;
    y: number;
  }
  type T0 = Pick<A, 'x'>; // {x:number}
  type T1 = Pick<A, 'x' | 'y'>; // {x:number; y:number}

  // type T3 = Pick<A, 'z'> 类型“"z"”不满足约束“keyof A”
}


{
  /**
   * NonNullable<T>
   */
  type NonNullable<T> = T extends null | undefined ? never : T;

  type T0 = NonNullable<string | number | null | undefined>; // string | number
}

{
  /**
   * Parameters<T>
   */
  type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;

  type T0 = Parameters<() => void>; // []
  type T1 = Parameters<(a: string) => void>; // [string]
  type T2 = Parameters<(a: string, b: number) => void>; // [string, number]
  type T3 = Parameters<(x: { a: number, b: string }) => void>; // [{ a: number; b: string }]
}


{
  /**
   * ConstructorParameters<T>
   */
  type ConstructorParameters<T extends abstract new (...args: any) => any> = T extends abstract new (...args: infer P) => any ? P : never;

  type T0 = ConstructorParameters<new (s?: string) => object>; //  [s?: string | undefined]
}

{
  /**
   * ReturnType<T>
   */
  type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;

  type T0 = ReturnType<() => string>; // string
  type T1 = ReturnType<() => { a: string, b: number }>; // { a: string; b: number }
}

{
  /**
   * InstanceType<T>
   */
  type InstanceType<T extends abstract new (...args: any) => any> = T extends abstract new (...args: any) => infer R ? R : any;

  class A {
    x = 0;
  }

  type T0 = InstanceType<typeof A>; // A
  type T1 = InstanceType<new (s?: string) => object>; // object
}

{
  /**
   * ThisParameterType<T>
   */
  type ThisParameterType<T> = T extends (this: infer U, ...args: any[]) => any ? U : unknown;

  function fn(this: object, x: number) { }
  function fn1(x: number) { }

  type T0 = ThisParameterType<typeof fn> // object
  type T1 = ThisParameterType<typeof fn1> // unknown
}


{
  /**
   * OmitThisParameter<T>
   */
  type OmitThisParameter<T> = unknown extends ThisParameterType<T> ? T : T extends (...args: infer A) => infer R ? (...args: A) => R : T;

  function fn(this: object, x: number) { }

  type T0 = OmitThisParameter<typeof fn> // (x: number) => void
}

{
  /**
   * OmitThisParameter<T>
   */
  type OmitThisParameter<T> = unknown extends ThisParameterType<T> ? T : T extends (...args: infer A) => infer R ? (...args: A) => R : T;

  function fn(this: object, x: number) { }

  type T0 = OmitThisParameter<typeof fn> // (x: number) => void
}

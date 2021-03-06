/* Step 3.8 task */

// #1 concat strings fn
type ConcatStringsFn = (...args: string[]) => string

const concatTwoStrings: ConcatStringsFn = (...args) => {
  return args.join('')
}

// #2 object interface
interface HometaskData {
  howIDoIt: string
  someArray: Array<string | number>
  withData?: Array<HometaskData>
}

const myHometask: HometaskData = {
  howIDoIt: 'I Do It Wel',
  someArray: ['string one', 'string two', 42],
  withData: [{ howIDoIt: 'I Do It Wel', someArray: ['string one', 23] }],
}

// #3 .reduce() type
interface MyArray<T> {
  [N: number]: T

  reduce<U>(fn: (accumulator: U, currentValue: T, index: number, array: MyArray<T>) => U, initialValue: U): U
}

const myArray: MyArray<number> = [1, 2, 3, 0]
myArray.reduce((acc, value) => acc + value, 10)

// #4 MappedTypes
interface HomeTask {
  data: string
  numericData: number
  date: Date
  externalData: {
    basis: number
    value: string
  }
}

type MyPartial<T> = {
  [N in keyof T]?: T[N] extends MyPartial<T[N]> ? MyPartial<T[N]> : T[N]
}

const homeTask: MyPartial<HomeTask> = {
  externalData: {
    value: 'win',
  },
}

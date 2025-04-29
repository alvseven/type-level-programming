namespace WithSumResult {
	type Even<T = number> = {
		type: "even";
		value: T;
	};

	type Odd<T = number> = {
		type: "odd";
		value: T;
	};

	type Option = (Even | Odd)["type"];

	type IsNegativeNumber<T extends number> = `${T}` extends `-${T}`
		? true
		: false;

	type RangeTuple<
		Range,
		Accumulator extends any[] = [],
	> = Accumulator["length"] extends Range
		? Accumulator
		: RangeTuple<Range, [...Accumulator, Accumulator["length"]]>;

	type Sum<FirstNumber, SecondNumber> = [
		...RangeTuple<FirstNumber>,
		...RangeTuple<SecondNumber>,
	]["length"];

	type GetLastDigit<
		T extends number | string,
		Acc extends number[] = [],
	> = `${T}` extends `${infer First extends number}${infer Rest}`
		? GetLastDigit<Rest, [...Acc, First]>
		: [0, ...Acc][Acc["length"]];

	type OddNumbers = 1 | 3 | 5 | 7 | 9;
	type EvenNumbers = 0 | 2 | 4 | 6 | 8;

	type IsEvenOrOdd<T extends number> = GetLastDigit<T> extends OddNumbers
		? Odd["type"]
		: GetLastDigit<T> extends EvenNumbers
			? Even["type"]
			: never;

	type EvenOrOddGame<
		FirstPlayer extends Even,
		SecondPlayer extends Odd,
	> = IsNegativeNumber<FirstPlayer["value"]> extends true
		? never
		: IsNegativeNumber<SecondPlayer["value"]> extends true
			? never
			: {
					playerOne: FirstPlayer;
					playerTwo: SecondPlayer;
					sum: Sum<FirstPlayer["value"], SecondPlayer["value"]>;
					result: IsEvenOrOdd<
						Sum<FirstPlayer["value"], SecondPlayer["value"]> extends number
							? Sum<FirstPlayer["value"], SecondPlayer["value"]>
							: 0
					>;
					winner: IsEvenOrOdd<
						Sum<FirstPlayer["value"], SecondPlayer["value"]> extends number
							? Sum<FirstPlayer["value"], SecondPlayer["value"]>
							: 0
					> extends "even"
						? "playerOne"
						: "playerTwo";
				};

	/*
 Points for improvement:

  - Line 57 is somewhat unnecessary, TypeScript doesn’t recognize that Sum<> returns a number,
    which is why the conditional check is needed, the fallback value of 0 is arbitrary, ideally, this shouldn’t be necessary since anyArray['length'] always returns a number

  - Line 62 has the same issue as line 57, with the added inefficiency of recomputing the Sum type three times.
    Ideally, the result would be stored in an intermediate type instead of being recomputed

  - Due to TypeScript’s recursion depth limit of 999, the maximum number each value can be is 999.
    Ideally, there would be no such limit—but this reminds me of the halting problem:
    https://en.wikipedia.org/wiki/Halting_problem
*/

	type Result = EvenOrOddGame<
		{ type: "even"; value: 999 },
		{ type: "odd"; value: 999 }
	>;

	/* 
	
	it should be: 
		{
			playerOne: {
				type: "even";
				value: 999;
			};
			playerTwo: {
				type: "odd";
				value: 999;
			};
			sum: 1998;
			result: "even";
			winner: "playerOne";
		}
      
*/
}

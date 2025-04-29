// A optimized version of odds and evens, without the number limit, but without the sum result

namespace Optimized {
	type PlayerInfo = {
		type: "even" | "odd";
		value: number;
	};

	type OddNumbers = "1" | "3" | "5" | "7" | "9";
	type EvenNumbers = "0" | "2" | "4" | "6" | "8";

	type PayloadType<T extends PlayerInfo> = T extends { type: infer OE }
		? OE
		: never;
	type IsDifferent<A, B> = [A] extends [B] ? false : true;
	type ToStr<N extends number> = `${N}`;
	type IsOddEven<N extends number> = ToStr<N> extends `${string}${OddNumbers}`
		? "odd"
		: "even";

	type OddEvenMatch<N1 extends number, N2 extends number> = IsDifferent<
		IsOddEven<N1>,
		IsOddEven<N2>
	> extends true
		? "odd"
		: "even";

	type Winner<Players extends PlayerInfo[], PlayerIndex extends number> = {
		players: Players;
		winner: {
			bet: Players[PlayerIndex]["type"];
			name: PlayerIndex extends 0 ? "Player 1" : "Player 2";
			index: PlayerIndex;
		};
	};

	type OddEven<P1 extends PlayerInfo, P2 extends PlayerInfo> = IsDifferent<
		PayloadType<P1>,
		PayloadType<P2>
	> extends true
		? P1 extends { type: OddEvenMatch<P1["value"], P2["value"]> }
			? Winner<[P1, P2], 0>
			: Winner<[P1, P2], 1>
		: "Error: both can't be of the same type";

	type OddEven1 = OddEven<
		{ type: "odd"; value: 99999999999999999999999999999999999999999999 },
		{ type: "even"; value: 99999999999999999999999999999999999999999999 }
	>;

	/*
      it should be:
        {
        players: [{
            type: "odd";
            value: 1e+44;
        }, {
            type: "even";
            value: 1e+44;
        }];
        winner: {
            bet: "even";
            name: "Player 2";
            index: 1;
          };
        }
    */
}

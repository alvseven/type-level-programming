namespace StringDiff {

    type StringToTuple<T extends string, Acc extends string[] = []> = T extends `${infer First extends string} ${infer Rest extends string}` ? 
    StringToTuple<Rest, [...Acc, First]> : [...Acc, T]

    type StringToNumber<T extends string> = T extends `${infer Value extends number}` ? Value : never

    type GetTupleIndexes<T extends string[]> = StringToNumber<keyof T & string>

    // Compare if has the same length and are the same sentence (nothing has changed)

    type CheckTuplesAreEqual<T extends string[], U extends string[], Acc extends string[] = []> = T['length'] extends U['length'] 
    ? Acc['length'] extends T['length'] ? true : T[Acc['length']] extends U[Acc['length']] ? CheckTuplesAreEqual<T, U, [...Acc, any]> : false : false

    // Check only for additions

    type CheckAdditions<T extends string[], U extends string[]> = `+${U[Exclude<GetTupleIndexes<U>, GetTupleIndexes<T>>]}`

    // Check only for removals

    type CheckRemovals<T extends string[], U extends string[]> = `-${T[Exclude<GetTupleIndexes<T>, GetTupleIndexes<U>>]}`

    type DiffAlgorithm<SentenceOne extends string, SentenceTwo extends string> = 
        CheckTuplesAreEqual<StringToTuple<SentenceOne>, StringToTuple<SentenceTwo>> extends true ? 
        'No differences' :
        CheckAdditions<StringToTuple<SentenceOne>, StringToTuple<SentenceTwo>>

    type Hey = DiffAlgorithm<'alves is gone now', 'alves is gone now'>
    
 }
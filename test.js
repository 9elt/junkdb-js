import JunkDB from '.';

const db = new JunkDB('js-wrapper-test');

await db.set(0);
await db.remove('some-data');

const TESTS = [
    await db.get(),
    await db.set(123),
    await db.get(),
    await db.has('some-data'),
    await db.add('some-data'),
    await db.has('some-data'),
];

let failed = 0;

console.log(TESTS);

TESTS[0] === 0 || failed++ && log(0, TESTS[0]);
TESTS[1] === undefined || failed++ && log('undefined', TESTS[1]);
TESTS[2] === 123 || failed++ && log(123, TESTS[2]);
TESTS[3] === false || failed++ && log(false, TESTS[3]);
TESTS[4] === undefined || failed++ && log('undefined', TESTS[4]);
TESTS[5] === true || failed++ && log(true, TESTS[5]);

if (failed) {
    console.error('Failed:', failed);
    process.exit(1);
}

function log(expected, got) {
    console.log('expected:', expected, 'got:', got);
}

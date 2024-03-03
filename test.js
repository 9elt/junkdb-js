import JunkDB from '.';

const db = new JunkDB('js-wrapper-test', '~/projects/junkdb/client/bin');

const TESTS = [
    await db.is('unique-test'),
    await db.set('unique-test'),
    await db.is('unique-test'),

    await db.has('some-data'),
    await db.add('some-data'),
    await db.has('some-data'),
];

let failed = 0;

console.log(TESTS);

TESTS[0] === false || failed++ && log(false, TESTS[0]);
TESTS[1] === 'ok' || failed++ && log('ok', TESTS[1]);
TESTS[2] === true || failed++ && log(true, TESTS[2]);
TESTS[3] === false || failed++ && log(false, TESTS[3]);
TESTS[4] === 'ok' || failed++ && log('ok', TESTS[4]);
TESTS[5] === true || failed++ && log(true, TESTS[5]);

if (failed) {
    console.error('Failed:', failed);
    process.exit(1);
}

function log(expected, got) {
    console.log('expected:', expected, 'got:', got);
}

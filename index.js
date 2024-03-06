import { exec } from "node:child_process";

const run = (cmd) => new Promise(
    resolve => exec(cmd, (_, stdout) => resolve(
        stdout && stdout.trim() || "ERR no output"
    ))
);

export default class JunkDB {
    /** @private */
    bin;
    /** @private */
    dbname;
    /**
     * @param {string | number} dbname
     * @param {string | undefined} bin
     */
    constructor(dbname, bin = '~/.junkdb/junkdb-client') {
        this.bin = bin;
        this.dbname = dbname;
    }
    /** @private */
    async run(cmd) {
        const res = await run(`${this.bin} '${this.dbname} ${cmd.replace(/'/g, '.')}'`);

        const ok = res.charAt(0) == 'O';
        const payload = res.slice(ok ? 3 : 4);

        if (!ok)
            throw new Error(payload);

        if (/^\d+$/.test(payload))
            return parseInt(payload);

        if (/^true|false$/.test(payload))
            return payload === 'true';

        return payload;
    }
    /**
     * @returns {Promise<number>}
     */
    async get() {
        return await this.run('GET');
    }
    /**
     * @param {number} id
     * @returns {Promise<void>}
     */
    async set(id) {
        await this.run(`SET ${id}`);
    }
    /**
     * @param {string | number} id
     * @returns {Promise<boolean>}
     */
    async has(id) {
        return await this.run(`HAS ${id}`);
    }
    /**
     * @param {string | number} id
     * @returns {Promise<void>}
     */
    async add(id) {
        await this.run(`ADD ${id}`);
    }
    /**
     * @param {string | number} id
     * @returns {Promise<void>}
     */
    async remove(id) {
        await this.run(`REM ${id}`);
    }
}

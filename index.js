import { exec } from "node:child_process";

const run = (cmd) => new Promise(r => exec(cmd, (_, sout) => r(sout && sout.trim() || "ERR no output")));

export default class JunkDB {
    /**
     * @private
     */
    bin;
    /**
     * @private
     */
    dbname;
    constructor(dbname, executable = '~/.junkdb/junkdb-client') {
        this.bin = executable;
        this.dbname = dbname;
    }
    /**
     * @private
     */
    async run(cmd) {
        const res = await run(`${this.bin} '${this.dbname} ${cmd.replace(/'/g, "\\'")}'`);

        const payload = res.replace(/^OK|ERR/, '').trim();

        if (/^ERR/.test(res))
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
     * @returns {Promise<'ok'>}
     */
    async set(id) {
        return await this.run(`SET ${id}`);
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
     * @returns {Promise<'ok'>}
     */
    async add(id) {
        return await this.run(`ADD ${id}`);
    }
    /**
     * @param {string | number} id
     * @returns {Promise<'ok'>}
     */
    async remove(id) {
        return await this.run(`REM ${id}`);
    }
}

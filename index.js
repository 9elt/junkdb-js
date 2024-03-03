import { exec } from "node:child_process";

const run = (cmd) => new Promise(r => exec(cmd, (_, sout) => r(sout && sout.trim() || "")));

export default class JunkDB {
    /**
     * @private
     */
    executable;
    /**
     * @private
     */
    dbname;
    constructor(dbname, executable = '/bin/junkdb-client') {
        this.executable = executable;
        this.dbname = dbname;
    }
    /**
     * @private
     */
    async run(cmd) {
        const res = await run(`${this.executable} '${this.dbname} ${cmd}'`);

        switch (res) {
            case '0': return false;

            case '1': return true;

            case '2': return 'ok';

            case '-1':
                console.error('Error: Unknown action,', cmd);
                break;

            case '-2':
                console.error('Error: Unreachable database,', cmd);
                break;

            case '-3':
                console.error('Error: Server error,', cmd);
                break;

            default:
                console.error('Error: Unknown error,', cmd);
                break;
        }

        return null;
    }
    /**
     * @param {string | number} id
     * @returns {Promise<boolean | null>}
     */
    async is(id) {
        return await this.run(`IS ${id}`);
    }
    /**
     * @param {string | number} id
     * @returns {Promise<'ok' | null>}
     */
    async set(id) {
        return await this.run(`SET ${id}`);
    }
    /**
     * @param {string | number} id
     * @returns {Promise<boolean | null>}
     */
    async has(id) {
        return await this.run(`HAS ${id}`);
    }
    /**
     * @param {string | number} id
     * @returns {Promise<'ok' | null>}
     */
    async add(id) {
        return await this.run(`ADD ${id}`);
    }
    /**
     * @param {string | number} id
     * @returns {Promise<'ok' | null>}
     */
    async remove(id) {
        return await this.run(`REM ${id}`);
    }
}

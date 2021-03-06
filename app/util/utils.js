const assert = require('assert');
const Address = require('bcoin').Address;
const config = require('../../config');
class Utils {
    /**
     * Converts bits to difficulty
     * Stolen from bcoin
     * @param bits {number}
     * @return {number}
     */
    static bitsToDifficulty(bits) {
        let shift = (bits >>> 24) & 0xff;
        let diff = 0x0000ffff / (bits & 0x00ffffff);

        while (shift < 29) {
            diff *= 256.0;
            shift++;
        }

        while (shift > 29) {
            diff /= 256.0;
            shift--;
        }

        return diff;
    }


    /**
     * Converts address {string} into bcoin {Address}
     *
     * Address string should be a valid address validated by validationUtils
     *
     * @param addrStr {string}
     *
     * @return {Address}
     */
    static addrStrToAddress(addrStr) {
        try {
            return Address.fromString(addrStr, config.network);
        } catch (e) {
            throw new Error(e);
        }

    }

    /**
     * Converts satoshis to BTC
     * @param satoshis {number} integer (ex. 15000000)
     * @return {number} float (ex. 0.15 )
     */
    static satoshiToBTC(satoshis) {
        return satoshis / 100000000;
    }

    /**
     * Stolen from bcoin
     *
     * Reverse a hex-string.
     * @param {String} str - Hex string.
     * @returns {String} Reversed hex string.
     */
    static reverseHex(str) {
        assert(typeof str === 'string');
        assert((str.length & 1) === 0);

        let out = '';

        for (let i = str.length - 2; i >= 0; i -= 2)
            out += str[i] + str[i + 1];

        return out;
    }

    static strToBuffer(str) {
        return Buffer.from(str, 'hex');
    }

    static bufferToStr(buffer) {
        return buffer.toString('hex');
    }


    static isToday(ms) {
        const now = new Date(Date.now());
        const startToday = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
        return ms >= startToday;
    }


}

module.exports = Utils;
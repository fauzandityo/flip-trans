import 'intl';
import 'intl/locale-data/jsonp/id';

import Color from "../config/Color";

class Helper {
    
    getSortOrder(prop, order) {
        return function(a, b) {
            // Check ordering
            if (order === 'asc') {
                if (a[prop] > b[prop]) {
                    return 1;
                } else if (a[prop] < b[prop]) {
                    return -1;
                }
            } else if (order === 'desc') {
                if (a[prop] < b[prop]) {
                    return 1;
                } else if (a[prop] > b[prop]) {
                    return -1;
                }
            }
            return 0;
        }
    }

    renameBank(name) {
        let result = 'uppercase';
        if (name.length > 4) {
            result = 'capitalize';
        }
        return result;
    }

    /**
     * @description Reformating number to give currency value
     * @author Fauzan
     * @date 2021-01-10
     * @param {Integer} = 1000
     * @returns {String} = 1.000
     * @memberof Helper
     */
    rewriteNumber(number) {
        const currencyOptions = new Intl.NumberFormat('id-ID', {
            currency: 'IDR',
        }).resolvedOptions();
        
        const value = (number).toLocaleString('id-ID', { 
            ...currencyOptions
        });
        return value;
    }

    /**
     * @description Reformating date
     * @author Fauzan
     * @date 2021-01-10
     * @param {String} = 2021-01-02
     * @returns {String} = 2 Januari 2021
     * @memberof Helper
     */
    reformatDate(dateString) {
        var fmtDate = new Date(dateString);
        var month = [
            "Januari", "Februari", "Maret",
            "April", "Mei", "Juni",
            "Juli", "Agustus", "September",
            "Oktober", "November", "Desember",
        ][fmtDate.getMonth()];
        return fmtDate.getDate() + " " + month + " " + fmtDate.getFullYear();
    }

    /**
     * @description Reformating status
     * @author Fauzan
     * @date 2021-01-10
     * @param {String} = SUCCESS/PENDING
     * @returns {Object}
     * @memberof Helper
     */
    reformatStatus(status) {
        let result = {
            mainColor: Color.green,
            fontColor: Color.white,
            backgroundColor: Color.green,
            statusText: "Berhasil"
        }
        // Change if not success
        if (status !== 'SUCCESS') {
            result.mainColor = Color.orange;
            result.fontColor = Color.black;
            result.backgroundColor = Color.white;
            result.statusText = "Pengecekan";
        }
        return result;
    }
}

export default new Helper();
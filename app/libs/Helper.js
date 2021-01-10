import 'intl';
import 'intl/locale-data/jsonp/id';
import AsyncStorage from "@react-native-community/async-storage";

import Color from "../config/Color";

class Helper {
    async getFromLocalStorage(key) {
        try {
            const value = await AsyncStorage.getItem(key, (err, res) => {});
            return value;
        } catch (error) {
            console.log(error);
        }
    }

    async setToLocalStorage(key, value) {
        try {
            await AsyncStorage.setItem(key, value);
        } catch (error) {
            console.log(error);
        }
    }

    async clearLocalStorage(key) {
        try {
            await AsyncStorage.removeItem(key);
        } catch (error) {
            console.log(error);
        }
    }
    
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

    rewriteNumber(number) {
        const currencyOptions = new Intl.NumberFormat('id-ID', {
            currency: 'IDR',
        }).resolvedOptions();
        
        const value = (number).toLocaleString('id-ID', { 
            ...currencyOptions
        });
        return value;
    }

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
import { Alert } from "react-native";

import Config from "../config";

class Api {
    hostname = Config.host;
    defaultMethod = 'GET';
    defaultErrorMsg = {
        title: 'Attention',
        text: 'Network Problem\nPlease check your connection',
        button: {
            title: 'OK',
            onPress: () => null
        },
    };

    async getData() {
        return new Promise(async (resolve, reject) => {
            try {
                let response = await fetch(this.hostname, {
                    method: this.defaultMethod
                });
                let body = await response.json();
                resolve(body);
            } catch (err) {
                reject(err);
            }
        })
    }

    networkErrorAlert() {
        Alert.alert(this.defaultErrorMsg.title, this.defaultErrorMsg.text, [{
            text: this.defaultErrorMsg.title,
            onPress: () => this.defaultErrorMsg.button.onPress(),
        }]);
    }
}

export default new Api();
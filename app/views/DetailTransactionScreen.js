import React, { Component } from "react";
import { 
    View,
    Text,
    SafeAreaView,
    ToastAndroid
} from "react-native";
import Clipboard from "@react-native-community/clipboard";
import { Button, Icon } from "react-native-elements";
import { connect } from "react-redux";

import Helper from "../libs/Helper";

import { styleDetailScreen, styleGlobalScreen } from "../assets/styles/Style";
import { detailIcon } from "../assets/icons/Icon";

class DetailTransactionScreen extends Component {
    constructor(props) {
        super(props);
    }

    handleCopyToClipboard = (transactionId) => {
        ToastAndroid.show("Copied To Clipboard", ToastAndroid.SHORT)
        Clipboard.setString(transactionId)
    }

    handleBackToList = () => {
        this.props.navigation.goBack()
    }

    render() {
        let { transaction } =  this.props;
        let senderBankTransform = Helper.renameBank(transaction.sender_bank);
        let beneficiaryBankTransform = Helper.renameBank(transaction.beneficiary_bank);
        let rewritedNumber = Helper.rewriteNumber(transaction.amount);
        let reformatedDate = Helper.reformatDate(transaction.created_at.split(" ")[0]);

        return (
            <SafeAreaView style={styleGlobalScreen.mainView}>
                <View style={styleDetailScreen.containerId}>
                    <View style={styleDetailScreen.centerContainer}>
                        <Text style={styleDetailScreen.titleText}>
                            {`ID TRANSAKSI: #${transaction.id}`}
                        </Text>
                    </View>
                    <View style={styleDetailScreen.centerContainer}>
                        <Button
                            type='clear'
                            icon={detailIcon.copyIcon}
                            buttonStyle={{
                                padding: 0,
                                alignContent: "flex-start"
                            }}
                            containerStyle={{
                                alignItems: "flex-start"
                            }}
                            onPress={() => this.handleCopyToClipboard(transaction.id)}
                        />
                    </View>
                </View>
                <View style={styleDetailScreen.detailContainer}>
                    <View style={styleDetailScreen.containerSubtitle}>
                        <View style={styleDetailScreen.centerContainer}>
                            <Text style={styleDetailScreen.titleText}>
                                DETAIL TRANSAKSI
                            </Text>
                        </View>
                        <Button
                            type='clear'
                            title='Tutup'
                            containerStyle={styleDetailScreen.btnCloseContainer}
                            titleStyle={styleDetailScreen.btnCloseText}
                            onPress={() => this.handleBackToList()}
                        />
                    </View>
                    <View style={styleDetailScreen.itemContainer}>
                        <View style={styleDetailScreen.containerRow}>
                            <Text style={[styleDetailScreen.bankText, {
                                textTransform: senderBankTransform
                            }]}>
                                {transaction.sender_bank}
                            </Text>
                            <Icon
                                type="ionicon"
                                name="arrow-forward-outline"
                                size={18}
                            />
                            <Text style={[styleDetailScreen.bankText, {
                                textTransform: beneficiaryBankTransform
                            }]}>
                                {transaction.beneficiary_bank}
                            </Text>
                        </View>
                    </View>
                    <View style={[styleDetailScreen.itemContainer, {
                        flexDirection: "row"
                    }]}>
                        <View style={styleDetailScreen.centerContainer}>
                            <Text style={styleDetailScreen.titleText}>
                                {transaction.beneficiary_name}
                            </Text>
                            <Text>{transaction.account_number}</Text>
                        </View>
                        <View style={styleDetailScreen.centerContainer}>
                            <Text style={styleDetailScreen.titleText}>
                                Nominal
                            </Text>
                            <Text>{`Rp ${rewritedNumber}`}</Text>
                        </View>
                    </View>
                    <View style={[styleDetailScreen.itemContainer, {
                        flexDirection: "row"
                    }]}>
                        <View style={styleDetailScreen.centerContainer}>
                            <Text style={styleDetailScreen.titleText}>
                                Berita Transfer
                            </Text>
                            <Text>{transaction.remark}</Text>
                        </View>
                        <View style={styleDetailScreen.centerContainer}>
                            <Text style={styleDetailScreen.titleText}>
                                Kode Unik
                            </Text>
                            <Text>{transaction.unique_code}</Text>
                        </View>
                    </View>
                    <View style={styleDetailScreen.itemContainer}>
                        <Text style={styleDetailScreen.titleText}>
                            Waktu Dibuat
                        </Text>
                        <Text>{reformatedDate}</Text>
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        transaction: state.transaction.transactionDetail
    }
}

export default connect(mapStateToProps)(DetailTransactionScreen);
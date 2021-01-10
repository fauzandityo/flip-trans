import React, { Component } from "react";
import { 
    View,
    Text,
    SafeAreaView,
    TouchableOpacity
 } from "react-native";
 import { connect } from "react-redux";

class DetailTransactionScreen extends Component {
    constructor(props) {
        super(props);
        // this.params = this.props.navigation.state.params;
        this.state = {
            transaction: {}
        };
    }

    // componentDidMount() {
    //     let item = this.params.trxItem;
    //     this.setState({
    //         transaction: item
    //     });
    // }

    render() {
        let { transaction } =  this.props;
        return (
            <SafeAreaView>
                <View>
                    <Text>{`ID Transaksi: #${transaction.id}`}</Text>
                </View>
                <View>
                    <Text>Detail Transaksi</Text>
                    <View>
                        <Text>{`${transaction.sender_bank} -> ${transaction.beneficiary_bank}`}</Text>
                    </View>
                    <View>
                        <Text>{transaction.beneficiary_name}</Text>
                        <Text>{transaction.account_number}</Text>
                    </View>
                    <View>
                        <Text>Nominal</Text>
                        <Text>{transaction.amount}</Text>
                    </View>
                    <View>
                        <Text>Berita Transfer</Text>
                        <Text>{transaction.remark}</Text>
                    </View>
                    <View>
                        <Text>Kode Unik</Text>
                        <Text>{transaction.unique_code}</Text>
                    </View>
                    <View>
                        <Text>Waktu Dibuat</Text>
                        <Text>{transaction.created_at}</Text>
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
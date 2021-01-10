import React, { Component } from "react";
import { 
    View,
    Text,
    SafeAreaView,
    FlatList,
    TouchableOpacity,
    TextInput,
    Modal
} from "react-native";
import { Button, Icon, Input } from "react-native-elements";
import { connect } from "react-redux";

import Api from "../libs/Api";
import { styleGlobalScreen, styleListScreen } from "../assets/styles/Style";
import { detailTransaction, filterTransaction, getTransaction, sortTransaction } from "../redux/actions/transaction";
import Helper from "../libs/Helper";
import { listIcon } from "../assets/icons/Icon";

class TransactionListScreen extends Component {
    constructor(props) {
        super(props);
        this.storeKey = 'transaction';
        this.state = {
            trxList: [],
            keyWord: '',
            searchList: [],
            showSortModal: false
        }
    }

    async componentDidMount() {
        let transaction = await this.getTransaction();
        this.props.get(transaction);
        // this.setState({ trxList: transaction });
    }
    
    async getTransaction() {
        let response = null;
        try {
            let data = await Api.getData();
            response = this.reMapTransaction(data);
            Helper.setToLocalStorage(this.storeKey, JSON.stringify(response));
        } catch (err) {
            alert(`Something went wrong!${err}`);
        }
        return response;
    }

    reMapTransaction(trx) {
        const res = [];
        let index = 0;
        const keys = Object.keys(trx);
        keys.forEach(el => {
            res[index++] = trx[el];
        });

        return res;
    }

    filterSearch = async () => {
        let data = await Helper.getFromLocalStorage(this.storeKey);
        this.props.get(JSON.parse(data));
        this.props.filter(this.state.keyWord);
    }

    sortTransaction = (key) => {
        this.props.order(key);
        this.modalSortHandler()
    }

    modalSortHandler() {
        this.setState({
            showSortModal: !this.state.showSortModal
        });
    }

    renderModalSort = () => (
        <Modal
            transparent={true}
            animationType="slide"
            visible={this.state.showSortModal}
        >
            <View
            style={{
                flex: 1,
                alignItems: "center",
                backgroundColor: "rgba(0,0,0,0.3)"
            }}>
                <View style={{
                    backgroundColor: "#fff",
                    margin: 20
                }}>
                    <View>
                        <TouchableOpacity
                            onPress={() => this.modalSortHandler()}
                        >
                            <Text>X</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity
                            onPress={() => this.sortTransaction("beneficiary_name asc")}
                        >
                            <Text>Nama A-Z</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.sortTransaction("beneficiary_name desc")}
                        >
                            <Text>Nama Z-A</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.sortTransaction("created_at desc")}
                        >
                            <Text>Tanggal Terbaru</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.sortTransaction("created_at asc")}
                        >
                            <Text>Tanggal Terlama</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );

    renderItem({ item }) {
        let {
            mainColor, fontColor,
            backgroundColor, statusText
        } = Helper.reformatStatus(item.status);
        let senderBankTransform = Helper.renameBank(item.sender_bank);
        let beneficiaryBankTransform = Helper.renameBank(item.beneficiary_bank);
        let rewritedNumber = Helper.rewriteNumber(item.amount);
        let reformatedDate = Helper.reformatDate(item.created_at.split(" ")[0]);
        return (
            <TouchableOpacity onPress={() => {
                this.props.detail(itemId)
                this.props.navigation.navigate('DetailTransactionScreen')
            }}>
                <View style={[
                    styleListScreen.listItem, {
                        borderLeftColor: mainColor
                    }
                ]}>
                    <View style={styleListScreen.itemContainer}>
                        {/* From -> To */}
                        <View style={styleListScreen.textContainer}>
                            <Text style={[styleListScreen.itemBank, {
                                textTransform: senderBankTransform
                            }]}>
                                {item.sender_bank}
                            </Text>
                            <Icon
                                type="ionicon"
                                name="arrow-forward-outline"
                                size={18}
                            />
                            <Text style={[styleListScreen.itemBank, {
                                textTransform: beneficiaryBankTransform
                            }]}>
                                {item.beneficiary_bank}
                            </Text>
                        </View>

                        {/* Name */}
                        <Text style={[styleListScreen.itemText, {
                            textTransform: 'uppercase'
                        }]}>
                            {item.beneficiary_name}
                        </Text>

                        {/* Amount | Date */}
                        <View style={styleListScreen.textContainer}>
                            <Text style={styleListScreen.itemText}>
                                {`Rp ${rewritedNumber}`}
                            </Text>
                            <Icon
                                type="font-awesome"
                                name="circle"
                                size={6}
                                style={styleListScreen.smallIconCircle}
                            />
                            <Text>
                                {reformatedDate}
                            </Text>
                        </View>
                    </View>
                    <View style={styleListScreen.statusContainer}>
                        <Text style={[styleListScreen.statusText, {
                            borderColor: mainColor,
                            color: fontColor,
                            backgroundColor: backgroundColor
                        }]}>
                            {statusText}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    };

    render() {
        let { trxList, searchList } = this.state;
        return (
            <SafeAreaView style={styleGlobalScreen.mainView}>
                {this.renderModalSort()}
                <View style={styleListScreen.container}>
                    {/* Head */}
                    <View style={styleListScreen.headContainer}>
                        <Input
                            leftIcon= {listIcon.searchIcon}
                            containerStyle={styleListScreen.containerSearch}
                            inputContainerStyle={{
                                borderBottomWidth: 0
                            }}
                            inputStyle={styleListScreen.searchInput}
                            placeholder='Cari nama, bank, atau nominal'
                            onChangeText={(text) => {
                                this.setState({ keyWord: text })
                                this.filterSearch()
                            }}
                        />
                        <Button
                            title='URUTKAN'
                            type='clear'
                            titleStyle={styleListScreen.searchButtonText}
                            buttonStyle={styleListScreen.searchButton}
                            iconRight={true}
                            icon={listIcon.sortIcon}
                            iconContainerStyle={{
                                marginHorizontal: 2
                            }}
                            onPress={() => this.modalSortHandler()}
                        />
                    </View>
                    {/* List */}
                    <View style={styleListScreen.listContainer}>
                        <FlatList
                            data={this.props.trxList}
                            renderItem={this.renderItem}
                            keyExtractor={item => item.id}
                        />
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        trxList: state.transaction.transactionList
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        get: (data) => dispatch(getTransaction(data)),
        filter: (key) => dispatch(filterTransaction(key)),
        order: (key) => dispatch(sortTransaction(key)),
        detail: (id) => dispatch(detailTransaction(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionListScreen);
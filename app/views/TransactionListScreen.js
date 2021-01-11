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
import {
    Button,
    Icon,
    Input,
    CheckBox
} from "react-native-elements";
import { connect } from "react-redux";

import Api from "../libs/Api";
import { styleGlobalScreen, styleListScreen } from "../assets/styles/Style";
import { detailTransaction, getTransaction, sortTransaction } from "../redux/actions/transaction";
import Helper from "../libs/Helper";
import { listIcon } from "../assets/icons/Icon";
import Color from "../config/Color";

class TransactionListScreen extends Component {
    constructor(props) {
        super(props);
        this.storeKey = 'transaction';
        this.state = {
            keyWord: '',
            searchList: [],
            showSortModal: false,
            sortOption: [{
                text: "URUTKAN",
                order: ''
            }, {
                text: "Nama A-Z",
                order: "beneficiary_name asc"
            }, {
                text: "Nama Z-A",
                order: "beneficiary_name desc"
            }, {
                text: "Tanggal Terbaru",
                order: "created_at desc"
            }, {
                text: "Tanggal Terlama",
                order: "created_at asc"
            }],
            activeSort: ''
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

    filterSearch(text) {
        // Initiate variables
        let data = this.props.trxList;
        // Build regex
        let reg = new RegExp(text.toLowerCase(), "gi");
        // Filter list
        let newList = data.filter((item) => {
            let name = item.beneficiary_name.toLowerCase();
            let bank = item.beneficiary_bank.toLowerCase();
            let sBank = item.sender_bank.toLowerCase();
            let amount = item.amount.toString();

            return reg.test(name) ||
                reg.test(bank) ||
                reg.test(sBank) ||
                reg.test(amount);
        });
        if (text === '') {
            newList = []
        }
        // Store to state
        this.setState({ searchList: newList })
    }

    sortTransaction = (key) => {
        this.props.order(key);
        this.modalSortHandler()
    }

    modalSortHandler = () => {
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
                style={styleListScreen.modalContainer}
                onPress={() => this.modalSortHandler()}
            >
                <View style={styleListScreen.modalItemContainer}>
                    {this.state.sortOption.map((sort) => {
                        return (
                            <CheckBox
                                center
                                title={sort.text}
                                textStyle={{
                                    fontSize: 16,
                                    color: Color.orange
                                }}
                                containerStyle={{
                                    borderWidth: 0,
                                    backgroundColor: "",
                                    alignItems: "flex-start"
                                }}
                                checkedIcon='dot-circle-o'
                                uncheckedIcon='circle-o'
                                checked={this.state.activeSort === sort.order}
                                checkedColor={Color.orange}
                                uncheckedColor={Color.orange}
                                onPress={() => {
                                    this.setState({ activeSort: sort.order })
                                    this.sortTransaction(sort.order)
                                }}
                            />
                        )
                    })}
                </View>
            </View>
        </Modal>
    );

    renderItem = ({ item }) => {
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
                this.props.detail(item.id)
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
        let { searchList } = this.state;
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
                                this.filterSearch(text)
                            }}
                        />
                        <Button
                            title={this.state.sortOption.filter((sort) => {
                                    return sort.order === this.state.activeSort
                            })[0].text}
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
                            data={searchList.length > 0 ? searchList : this.props.trxList}
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
        order: (key) => dispatch(sortTransaction(key)),
        detail: (id) => dispatch(detailTransaction(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionListScreen);
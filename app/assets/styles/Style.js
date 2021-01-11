import Color from "../../config/Color";
import { 
    StyleSheet,
    Dimensions
 } from "react-native";

 var { height, width } = Dimensions.get('window');

 const styleGlobalScreen = StyleSheet.create({
     mainView: {
         flex: 1,
         backgroundColor: Color.lighterGrey
     }
 });

 const styleListScreen = StyleSheet.create({
    container: {
        flex: 1
    },
    // Search
    headContainer: {
        alignItems: "center",
        flexDirection: "row",
        margin: 10,
        borderRadius: 5,
        backgroundColor: "#fff"
    },
    containerSearch: {
        height: 60,
        marginTop: 10,
        width: "75%"
    },
    searchInput: {
        backgroundColor: "#fff",
        fontSize: 17,
        borderBottomWidth: 0
    },
    // Sort Button
    searchButton: {
        paddingHorizontal: 0,
        alignItems: "center",
        justifyContent: "center",
        height: 50,
        width: 80
    },
    searchButtonText: {
        fontSize: 12,
        color: Color.orange,
        padding: 0,
        maxWidth: 55,
        fontWeight: 'bold'
    },
    // List Item
    listContainer: {
        flex: 1
    },
    listItem: {
        flexDirection: "row",
        alignContent: "center",
        marginHorizontal: 10,
        marginVertical: 5,
        minHeight: 85,
        paddingLeft: 6,
        paddingTop: 10,
        borderLeftWidth: 5,
        borderRadius: 5,
        backgroundColor: Color.white
    },
    itemContainer: {
        flexDirection: "column",
        width: "70%"
    },
    textContainer: {
        flexDirection: "row"
    },
    itemBank: {
        fontSize: 15,
        fontWeight: "600"
    },
    itemText: {
        fontSize: 14
    },
    smallIconCircle: {
        marginTop: 7,
        marginHorizontal: 5
    },
    statusContainer: {
        flex: 1,
        alignItems: "flex-end",
        marginRight: 10,
        marginVertical: 10,
        height: 40,
        justifyContent: "center",
    },
    statusText: {
        maxWidth: 80,
        fontWeight: "700",
        fontSize: 12,
        textAlignVertical: "center",
        textAlign: "center",
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderWidth: 1,
        borderRadius: 3
    },
    // Modal
    modalContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.3)"
    },
    modalItemContainer: {
        backgroundColor: Color.white,
        borderRadius: 5,
        height: 400,
        width: 316,
        padding: 20,
        paddingVertical: 30,
        margin: 20
    }
 });

 const styleDetailScreen = StyleSheet.create({
     titleText: {
         fontSize: 14,
         fontWeight: '700',
         textTransform: 'uppercase'
     },
     containerId: {
        flexDirection: "row",
        marginTop: 10,
        marginBottom: 1,
        backgroundColor: Color.white,
        paddingHorizontal: 20,
        paddingVertical: 20
    },
    detailContainer: {
        backgroundColor: Color.white
    },
    containerSubtitle: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: Color.lightGrey,
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    btnCloseContainer: {
        marginRight: 10
    },
    btnCloseText: {
        fontSize: 14,
        color: Color.orange
    },
    bankText: {
        fontWeight: '500',
        fontSize: 16,
    },
    itemContainer: {
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    containerRow: {
        flexDirection: "row"
    },
    centerContainer: {
        flex: 1,
        justifyContent: "center"
    }
 })

 export {
     styleGlobalScreen,
     styleListScreen,
     styleDetailScreen
 }
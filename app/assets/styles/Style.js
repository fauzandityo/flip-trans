import Color from "../../config/Color";
import { 
    StyleSheet,
    Dimensions
 } from "react-native";

 var { height, width } = Dimensions.get('window');

 const styleGlobalScreen = StyleSheet.create({
     mainView: {
         flex: 1,
        //  alignItems: "center",
         backgroundColor: Color.lightGrey
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
    }
 });

 export {
     styleGlobalScreen,
     styleListScreen
 }
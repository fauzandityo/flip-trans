import { createStackNavigator } from "react-navigation-stack";
import TransactionListScreen from "../views/TransactionListScreen";
import DetailTransactionScreen from "../views/DetailTransactionScreen";

const TransactionRoutes = createStackNavigator({
    TransactionListScreen,
    DetailTransactionScreen
}, {
    headerMode: 'none'
});

export default TransactionRoutes;
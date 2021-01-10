import { createAppContainer, createSwitchNavigator } from "react-navigation";
import TransactionRoutes from "./TransactionRoutes";

export default createAppContainer(
    createSwitchNavigator({
        TransactionRoutes: TransactionRoutes
    })
)
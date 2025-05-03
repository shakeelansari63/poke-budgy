import { ParamListBase, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export interface StackProps {
    navigation: StackNavigationProp<ParamListBase, string, undefined>;
    route: RouteProp<ParamListBase>;
}

import { useState, useEffect } from "react";
import { BottomNavigation, IconButton } from "react-native-paper";
import Home from "./index";
import History from "./history";
import Trends from "./trends";
import { useDispatch } from "react-redux";
import { loadBudgets } from "../storage/slices/budget-slice";
import { BudgetState } from "../model/store";
import { BudgetStore } from "../storage/persistent-store";
import SettingsMenu from "../components/settings-menu";
import { StackProps } from "../model/stack-props";
import { useLayoutEffect } from "react";

export default function TabLayout({ navigation }: StackProps) {
    const [pageIndex, setPageIndex] = useState(0);
    const [menuVisible, setMenuVisible] = useState<boolean>(false);

    const [routes] = useState([
        { key: "home", title: "Current Budget", focusedIcon: "book" },
        { key: "trend", title: "Trend", focusedIcon: "trending-up" },
        { key: "history", title: "Past Budgets", focusedIcon: "book-clock" },
    ]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => <IconButton icon="dots-vertical" size={24} onPress={toggelMenuVisible} />,
        });
    }, [navigation]);

    const toggelMenuVisible = () => setMenuVisible(!menuVisible);

    const renderScene = BottomNavigation.SceneMap({
        home: Home,
        trend: Trends,
        history: History,
    });

    const dispatch = useDispatch();

    useEffect(() => {
        const initialState: BudgetState = {
            activeBudget: BudgetStore.getActiveBudget(),
            pastBudgets: BudgetStore.getInactiveBudgets(),
        };
        dispatch(loadBudgets(initialState));
    }, []);

    return (
        <>
            <SettingsMenu visible={menuVisible} setVisible={setMenuVisible} />
            <BottomNavigation
                navigationState={{ index: pageIndex, routes }}
                onIndexChange={setPageIndex}
                renderScene={renderScene}
            />
        </>
    );
}

import { useState, useEffect } from "react";
import { BottomNavigation } from "react-native-paper";
import Home from "./index";
import History from "./history";
import Trends from "./trends";
import { useDispatch } from "react-redux";
import { loadBudgets } from "../storage/slices/budget-slice";
import { BudgetState } from "../model/store";
import { BudgetStore } from "../storage/persistent-store";
// import budgets from "../dummy-data";

export default function TabLayout() {
    const [pageIndex, setPageIndex] = useState(0);
    const [routes] = useState([
        { key: "home", title: "Current Budget", focusedIcon: "book" },
        { key: "trend", title: "Trend", focusedIcon: "trending-up" },
        { key: "history", title: "Past Budgets", focusedIcon: "book-clock" },
    ]);

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
        <BottomNavigation
            navigationState={{ index: pageIndex, routes }}
            onIndexChange={setPageIndex}
            renderScene={renderScene}
        />
    );
}

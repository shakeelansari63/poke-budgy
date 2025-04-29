import { useState } from "react";
import { BottomNavigation } from "react-native-paper";
import Home from "./index";
import History from "./history";
import Trends from "./trends";

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

    return (
        <BottomNavigation
            navigationState={{ index: pageIndex, routes }}
            onIndexChange={setPageIndex}
            renderScene={renderScene}
        />
    );
}

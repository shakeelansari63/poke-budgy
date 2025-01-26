import { View, Text } from "react-native";
import { useState, useEffect } from "react";
import Store from "../constants/Storage";
import { Budget } from "../models/Budgets";

const CurrentBudget = () => {
    const [currentBudget, setCurrentBudget] = useState<Budget | null>(null);

    // Get Current Budget From Store
    useEffect(() => {
        const setBudget = async () => {
            const budget = await Store.getCurrentBudget();
            setCurrentBudget(budget);
        };

        // Set Budget
        setBudget();
    }, []);

    return (
        <View>
            {currentBudget === null ? (
                <Text>No Current Budget. Create new Budget</Text>
            ) : (
                <Text>Current Budget...</Text>
            )}
        </View>
    );
};

export default CurrentBudget;

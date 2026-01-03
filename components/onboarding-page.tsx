import Onboarding from "react-native-onboarding-swiper";
import { useDispatch } from "react-redux";
import { setOnBoarded } from "../storage/slices/settings-slice";
import { Image } from "expo-image";
import { useAppTheme } from "@/hooks/use-app-theme";

function PokeBudgyOnboarding() {
    // Dispatcher for setting onboarding complete at end
    const dispatch = useDispatch();
    const theme = useAppTheme();

    // Onboarding Steps
    const onboardingSteps: {
        title: string;
        subtitle: string;
        image: any;
    }[] = [
        {
            title: "Welcome to Pokè Budgy",
            subtitle: "Your personal Budget Planner",
            image: require("../assets/images/onb/01.png"),
        },
        {
            title: "Customize",
            subtitle:
                "You can go to settings menu in top right to customize your experience",
            image: require("../assets/images/onb/02.png"),
        },
        {
            title: "Settings Page",
            subtitle:
                "You have option to customize Currency, Theme and more from Settings page",
            image: require("../assets/images/onb/03.png"),
        },
        {
            title: "Home Page",
            subtitle: "Create a new budget to start managing your finances",
            image: require("../assets/images/onb/04.png"),
        },
        {
            title: "New Budget",
            subtitle: "Provide start and end dates for budget period",
            image: require("../assets/images/onb/05.png"),
        },
        {
            title: "Budget Screen",
            subtitle:
                "To add income / budgets, click on the '+' button or click the floating button",
            image: require("../assets/images/onb/06.png"),
        },
        {
            title: "New Income",
            subtitle:
                "Provide a source, amount, and date for creating new income",
            image: require("../assets/images/onb/07.png"),
        },
        {
            title: "New Budget",
            subtitle: "Provide amount and name for creating new budget",
            image: require("../assets/images/onb/08.png"),
        },
        {
            title: "Delete Income",
            subtitle:
                "If you want to delete an income, swipe the income to left",
            image: require("../assets/images/onb/09.png"),
        },
        {
            title: "Delete Budget",
            subtitle:
                "If you want to delete a budget, swipe the budget to left",
            image: require("../assets/images/onb/10.png"),
        },
        {
            title: "Budget Summary",
            subtitle:
                "Top of budget page shows the summary of Income and Budgets",
            image: require("../assets/images/onb/11.png"),
        },
        {
            title: "Expense Record",
            subtitle:
                "Tapping on the budget takes you to the budget details page where you can edit and record expenses",
            image: require("../assets/images/onb/12.png"),
        },
        {
            title: "Recording Expense",
            subtitle:
                "While recording expense, provide the amount, description and expense date",
            image: require("../assets/images/onb/13.png"),
        },
        {
            title: "Trends Tab",
            subtitle:
                "Trends tab shows the trends of your income and expenses with various useful charts",
            image: require("../assets/images/onb/14.png"),
        },
        {
            title: "History Tab",
            subtitle: "History tab shows you previous budgets",
            image: require("../assets/images/onb/15.png"),
        },
    ];

    return (
        <Onboarding
            pages={onboardingSteps.map((step) => ({
                backgroundColor: theme.colors.background,
                title: step.title,
                subtitle: step.subtitle,
                image: (
                    <Image
                        source={step.image}
                        style={{ width: 250, height: 250 }}
                    />
                ),
            }))}
            onDone={() => {
                dispatch(setOnBoarded(true));
            }}
            onSkip={() => dispatch(setOnBoarded(true))}
        />
    );
}

export default PokeBudgyOnboarding;

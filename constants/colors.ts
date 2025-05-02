interface ColorPalete {
    Income: string;
    BudgetInLimit: string;
    BudgetAboveLimit: string;
    SpentInLimit: string;
    SpentAboveLimit: string;
    SavingPositive: string;
    SavingNegative: string;
}

const colors: ColorPalete = {
    Income: "#138d75",
    BudgetInLimit: "#3498db",
    BudgetAboveLimit: "#c0392b",
    SpentInLimit: "#e67e22",
    SpentAboveLimit: "#b03a2e",
    SavingPositive: "#28b463",
    SavingNegative: "#922b21",
};

export default colors;

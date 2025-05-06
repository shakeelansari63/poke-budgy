interface CurrencyModel {
    name: string;
    symbol: string;
}

export const Currencies: CurrencyModel[] = [
    { name: "USD", symbol: "$" },
    { name: "GBP", symbol: "£" },
    { name: "INR", symbol: "₹" },
    { name: "AUD", symbol: "A$" },
    { name: "JPY", symbol: "¥" },
    { name: "EUR", symbol: "€" },
];

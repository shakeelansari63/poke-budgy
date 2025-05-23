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
    { name: "BDT", symbol: "৳" },
    { name: "KHR", symbol: "៛" },
    { name: "MNT", symbol: "₮" },
    { name: "NZD", symbol: "$" },
    { name: "KPW", symbol: "₩" },
    { name: "KRW", symbol: "₩" },
    { name: "SGD", symbol: "S$" },
    { name: "PHP", symbol: "₱" },
    { name: "TWD", symbol: "NT$" },
    { name: "THB", symbol: "฿" },
    { name: "KZT", symbol: "₸" },
    { name: "HKD", symbol: "HK$" },
    { name: "EGP", symbol: "E£" },
    { name: "ZAR", symbol: "R" },
    { name: "NGN", symbol: "₦" },
    { name: "DZD", symbol: "دج" },
    { name: "ILS", symbol: "₪" },
    { name: "SYP", symbol: "£S" },
    { name: "LBP", symbol: "ل.ل" },
    { name: "KWD", symbol: "ك" },
    { name: "IRR", symbol: "﷼" },
    { name: "AZN", symbol: "₼" },
    { name: "BGN", symbol: "лв" },
    { name: "CZK", symbol: "Kč" },
    { name: "RUB", symbol: "₽" },
    { name: "TRY", symbol: "₺" },
    { name: "UAH", symbol: "₴" },
    { name: "BSD", symbol: "B$" },
    { name: "CAD", symbol: "CA$" },
    { name: "PYG", symbol: "₲" },
    { name: "AWG", symbol: "ƒ" },
].sort((aCur, bCur) => aCur.name.localeCompare(bCur.name, undefined, { sensitivity: "base" }));

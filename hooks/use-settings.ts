import { useSelector } from "react-redux";
import { Currencies } from "../constants/currencies";
import { StoreState } from "../model/store";
import { Settings } from "../model/settings";

export const useCurrencySymbol = () => {
    const settings = useSelector<StoreState, Settings>((state) => state.setting);

    const currency = Currencies.find((currency) => currency.name === settings.currency);
    if (currency) return currency.symbol;
    else return Currencies[0].symbol;
};

export const useCurrency = () => {
    const settings = useSelector<StoreState, Settings>((state) => state.setting);

    return settings.currency;
};

export const useCurrentTheme = () => {
    const settings = useSelector<StoreState, Settings>((state) => state.setting);

    return settings.theme;
};

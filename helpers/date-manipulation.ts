export const getPastMonthDate = (months?: number) => {
    const newDate = new Date();
    const monthsToGoPast = months ?? 1;
    newDate.setMonth(newDate.getMonth() - monthsToGoPast);

    return newDate;
};

export const getStartOfMonthDate = (date: Date) => {
    const newDate = new Date(date);
    newDate.setDate(1);

    return newDate;
};

export const getEndOfMonthDate = (date: Date) => {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() + 1);
    newDate.setDate(0);

    return newDate;
};

export const getStartOfThisYearDate = () => {
    const newDate = new Date();
    newDate.setMonth(1);
    newDate.setDate(1);

    return newDate;
};

export const getEndOfThisYearDate = () => {
    const newDate = new Date();
    newDate.setMonth(12);
    newDate.setDate(31);

    return newDate;
};

export const getStartOfPastYearDate = (years?: number) => {
    const newDate = new Date();
    const yearsToGoPast = years ?? 1;
    newDate.setFullYear(newDate.getFullYear() - yearsToGoPast);
    newDate.setMonth(1);
    newDate.setDate(1);

    return newDate;
};

export const getEndOfPastYearDate = (years?: number) => {
    const newDate = new Date();
    const yearsToGoPast = years ?? 1;
    newDate.setFullYear(newDate.getFullYear() - yearsToGoPast);
    newDate.setMonth(12);
    newDate.setDate(31);

    return newDate;
};

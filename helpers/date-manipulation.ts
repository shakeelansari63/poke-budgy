const getDateWithoutTime = (date?: Date): Date => {
    const newDate = date ? new Date(date) : new Date();

    // Set Hours, mins and seconds
    newDate.setHours(0);
    newDate.setMinutes(0);
    newDate.setSeconds(0);
    newDate.setMilliseconds(0);

    return newDate;
};

export const getPastMonthDate = (months?: number) => {
    const newDate = getDateWithoutTime();
    const monthsToGoPast = months ?? 1;
    newDate.setMonth(newDate.getMonth() - monthsToGoPast);

    return newDate;
};

export const getStartOfMonthDate = (date: Date) => {
    const newDate = getDateWithoutTime(date);
    newDate.setDate(1);

    return newDate;
};

export const getEndOfMonthDate = (date: Date) => {
    const newDate = getDateWithoutTime(date);
    newDate.setMonth(newDate.getMonth() + 1);
    newDate.setDate(1);

    return newDate;
};

export const getStartOfThisYearDate = () => {
    const newDate = getDateWithoutTime();
    newDate.setMonth(0);
    newDate.setDate(1);

    return newDate;
};

export const getEndOfThisYearDate = () => {
    const newDate = getDateWithoutTime();
    newDate.setFullYear(newDate.getFullYear() + 1);
    newDate.setMonth(0);
    newDate.setDate(1);

    return newDate;
};

export const getStartOfPastYearDate = (years?: number) => {
    const newDate = getDateWithoutTime();
    const yearsToGoPast = years ?? 1;
    newDate.setFullYear(newDate.getFullYear() - yearsToGoPast);
    newDate.setMonth(0);
    newDate.setDate(1);

    return newDate;
};

export const getEndOfPastYearDate = (years?: number) => {
    const newDate = getDateWithoutTime();
    const yearsToGoPast = years ? years - 1 : 0;
    newDate.setFullYear(newDate.getFullYear() - yearsToGoPast);
    newDate.setMonth(0);
    newDate.setDate(1);

    return newDate;
};

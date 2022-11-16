export const formatDate = (date: Date) => {
    return `${date.getFullYear()}-${addLeadingZero(
        date.getMonth() + 1
    )}-${date.getDate()}`;
};

const addLeadingZero = (number: number): string => {
    if (number < 10) {
        return '0' + number;
    }

    return number.toString();
};

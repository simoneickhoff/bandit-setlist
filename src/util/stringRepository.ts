export const slugify = (input: string): string => {
    return input.toLowerCase().replaceAll(' ', '-');
};

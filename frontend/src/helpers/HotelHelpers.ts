export const getTaxAmount = (amount: number): number => {
    const taxRate = 0.18;
    return Number((amount * taxRate).toFixed(2));
};
export const getDiscountedPrice = (amount: number): number => {
    const discountRate = 0.1;
    return Number((amount * discountRate).toFixed(2));
};
export const getTaxPlusAmount = (amount: number): number => {
    return Number((amount + getTaxAmount(amount)).toFixed(2));
};
export const getTotalAmount = (amount: number): number => {
    return Number((amount +
        getTaxAmount(amount) -
        getDiscountedPrice(amount)).toFixed(2));
};
export default function calculateTotalWithFee(basicPrice: number, totalFee: any) {
    const flatFee = totalFee.flat;
    const percentFee = parseFloat(totalFee.percent);

    // Calculate the total fee
    const totalFeeAmount = flatFee + (percentFee / 100) * basicPrice;

    // Add the total fee to the basic price
    const totalWithFee = basicPrice + totalFeeAmount;
    return totalWithFee;
}


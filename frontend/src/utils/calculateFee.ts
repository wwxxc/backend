export default function calculateTotalFee(basicPrice: number, totalFee: any) {
    const flatFee = totalFee.flat;
    const percentFee = parseFloat(totalFee.percent);

    const totalFeeAmount = flatFee + (percentFee / 100) * basicPrice;
    return totalFeeAmount;
}
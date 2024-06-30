interface ListPayment {
    id: number
    name: string
    code: string
    group: string
    total_fee: total_fee_list
    minimum_amount: number
    maximum_amount: number
    icon_url: string
}

interface total_fee_list {
    flat: number
    percent: string
}
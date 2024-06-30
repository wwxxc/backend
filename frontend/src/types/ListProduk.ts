interface ListProduk {
    id: number,
    code: string,
    name: string,
    price: priceList,
}

interface priceList {
    basic: number,
    premium: number,
    special: number,
}
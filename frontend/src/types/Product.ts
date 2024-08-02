interface Product {
    id: number
    product_name: string
    product_slug: string
    product_img: string
    product_banner: string
    product_description: string
    product_code: string
    product_type: string
    product_provider: string
    product_special: string
    isSpecial: boolean
    isPopular: boolean
    isServer: boolean
    isCheckUsername: boolean
    checkUsername_code: string
    category: {
        Category_name: string
    }
}
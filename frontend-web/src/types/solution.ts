export interface CreateSolutionForm {
    title: string
    description: string
    category: string
    details: string
    priceDollar: number
    link: string
    publishDate: string
    starRating: number
    ownerContact: {
        email: string
        phone: string
        other: string
    }
    createdAt: string
}

export interface UpdateSolutionForm {
    id: string
    title: string
    description: string
    category: string
    details: string
    priceDollar: number
    link: string
    publishDate: string
    starRating: number
    ownerContact: {
        email: string
        phone: string
        other: string
    }
}

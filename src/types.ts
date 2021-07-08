export interface PostCake {
    name: string,
    comment: string,
    imageURL: string,
    yumFactor: number
}

export interface Cake extends PostCake {
    ID: string
}

export type RequestStatus = "NONE" | "PENDING" | "SUCCESS" | "ERROR"
export interface User {
    name? :string, 
    type?:string,
    status?:string ,
    otp?:Number ,
    age?:Number ,
    email:string ,
    password?:string ,
    token?:[
        token?:string 
    ]
    ,MyCart?:[
        productName?:string, 
        ProductId?:string
    ]
    ,
    image?:string
}

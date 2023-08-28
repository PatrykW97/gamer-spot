'use client'

export default function MyAccount({data}:any){
    return(
        <div className="flex bg-white my-8 p-8 rounded-lg  flex-col ">
            <h1>Name: {data.name}</h1>
            <h1>Nickname: {data.nickname}</h1>
            <h1>Email: {data.email}</h1>
            <h1>Birthday:</h1>
        </div>
    )
}
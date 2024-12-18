import { ID, Query } from "node-appwrite"
import { users, account } from "../appwrite.config"
import { parseStringify } from "../utils";

export const createUser = async (user: CreateUserParams) => {

    try {
        const newUser = await account.create(
            ID.unique(),
            user.email,
            user.phone,
            // undefined,
            user.name
        )
        return parseStringify(newUser);
    } catch (error: any) {
        if(error && error?.code === 409){
            const document = await users.list([
                Query.equal("email", [user.email])
            ])
            return document?.users[0]
        }
        console.error("An error occurred while creating a new user:", error);
    }
    
}


export const getUser = async (userId: string) => {
    try {
        const user = await users.get(userId);
        return parseStringify(user)
    } catch (error) {
        console.log(error);
        
    }
}
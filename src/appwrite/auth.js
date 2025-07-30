import config from '../config'
import { Client, Account } from 'appwrite'
export class AuthService{
    client=new Client();
    account;
    constructor(){
        this.client
        .setEndpoint(config.appwriteUrl) // Your Appwrite Endpoint
        .setProject(config.appwriteProjectId); // Your Appwrite Project ID
        this.account = new Account(this.client);
    }
    async createAccount({ ID.unique(), email, password, name }) {
        try{
            const userAccount = await this.account.create(email,password,name);
            if (userAccount){
                //call another method to create a document in the database
                return this.login({email,password})
                
            }else{
                return userAccount;
            }
        }catch (error) {
            throw error;
        }
    }
    async login({ email, password}) {
        try{
            return await this.account.createEmailSession(email, password);
        }
        catch(error){
            throw
        }
}
async getCurrentUser(){
    try{
        return await this.account.get();
    }catch(error){
        console.log("Appwrite service:: getCurrentUser ::error", error);
    }

    return null;

}
async logout(){
    try{
        return await this.account.deleteSession();
    }catch(error){
        console.log("Appwrite service:: logout ::error", error);
    }
}
const AuthService = new AuthService();
export default AuthService;
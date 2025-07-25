import { Inngest } from "inngest";
import User from "../models/User.js";

export const inngest = new Inngest({ id: "movie-ticket-booking-system" });
const syncUserCreation=inngest.createFunction(
    {id:'sync-user-from-clerk'},
    {event:'clerk/user.created'},
    async({event})=>{
        const {id,first_name,last_name,email_address,image_url}=event.data
        const userData={
            _id:id,
            email:email_address[0].email_address,
            name:first_name+' '+last_name,
            image:image_url

        }
        await User.create(userData)
    }
)
//deleteing the user in the databse 
export const functions = [syncUserCreation];
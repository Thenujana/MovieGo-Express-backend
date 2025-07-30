import { Inngest } from "inngest";
import User from "../models/User.js";

export const inngest = new Inngest({ id: "movie-ticket-booking-system" });
const syncUserCreation = inngest.createFunction(
  { id: "sync-user-from-clerk" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    try {
      console.log("🟨 clerk/user.created event:", JSON.stringify(event.data, null, 2));

      const { id, first_name, last_name, email_address, image_url } = event.data;

      if (!id || !Array.isArray(email_address) || email_address.length === 0) {
        throw new Error("Missing required user data: ID or email");
      }

      const email = email_address[0]?.email_address;
      const name = `${first_name ?? ""} ${last_name ?? ""}`.trim();
      const image = image_url;

      if (!name || !email || !image) {
        throw new Error("Required fields missing: name, email, or image");
      }

      const userData = {
        _id: id,
        email,
        name,
        image,
      };

      await User.create(userData);
      console.log("✅ User created:", userData);
    } catch (error) {
      console.error("❌ Error in syncUserCreation:", error.message);
      throw error;
    }
  }
);


//deleteing the user in the databse 
const syncUserDeletion=inngest.createFunction(
    {id:'delete-user-from-clerk'},
    {event:'clerk/user.deleted'},
    async({event})=>{
        const{id}=event.data
        await User.findByIdAndDelete(id)
        
    }
)
//updating the user in the databse 
const syncUserUpdation=inngest.createFunction(
    {id:'update-user-from-clerk'},
    {event:'clerk/user.updated'},
    async({event})=>{
       const{id,first_name,last_name,email_address,image_url}=event.data
       const userData={
        _id:id,
        email:email_address[0].email_address,
        name:first_name +' '+last_name,
        image:image_url
       }
await User.findByIdAndUpdate(id,userData)
    }
)


export const functions = [syncUserCreation,syncUserDeletion,syncUserUpdation];
const mongoose=require('mongoose')
require('dotenv').config()


const url=process.env.DB_URL

const connectDB=async ()=>
{
    try{
        await mongoose.connect(url)
        console.log("DB connected ....")

    }catch(e)
    {
        console.log(e)
    }

}
module.exports=connectDB

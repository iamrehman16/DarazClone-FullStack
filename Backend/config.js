import mongoose from 'mongoose'

const connectDB=async ()=>
{
    try{
        await mongoose.connect("mongodb+srv://murdockmatt961_db_user:VwfEaC54xsBzbfQy@cluster0.v4qmnsc.mongodb.net/myDatabase111?retryWrites=true&w=majority&appName=Cluster0");
        console.log("DB connected ....")

    }catch(e)
    {
        console.log(e)
    }

}

export default connectDB;


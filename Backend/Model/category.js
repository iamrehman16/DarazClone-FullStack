import mongoose from "mongoose"

const categorySchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    image:{
        type: String,
        required: false
    }
})

const categoryModel= mongoose.model("categories",categorySchema)

export default categoryModel
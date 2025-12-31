import cartModel from "../Model/cart.js"

export const getCart=async(req,res)=>
{
  try{   const userId=req.user.id;
    const cartItems=await cartModel.findById({userId});
     if (!cart || cart.items.length === 0) {
      return res.status(200).json([]);
    }
    const formatted = cart.items.map(item => ({
      id: item._id.toString(),
      productId: item.productId,
      title: item.title,
      price: item.price,
      image: item.image,
      quantity: item.quantity,
      addedAt: item.addedAt
    }));

    res.status(200).json(formatted);
  }catch(error)
  {
    res.status(500).json({ message: "Failed to fetch cart" });
  }

}

export const addToCart=async(req,res)=>
{
    
    try {const userId=req.user.id;
     const {productId,quantity,productData}=req.body
     const cart=await cartModel.findOne({userId})
     if(!cart)
     {
        cart= new cart({userId,items:[]});
     }

     const itemIndex=cart.items.findIndex(item=>cart.items.productId===productId)
     if(itemIndex>-1)
     {
        cart.items[itemIndex].quantity+=quantity
     }
     else
     {
        cart.items.push({
             productId,
             title:productData.title,
             price:productData.price,
             image:productData.image,
             quantity
        })
     }
     await cart.save();
     return res.status(200).json({
        message:"Ite Added To Cart"
     })
    }catch(error)
    {
        res.status(500).json({
            message:"Failed To Add Item To Cart",
            success:false
        })
    }



}

export const updateCartItem=async(req,res)=>
{
   try{ const userId=req.user.id;
    const {quantity}=req.body;
    const {itemId}=req.params

    const cart=await cartModel.findOne({userId})
    if(!cart)
    {
        return res.status(404).json({
            message:"Cart not found"
        })
    }
    const item=cart.items.id(itemId)
    if(!item)
    {
         return res.status(404).json({
            message:"Item not found"
        })
    }
    cart.items.quantity=quantity
    await cart.save();

    res.json({ message: "Cart updated" });
  }catch(error)
  {
    res.status(500).json({
            message:"Failed To Add Item To Cart",
            success:false
        })
  }

}

export const removeCartItem=async(req,res)=>
{
    try{
         const userId=req.user.id;
         const {itemId}=req.params

    const cart=await cartModel.findOne({userId})
    if(!cart)
    {
        return res.status(404).json({
            message:"Cart not found"
        })
    }
    const item=cart.items.id(itemId)
    if(!item)
    {
         return res.status(404).json({
            message:"Item not found"
        })
    }
    cart.items=cart.items.filter(item=>item.productId!==itemId)
    await cart.save();

    res.json({ message: "Cart updated" });


    }catch(error)
    {
        res.status(500).json({
            message:"Failed To Add Item To Cart",
            success:false
        })
    }
}


export const clearCart = async (req, res) => {
  try {
    const userId = req.user.id;
    await cartModel.findOneAndUpdate({ userId }, { items: [] });
    res.json({ message: "Cart cleared" });
  } catch (error) {
    res.status(500).json({ message: "Failed to clear cart" });
  }
};

export const syncCart=async(req,res)=>
{
    try {
        const userId=req.user.id
        const items=req.body.items
        
        let cart=cartModel.findOne({userId})
        if(!cart)
        {
            cart=new cart({userId,items:[]})
        }
        items.foreach(isItem=>{
            const existing=cart.items.find(item=>{
                item.productId===isItem.productId
            })

            if(existing)
            {
                existing.quantity+=isItem.quantity
            }else
            {
                cart.items.push(isItem)
            }
        })
        await cart.save()
        res.json({ message: "Cart synced" });

        
    } catch (error) {
         res.status(500).json({ message: "Failed to sync cart" });
    }
}





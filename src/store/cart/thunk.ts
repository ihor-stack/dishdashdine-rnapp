import { ICartItem } from "@/api/generic";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const addItem = createAsyncThunk<ICartItem[]>(
    'cart/addToCart', async () => {
        const response: ICartItem[] = await 
    }
)
import { createSlice } from "@reduxjs/toolkit"
import { htmlData } from "../data2"

export const renderSlice = createSlice({
    name: "render",
    initialState: {
        value: htmlData,
    },
    reducers: {
        setValue: (state, action) => {
            const payload = action.payload
            state.value = JSON.parse(payload.data)
        },
    },
})

export const { setValue } = renderSlice.actions

export default renderSlice.reducer
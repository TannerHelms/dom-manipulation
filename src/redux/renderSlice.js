import { createSlice } from "@reduxjs/toolkit"

export const renderSlice = createSlice({
    name: "render",
    initialState: {
        value: null,
    },
    reducers: {
        setRender: (state, action) => {
            state.value = action.payload
        },
    },
})

export const { setRender } = renderSlice.actions

export default renderSlice.reducer
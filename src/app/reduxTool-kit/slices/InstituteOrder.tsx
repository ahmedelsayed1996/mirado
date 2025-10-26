import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { parseCookies } from "nookies";
interface airportReceptionIn {
   cost: number,
   airportName: string,
   serviceType: string
}

interface residenceIn {
   ageLimit: string,
   distance: string,
   foodValue: string,
   facilities: string,
   bookingCycle: string,
   costDuration: string,
   roomCategory: string,
   minmmumBooking: string,
   accommodationFees: string,
   accommodationName: string
}

interface orderIn {
   userId: number,
   instituteBranchId: number,
   courseId: number,
   officeId: number,
   coursePrice: string,
   booksFees: string,
   instituteFees: string,
   eduxa_fees: string,
   transfer_fees: string,
   residencePrice: string,
   totalPrice: string,
   convertedPrice: string,
   startDate: string,
   typeOfCourse: string,
   numberOfWeeks: number,
   numberOfWeeks_for_residence: number,
   healthInsurance: boolean,
   deposit: boolean,
   airportReception: airportReceptionIn,
   residence: residenceIn,
}

export const createOrderInstitute = createAsyncThunk("orderInstituteSlice/fetchOrder", async (param: orderIn) => {
   const { userId, instituteBranchId, courseId, officeId, coursePrice, booksFees, instituteFees, residencePrice, totalPrice, transfer_fees, eduxa_fees, convertedPrice, startDate, typeOfCourse, numberOfWeeks, numberOfWeeks_for_residence, airportReception, residence, healthInsurance, deposit } = param
   const { tokenMainSite } = parseCookies();

   const myHeaders = new Headers()
   myHeaders.append("Content-Type", "application/json")
   myHeaders.append("Authorization", `Bearer ${tokenMainSite}`)

   const row = JSON.stringify({
      userId,
      instituteBranchId,
      courseId,
      officeId,
      coursePrice,
      booksFees,
      instituteFees,
      residencePrice,
      totalPrice,
      transfer_fees,
      eduxa_fees,
      convertedPrice,
      startDate,
      typeOfCourse,
      numberOfWeeks,
      numberOfWeeks_for_residence,
      airportReception,
      residence,
      healthInsurance,
      deposit,
   })

   const request = {
      method: 'POST',
      headers: myHeaders,
      body: row,
   }

   const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/institute-orders`, request)
   if (!res.ok) {
      const result = await res.json()
      throw new Error(result.message)
   }

   const data = await res.json()
   console.log("data", data);
   return data
})


const orderInsSlice = createSlice({
   name: "orderInstitute",
   initialState: { loading: false, orderInstitute: {}, error: null },
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(createOrderInstitute.pending, (state: any) => {
         state.loading = true
      }).addCase(createOrderInstitute.fulfilled, (state: any, action) => {
         state.loading = false
         state.orderInsitute = action.payload
      }).addCase(createOrderInstitute.rejected, (state: any, action) => {
         state.loading = false
         state.error = action.error.message || "Failed to fetch Order Institute"
      })
   }
})

export const { } = orderInsSlice.actions
export default orderInsSlice.reducer
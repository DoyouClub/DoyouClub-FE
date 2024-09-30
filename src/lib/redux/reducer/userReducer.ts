import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import type { UserResponse } from '../../../module/user/dto/response'

interface UserState {
  user?: UserResponse
}

const userSlice = createSlice({
  name: 'user',
  initialState: {} as UserState,
  reducers: {
    setUser: (state: UserState, action: PayloadAction<UserResponse>) => ({
      ...state,
      user: action.payload
    })
  }
})

export const { setUser } = userSlice.actions
export default userSlice.reducer

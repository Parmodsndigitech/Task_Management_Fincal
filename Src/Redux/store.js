
// before Api Call this 

// import { configureStore } from '@reduxjs/toolkit';
// import reducer from './Reducers/auth';

// export default configureStore({ 
//     reducer: reducer,
// })


// implement api call this 
import { configureStore } from '@reduxjs/toolkit'
import LoginSlice from './Slice/LoginSlice'
export const store = configureStore({
  reducer: {
    isLogin: LoginSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    immutableCheck: { warnAfter: 128 },
    serializableCheck: { warnAfter: 128 },
  })
})

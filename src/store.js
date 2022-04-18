import {configureStore} from '@reduxjs/toolkit'
import {taskApi} from './services/taskApi'

export const store = configureStore({
  reducer: {
    [taskApi.reducerPath]: taskApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(taskApi.middleware)
})
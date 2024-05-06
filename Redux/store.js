import { createStore, applyMiddleware } from "redux"
import JobsReducer from "./reducer"
import logger from "redux-logger"
import { composeWithDevTools } from "@redux-devtools/extension"

const store = createStore(JobsReducer, composeWithDevTools(applyMiddleware()))

export default store

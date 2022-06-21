import {combineReducers} from "redux";
import {configureStore} from '@reduxjs/toolkit';

import {alertsReducer, tabsReducer, tablesReducer, pageSetsReducer} from "../src";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";


const rootReducer = combineReducers({
    alerts: alertsReducer,
    pageSets: pageSetsReducer,
    tables: tablesReducer,
    tabs: tabsReducer
});

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActionPaths: ['payload.error'],
        }
    })
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;

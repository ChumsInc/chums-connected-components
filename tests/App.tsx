import * as React from "react";

import {ErrorBoundary} from 'chums-components';
import AlertList from "../src/alerts/AlertList";
import {addAlertAction, defaultAlert} from "../src";
import PaginationTest from "./PaginationTest";
import {useAppDispatch} from "./configureStore";

const App: React.FC = () => {
    const dispatch = useAppDispatch();

    const clickHandler = (context?: string) => {
        const id = Math.floor(Math.random() * 5);
        const randomContext = `${context || 'alert'}/${id}`
        dispatch(addAlertAction({...defaultAlert, context: randomContext, canDismiss: true, message: `Alert #${id}`}));
    }

    return (
        <ErrorBoundary>
            <div>Test App</div>
            <div>
                <button type="button" onClick={() => clickHandler()}>Add random alert</button>
                <button type="button" onClick={() => clickHandler('my/context')}>Add context alert</button>
            </div>
            <AlertList/>
            <PaginationTest/>
        </ErrorBoundary>
    )
};

export default App;

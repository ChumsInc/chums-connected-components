import * as React from "react";

import {ErrorBoundary} from 'chums-components';
import AlertList from "../src/alerts/AlertList";
import {useDispatch} from "react-redux";
import {addAlertAction, defaultAlert} from "../src";

const App:React.FC = () => {
    const dispatch = useDispatch();

    const clickHandler = (context?:string) => {
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
            <AlertList />
        </ErrorBoundary>
    )
};

export default App;

import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useDispatch, useSelector } from "react-redux";
import { dismissAlertAction, selectAlertListByContext } from "./index";
import { Alert } from "chums-components/dist";
const AlertList = ({ context, children, ...rest }) => {
    const dispatch = useDispatch();
    const list = useSelector(selectAlertListByContext(context));
    const dismissHandler = (id) => dispatch(dismissAlertAction(id));
    return (_jsxs("div", { ...rest, children: [list.map((alert, index) => (_jsx(Alert, { ...alert, onDismiss: () => dismissHandler(alert.id) }, index))), children] }));
};
export default AlertList;
//# sourceMappingURL=AlertList.js.map
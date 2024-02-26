import {Provider} from "react-redux";
import {RouterProvider} from "react-router-dom";
import {router} from "./Router.tsx";
import {persistor, store} from "./store/store.ts";
import {PersistGate} from "redux-persist/integration/react";

const App = () => {
    return (
        <PersistGate loading={null} persistor={persistor}>
            <Provider store={store}>
                <RouterProvider router={router}/>
            </Provider>
        </PersistGate>
    );
};

export default App;
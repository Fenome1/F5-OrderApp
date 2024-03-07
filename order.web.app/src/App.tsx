import {Provider} from "react-redux";
import {RouterProvider} from "react-router-dom";
import {router} from "./Router.tsx";
import {persistor, store} from "./store/store.ts";
import {PersistGate} from "redux-persist/integration/react";

const App = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <RouterProvider router={router}/>
            </PersistGate>
        </Provider>
    );
};

export default App;
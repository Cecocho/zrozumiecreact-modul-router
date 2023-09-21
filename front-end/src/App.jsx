import { Outlet, useNavigation } from "react-router-dom";
import FoldersList from "./components/folders-list/FoldersList";
import Layout from "./components/layout/Layout";
import { Loader } from "./components/loader/Loader";

export function App() {
    const { state } = useNavigation();
    return (
        <Layout>
            {(state === "submitting" || state === "loading") && <Loader />}
            <FoldersList />
            <Outlet />
        </Layout>
    );
}

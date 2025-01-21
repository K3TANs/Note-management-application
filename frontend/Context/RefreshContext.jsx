import { createContext, useState } from "react";

const RefreshContext = createContext({
    refresh: '',
    changeRefresh: () => { },
});

export function RefreshContextProvider({ children }) {

    const [Refresh, setRefresh] = useState('');

    function changeRefresh() {
        setRefresh((prevRefresh) => {
            return prevRefresh === 'refresh' ? '' : 'refresh';
        })
    }

    const refreshContext = {
        refresh: Refresh,
        changeRefresh
    }

    return (
        <RefreshContext.Provider value={refreshContext}>{children}</RefreshContext.Provider>
    )

}

export default RefreshContext;
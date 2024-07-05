import { createContext, useContext } from "react";
import usePersistedState from "./usePersistedState";

// register the context
const ThemeContext: React.Context<any> = createContext({});

/**
 * export custom provider
 * @param {boolean} darkMode
 * @returns
 */
export function ThemeProvider({ children } :any) {
    /** usePersistedState for storing state in local store */
        // const [darkMode, setDarkMode] = useState(false);
    const [darkMode, setDarkMode] = usePersistedState("darkmode", false);

    return (
        <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
            {children}
        </ThemeContext.Provider>
    );
}

// export a custom hook to use this specific context
export function themeContext() {
    return useContext(ThemeContext);
}
import {themeContext} from "../context/ThemeContext.tsx";
import {useEffect} from "react";
import {Form} from "react-bootstrap";

export default function ThemeSwitcher() {
    const { darkMode, setDarkMode } = themeContext();

    const switchTheme = () => setDarkMode((prev :any) => !prev);

    useEffect(() => {
        // darkMode

        darkMode
            ? document.documentElement.setAttribute("data-bs-theme", "dark")
            : document.documentElement.setAttribute("data-bs-theme", "light");
    }, [darkMode]);

    return (
        <div id="theme-switch">
            <Form>
                <Form.Check type="switch" checked={darkMode} onChange={switchTheme} label="Dark Mode" reverse/>
            </Form>
        </div>
    );
}
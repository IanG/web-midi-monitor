import {Link, useRouteError} from "react-router-dom";

interface RouteError {
    data: string;
    error: {
        columnNumber: number;
        fileName: string;
        lineNumber: number;
        message: string;
        stack: string;
    };
    internal: boolean;
    status: number;
    statusText: string;
}

export default function Error() {

    const error = useRouteError() as RouteError;

    return (
        <div id="error-page">
            <h1>Oops</h1>
            <p>Er...that wasn't meant to happen.  The error was</p>
            <p><i>{error.status} {error.statusText}</i></p>
            <p><Link to="/">Go home</Link></p>
        </div>
    )
}
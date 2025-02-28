import {Card, Container} from "react-bootstrap";
import BrowserDetails from "./BrowserDetails.tsx";

export default function MIDINotSupportedCard() {

    return (
        <Container fluid className="d-flex vh-100">
            <div className="d-flex w-100 h-75 justify-content-center align-items-center">
                <Card style={{ width: "90%"}}>
                    <Card.Body>
                        <Card.Title>
                            <svg xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 -2 22 22" width="30" fill="red" className="bi bi-sign-stop">
                                <path d="M15 8a6.97 6.97 0 0 0-1.71-4.584l-9.874 9.875A7 7 0 0 0 15 8M2.71 12.584l9.874-9.875a7 7 0 0 0-9.874 9.874ZM16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0"/>
                            </svg>
                            Web MIDI API not supported</Card.Title>
                        <p>Your browser does not support the Web MIDI API. You
                            can use the included MIDI reference but you won't be able to send/receive any MIDI messages
                            from your devices. Your browser:</p>

                        <BrowserDetails/>

                        <p><strong>Supported Browsers:</strong></p>

                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="bi bi-browser-firefox" >
                                <path d="M13.384 3.408c.535.276 1.22 1.152 1.556 1.963a8 8 0 0 1 .503 3.897l-.009.077-.026.224A7.758 7.758 0 0 1 .006 8.257v-.04q.025-.545.114-1.082c.01-.074.075-.42.09-.489l.01-.051a6.6 6.6 0 0 1 1.041-2.35q.327-.465.725-.87.35-.358.758-.65a1.5 1.5 0 0 1 .26-.137c-.018.268-.04 1.553.268 1.943h.003a5.7 5.7 0 0 1 1.868-1.443 3.6 3.6 0 0 0 .021 1.896q.105.07.2.152c.107.09.226.207.454.433l.068.066.009.009a2 2 0 0 0 .213.18c.383.287.943.563 1.306.741.201.1.342.168.359.193l.004.008c-.012.193-.695.858-.933.858-2.206 0-2.564 1.335-2.564 1.335.087.997.714 1.839 1.517 2.357a4 4 0 0 0 .439.241q.114.05.228.094c.325.115.665.18 1.01.194 3.043.143 4.155-2.804 3.129-4.745v-.001a3 3 0 0 0-.731-.9 3 3 0 0 0-.571-.37l-.003-.002a2.68 2.68 0 0 1 1.87.454 3.92 3.92 0 0 0-3.396-1.983q-.116.001-.23.01l-.042.003V4.31h-.002a4 4 0 0 0-.8.14 7 7 0 0 0-.333-.314 2 2 0 0 0-.2-.152 4 4 0 0 1-.088-.383 5 5 0 0 1 1.352-.289l.05-.003c.052-.004.125-.01.205-.012C7.996 2.212 8.733.843 10.17.002l-.003.005.003-.001.002-.002h.002l.002-.002h.015a.02.02 0 0 1 .012.007 2.4 2.4 0 0 0 .206.48q.09.153.183.297c.49.774 1.023 1.379 1.543 1.968.771.874 1.512 1.715 2.036 3.02l-.001-.013a8 8 0 0 0-.786-2.353"/>
                            </svg>
                            &nbsp;Mozilla Firefox &nbsp;<br/>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="bi bi-browser-chrome">
                                <path  d="M16 8a8 8 0 0 1-7.022 7.94l1.902-7.098a3 3 0 0 0 .05-1.492A3 3 0 0 0 10.237 6h5.511A8 8 0 0 1 16 8M0 8a8 8 0 0 0 7.927 8l1.426-5.321a3 3 0 0 1-.723.255 3 3 0 0 1-1.743-.147 3 3 0 0 1-1.043-.7L.633 4.876A8 8 0 0 0 0 8m5.004-.167L1.108 3.936A8.003 8.003 0 0 1 15.418 5H8.066a3 3 0 0 0-1.252.243 2.99 2.99 0 0 0-1.81 2.59M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4"/>
                            </svg>
                            &nbsp;Google Chrome&nbsp;<br/>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"  viewBox="0 0 16 16" fill="currentColor" className="bi bi-browser-edge">
                                <path d="M9.482 9.341c-.069.062-.17.153-.17.309 0 .162.107.325.3.456.877.613 2.521.54 2.592.538h.002c.667 0 1.32-.18 1.894-.519A3.84 3.84 0 0 0 16 6.819c.018-1.316-.44-2.218-.666-2.664l-.04-.08C13.963 1.487 11.106 0 8 0A8 8 0 0 0 .473 5.29C1.488 4.048 3.183 3.262 5 3.262c2.83 0 5.01 1.885 5.01 4.797h-.004v.002c0 .338-.168.832-.487 1.244l.006-.006z"/>
                                <path d="M.01 7.753a8.14 8.14 0 0 0 .753 3.641 8 8 0 0 0 6.495 4.564 5 5 0 0 1-.785-.377h-.01l-.12-.075a5.5 5.5 0 0 1-1.56-1.463A5.543 5.543 0 0 1 6.81 5.8l.01-.004.025-.012c.208-.098.62-.292 1.167-.285q.194.001.384.033a4 4 0 0 0-.993-.698l-.01-.005C6.348 4.282 5.199 4.263 5 4.263c-2.44 0-4.824 1.634-4.99 3.49m10.263 7.912q.133-.04.265-.084-.153.047-.307.086z"/>
                                <path d="M10.228 15.667a5 5 0 0 0 .303-.086l.082-.025a8.02 8.02 0 0 0 4.162-3.3.25.25 0 0 0-.331-.35q-.322.168-.663.294a6.4 6.4 0 0 1-2.243.4c-2.957 0-5.532-2.031-5.532-4.644q.003-.203.046-.399a4.54 4.54 0 0 0-.46 5.898l.003.005c.315.441.707.821 1.158 1.121h.003l.144.09c.877.55 1.721 1.078 3.328.996"/>
                            </svg>
                            &nbsp;Microsoft Edge<br/>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="4 4 100 100" fill="currentColor" className="bi bi-browser-opera">
                                <path d="M80 16.45a32.35 32.35 0 00-18-5.52c-10.69 0-20.14 5.47-26.77 13.71A40.77 40.77 0 0026.75 49v2.1a40.74 40.74 0 008.43 24.31C41.81 83.6 51.26 89.07 62 89.07a32.39 32.39 0 0018-5.52A44.77 44.77 0 0150 95h-2.16A45 45 0 0150 5h.15A44.92 44.92 0 0180 16.45zM95 50a44.87 44.87 0 01-14.57 33.1 21.39 21.39 0 01-11.15 3.16A22 22 0 0156.48 82c10.19-3.72 17.73-16.62 17.73-32s-7.48-28.28-17.68-32a22.15 22.15 0 0112.76-4.17 21.61 21.61 0 0111.35 3.27A44.87 44.87 0 0195 50z"/>
                            </svg>
                            &nbsp;Opera
                        </div>
                        <br/>
                        <p>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="bi bi-info-circle">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
                            </svg>&nbsp;
                            You can find out which browsers and versions support the Web MIDI API <a target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/API/Web_MIDI_API">here</a>.
                        </p>
                    </Card.Body>
                </Card>
            </div>
        </Container>
    )
}
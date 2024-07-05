import {Button, Modal} from "react-bootstrap";
import BrowserDetails from "../components/BrowserDetails.tsx";

interface AboutModalProps {
    visible: boolean;
    setVisible: (visible: boolean) => void;
}

export default function AboutModal({visible, setVisible}: AboutModalProps) {

    return (
        <Modal show={visible}>
            <Modal.Header closeButton onHide={() => setVisible(false)}>
                <Modal.Title>
                    <svg xmlns="http://www.w3.org/2000/svg" className="bi" height="32" viewBox="0 0 28 28" width="32" fill="currentColor">
                        <path d="m12 2a10 10 0 0 1 10 10 10 10 0 0 1 -10 10 10 10 0 0 1 -10-10 10 10 0 0 1 10-10m8.18 10c0-3.82-2.63-7.04-6.18-7.93v1.93h-4v-1.93c-3.55.89-6.18 4.11-6.18 7.93a8.18 8.18 0 0 0 8.18 8.18 8.18 8.18 0 0 0 8.18-8.18m-13.18-1.36a1.36 1.36 0 0 1 1.36 1.36 1.36 1.36 0 0 1 -1.36 1.36c-.75 0-1.36-.61-1.36-1.36s.61-1.36 1.36-1.36m10 0a1.36 1.36 0 0 1 1.36 1.36 1.36 1.36 0 0 1 -1.36 1.36 1.36 1.36 0 0 1 -1.36-1.36 1.36 1.36 0 0 1 1.36-1.36m-8.64 3.63a1.37 1.37 0 0 1 1.37 1.37c0 .75-.61 1.36-1.37 1.36a1.36 1.36 0 0 1 -1.36-1.36c0-.76.61-1.37 1.36-1.37m7.28 0c.75 0 1.36.61 1.36 1.37a1.36 1.36 0 0 1 -1.36 1.36c-.76 0-1.37-.61-1.37-1.36a1.37 1.37 0 0 1 1.37-1.37m-3.64 1.37a1.36 1.36 0 0 1 1.36 1.36 1.36 1.36 0 0 1 -1.36 1.36 1.36 1.36 0 0 1 -1.36-1.36 1.36 1.36 0 0 1 1.36-1.36z"/>
                    </svg>
                    {" "}MIDI Monitor
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p><strong>Version: </strong>{" " + APP_VERSION}</p>

                <BrowserDetails/>
                <hr/>
                <p>MIDI Monitor allows you to monitor MIDI events directly within your web browser.</p>
                <p>
                    The application makes use of the <a target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/API/Web_MIDI_API">Web MIDI API</a>.
                    Find out more detailed information about the <a href="https://midi.org/spec-detail" target="_blank">MIDI</a> specification and web browsers in the <a href="https://webaudio.github.io/web-midi-api/" target="_blank">WebAudio</a> specification.
                </p>
                <hr/>
                <p>
                    <svg fill="currentColor" width="40" height="40" viewBox="0 0 24 24"  role="img" xmlns="http://www.w3.org/2000/svg"><path d="M21.775 7.517H24v8.966h-2.225zm-8.562 0h6.506c.66 0 1.045.57 1.045 1.247v6.607c0 .84-.35 1.112-1.112 1.112h-6.439v-5.696h2.225v3.505h3.135V9.54h-5.36zm-3.235 0h2.19v8.966h-2.19zM0 7.517h7.854c.66 0 1.045.57 1.045 1.247v7.72H6.708V9.774H5.427v6.708H3.438V9.775H2.191v6.708H0Z"/></svg><br/>
                    MIDI is a trademark of The MIDI Manufacturers Association Inc., registered in countries worldwide
                    and of the Association of Musical Electronics Industry registered in Japan.
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => setVisible(false)}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}
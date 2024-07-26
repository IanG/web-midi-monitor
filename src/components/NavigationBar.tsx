
import {NavLink} from "react-router-dom";
import {Container, Nav, Navbar, Tooltip, OverlayTrigger, Button} from "react-bootstrap";
import {OverlayDelay} from "react-bootstrap/OverlayTrigger";

import {useState} from "react";
import DevicesModal from "../modals/DevicesModal.tsx";
import AboutModal from "../modals/AboutModal.tsx";
import ReferenceModal from "../modals/ReferenceModal.tsx";
import ThemeSwitcher from "./ThemeSwitcher.tsx";
import {useMIDIInputs, useMIDIOutputs} from "@react-midi/hooks";
import {Output} from "@react-midi/hooks/dist/types";

type NavigationBarProps = {
    showMIDINavigation: boolean;
}

export default function NavigationBar({ showMIDINavigation }: NavigationBarProps) {

    const[ aboutModalVisible, setAboutModalVisible ] = useState<boolean>(false);
    const[ referenceModalVisible, setReferenceModalVisible ] = useState<boolean>(false);
    const[ devicesModalVisible, setDevicesModalVisible ] = useState<boolean>(false);

    const { outputs} = useMIDIOutputs();
    const { inputs} = useMIDIInputs();

    const renderAboutTooltip = (props :any) => (
        <Tooltip id="button-tooltip" {...props}>
            About MIDI Monitor
        </Tooltip>
    );

    const renderDevicesTooltip = (props :any) => (
        <Tooltip id="devices-tooltip" {...props}>
            Show MIDI Devices
        </Tooltip>
    )

    const renderMessagesTooltip = (props :any) => (
        <Tooltip id="messages-tooltip" {...props}>
            Show MIDI Messages
        </Tooltip>
    )

    const renderReferenceTooltip = (props :any) => (
        <Tooltip id="messages-tooltip" {...props}>
            MIDI Reference
        </Tooltip>
    )

    const renderThemeSwitchTooltip = (props :any) => (
        <Tooltip id="theme-switch-tooltip" {...props}>
            Switch Light/Dark Mode
        </Tooltip>
    )

    const defaultOverLayDelay : OverlayDelay = {
        show: 100,
        hide: 50
    }

    function sendControlMessage(): void {
        console.log("Sending control message...");

        const outputDevice: number = 1;
        const channel :number = 0;
        // outputs[outputDevice].send([0xB0 | (channel - 1), 118, 127]);

        outputs[outputDevice].send([0x90, 0x5E, 0x7F]);
        outputs[outputDevice].send([0x90, 0x5D, 0x00]);
        outputs[outputDevice].send([0xF2, 0x00, 0x00]);
        outputs[outputDevice].send([0xFA, 0x00, 0x00]);

        // outputs[outputDevice].send([0x90, 0x5D, 0x00]);
        // outputs[outputDevice].send([0xFA]);
    }

    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary ps-0" sticky="top" fixed="top" bg="dark" >
                <Container fluid>
                    <Navbar.Brand as={NavLink} to="/">
                        <svg xmlns="http://www.w3.org/2000/svg" className="bi" height="32" viewBox="0 0 28 28" width="32"  fill="currentColor">
                            <path d="m12 2a10 10 0 0 1 10 10 10 10 0 0 1 -10 10 10 10 0 0 1 -10-10 10 10 0 0 1 10-10m8.18 10c0-3.82-2.63-7.04-6.18-7.93v1.93h-4v-1.93c-3.55.89-6.18 4.11-6.18 7.93a8.18 8.18 0 0 0 8.18 8.18 8.18 8.18 0 0 0 8.18-8.18m-13.18-1.36a1.36 1.36 0 0 1 1.36 1.36 1.36 1.36 0 0 1 -1.36 1.36c-.75 0-1.36-.61-1.36-1.36s.61-1.36 1.36-1.36m10 0a1.36 1.36 0 0 1 1.36 1.36 1.36 1.36 0 0 1 -1.36 1.36 1.36 1.36 0 0 1 -1.36-1.36 1.36 1.36 0 0 1 1.36-1.36m-8.64 3.63a1.37 1.37 0 0 1 1.37 1.37c0 .75-.61 1.36-1.37 1.36a1.36 1.36 0 0 1 -1.36-1.36c0-.76.61-1.37 1.36-1.37m7.28 0c.75 0 1.36.61 1.36 1.37a1.36 1.36 0 0 1 -1.36 1.36c-.76 0-1.37-.61-1.37-1.36a1.37 1.37 0 0 1 1.37-1.37m-3.64 1.37a1.36 1.36 0 0 1 1.36 1.36 1.36 1.36 0 0 1 -1.36 1.36 1.36 1.36 0 0 1 -1.36-1.36 1.36 1.36 0 0 1 1.36-1.36z"/>
                        </svg>
                        {' '}MIDI Monitor</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll"/>
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="ms-auto"
                            style={{maxHeight: '300px'}}
                            navbarScroll
                        >
                            {showMIDINavigation &&
                                <>
                                    {/*<Button onClick={() => sendControlMessage()}>Click Me</Button>*/}
                                    <OverlayTrigger placement="bottom" delay={defaultOverLayDelay} overlay={renderMessagesTooltip}>
                                        <Nav.Link as={NavLink} to="/messages" aria-label="Messages>">Messages</Nav.Link>
                                    </OverlayTrigger>
                                    <OverlayTrigger placement="bottom" delay={defaultOverLayDelay} overlay={renderDevicesTooltip}>
                                        <a className="nav-link" style={{cursor: "pointer"}} onClick={() => {setDevicesModalVisible(true);}}>Devices</a>
                                    </OverlayTrigger>

                                </>
                            }
                            <OverlayTrigger placement="bottom" delay={defaultOverLayDelay} overlay={renderReferenceTooltip}>
                                <a className="nav-link" style={{cursor: "pointer"}} onClick={() => { setReferenceModalVisible(true); }}>Reference</a>
                            </OverlayTrigger>
                            <OverlayTrigger placement="bottom" rootClose delay={defaultOverLayDelay} overlay={renderAboutTooltip}>
                                <a className="nav-link" style={{ cursor : "pointer" }} onClick={() => { setAboutModalVisible(true); }}>About</a>
                            </OverlayTrigger>
                            <OverlayTrigger placement="bottom" rootClose delay={defaultOverLayDelay} overlay={renderThemeSwitchTooltip}>
                                <div className="nav-link">
                                    <ThemeSwitcher/>
                                </div>
                            </OverlayTrigger>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <DevicesModal visible={devicesModalVisible} setVisible={setDevicesModalVisible}/>
            <ReferenceModal visible={referenceModalVisible} setVisible={setReferenceModalVisible}/>
            <AboutModal visible={aboutModalVisible} setVisible={setAboutModalVisible}/>
        </>
    )
}

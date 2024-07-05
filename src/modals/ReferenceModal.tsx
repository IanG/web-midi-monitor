import {Button, Modal, Tab, Table, Tabs} from "react-bootstrap";
import {getControlChangeMessage} from "../lib/controlchange.tsx";
import {getMidiMessageType} from "../lib/message.tsx";

import './ReferenceModal.css'

interface ReferenceModalProps {
    visible: boolean;
    setVisible: (visible: boolean) => void;
}

export default function ReferenceModal({visible, setVisible}: ReferenceModalProps) {
    const midiMessageTypeIds: number[] = [0x80, 0x90, 0xA0, 0xB0, 0xC0, 0xD0, 0xE0];
    const midiMessageIds: number[] = Array.from({length: 128}, (_, i) => i);

    function toHexString(value: number) {
        return "0x" + (value.toString(16).padStart(2, '0').toUpperCase());
    }

    return (
        <Modal show={visible} dialogClassName="reference-modal" contentClassName="reference-modal-height">
            <Modal.Header closeButton onHide={() => setVisible(false)}>
                <Modal.Title>
                <svg xmlns="http://www.w3.org/2000/svg"  className="bi bi-book" height="32" viewBox="0 -2 22 22" width="32" fill="currentColor">
                    <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783"/>
                </svg>MIDI Reference
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Tabs defaultActiveKey="message-types">
                    <Tab eventKey="message-types" title="Message Types">
                        <div className="reference-table-container">
                            <Table striped>
                                <thead style={{position: "sticky", top: "0px", margin: "0 0 0 0"}}>
                                <tr>
                                    <th style={{width: '60px'}}>ID</th>
                                    <th style={{width: '100px'}}>ID (Hex)</th>
                                    <th style={{width: '240px'}}>Name</th>
                                    <th>Description</th>
                                </tr>
                                </thead>
                                <tbody>
                                {midiMessageTypeIds.map((i) => (
                                    <tr key={"message-type-" + i}>
                                        <td>{i}</td>
                                        <td>{toHexString(i)}</td>
                                        <td>{getMidiMessageType(i).name}</td>
                                        <td>{getMidiMessageType(i).description}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </Table>
                        </div>
                    </Tab>
                    <Tab eventKey="control-change-message-types" title="Control Change Types">
                        <div className="reference-table-container">
                            <Table striped>
                                <thead style={{position: "sticky", top: "0px", margin: "0 0 0 0"}}>
                                <tr>
                                    <th style={{width: '60px'}}>CC ID</th>
                                    <th style={{width: '120px'}}>CC ID (Hex)</th>
                                    <th>Name</th>
                                    <th>Description</th>
                                </tr>
                                </thead>
                                <tbody>
                                {midiMessageIds.map((i) => (
                                    <tr key={"control-message-type-" + i}>
                                        <td>{i}</td>
                                        <td>{toHexString(i)}</td>
                                        <td style={{whiteSpace: "nowrap"}}>{getControlChangeMessage(i).name}</td>
                                        <td>{getControlChangeMessage(i).description}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </Table>
                        </div>
                    </Tab>
                </Tabs>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => setVisible(false)}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

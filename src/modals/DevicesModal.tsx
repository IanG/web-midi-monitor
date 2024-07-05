import {Button, Modal, Table} from "react-bootstrap";
import {useMIDIInputs, useMIDIOutputs} from "@react-midi/hooks";

interface DevicesModalProps {
    visible: boolean;
    setVisible: (visible: boolean) => void;
}

export default function DevicesModal({visible, setVisible}: DevicesModalProps) {
    const { inputs} = useMIDIInputs();
    const { outputs} = useMIDIOutputs();

    return (
        <Modal show={visible}>
            <Modal.Header closeButton onHide={() => setVisible(false)}>
                <Modal.Title>
                    <svg xmlns="http://www.w3.org/2000/svg" className="bi" height="32" viewBox="2 2 20 20" width="32" fill="currentColor">
                        <path d="M2.5 4C2.22386 4 2 4.22386 2 4.5V15.5C2 15.7761 2.22386 16 2.5 16H17.5C17.7761 16 18 15.7761 18 15.5V4.5C18 4.22386 17.7761 4 17.5 4H2.5ZM3 10H5V13.5C5 13.7761 5.22386 14 5.5 14C5.77614 14 6 13.7761 6 13.5V10H8V13.5C8 13.7761 8.22386 14 8.5 14C8.77614 14 9 13.7761 9 13.5V10H11V13.5C11 13.7761 11.2239 14 11.5 14C11.7761 14 12 13.7761 12 13.5V10H14V13.5C14 13.7761 14.2239 14 14.5 14C14.7761 14 15 13.7761 15 13.5V10H17V15H3V10ZM5.75 7.5C5.33579 7.5 5 7.16421 5 6.75C5 6.33579 5.33579 6 5.75 6C6.16421 6 6.5 6.33579 6.5 6.75C6.5 7.16421 6.16421 7.5 5.75 7.5ZM12 6.5C12 6.22386 12.2239 6 12.5 6H14.5C14.7761 6 15 6.22386 15 6.5C15 6.77614 14.7761 7 14.5 7H12.5C12.2239 7 12 6.77614 12 6.5ZM9 6.75146C9 7.16568 8.66421 7.50146 8.25 7.50146C7.83579 7.50146 7.5 7.16568 7.5 6.75146C7.5 6.33725 7.83579 6.00146 8.25 6.00146C8.66421 6.00146 9 6.33725 9 6.75146Z" /></svg>
                    {" "}Devices
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h1>Input Devices</h1>

                {inputs.length > 0 ? (
                    <Table>
                        <thead>
                        <tr>
                            <th>Manufacturer</th>
                            <th>Device Name</th>
                        </tr>
                        </thead>
                        <tbody>
                        {inputs.map(({ id, name, manufacturer }) => (
                            <tr key={id}>
                                <td>{manufacturer || "Unknown?"}</td>
                                <td>{name}</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                ) : (
                    <p>No input devices.</p>
                )}



                <h1>Output Devices ({outputs.length})</h1>

                {outputs.length > 0 ? (
                    <Table >
                        <thead>
                        <tr>
                            <th>Manufacturer</th>
                            <th>Device Name</th>
                        </tr>
                        </thead>
                        <tbody>
                        {outputs.map(({ id, name, manufacturer }) => (
                            <tr key={id}>
                                <td>{manufacturer || "Unknown?"}</td>
                                <td>{name}</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                ) : (
                    <p>No Output devices.</p>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => setVisible(false)}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}
import {ReactElement, useEffect, useState} from "react";
import {useMIDIMessage} from "@react-midi/hooks";
import {MIDIMessage} from "@react-midi/hooks/dist/types";
import {Badge, OverlayTrigger, ProgressBar, Table, Tooltip} from "react-bootstrap";
import {OverlayDelay} from "react-bootstrap/OverlayTrigger";
import {getMidiMessageType, MIDIMessageType, MIDIMessageTypeData} from "../lib/message.tsx";
import {ControlChangeMessageTypeData, getControlChangeMessage} from "../lib/controlchange.tsx";
import DecimalBinaryHexPicker, {DecimalBinaryHexViewType} from "../components/DecimalBinaryHexPicker.tsx";

import './messages.css'

const MIDIMessageBadgeLookup: Record<number, string> = {
    [MIDIMessageType.NoteOff]: "midi-message-note-off",
    [MIDIMessageType.NoteOn]: "midi-message-note-on",
    [MIDIMessageType.PolyphonicKeyPressureAfterTouch]: "midi-message-polyphonic-key-pressure",
    [MIDIMessageType.ControlChange]: "midi-message-control-change",
    [MIDIMessageType.ProgramChange]: "midi-message-program-change",
    [MIDIMessageType.ChannelPressureAfterTouch]: "info",
    [MIDIMessageType.PitchBendChange]: "midi-message-pitch-bend-change",
    [MIDIMessageType.Undefined]: "midi-message-undefined",
};

interface MIDIMessageData {
    eventDate: Date;
    timeStamp: number;
    data: number[];
    source: MIDIInput;
}

export default function Messages() {
    const [rawViewType, setRawViewType] = useState<DecimalBinaryHexViewType>(DecimalBinaryHexViewType.Decimal)
    const [midiMessages, setMidiMessages]: [MIDIMessageData[], (value: (prevState: MIDIMessageData[]) => MIDIMessageData[]) => void] = useState<MIDIMessageData[]>([]);

    const midiMessage: MIDIMessage | undefined = useMIDIMessage();
    useEffect(onMIDIMessage, [midiMessage]);

    function onMIDIMessage() {
        if (midiMessage) {
            console.log(midiMessage);

            const midiMessageData : MIDIMessageData = { eventDate: new Date(), timeStamp: midiMessage.timeStamp, data: midiMessage.data, source: midiMessage.srcElement };
            setMidiMessages((prevMIDIMessages: MIDIMessageData[]) => [midiMessageData, ...prevMIDIMessages]);
        }
    }

    function getMIDIMessageTimestamp(date: Date = new Date()): string {
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        const milliseconds = date.getMilliseconds().toString().padStart(3, '0');

        return `${hours}:${minutes}:${seconds}.${milliseconds}`;
    }

    function getMIDIMessageRawData(data: number[]): string {
        let formattedValues: string[] = [];
        data.forEach(num => formattedValues.push(formatNumber(num, rawViewType)));
        return formattedValues.join(",");
    }

    function formatNumber(value :number, type: DecimalBinaryHexViewType) : string {
        switch (type) {
            case DecimalBinaryHexViewType.Binary:
                return value.toString(2).padStart(8, "0").toUpperCase();
            case DecimalBinaryHexViewType.Hexadecimal:
                return "0x" + value.toString(16).toUpperCase();
            default:
            case DecimalBinaryHexViewType.Decimal:
                return value.toString();
        }
    }

    function getMIDIMessageChannel(data: number[]): number {
        return (data[0] & 0x0F) + 1;
    }

    function getMessageTypeBadge(data: number[]): ReactElement {
        const type:number = data[0] & 0xF0;
        const typeData: MIDIMessageTypeData = getMidiMessageType(type);

        return <Badge bg="" className={MIDIMessageBadgeLookup[typeData.type]}>{typeData.name}</Badge>
    }

    function getMIDIMessageData(data: number[]): string {
        const midiMessageType:number = data[0] & 0xF0;
        const messageType: MIDIMessageTypeData = getMidiMessageType(midiMessageType);

        let messageData:string = `${messageType.name} ${data[0] & 0xF0} (${toHexString(data[0] & 0xF0)}), `;

        switch (messageType.type)
        {
            case MIDIMessageType.NoteOff:
                messageData += `Note Value ${data[1] & 0x7f} (${toHexString(data[1] & 0x7F)})`;
                break;
            case MIDIMessageType.NoteOn:
                messageData += `Note Value ${data[1] & 0x7f} (${toHexString(data[1] & 0x7F)}), Velocity Value ${data[2] & 0x7F} (${toHexString(data[2] & 0x7F)})`;
                break;
            case MIDIMessageType.PolyphonicKeyPressureAfterTouch:
                messageData += `Note Value ${data[1] & 0x7F} (${toHexString(data[1] & 0x7F)}), Pressure Value ${data[2] & 0x7F} (${toHexString(data[2] & 0x7F)})`;
                break;
            case MIDIMessageType.ControlChange:
                const controlChangeMessage: ControlChangeMessageTypeData = getControlChangeMessage(data[1]);
                messageData += `CC# ${data[1] & 0x7F} (${toHexString(data[1] & 0x7F)}), Controller '${controlChangeMessage.name}', Controller Value ${data[2] & 0x7F}`;
                break;
            case MIDIMessageType.ProgramChange:
                messageData += `Program ${data[1]} (${toHexString(data[1] & 0x7F)})`;
                break;
            case MIDIMessageType.ChannelPressureAfterTouch:
                messageData += `Pressure ${data[1] & 0x7F} (${toHexString(data[0] & 0xF0)})`;
                break;
            case MIDIMessageType.PitchBendChange:
                messageData += `Pitch Value ${(data[2] & 0x7F << 7)+data[1] & 0x7F} (${toHexString((data[2] & 0x7F << 7)+data[1] & 0x7F)})`
                break;
            default:
                break;
        }

        return messageData;
    }

    function toHexString(value: number): string {
        return "0x" + value.toString(16).toUpperCase();
    }

    function midiNoteToNoteName(midiNote: number): string {
        if (midiNote < 0 || midiNote > 127) {
            return "Unknown";
        }

        const noteNames: string[] = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
        const noteIndex: number = midiNote % 12;
        const octave: number = Math.floor(midiNote / 12) - 1; // MIDI note 0 corresponds to C-1

        return `${noteNames[noteIndex]}${octave}`;
    }

    function getMusicalNoteBadge(data: number[]): ReactElement {

        const messageType:number = data[0] & 0xF0;
        const typeData: MIDIMessageTypeData = getMidiMessageType(messageType);

        if (typeData.type == MIDIMessageType.NoteOn || typeData.type == MIDIMessageType.NoteOff || typeData.type == MIDIMessageType.PolyphonicKeyPressureAfterTouch)
        {
            const midiNoteString: string = midiNoteToNoteName(data[1] & 0x7F);
            return <Badge bg="" className="music-note">{midiNoteString}</Badge>;
        }
        else
        {
            return <></>;
        }
    }

    function getMidiMessageSourceName(source: MIDIInput): ReactElement {
        return <Badge bg="" className="midi-message-source">{source.name}</Badge>;
    }

    function getVelocityPressure(data: number[]): ReactElement {
        const messageType:number = data[0] & 0xF0;
        const typeData: MIDIMessageTypeData = getMidiMessageType(messageType);

        if (typeData.type == MIDIMessageType.NoteOn || typeData.type == MIDIMessageType.PitchBendChange || typeData.type == MIDIMessageType.PolyphonicKeyPressureAfterTouch)
        {
            const value: number = data[2] & 0x7F;
            return <ProgressBar style={{ height: "23px" }} className="midi-velocity-pressure" min={0} max={127} now={value} label={value} />;
        }
        else
        {
            return <></>
        }
    }

    function getMidiNoteNumber(data: number[]): string {
        const messageType:number = data[0] & 0xF0;
        const typeData: MIDIMessageTypeData = getMidiMessageType(messageType);

        if (typeData.type == MIDIMessageType.NoteOn || typeData.type == MIDIMessageType.NoteOff || typeData.type == MIDIMessageType.PolyphonicKeyPressureAfterTouch)
        {
            return data[1].toString();
        }
        else
        {
            return "";
        }
    }

    function getRandomNumberBetween(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function generateRowIdentifier(timestamp: Date, data: number[]): string {
        return timestamp.valueOf()+ data[0].toString() + data[1].toString() + data[2].toString() + getRandomNumberBetween(1, 1000);
    }

    const renderClearTooltip = (props :any) => (
        <Tooltip id="messages-tooltip" {...props}>
            Clear existing messages
        </Tooltip>
    )

    const defaultOverLayDelay : OverlayDelay = {
        show: 100,
        hide: 50
    }

    return (
        <>
            <Table striped hover={true} className="midi-message-list">
                <thead style={{position: "sticky", top: "58px"}}>
                <tr>
                    <th style={{width: '120px'}}>Timestamp</th>
                    <th style={{width: '100px'}}>Device</th>
                    <th style={{width: '100px'}}><DecimalBinaryHexPicker title="Message"
                                                                         toolTipPrefix="View raw message data in"
                                                                         setViewType={setRawViewType}/></th>
                    <th style={{width: '10px'}}>Channel</th>
                    <th style={{width: '150px'}}>Message Type</th>
                    <th style={{width: '70px'}}>Note #</th>
                    <th style={{width: '70px'}}>Note ♫</th>
                    <th style={{width: '160px'}}>Velocity/Pressure</th>
                    <th>Message Data <span
                        style={{
                            float: "right",
                            fontWeight: "lighter"
                        }}>{midiMessages.length.toLocaleString() + " Messages "}
                        <OverlayTrigger trigger={["hover", "focus"]} placement="bottom" rootClose
                                        delay={defaultOverLayDelay} overlay={renderClearTooltip}>
                                <a className="badge text-bg-primary nav-link" style={{cursor: "pointer"}}
                                   onClick={() => {

                                       setMidiMessages(() => []);
                                   }}>Clear</a>
                            </OverlayTrigger>
                        </span></th>
                </tr>
                </thead>
                <tbody>
                {midiMessages.length > 0 ?
                    midiMessages.map(message => (
                            <tr key={generateRowIdentifier(message.eventDate, message.data)}
                                id={generateRowIdentifier(message.eventDate, message.data)}>
                                <td style={{fontFamily: "monospace"}}>{getMIDIMessageTimestamp(message.eventDate)}</td>
                                <td>{getMidiMessageSourceName(message.source)}</td>
                                <td style={{fontFamily: "monospace"}}>{getMIDIMessageRawData(message.data)}</td>
                                <td>{getMIDIMessageChannel(message.data)}</td>
                                <td>{getMessageTypeBadge(message.data)}</td>
                                <td style={{fontFamily: "monospace"}}>{getMidiNoteNumber(message.data)}</td>
                                <td>{getMusicalNoteBadge(message.data)}</td>
                                <td>{getVelocityPressure(message.data)}</td>
                                <td>{getMIDIMessageData(message.data)}</td>
                            </tr>
                        )
                    ) : (
                        <tr key="no-messages" id="no-messages">
                            <td colSpan={9}>No messages received from MIDI devices yet.</td>
                        </tr>
                    )}

                </tbody>
            </Table>
        </>
    )
}
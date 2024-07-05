export enum MIDIMessageType {
    NoteOff = 0x80,
    NoteOn = 0x90,
    PolyphonicKeyPressureAfterTouch = 0xA0,
    ControlChange = 0xB0,
    ProgramChange = 0xC0,
    ChannelPressureAfterTouch = 0xD0,
    PitchBendChange = 0xE0,
    Undefined = -1
}

export function getMidiMessageType(messageId: number): MIDIMessageTypeData {
    const midiMessageTypeData: MIDIMessageTypeData = MIDIMessageTypeLookup[messageId];
    return midiMessageTypeData || MIDIMessageTypeLookup[MIDIMessageType.Undefined];
}

const MIDIMessageTypeLookup: Record<number, MIDIMessageTypeData> = {
    [MIDIMessageType.NoteOff]: { type: MIDIMessageType.NoteOff, name: "Note Off", description: "Note Off event. This message is sent when a note is released (end)"},
    [MIDIMessageType.NoteOn]: { type: MIDIMessageType.NoteOn, name: "Note On", description: "Note On event. This message is sent when a note is depressed (start)" },
    [MIDIMessageType.PolyphonicKeyPressureAfterTouch]: { type: MIDIMessageType.PolyphonicKeyPressureAfterTouch, name: "Polyphonic Key Pressure", description: "Polyphonic Key Pressure (Aftertouch). This message is most often sent by pressing down on the key after it “bottoms out”." },
    [MIDIMessageType.ControlChange]: { type: MIDIMessageType.ControlChange, name: "Control Change", description: "Control Change. This message is sent when a controller value changes. Controllers include devices such as pedals and levers. Controller numbers 120-127 are reserved as “Channel Mode Messages" },
    [MIDIMessageType.ProgramChange]: { type: MIDIMessageType.ProgramChange, name: "Program Change", description: "Program Change. This message sent when the patch number changes." },
    [MIDIMessageType.ChannelPressureAfterTouch]: { type: MIDIMessageType.ChannelPressureAfterTouch, name: "Channel Pressure (After-touch)", description: "Channel Pressure (After-touch). This message is most often sent by pressing down on the key after it “bottoms out”. This message is different from polyphonic after-touch. Use this message to send the single greatest pressure value (of all the current depressed keys)." },
    [MIDIMessageType.PitchBendChange]: { type: MIDIMessageType.PitchBendChange, name: "Pitch Bend Change", description: "Pitch Bend Change. This message is sent to indicate a change in the pitch bender (wheel or lever, typically)." },
    [MIDIMessageType.Undefined]: { type: MIDIMessageType.Undefined, name: "Undefined", description: "Undefined in the MIDI specification" },
};

export type MIDIMessageTypeData = {
    type: MIDIMessageType;
    name: string;
    description: string
};
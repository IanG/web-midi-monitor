# web-midi-monitor

This is an experiment which makes use of the [Web Midi API](https://developer.mozilla.org/en-US/docs/Web/API/Web_MIDI_API).

This React application allows you to monitor [MIDI](https://en.wikipedia.org/wiki/MIDI) messages from MIDI-enabled devices that are connected to your computer.  The application decodes each 3 byte message that is received and translates the message to what it really means based upon the MIDI specification.  The application can show:

- Message Timestamp
- Source Device
- The RAW 3 bytes from the MIDI message in either binary, decimal or hexadecimal
- The MIDI channel
- The MIDI message type
- The MIDI note number (if the message is a note on/off message)
- The Music ♫ (octave, note sharp/flat)
- The Velocity of the note
- A Textual representation of the message using information from the MIDI specification

This application can serve as a useful tool for diagnosing MIDI problems and understanding what MIDI messages are sent by physical buttons that exist on your device (e.g. the 'play' button transport control, the pitch wheel etc.)

The application `Devices` modal can be used to show what devices are connected.
The application `Reference` model dynamically creates the MIDI message and control change message definitions from internal data required to decode any message that is received.
The application `About` modal shows browser details (not all browsers support MIDI) along with useful MIDI-related links.


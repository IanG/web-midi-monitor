import {useEffect, useState} from 'react'
import {Container} from "react-bootstrap";
import {Outlet} from "react-router-dom";
import {MIDIProvider} from "@react-midi/hooks";
import NavigationBar from "./components/NavigationBar.tsx";
import MIDINotSupportedCard from "./components/MIDINotSupportedCard.tsx";
import {ThemeProvider} from "./context/ThemeContext.tsx";
import './App.css'
export default function App() {
    const [browserSupportsMIDI, setBrowserSupportsMIDI] = useState(false);

    useEffect(() => {
       if (navigator.requestMIDIAccess) setBrowserSupportsMIDI(true);
    });

    return (
        <>
            <ThemeProvider>
            {browserSupportsMIDI ? (
                <MIDIProvider>
                    <NavigationBar showMIDINavigation={browserSupportsMIDI}/>
                        <Container fluid className="no-padding-container">
                            <div style={{padding: "0px"}}>
                                <Outlet/>
                            </div>
                        </Container>
                </MIDIProvider>

                ) : (
                <>
                    <NavigationBar showMIDINavigation={browserSupportsMIDI}/>
                    <Container fluid className="no-padding-container">
                        <MIDINotSupportedCard/>
                    </Container>
                </>
            )}
            </ThemeProvider>
        </>
    )
}


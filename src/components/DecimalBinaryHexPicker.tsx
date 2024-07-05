import {useEffect, useState} from "react";
import {ButtonGroup, OverlayTrigger, ToggleButton, Tooltip} from "react-bootstrap";
import {OverlayDelay} from "react-bootstrap/OverlayTrigger";
import './DecimalBinaryHexPicker.css'

export enum DecimalBinaryHexViewType {
    Decimal = 1,
    Binary = 2,
    Hexadecimal = 3
}

export interface DecimalBinaryHexPickerProps {
    title: string;
    toolTipPrefix: string
    setViewType: (decimalBinaryHexViewType: DecimalBinaryHexViewType) => void;
}

export default function DecimalBinaryHexPicker({title, toolTipPrefix, setViewType}: DecimalBinaryHexPickerProps) {
    const [activeView, setActiveView] = useState<DecimalBinaryHexViewType>(DecimalBinaryHexViewType.Decimal)

    useEffect(onActiveViewChange, [activeView]);

    function onActiveViewChange() {
        setViewType(activeView)
    }

    const renderViewDecimalToolTip = (props :any) => (
        <Tooltip id="view-decimal-tool-tip" {...props}>
            {toolTipPrefix + " Decimal"}
        </Tooltip>
    )

    const renderViewBinaryToolTip = (props :any) => (
        <Tooltip id="view-binary-tool-tip" {...props}>
            {toolTipPrefix + " Binary"}
        </Tooltip>
    )

    const renderViewHexToolTip = (props :any) => (
        <Tooltip id="view-hex-tool-tip" {...props}>
            {toolTipPrefix + " Hexadecimal"}
        </Tooltip>
    )

    const defaultOverLayDelay : OverlayDelay = {
        show: 100,
        hide: 50
    }

    return (
        <>
            {title}&nbsp;
            <ButtonGroup>
                <OverlayTrigger placement="bottom" rootClose delay={defaultOverLayDelay} overlay={renderViewBinaryToolTip}>
                    <ToggleButton id="1" key="1" className="btn-xsmall" variant="outline-secondary" type="radio" value="DEC"
                        checked={activeView == DecimalBinaryHexViewType.Binary}
                        onClick={() => setActiveView(DecimalBinaryHexViewType.Binary)}>BIN</ToggleButton>
                </OverlayTrigger>
                <OverlayTrigger placement="bottom" rootClose delay={defaultOverLayDelay} overlay={renderViewDecimalToolTip}>
                    <ToggleButton id="2" key="2" className="btn-xsmall" variant="outline-secondary" type="radio" value="BIN"
                        checked={activeView == DecimalBinaryHexViewType.Decimal}
                        onClick={() => setActiveView(DecimalBinaryHexViewType.Decimal)}>DEC</ToggleButton>
                </OverlayTrigger>
                <OverlayTrigger placement="bottom" rootClose delay={defaultOverLayDelay} overlay={renderViewHexToolTip}>
                    <ToggleButton id="3" key="3" className="btn-xsmall" variant="outline-secondary" type="radio" value="HEX"
                        checked={activeView == DecimalBinaryHexViewType.Hexadecimal }
                        onClick={() => setActiveView(DecimalBinaryHexViewType.Hexadecimal)}>HEX</ToggleButton>
                </OverlayTrigger>
            </ButtonGroup>
        </>
    );
}
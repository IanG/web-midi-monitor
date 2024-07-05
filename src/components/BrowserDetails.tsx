import {useEffect, useState} from "react";
import UAParser from "ua-parser-js";

export default function BrowserDetails() {

    const [browserName, setBrowserName] = useState<string | undefined>();
    const [browserVersion, setBrowserVersion] = useState<string | undefined>();
    const [osName, setOsName] = useState<string | undefined>();
    const [osVersion, setOsVersion] = useState<string | undefined>();
    const [deviceVendor, setDeviceVendor] = useState<string | undefined>();
    const [deviceModel, setDeviceModel] = useState<string | undefined>();

    useEffect(() => {
        const parser = new UAParser();

        parser.setUA(navigator.userAgent);

        const result = parser.getResult();

        setBrowserName(result.browser.name);
        setBrowserVersion(result.browser.version);
        setOsName(result.os.name);
        setOsVersion(result.os.version);
        setDeviceVendor(result.device.vendor);
        setDeviceModel(result.device.model)

    }, []);

    return (
        <p>
            <strong>Browser: </strong>{browserName} {browserVersion}<br/>
            <strong>Device: </strong>{deviceVendor} {deviceModel}<br/>
            <strong>Operating System: </strong>{osName} {osVersion}
        </p>
    )
}
import React from "react";
import {ComponentPreview, Previews} from "@react-buddy/ide-toolbox-next";
import {PaletteTree} from "./palette";
import Claim from "../pages/claim/[walletAddress]";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/Claim">
                <Claim/>
            </ComponentPreview>
        </Previews>
    );
};

export default ComponentPreviews;
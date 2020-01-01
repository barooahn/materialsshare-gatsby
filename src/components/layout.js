import React from "react";
import AppBar from "./app-bar";

export default ({ children }) => (
    <div>
    <AppBar></AppBar>
        <div style={{ margin: `3rem auto`, maxWidth: `1920`, padding: `1rem` }}>
            {children}
        </div>
    </div>
)
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Tasks from './Tasks';

function Content() {
    const [selectedTab, setSelectedTab] = useState("INBOX");
    return (
        <section className="content">
            <Sidebar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
            <Tasks />
        </section>
    )
}

export default Content

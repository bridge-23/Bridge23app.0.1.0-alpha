//../src/layouts/MobileLayout.tsx
import React, { useState } from 'react';
import ChannelList from '@sendbird/uikit-react/ChannelList';
import Channel from '@sendbird/uikit-react/Channel';
import {GroupChannel} from "@sendbird/chat/groupChannel";

const PANELS  = {
    CHANNEL_LIST: 'CHANNEL_LIST',
    CHANNEL:'CHANNEL',
    CHANNEL_SETTINGS:'CHANNEL_SETTINGS',
    MESSAGE_SEARCH:'MESSAGE_SEARCH',
}

const MobileLayout: React.FC = () => {
    const [panel, setPanel] = useState(PANELS.CHANNEL_LIST);
    const [currentChannel, setCurrentChannel] = useState<GroupChannel | null>(null);

    return (
        <div className="mobile-layout">
            {
                panel === PANELS.CHANNEL_LIST &&
                <ChannelList
                    onChannelSelect={(channel) => {
                        setCurrentChannel(channel);
                        setPanel(PANELS.CHANNEL);
                    }}
                />
            }
            {
                panel === PANELS.CHANNEL &&
                <Channel
                    channelUrl={currentChannel?.url || ''}
                    onBackClick={() => {
                        setPanel(PANELS.CHANNEL_LIST);
                    }}
                    onChatHeaderActionClick={() => {
                        setPanel(PANELS.CHANNEL_SETTINGS);
                    }}
                />
            }
            {
                panel === PANELS.CHANNEL_SETTINGS && (
                    <>Channel Settings...</>
                )
            }
        </div>
    )
}

export default MobileLayout;

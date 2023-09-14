// ../src/layouts/DesktopLayout.tsx
import React from 'react';
import ChannelList from '@sendbird/uikit-react/ChannelList';
import Channel from '@sendbird/uikit-react/Channel';
import { GroupChannel } from "@sendbird/chat/groupChannel";

const PANELS = {
    CHANNEL_LIST: 'CHANNEL_LIST',
    CHANNEL: 'CHANNEL',
    CHANNEL_SETTINGS: 'CHANNEL_SETTINGS',
    MESSAGE_SEARCH: 'MESSAGE_SEARCH',
}

const DesktopLayout: React.FC<{ currentChannel?: GroupChannel }> = ({ currentChannel }) => {
    return (
        <div className="desktop-layout">
            <div className="channel-list-section">
                <ChannelList
                    onChannelSelect={(channel) => {
                        // Handle channel selection logic if needed.
                    }}
                />
            </div>
            <div className="channel-section">
                {currentChannel &&
                    <Channel
                        channelUrl={currentChannel?.url || ''}
                        onChatHeaderActionClick={() => {
                            // Handle header actions if needed.
                        }}
                    />
                }
            </div>
            <div className="settings-section">
                { /* Channel settings or other components can go here */ }
            </div>
        </div>
    )
}

export default DesktopLayout;

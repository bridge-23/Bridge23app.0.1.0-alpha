import React, { useState } from 'react';
import ChannelList from '@sendbird/uikit-react/ChannelList';
import Channel from '@sendbird/uikit-react/Channel';
import { GroupChannel } from "@sendbird/chat/groupChannel";
import ChannelSettings from '@sendbird/uikit-react/ChannelSettings';
import { ChannelSettingsProvider } from '@sendbird/uikit-react/ChannelSettings/context';
import { MessageSearchProvider } from '@sendbird/uikit-react/MessageSearch/context';
import MessageSearchUI from '@sendbird/uikit-react/MessageSearch/components/MessageSearchUI';

const PANELS = {
    CHANNEL_LIST: 'CHANNEL_LIST',
    CHANNEL: 'CHANNEL',
    CHANNEL_SETTINGS: 'CHANNEL_SETTINGS',
    MESSAGE_SEARCH: 'MESSAGE_SEARCH',
}

const DesktopLayout: React.FC<{ currentChannel?: GroupChannel }> = ({ currentChannel }) => {
    const [selectedChannel, setSelectedChannel] = React.useState<GroupChannel | null>(null);
    const [activePanel, setActivePanel] = useState(PANELS.CHANNEL_LIST);

    return (
        <MessageSearchProvider channelUrl={(currentChannel || selectedChannel)?.url || ''}>
            <div className="desktop-layout" style={{ display: 'flex' }}>
                <div className="channel-list-section" style={{ width: '300px', borderRight: '1px solid gray', height: '100vh', overflowY: 'auto' }}>
                    <ChannelList
                        onChannelSelect={(channel) => {
                            setSelectedChannel(channel);
                            setActivePanel(PANELS.CHANNEL);
                        }}
                    />
                </div>

                {activePanel === PANELS.CHANNEL && (currentChannel || selectedChannel) &&
                    <div className="channel-section" style={{ flex: 1, overflowY: 'auto' }}>
                        <Channel
                            channelUrl={(currentChannel || selectedChannel)?.url || ''}
                            onChatHeaderActionClick={() => {
                                setActivePanel(PANELS.MESSAGE_SEARCH); // Switch to search mode on header action click
                            }}
                        />
                    </div>
                }

                {activePanel === PANELS.CHANNEL_SETTINGS &&
                    <ChannelSettingsProvider channelUrl={(currentChannel || selectedChannel)?.url || ''}>
                        <ChannelSettings
                            channelUrl={(currentChannel || selectedChannel)?.url || ''}
                            onCloseClick={() => {
                                setActivePanel(PANELS.CHANNEL); // Go back to channel after closing settings
                            }}
                        />
                    </ChannelSettingsProvider>
                }

                {activePanel === PANELS.MESSAGE_SEARCH &&
                    <div className="search-section">
                        <MessageSearchUI />
                    </div>
                }
            </div>
        </MessageSearchProvider>
    );
}

export default DesktopLayout;

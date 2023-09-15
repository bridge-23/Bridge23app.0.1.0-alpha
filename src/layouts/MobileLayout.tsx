import React, { useState } from 'react';
import ChannelList from '@sendbird/uikit-react/ChannelList';
import Channel from '@sendbird/uikit-react/Channel';
import ChannelSettings from '@sendbird/uikit-react/ChannelSettings';
import { ChannelSettingsProvider } from '@sendbird/uikit-react/ChannelSettings/context';
import { GroupChannel } from "@sendbird/chat/groupChannel";
import EditUserProfileUI from '@sendbird/uikit-react/EditUserProfile/components/EditUserProfileUI';

const PANELS = {
    CHANNEL_LIST: 'CHANNEL_LIST',
    CHANNEL: 'CHANNEL',
    CHANNEL_SETTINGS: 'CHANNEL_SETTINGS',
    MESSAGE_SEARCH: 'MESSAGE_SEARCH',
    EDIT_USER_PROFILE: 'EDIT_USER_PROFILE',
};

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
                panel === PANELS.CHANNEL_SETTINGS &&
                <ChannelSettingsProvider channelUrl={currentChannel?.url || ''}>
                    <ChannelSettings
                        channelUrl={currentChannel?.url || ''}
                        onCloseClick={() => {
                            setPanel(PANELS.CHANNEL_LIST);
                        }}
                    />
                </ChannelSettingsProvider>
            }
            {
                panel === PANELS.EDIT_USER_PROFILE &&
                <div>
                    <button onClick={() => setPanel(PANELS.CHANNEL_LIST)}>Back to Channel List</button>
                    <EditUserProfileUI
                        // Other props and logic for the EditUserProfileUI.
                    />
                </div>
            }
        </div>
    );
}

export default MobileLayout;



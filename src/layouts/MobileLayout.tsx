//..src/layouts/MobileLayout.tsx
import React, { useState } from 'react';
import ChannelList from '@sendbird/uikit-react/ChannelList';
import Channel from '@sendbird/uikit-react/Channel';
import { useChannelListContext, ChannelListProvider } from '@sendbird/uikit-react/ChannelList/context';
import ChannelSettings from '@sendbird/uikit-react/ChannelSettings';
import { ChannelSettingsProvider } from '@sendbird/uikit-react/ChannelSettings/context';
import { GroupChannel } from "@sendbird/chat/groupChannel";
import { EditUserProfileProvider } from '@sendbird/uikit-react/EditUserProfile/context';
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
    const channelListState = useChannelListContext();
    const handleProfileEditCancel = () => {
        setPanel(PANELS.CHANNEL_LIST);
    };

    const handleThemeChange = (theme: 'Light' | 'Dark') => {
        // Handle theme change logic if necessary
    };

    const handleEditProfile = () => {
        // Logic to handle when profile is edited.
    };


    return (
        <div className="mobile-layout">

            {
                panel === PANELS.CHANNEL_LIST &&
                <ChannelListProvider >
                <ChannelList
                    onChannelSelect={(channel) => {
                        setCurrentChannel(channel);
                        setPanel(PANELS.CHANNEL);
                    }}
                />
                </ChannelListProvider>
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
                <EditUserProfileProvider onCancel={handleProfileEditCancel} onThemeChange={handleThemeChange} onEditProfile={handleEditProfile}>
                    <div>
                        <button onClick={() => setPanel(PANELS.CHANNEL_LIST)}>Back to Channel List</button>
                        <EditUserProfileUI />
                    </div>
                </EditUserProfileProvider>
            }
        </div>
    );
}

export default MobileLayout;



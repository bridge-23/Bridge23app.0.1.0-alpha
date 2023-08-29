import SendbirdApp from '@sendbird/uikit-react/App';
const APP_ID = "1A83BF20-C8EB-434A-A26E-956E821AC431";
const USER_ID = "930282";

const ChatComponent = () => (
    <div style={{ height: "100vh", width: "100vw" }}>
        <SendbirdApp appId={APP_ID} userId={USER_ID} />
    </div>
);

export default ChatComponent;
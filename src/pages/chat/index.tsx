import dynamic from "next/dynamic";
import '@sendbird/uikit-react/dist/index.css';

const DynamicAppWithNoSSR = dynamic(() => import("../../components/ChatComponent"), {
    ssr: false,
    loading: () => <p>...</p>
});

export default function Chat() {
    return (
        <main>
            <DynamicAppWithNoSSR />
        </main>
    );
}
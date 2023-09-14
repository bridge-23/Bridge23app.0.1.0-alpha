//..src/pages/_document.tsx
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <link rel="manifest" href="/manifest.json" />
                    <link rel="apple-touch-icon" href="/icon.png"></link>
                    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"></meta>
                    <link rel="stylesheet" href="@fontsource/roboto/300.css" />
                    <link rel="stylesheet" href="@fontsource/roboto/400.css" />
                    <link rel="stylesheet" href="@fontsource/roboto/500.css" />
                    <link rel="stylesheet" href="@fontsource/roboto/700.css" />
                </Head>
                <body>
                <Main />
                <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
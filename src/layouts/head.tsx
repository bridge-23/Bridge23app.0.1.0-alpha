//..src/layouts/head.tsx
import React from "react";
import NextHead from "next/head";

export const Head = () => {
    return (
        <NextHead>
            {/* Character Set */}
            <meta charSet="utf-8" />

            {/* Page Title */}
            <title>Bridge 23</title>

            {/* Responsive Design */}
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>

            {/* Description for SEO */}
            <meta name="description" content="Bridge 23 JOIN TODAY + MAKE YOUR SPEND COUNT" />

            {/* Favicons */}
            <link rel="icon" href="/favicon.ico" />
            <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

            {/* External Fonts (Example with Google Fonts) */}

            {/* Open Graph Protocol for Social Media */}
            <meta property="og:type" content="website" />
            <meta property="og:title" content="Bridge 23" />
            <meta property="og:description" content="Bridge 23 JOIN TODAY + MAKE YOUR SPEND COUNT" />
            <meta property="og:image" content="/path/to/your-image.jpg" />
            <meta property="og:url" content="https://your-website-url.com" />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="Bridge 23" />
            <meta name="twitter:description" content="Bridge 23 JOIN TODAY + MAKE YOUR SPEND COUNT" />
            <meta name="twitter:image" content="/path/to/your-image.jpg" />

            {/* Additional tags can be added as necessary */}

        </NextHead>
    );
};

export default Head;



// src/theme/index.js
import { extendTheme } from '@chakra-ui/react';
import settings from '../config/settings';

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const theme = extendTheme({
    direction: "rtl",  // Set default direction to RTL
    colors: {
        brand: {
            50: "#f5f7ff",
            100: "#ebedff",
            200: "#c5cbff",
            300: "#9eaaff",
            400: "#7888ff",
            500: "#5266ff",
            600: "#404fcc",
            700: "#303999",
            800: "#202466",
            900: "#101233",
        },
    },
    styles: {
        global: {
            body: {
                bg: "brand.50",
                color: "gray.800",
            },
        },
    },

    fonts: {
        heading: `${settings.fontFamily}, sans-serif`, // Use Vazir as the custom font for headings
        body: `${settings.fontFamily}, sans-serif`,    // Use Vazir as the custom font for body text
    },
    config
});

export default theme;
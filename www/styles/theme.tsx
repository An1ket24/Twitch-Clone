import { theme as defaultTheme } from '@chakra-ui/core'

console.log('defaultTheme.colors', defaultTheme.colors)
export const theme = {
    ...defaultTheme,
    radii: { ...defaultTheme.radii, xl: '1rem', xxl: '2rem' },
    fonts: {
        ...defaultTheme.fonts,
        body:
            '"Ubuntu",system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji',
        heading:
            '"Ubuntu",system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji',
    },
    colors: {
        ...defaultTheme.colors,
        grayButton: {
            '50': '#F7FAFC',
            '100': '#EDF2F7',
            '200': '#E2E8F0',
            '500': '#cccccc',
            '600': '#bbbbbb',
            '700': '#aaaaaa',
            '650': '#4A5568',
            '750': '#2D3748',
            '800': '#1A202C',
            '900': '#171923',
        },
        publishButton: {
            '50': '#DF2080',
            '100': '#DF2080',
            '200': '#DF2080',
            '500': '#DF2080',
            '600': '#DF2080',
            '700': '#DF2080',
            '650': '#DF2080',
            '750': '#DF2080',
            '800': '#DF2080',
            '900': '#DF2080',
        },
    },
    icons: {
        ...defaultTheme.icons,
        head: {
            path: (
                <path
                    d='M16.9583 3.87499C22.6458 3.87499 27.1667 8.39583 27.1667 14.0833C27.1667 18.1667 24.8333 21.6667 21.3333 23.2708V30.125H11.125V25.75H9.66667C8.0625 25.75 6.75 24.4375 6.75 22.8333V18.4583H4.5625C3.97916 18.4583 3.54166 17.7292 3.97916 17.2917L6.75 13.6458C7.04167 8.10416 11.4167 3.87499 16.9583 3.87499ZM16.9583 0.958328C10.25 0.958328 4.70833 5.91666 3.97916 12.4792L1.64583 15.5417C0.770831 16.7083 0.770831 18.1667 1.35416 19.3333C1.9375 20.3542 2.8125 21.0833 3.83333 21.2292V22.8333C3.83333 25.6042 5.72917 27.7917 8.20833 28.5208V33.0417H24.25V25.0208C27.8958 22.5417 30.0833 18.6042 30.0833 14.0833C30.0833 6.79166 24.25 0.958328 16.9583 0.958328ZM19.875 12.625L15.3542 21.375L16.2292 15.5417H13.1667L16.2292 8.24999H19.875L17.6875 12.625H19.875Z'
                    fill='black'
                />
            ),
            viewBox: '0 0 31 34',
        },
    },

    breakpoints: ['1000px'],
}

let { icons, ...printTheme } = theme

// console.log(JSON.stringify(printTheme, null, 2))

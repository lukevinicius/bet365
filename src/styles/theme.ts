import { extendTheme } from '@chakra-ui/react'

const activeLabelStyles = {
  transform: 'scale(0.85) translateY(-30px)',
}

export const theme = extendTheme({
  components: {
    Form: {
      variants: {
        floating: {
          container: {
            _focusWithin: {
              label: {
                ...activeLabelStyles,
              },
            },
            'input:not(:placeholder-shown) + label, .chakra-select__wrapper + label':
              {
                ...activeLabelStyles,
              },
            label: {
              top: 0,
              left: 0,
              zIndex: 2,
              position: 'absolute',
              pointerEvents: 'none',
              mx: 3,
              px: 1,
              my: 2,
              transformOrigin: 'left top',
            },
          },
        },
      },
    },
  },
  colors: {
    gray: {
      '900': '#181b23',
      '800': '#1f2029',
      '700': '#353646',
      '600': '#4b4d63',
      '500': '#616480',
      '400': '#797d9a',
      '300': '#9699b0',
      '200': '#b3b5c6',
      '100': '#d1d2dc',
      '50': '#eeeef2',
    },
    white: '#f8f9fa',
    color: {
      primary: '#181b23',
      primaryDark: '#283CA5',
      blue: {
        '900': '#053045',
        '100': '#054061',
      },
      secundary: '#212121',
      success: '#43A047',
      danger: '#E53935',
      warning: '#FFB300',
      odd: '#FFDF1B',
      title: '#363F5F',
      text: '#A0A0A0',
      shape: '#FFFFFF',
      background: '#2B2B2B',
    },
  },
  fonts: {
    heading: 'DM_Sans',
    body: 'DM_Sans',
  },
  styles: {
    global: {
      body: {
        bg: '#444444',
        color: 'gray.50',
      },
    },
  },
})

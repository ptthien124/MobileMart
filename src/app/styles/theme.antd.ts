import { theme, type ThemeConfig } from 'antd'

const { defaultAlgorithm, darkAlgorithm } = theme

export const themeColors = {
  primary: '#da2e9a',
  secondary: '#313131'
}

export const defaultTheme: ThemeConfig = {
  algorithm: defaultAlgorithm,
  token: {
    colorPrimary: themeColors.primary,
    colorText: themeColors.secondary,
    colorBorder: '#d3d3e1',
    colorTextPlaceholder: '#d3d3e1',
    controlOutline: 'rgba(22, 119, 255, 0.1)',
    controlHeight: 36,
    controlHeightLG: 44,
    controlHeightSM: 30
  },
  components: {
    Button: {
      algorithm: true,
      primaryShadow: 'none',
      colorBgSolid: themeColors.secondary,
      colorBgSolidHover: '#393d73',
      colorBgSolidActive: '#121240',
      colorLink: themeColors.primary,
      paddingInline: 14,
      controlHeight: 32,
      borderRadius: 4
    },
    Input: {
      algorithm: true,
      colorPrimary: themeColors.secondary,
      colorPrimaryHover: themeColors.secondary,
      controlOutline: 'rgba(22, 119, 255, 0.1)'
    },
    DatePicker: {
      algorithm: true,
      colorPrimary: themeColors.secondary,
      colorPrimaryHover: themeColors.secondary,
      controlOutline: 'rgba(22, 119, 255, 0.1)'
    },
    Select: {
      algorithm: true,
      activeOutlineColor: 'rgba(22, 119, 255, 0.1)',
      hoverBorderColor: themeColors.secondary,
      activeBorderColor: themeColors.secondary,
      optionSelectedBg: 'rgba(22, 119, 255, 0.1)'
    },
    Form: {
      algorithm: true,
      itemMarginBottom: 30,
      verticalLabelPadding: '0 0 8px 4px'
    },
    Breadcrumb: {
      algorithm: true,
      fontSize: 16,
      separatorMargin: 16,
      linkColor: themeColors.secondary,
      lastItemColor: '#da2e9a',
      separatorColor: '#23256733',
      controlItemBgHover: 'transparent'
    }
  }
}

export const darkTheme: ThemeConfig = {
  algorithm: darkAlgorithm,
  token: {
    colorPrimary: themeColors.secondary,
    colorText: themeColors.secondary,
    colorBorder: '#d3d3e1',
    colorTextPlaceholder: '#d3d3e1',
    controlOutline: 'rgba(22, 119, 255, 0.1)',
    controlHeight: 36,
    controlHeightLG: 44,
    controlHeightSM: 30
  },
  components: {
    Button: {
      primaryShadow: 'none',
      colorBgSolid: themeColors.secondary,
      colorBgSolidHover: '#393d73',
      colorBgSolidActive: '#121240'
    },
    Input: {
      colorPrimary: themeColors.secondary,
      colorPrimaryHover: themeColors.secondary,
      controlOutline: 'rgba(22, 119, 255, 0.1)',
      colorBgContainer: 'white'
    },
    DatePicker: {
      colorPrimary: themeColors.secondary,
      colorPrimaryHover: themeColors.secondary,
      controlOutline: 'rgba(22, 119, 255, 0.1)'
    },
    Select: {
      activeOutlineColor: 'rgba(22, 119, 255, 0.1)',
      hoverBorderColor: themeColors.secondary,
      activeBorderColor: themeColors.secondary,
      optionSelectedBg: 'rgba(22, 119, 255, 0.1)'
    },
    Form: {
      itemMarginBottom: 30,
      verticalLabelPadding: '0 0 8px 4px'
    }
  }
}

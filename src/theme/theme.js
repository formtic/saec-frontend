// theme.js
export const themeOverrides = {
    Layout: {
        siderToggleButtonColor: '#0D5A79', // Color de fondo del botón
        siderToggleButtonIconColor: '#f1f1f1', // Color del ícono (flecha)
        siderHoverColor: '#0D5A79', // Color al pasar el mouse
        siderToggleButtonBorder: '2px solid '
    },
    Card: {
        borderRadius: '10px',
        borderColor: '#0D5A79',
        color: '#f1f1f1',
        textColor: '#1F343C',
        titleTextColor: '#1F343C',
    },
    Menu: {
        color: '#0D5A79',
        itemColorActive: '#187DAC',
        itemColorHover: '#187DAC',
        itemColorActiveHover: '#187DAC',
        itemColorActiveCollapsed: '#187DAC',

        itemTextColorActive: '#f1f1f1',
        itemTextColorActiveHover: '#f1f1f1',
        itemTextColor: '#f1f1f1',
        itemTextColorHover: '#f1f1f1',

        itemIconColor: '#f1f1f1',
        itemIconColorHover: '#f1f1f1',
        itemIconColorActive: '#f1f1f1',
        itemIconColorCollapsed: '#f1f1f1',
        itemIconColorActiveHover: '#f1f1f1',
        borderRadius: '2px',

        arrowColor: "#f1f1f1",
        arrowColorActive: '#f1f1f1',
        arrowColorActiveHover: '#f1f1f1',

        itemTextColorChildActive: '#f1f1f1',
        itemTextColorChildActiveHover: '#f1f1f1',
        itemIconColorChildActive: '#f1f1f1',
        itemIconColorChildActiveHover: '#f1f1f1',

        arrowColorChildActive: '#f1f1f1',
        arrowColorChildActiveHover: 'f1f1f1',

        groupTextColor: '#f1f1f1'

    },
    Input: {
        borderRadius: '8px',
        paddingSmall: '10px 12px',
        paddingMedium: '12px 16px',
        color: '#ffffff',
        colorFocus: '#e8f5e9'
    },
    Dialog: {
        titleFontSize: '22px',
        contentTextColor: '#333333',
        borderRadius: '20px',
        titleTextColor: '#2e7d32',
        actionTextColor: '#4caf50'
    },
    Divider: {
        color: '#f1f1f1'
    },
    Progress: {
        railColor: '#f1f1f1',
        lineBgProcessing: 'linear-gradient(90deg,rgba(245, 245, 245, 1) 0%',
        fillColor: '#187DAC'
    },
    Breadcrumb: {
        itemTextColor: '#5F747D',
        itemTextColorActive: '#0D5A79',
        itemColorHover: '#ffffff',
        separatorColor: '#ACBBC3',
        itemLineHeight: '1.25',
        fontWeightActive: '450'
    },
    Pagination: {
        buttonColor: '#0D5A79',
        buttonIconColor: '#f1f1f1',
        itemBorder: '1px solid #f1f1f1',
        itemBorderActive: '1px solid',
        itemColorDisabled: '#0D5A79',

        buttonColorHover: '#229DDC',
        buttonIconColorHover: '#f1f1f1',

        itemTextColor: '#f1f1f1',
        itemTextColorHover: '#f1f1f1',
        itemTextColorActive: '#f1f1f1',

        itemColor: '#0D5A79',
        itemColorHover: '#229DDC',
        itemColorActive: '#0D5A79',
        itemColorActiveHover: '#187DAC',

        buttonBorder: '1px solid',
        itemBorderRadius: '50px'
    },
    DatePicker: {
        itemColorActive: '#229DDC',
        itemBorderRadius: '50px'
    },
    Button: {
        textColor: '#f1f1f1',
        textColorHover: '#f1f1f1',
        color: '#0D5A79',
        colorHover: '#229DDC',
        borderHover: '0px solid',

        borderRadiusTiny: '5px',
        borderRadiusSmall: '5px',
        borderRadiusMedium: '5px',
        borderRadiusLarge: '5px',
    },
    Checkbox: {
        colorChecked: '#0D5A79',
        borderRadius: '5px',
    }
}

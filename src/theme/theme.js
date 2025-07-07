// theme.js
export default {
    Layout: {
        siderToggleButtonColor: '#0D5A79', // Color de fondo del botón
        siderToggleButtonIconColor: '#f1f1f1', // Color del ícono (flecha)
        siderHoverColor: '#0D5A79', // Color al pasar el mouse
        siderToggleButtonBorder: '2px solid ',
        siderColor: '#0d5a79',
        headerColor: '#0d5a79'
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
        border: 'solid 1px #0D5A79',
        borderHover: 'solid 1px #0d5a79',
        borderFocus: 'solid 1px #1d8ec6',
        boxShadowFocus: '0 0 0 2px rgba(29, 142, 198, 0.2)'
    },
    Select: {
        peers: {
            InternalSelection: {
                border: 'solid 1px #0D5A79',
                borderHover: 'solid 1px #0d5a79',
                borderFocus: 'solid 1px #1d8ec6',
                borderActive: 'solid 1px #1d8ec6',
                boxShadowFocus: '0 0 0 2px rgba(29, 142, 198, 0.2)',
                boxShadowActive: '0 0 0 2px rgba(29, 142, 198, 0.2)',
            },
            InternalSelectMenu: {
                optionTextColorPressed: '#0D5A79',
                optionTextColorActive: '#1d8ec6',
                optionCheckColor: '#1d8ec6'
            },
        }
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
        itemTextColorActive: '#fff',
        itemBorderActive: 'solid 1px #fff',
        itemColorActive: '#136c93',
        itemTextColor: '#fff',
        itemTextColorHover: '#fff',
        itemTextColorPressed: '#000',
        itemColorHover: '#136c93',
        buttonIconColor: '#fff',
        buttonBorder: 'solid 1px #fff',
        buttonIconColorHover: '#fff',
        buttonColorHover: '#136c93'
    },
    DatePicker: {
        itemColorActive: '#229DDC',
        itemBorderRadius: '50px'
    },
    Button: {
        colorPrimary: '#0D5A79',
        colorHoverPrimary: '#187dac',
        colorPressedPrimary: '#136c93',
        colorFocusPrimary: '#136c93',
        borderPrimary: '#0D5A79',
        borderHoverPrimary: '#0D5A79',
        borderPressedPrimary: '#0D5A79',
        borderFocusPrimary: '#0D5A79',
        colorDisabledPrimary: '#0D5A79',
        borderDisabledPrimary: '#0D5A79',
        rippleColorPrimary: '#1d8ec6'
    },
    Checkbox: {
        colorChecked: '#0D5A79',
        borderRadius: '5px',
    }
}

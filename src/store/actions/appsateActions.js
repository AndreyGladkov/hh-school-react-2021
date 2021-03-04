import { ABOUT_PANEL_OFF, ABOUT_PANEL_ON, SETTINGS_PANEL_OFF, SETTINGS_PANEL_ON } from "./types"

export const settingsOn = () => ({
    type: SETTINGS_PANEL_ON
})
export const setttingsOff = () => ({
    type: SETTINGS_PANEL_OFF
})
export const aboutOn = () => ({
    type: ABOUT_PANEL_ON
})
export const aboutOff = () => ({
    type: ABOUT_PANEL_OFF
})
import { ABOUT_PANEL_OFF, ABOUT_PANEL_ON, SETTINGS_PANEL_OFF, SETTINGS_PANEL_ON } from '../actions/types';
const appstate = (state = { about: false, settings: false }, action) => {
     switch (action.type) {
          case SETTINGS_PANEL_ON:
               state.settings = true;
               return state;
          case SETTINGS_PANEL_OFF:
               state.settings = false;
               return state;
          case ABOUT_PANEL_ON:
               state.about = true;
               return state;
          case ABOUT_PANEL_OFF:
               state.about = false;
               return state;
          default:
               return state
     }
}

export default appstate
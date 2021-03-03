import { combineReducers } from 'redux';
import appstate from './appstate';
import settings from './settings';
import users from './users';

export const reducer = combineReducers({settings, appstate, users});
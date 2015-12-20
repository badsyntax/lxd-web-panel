import pkg from '../../package';

export const DEBUG = (process.env.NODE_ENV !== 'production');
export const APP__TITLE = pkg.name;
export const AUTH__GET_SUCCESS = 'AUTH__GET_SUCCESS';
export const AUTH__GET_ERROR = 'AUTH__GET_ERROR';
export const AUTH__UPDATED = 'AUTH__UPDATED';

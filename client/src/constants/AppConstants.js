import pkg from '../../package';

export const DEBUG = (process.env.NODE_ENV !== 'production');
export const APP__TITLE = pkg.name;

export const AUTH__GET_SUCCESS = 'AUTH__GET_SUCCESS';
export const AUTH__GET_ERROR = 'AUTH__GET_ERROR';
export const AUTH__UPDATED = 'AUTH__UPDATED';

export const PROFILES__GET_SUCCESS = 'PROFILES__GET_SUCCESS';
export const PROFILES__GET_ERROR = 'PROFILES__GET_ERROR';
export const PROFILES__UPDATED = 'PROFILES__UPDATED';

export const CONTAINERS__GET_SUCCESS = 'CONTAINERS__GET_SUCCESS';
export const CONTAINERS__GET_ERROR = 'CONTAINERS__GET_ERROR';
export const CONTAINERS__UPDATED = 'CONTAINERS__UPDATED';


export const API__ENDPOINT = 'http://192.168.50.4:9000/v1'

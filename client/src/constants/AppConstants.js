import pkg from '../../package';

export const API__ENDPOINT = 'http://192.168.50.4:9000/v1';
export const LOGSERVER_ENDPOINT = 'ws://192.168.50.4:8080/';

export const DEBUG = (process.env.NODE_ENV !== 'production');
export const APP__TITLE = pkg.name;

export const AUTHENTICATE__ERROR = 'AUTHENTICATE__ERROR';
export const AUTHENTICATE__START = 'AUTHENTICATE__START';
export const AUTHENTICATE__END = 'AUTHENTICATE__END';
export const AUTHENTICATE__SUCCESS = 'AUTHENTICATE__SUCCESS';

export const AUTH__STORE_UPDATED = 'AUTH__STORE_UPDATED';

export const PROFILES__GET_START = 'PROFILES__GET_START';
export const PROFILES__GET_END = 'PROFILES__GET_END';
export const PROFILES__GET_SUCCESS = 'PROFILES__GET_SUCCESS';
export const PROFILES__GET_ERROR = 'PROFILES__GET_ERROR';
export const PROFILES__UPDATED = 'PROFILES__UPDATED';

export const IMAGES__GET_START = 'IMAGES__GET_START';
export const IMAGES__GET_END = 'IMAGES__GET_END';
export const IMAGES__GET_SUCCESS = 'IMAGES__GET_SUCCESS';
export const IMAGES__GET_ERROR = 'IMAGES__GET_ERROR';
export const IMAGES__UPDATED = 'IMAGES__UPDATED';

export const REMOTE_IMAGES__GET_START = 'REMOTE_IMAGES__GET_START';
export const REMOTE_IMAGES__GET_END = 'REMOTE_IMAGES__GET_END';
export const REMOTE_IMAGES__GET_SUCCESS = 'REMOTE_IMAGES__GET_SUCCESS';
export const REMOTE_IMAGES__GET_ERROR = 'REMOTE_IMAGES__GET_ERROR';
export const REMOTE_IMAGES__UPDATED = 'REMOTE_IMAGES__UPDATED';

export const CONTAINERS__GET_SUCCESS = 'CONTAINERS__GET_SUCCESS';
export const CONTAINERS__GET_ERROR = 'CONTAINERS__GET_ERROR';
export const CONTAINERS__UPDATED = 'CONTAINERS__UPDATED';


export const IMAGE_CREATE__ERROR = 'IMAGE_CREATE__ERROR';
export const IMAGE_CREATE__START = 'IMAGE_CREATE__START';
export const IMAGE_CREATE__END = 'IMAGE_CREATE__END';
export const IMAGE_CREATE__SUCCESS = 'IMAGE_CREATE__SUCCESS';

export const IMAGE_IMPORT__ERROR = 'IMAGE_IMPORT__ERROR';
export const IMAGE_IMPORT__START = 'IMAGE_IMPORT__START';
export const IMAGE_IMPORT__END = 'IMAGE_IMPORT__END';
export const IMAGE_IMPORT__SUCCESS = 'IMAGE_IMPORT__SUCCESS';


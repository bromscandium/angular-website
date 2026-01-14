import { environment } from '../environments/environment';

export const PUBLIC_URL = environment.baseHref.replace(/\/$/, '');

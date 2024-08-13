import vcs from '@woosy2207/tsgit'
import { cookies } from 'next/headers';


export function getRepository() {
  if (!cookies().get('directory')) {
    console.error('No directory set');
  } else {
    const tsgit = new vcs(cookies().get('directory')!.value);
    return tsgit;
  }
}
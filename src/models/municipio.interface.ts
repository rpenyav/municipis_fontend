export interface Municipio {
  id: number;
  ordenacioalfa: string;
  nomcompletens: string;
  adresa: string;
  codipostal: string;
  telefon: string;
  fax: string;
  nom: string;
  identificador: string;
  cif: string;
  cmun: string;
  digitcontrol: string;
  comparador: string;
  latitud: string;
  longitud: string;
  altitud: string;
  habitants: number;
  homes: number;
  dones: number;
  posicio_mapa: string;
  escut: string;
  fotografia_loc: string;
  emd: string;
  identificador_emd: string;
  email: string;
  m_youtube: string;
  m_facebook: string;
  m_twitter: string;
  m_gplus: string;
  m_instagram: string;
  fotoplano: string;
  deenei: string;
  comarca: Comarca;
  vegueria: Vegueria;
  provincia: Provincia;
  enllac: Enllac[];
  imatges: Imatges[];
  texts: Texts[];
  llocsinteres: LlocsInteres[];
}

interface Comarca {
  id: number;
  nom: string;
  idprovincia: number;
  idvegueria: number;
}

interface Provincia {
  id: number;
  nom: string;
}

interface Vegueria {
  id: number;
  nom: string;
}

interface Enllac {
  id: number;
  identificador: string;
  titol: string;
  text: string;
  url: string;
}

interface Imatges {
  id: number;
  identificador: string;
  title: string;
  fotografia: string;
}

interface Texts {
  id: number;
  identificador: string;
  titol: string;
  text: string;
  fotografia1: string;
  fotografia2: string;
  fotografia3: string;
}

interface LlocsInteres {
  id: number;
  identificador: string;
  titol: string;
  text: string;
  fotografia1: string;
  fotografia2: string;
  fotografia3: string;
}

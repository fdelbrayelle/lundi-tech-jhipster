export interface IVoiture {
  id?: number;
  nom?: string;
}

export class Voiture implements IVoiture {
  constructor(public id?: number, public nom?: string) {}
}

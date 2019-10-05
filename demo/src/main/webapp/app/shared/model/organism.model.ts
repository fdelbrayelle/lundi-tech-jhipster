export interface IOrganism {
  id?: number;
  organismName?: string;
}

export class Organism implements IOrganism {
  constructor(public id?: number, public organismName?: string) {}
}

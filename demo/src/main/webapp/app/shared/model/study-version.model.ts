import { Moment } from 'moment';
import { IStudy } from 'app/shared/model/study.model';

export interface IStudyVersion {
  id?: number;
  name?: string;
  creationDate?: Moment;
  updateDate?: Moment;
  study?: IStudy;
}

export class StudyVersion implements IStudyVersion {
  constructor(public id?: number, public name?: string, public creationDate?: Moment, public updateDate?: Moment, public study?: IStudy) {}
}

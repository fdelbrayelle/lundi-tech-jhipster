import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IStudyVersion } from 'app/shared/model/study-version.model';

type EntityResponseType = HttpResponse<IStudyVersion>;
type EntityArrayResponseType = HttpResponse<IStudyVersion[]>;

@Injectable({ providedIn: 'root' })
export class StudyVersionService {
  public resourceUrl = SERVER_API_URL + 'api/study-versions';

  constructor(protected http: HttpClient) {}

  create(studyVersion: IStudyVersion): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(studyVersion);
    return this.http
      .post<IStudyVersion>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(studyVersion: IStudyVersion): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(studyVersion);
    return this.http
      .put<IStudyVersion>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IStudyVersion>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IStudyVersion[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(studyVersion: IStudyVersion): IStudyVersion {
    const copy: IStudyVersion = Object.assign({}, studyVersion, {
      creationDate: studyVersion.creationDate != null && studyVersion.creationDate.isValid() ? studyVersion.creationDate.toJSON() : null,
      updateDate: studyVersion.updateDate != null && studyVersion.updateDate.isValid() ? studyVersion.updateDate.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.creationDate = res.body.creationDate != null ? moment(res.body.creationDate) : null;
      res.body.updateDate = res.body.updateDate != null ? moment(res.body.updateDate) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((studyVersion: IStudyVersion) => {
        studyVersion.creationDate = studyVersion.creationDate != null ? moment(studyVersion.creationDate) : null;
        studyVersion.updateDate = studyVersion.updateDate != null ? moment(studyVersion.updateDate) : null;
      });
    }
    return res;
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IStudy } from 'app/shared/model/study.model';

type EntityResponseType = HttpResponse<IStudy>;
type EntityArrayResponseType = HttpResponse<IStudy[]>;

@Injectable({ providedIn: 'root' })
export class StudyService {
  public resourceUrl = SERVER_API_URL + 'api/studies';

  constructor(protected http: HttpClient) {}

  create(study: IStudy): Observable<EntityResponseType> {
    return this.http.post<IStudy>(this.resourceUrl, study, { observe: 'response' });
  }

  update(study: IStudy): Observable<EntityResponseType> {
    return this.http.put<IStudy>(this.resourceUrl, study, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IStudy>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IStudy[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}

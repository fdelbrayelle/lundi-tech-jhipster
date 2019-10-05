import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IOrganism } from 'app/shared/model/organism.model';

type EntityResponseType = HttpResponse<IOrganism>;
type EntityArrayResponseType = HttpResponse<IOrganism[]>;

@Injectable({ providedIn: 'root' })
export class OrganismService {
  public resourceUrl = SERVER_API_URL + 'api/organisms';

  constructor(protected http: HttpClient) {}

  create(organism: IOrganism): Observable<EntityResponseType> {
    return this.http.post<IOrganism>(this.resourceUrl, organism, { observe: 'response' });
  }

  update(organism: IOrganism): Observable<EntityResponseType> {
    return this.http.put<IOrganism>(this.resourceUrl, organism, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IOrganism>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IOrganism[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}

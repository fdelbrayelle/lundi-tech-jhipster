import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IVoiture } from 'app/shared/model/voiture.model';

type EntityResponseType = HttpResponse<IVoiture>;
type EntityArrayResponseType = HttpResponse<IVoiture[]>;

@Injectable({ providedIn: 'root' })
export class VoitureService {
  public resourceUrl = SERVER_API_URL + 'api/voitures';

  constructor(protected http: HttpClient) {}

  create(voiture: IVoiture): Observable<EntityResponseType> {
    return this.http.post<IVoiture>(this.resourceUrl, voiture, { observe: 'response' });
  }

  update(voiture: IVoiture): Observable<EntityResponseType> {
    return this.http.put<IVoiture>(this.resourceUrl, voiture, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IVoiture>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IVoiture[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}

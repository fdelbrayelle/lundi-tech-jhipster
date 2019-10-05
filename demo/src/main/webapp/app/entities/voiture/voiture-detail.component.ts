import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IVoiture } from 'app/shared/model/voiture.model';

@Component({
  selector: 'jhi-voiture-detail',
  templateUrl: './voiture-detail.component.html'
})
export class VoitureDetailComponent implements OnInit {
  voiture: IVoiture;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ voiture }) => {
      this.voiture = voiture;
    });
  }

  previousState() {
    window.history.back();
  }
}

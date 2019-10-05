import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IOrganism } from 'app/shared/model/organism.model';

@Component({
  selector: 'jhi-organism-detail',
  templateUrl: './organism-detail.component.html'
})
export class OrganismDetailComponent implements OnInit {
  organism: IOrganism;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ organism }) => {
      this.organism = organism;
    });
  }

  previousState() {
    window.history.back();
  }
}

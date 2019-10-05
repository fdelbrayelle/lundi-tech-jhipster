import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IStudy } from 'app/shared/model/study.model';

@Component({
  selector: 'jhi-study-detail',
  templateUrl: './study-detail.component.html'
})
export class StudyDetailComponent implements OnInit {
  study: IStudy;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ study }) => {
      this.study = study;
    });
  }

  previousState() {
    window.history.back();
  }
}

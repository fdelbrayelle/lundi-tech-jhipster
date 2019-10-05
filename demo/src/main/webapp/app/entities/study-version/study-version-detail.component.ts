import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IStudyVersion } from 'app/shared/model/study-version.model';

@Component({
  selector: 'jhi-study-version-detail',
  templateUrl: './study-version-detail.component.html'
})
export class StudyVersionDetailComponent implements OnInit {
  studyVersion: IStudyVersion;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ studyVersion }) => {
      this.studyVersion = studyVersion;
    });
  }

  previousState() {
    window.history.back();
  }
}

import { Component, inject } from '@angular/core';

import { AppStateService } from '../app-state.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
})
export class ErrorComponent {
  private appStateService = inject(AppStateService);
  error$ = this.appStateService.state$.pipe(map((state) => state.error));
}

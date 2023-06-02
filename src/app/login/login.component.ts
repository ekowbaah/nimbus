import { ActivatedRoute, Router } from '@angular/router';
import { Component, inject } from '@angular/core';

import { AppStateService } from '../app-state.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';
  private readonly appStateService = inject(AppStateService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  login(): void {
    this.authService.login(this.username, this.password).subscribe(
      () => {
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.appStateService.setError(null);
        this.router.navigateByUrl(returnUrl);
      },
      (error) => {
        this.appStateService.setError(error.error.message);
      }
    );
  }
}

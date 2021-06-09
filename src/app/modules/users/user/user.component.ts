import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { switchMap } from 'rxjs/operators';
import { User } from '../user.interface';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: [`./user.component.scss`]
})
export class UserComponent implements OnInit {

  user!: User;
  loading!: boolean;

  constructor(
    private readonly _userService: UserService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loading = true;

    // Get data of user
    this.activatedRoute.params
    .pipe(
      switchMap( ({ id }) => this._userService.getById(id) )
      ).subscribe(user => {
        this.user = user;
        const image = this._userService.Avatars.find( i => i.id === this.user.id);
        this.user.image = image?.url;
        this.loading = false;
      }, err => {
        this.loading = false;
      });
  }

}

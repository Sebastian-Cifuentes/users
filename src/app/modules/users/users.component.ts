import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from './user.service';
import { User } from './user.interface';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: [`./users.component.scss`]
})
export class UsersComponent implements OnInit {

  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['id', 'image', 'name', 'email', 'city', 'company', 'actions'];
  dataSource!: MatTableDataSource<User>;

  users: User[] = [];
  loading!: boolean;

  constructor(
    private readonly _userService: UserService
  ) {
  }
  
  ngOnInit(): void {
    this.getUsers();
  }
  
  ngAfterViewInit() {
    this.paginator._intl.itemsPerPageLabel = "Usuarios por página";
  }

  /**
   * Filter by name
   * @param event Event of input
   */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /**
   * Get all users
   */
  getUsers() {
    this.loading = true;
    
    this._userService.getAll()
      .subscribe(users => {
        this.users = users;
        this.dataSource = new MatTableDataSource(this.users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.insertImage();
        this.loading = false;
      });
  }

  /**
   * Assing image to each user
   */
  insertImage() {
    for( let user of this.users ) {
      const image = this._userService.Avatars.find( i => i.id === user.id );
      user.image = image?.url;
    }
    console.log(this.users);
  }

}

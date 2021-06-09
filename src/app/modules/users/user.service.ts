import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User, Avatar } from './user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private URL = environment.apiKey;
  private avatars!: Avatar[]; 

  get Avatars() {
    return this.avatars;
  }

  constructor(
    private http: HttpClient
  ) {
    this.getAvatars();
  }

  /**
   * Get all user
   * @returns Users array
   */
  getAll() {
    return this.http.get<User[]>(this.URL);
  }

  /**
   * Get user by id
   * @param id User id
   * @returns User data
   */
  getById( id: number ) {
    return this.http.get<User>(`${this.URL}/${id}`);
  }

  /**
   * Return avatars of users
   */
  getAvatars() {
    this.http.get<Avatar[]>('assets/data/avatars.json')
      .subscribe( avatars => {
        this.avatars = avatars;
        console.log(avatars);
      });
  }

}

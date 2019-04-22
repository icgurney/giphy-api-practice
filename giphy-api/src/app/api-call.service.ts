import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiCallService {

  constructor(private http: HttpClient) {
  }

  getGifs(searchTerm){
    return this.http.get(`https://api.giphy.com/v1/gifs/search?api_key=nEWnXU3iT4gcV9bDimQWd6oVRvcxS0sR&q=${searchTerm}&limit=25&offset=0&rating=R&lang=en`)
  }
}

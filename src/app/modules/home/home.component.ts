import { Component, Injectable, OnInit } from '@angular/core';
import { AuthorsService } from 'src/app/services/authors.service';
import { Authors, AuthorWithPosts, Timezone } from 'src/app/modules/home/model/home.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  title = 'Home';
  authorWithPosts: AuthorWithPosts[] = [];
  timezone: Timezone | null = null;

  constructor(private myService: AuthorsService) { }

  ngOnInit(): void {
    this.getTimezone();

    this.myService.getAuthorsWithPosts().subscribe(
      (data: AuthorWithPosts[]) => {
        this.authorWithPosts = data;
        console.log('this.authors ', this.authorWithPosts)
      },
      (error) => {
        console.error('Error fetching authors', error);
      }
    );

  }

  getTimezone() {
    const timezoneName: string = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const now = new Date();
    const offsetInMinutes = now.getTimezoneOffset();

    this.timezone = {
      name: timezoneName,
      offset: offsetInMinutes
    };
    console.log('this.timezone', this.timezone)
  }

}

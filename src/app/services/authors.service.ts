import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { Authors, Posts, AuthorWithPosts } from 'src/app/modules/home/model/home.interface';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class AuthorsService {

    // private apiUrlAuthors = 'assets/jsonData/authors.json';
    // private apiUrlPosts = 'assets/jsonData/posts.json';
    private apiUrlAuthors = 'https://maqe.github.io/json/authors.json';
    private apiUrlPosts = 'https://maqe.github.io/json/posts.json';
    constructor(private httpService: HttpClient) { }

    getAuthors(): Observable<Authors[]> {
        return this.httpService.get<Authors[]>(this.apiUrlAuthors);
    }

    getPosts(): Observable<Posts[]> {
        return this.httpService.get<Posts[]>(this.apiUrlPosts);
    }

    getAuthorsWithPosts(): Observable<AuthorWithPosts[]> {
        return forkJoin({
            authors: this.getAuthors(),
            posts: this.getPosts()
        }).pipe(
            map(({ authors, posts }) => {
                return this.mergeAuthorsWithPosts(authors, posts);
            })
        );

    }

    private mergeAuthorsWithPosts(authors: Authors[], posts: Posts[]): AuthorWithPosts[] {
        const authorsWithPosts: AuthorWithPosts[] = [];
        for (const post of posts) {    
            const author = authors.find(author => author.id === post.author_id);
            if (author) {
                const result = {
                    id: post.author_id,
                    avatar_url: author.avatar_url,
                    name: author.name,
                    role: author.role,
                    place: author.place,
                    created_at: new Date(post.created_at),
                    image_url: post.image_url,
                    title: post.title,
                    body: post.body
                }
                authorsWithPosts.push(result);
            }
        }
        return authorsWithPosts
    }

}
import { Component, OnInit, Input } from '@angular/core';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: [ './hero-search.component.css' ]
})
export class HeroSearchComponent implements OnInit {
  heroes: Hero[];
  searchResult: Hero[];

  constructor(private heroService: HeroService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchResult = this.heroes.filter(hero => {
      return hero.name.toLocaleLowerCase().indexOf(term.toLocaleLowerCase()) >= 0
    })
  }

  ngOnInit(): void {
    this.heroService.getHeroes().subscribe(result => {
      this.heroes = result;
    })
  }
}
import { Component, inject, OnInit } from "@angular/core";
import { raceService } from "../../../services/races.service";
import { LoadingSpinnerComponent } from "../../../ui-elements/loading-spinner/loading-spinner.component";
import { DateFormatPipe } from "../../../pipes/date-pl";

@Component({
  selector: "sss-home-page",
  host: { class: "w-full h-full" },
  standalone: true,
  imports: [LoadingSpinnerComponent, DateFormatPipe],
  templateUrl: "home-page.component.html",
})
export class HomePageComponent implements OnInit {
  private raceService = inject(raceService);
  public isLoading: boolean = true;
  public nextEvent: any;

  public ngOnInit(): void {
    this.getNextEventData();
  }

  public getNextEventData() {
    this.raceService
      .getRaces({
        currentPage: 0,
        pageSize: 1,
        sort: "startDate",
        sortDirection: "DESC",
        completed: false,
      })
      .subscribe({
        next: (response: any) => {
          this.nextEvent = response.content[0];
          this.raceService
            .getLeagueImage(this.nextEvent.split.league.id)
            .subscribe({
              next: (response: any) => {
                this.nextEvent = {
                  ...this.nextEvent,
                  raceLogo: "data:image/jpg;base64" + response.content.logo,
                };
              },
              error: (err) => {
                console.log(err);
              },
            });
          this.isLoading = false;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}

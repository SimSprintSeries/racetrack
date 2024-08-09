import { Component, inject, OnInit } from "@angular/core";
import { raceService } from "../../../services/races.service";
import { LoadingSpinnerComponent } from "../../../ui-elements/loading-spinner/loading-spinner.component";
import { DateFormatPipe } from "../../../pipes/date-pl";
import { navOption } from "../../../ui-elements/navbar/nav.types";
import { SanitizeHtmlPipe } from "../../../pipes/sanitizeHtml";

@Component({
  selector: "sss-home-page",
  host: { class: "w-full h-full flex grow" },
  standalone: true,
  imports: [LoadingSpinnerComponent, DateFormatPipe, SanitizeHtmlPipe],
  templateUrl: "home-page.component.html",
})
export class HomePageComponent implements OnInit {
  private raceService = inject(raceService);
  public isLoading: boolean = true;
  public nextEvent: any;

  public socials = [
    {
      label: "facebook",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="2em" height="2em" viewBox="0 0 30 30">
                    <path fill="#ffffff" d="M15,3C8.373,3,3,8.373,3,15c0,6.016,4.432,10.984,10.206,11.852V18.18h-2.969v-3.154h2.969v-2.099c0-3.475,1.693-5,4.581-5 c1.383,0,2.115,0.103,2.461,0.149v2.753h-1.97c-1.226,0-1.654,1.163-1.654,2.473v1.724h3.593L19.73,18.18h-3.106v8.697 C22.481,26.083,27,21.075,27,15C27,8.373,21.627,3,15,3z"></path>
              </svg>`,
      url: "https://www.facebook.com/SimSprintSeries",
    },
    {
      label: "discord",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="2em" height="2em" viewBox="0 0 50 50">
                    <path fill="#ffffff" d="M 41.625 10.769531 C 37.644531 7.566406 31.347656 7.023438 31.078125 7.003906 C 30.660156 6.96875 30.261719 7.203125 30.089844 7.589844 C 30.074219 7.613281 29.9375 7.929688 29.785156 8.421875 C 32.417969 8.867188 35.652344 9.761719 38.578125 11.578125 C 39.046875 11.867188 39.191406 12.484375 38.902344 12.953125 C 38.710938 13.261719 38.386719 13.429688 38.050781 13.429688 C 37.871094 13.429688 37.6875 13.378906 37.523438 13.277344 C 32.492188 10.15625 26.210938 10 25 10 C 23.789063 10 17.503906 10.15625 12.476563 13.277344 C 12.007813 13.570313 11.390625 13.425781 11.101563 12.957031 C 10.808594 12.484375 10.953125 11.871094 11.421875 11.578125 C 14.347656 9.765625 17.582031 8.867188 20.214844 8.425781 C 20.0625 7.929688 19.925781 7.617188 19.914063 7.589844 C 19.738281 7.203125 19.34375 6.960938 18.921875 7.003906 C 18.652344 7.023438 12.355469 7.566406 8.320313 10.8125 C 6.214844 12.761719 2 24.152344 2 34 C 2 34.175781 2.046875 34.34375 2.132813 34.496094 C 5.039063 39.605469 12.972656 40.941406 14.78125 41 C 14.789063 41 14.800781 41 14.8125 41 C 15.132813 41 15.433594 40.847656 15.621094 40.589844 L 17.449219 38.074219 C 12.515625 36.800781 9.996094 34.636719 9.851563 34.507813 C 9.4375 34.144531 9.398438 33.511719 9.765625 33.097656 C 10.128906 32.683594 10.761719 32.644531 11.175781 33.007813 C 11.234375 33.0625 15.875 37 25 37 C 34.140625 37 38.78125 33.046875 38.828125 33.007813 C 39.242188 32.648438 39.871094 32.683594 40.238281 33.101563 C 40.601563 33.515625 40.5625 34.144531 40.148438 34.507813 C 40.003906 34.636719 37.484375 36.800781 32.550781 38.074219 L 34.378906 40.589844 C 34.566406 40.847656 34.867188 41 35.1875 41 C 35.199219 41 35.210938 41 35.21875 41 C 37.027344 40.941406 44.960938 39.605469 47.867188 34.496094 C 47.953125 34.34375 48 34.175781 48 34 C 48 24.152344 43.785156 12.761719 41.625 10.769531 Z M 18.5 30 C 16.566406 30 15 28.210938 15 26 C 15 23.789063 16.566406 22 18.5 22 C 20.433594 22 22 23.789063 22 26 C 22 28.210938 20.433594 30 18.5 30 Z M 31.5 30 C 29.566406 30 28 28.210938 28 26 C 28 23.789063 29.566406 22 31.5 22 C 33.433594 22 35 23.789063 35 26 C 35 28.210938 33.433594 30 31.5 30 Z"></path>
                </svg>`,
      url: "https://discord.com/invite/gVHE7Sf",
    },
    {
      label: "youtube",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="2em" height="2em" viewBox="0 0 50 50">
                    <path fill="#ffffff" d="M 44.898438 14.5 C 44.5 12.300781 42.601563 10.699219 40.398438 10.199219 C 37.101563 9.5 31 9 24.398438 9 C 17.800781 9 11.601563 9.5 8.300781 10.199219 C 6.101563 10.699219 4.199219 12.199219 3.800781 14.5 C 3.398438 17 3 20.5 3 25 C 3 29.5 3.398438 33 3.898438 35.5 C 4.300781 37.699219 6.199219 39.300781 8.398438 39.800781 C 11.898438 40.5 17.898438 41 24.5 41 C 31.101563 41 37.101563 40.5 40.601563 39.800781 C 42.800781 39.300781 44.699219 37.800781 45.101563 35.5 C 45.5 33 46 29.398438 46.101563 25 C 45.898438 20.5 45.398438 17 44.898438 14.5 Z M 19 32 L 19 18 L 31.199219 25 Z"></path>
                </svg>`,
      url: "https://www.youtube.com/@SimSprintSeries",
    },
    {
      label: "tiktok",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="2em" height="2em" viewBox="0 0 50 50">
                    <path fill="#ffffff" d="M41,4H9C6.243,4,4,6.243,4,9v32c0,2.757,2.243,5,5,5h32c2.757,0,5-2.243,5-5V9C46,6.243,43.757,4,41,4z M37.006,22.323 c-0.227,0.021-0.457,0.035-0.69,0.035c-2.623,0-4.928-1.349-6.269-3.388c0,5.349,0,11.435,0,11.537c0,4.709-3.818,8.527-8.527,8.527 s-8.527-3.818-8.527-8.527s3.818-8.527,8.527-8.527c0.178,0,0.352,0.016,0.527,0.027v4.202c-0.175-0.021-0.347-0.053-0.527-0.053 c-2.404,0-4.352,1.948-4.352,4.352s1.948,4.352,4.352,4.352s4.527-1.894,4.527-4.298c0-0.095,0.042-19.594,0.042-19.594h4.016 c0.378,3.591,3.277,6.425,6.901,6.685V22.323z"></path>
                </svg>`,
      url: "https://www.tiktok.com/@simsprintseries",
    },
    {
      label: "twitch",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="2em" height="2em" viewBox="0 0 50 50">
                    <path fill="#ffffff" d="M 5.3125 1 L 2 9.8125 L 2 43 L 13 43 L 13 49 L 20.40625 49 L 26.40625 43 L 35.40625 43 L 48 30.4375 L 48 1 Z M 11 6 L 43 6 L 43 28 L 37 34 L 25 34 L 19 40 L 19 34 L 11 34 Z M 20 13 L 20 27 L 26 27 L 26 13 Z M 30 13 L 30 27 L 36 27 L 36 13 Z"></path>
                </svg>`,
      url: "",
    },
  ];

  public partners = [
    {
      label: "tracktitan",
      image:
        "https://media.discordapp.net/attachments/1051812397939183626/1271423235996778496/track-titan-logo-840px.png?ex=66b748a9&is=66b5f729&hm=a4646f7a4c2d80dbc413fb8c187c405ff0a72a835478014f4980c3f449541f76&=&format=webp&quality=lossless&width=810&height=144",
    },
    {
      label: "stor3d",
      image:
        "https://media.discordapp.net/attachments/743966014269685820/1242905005414023238/Logo6edit.png?ex=66b706bd&is=66b5b53d&hm=35c9584b0c67cb496e3ed6d641ce91e41f0ba3e93236b167eaee8ff20fc4dca0&=&format=webp&quality=lossless&width=810&height=328",
    },
    {
      label: "moza",
      image:
        "https://www.lionheartracingseries.com/uploads/3/2/1/1/32117679/mozaracing-black-cropped_orig.png",
    },
  ];

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
                  raceLogo: "data:image/jpg;base64," + response.banner,
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

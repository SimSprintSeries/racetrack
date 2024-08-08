import { inject, Injectable } from "@angular/core";
import { API_URL } from "../constants/consts";
import { getRacesSearchParams } from "./service.types";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: "root" })
export class raceService {
  private http = inject(HttpClient);

  getRaces(searchParams: getRacesSearchParams) {
    return this.http.get(`${API_URL}race`, {
      params: searchParams,
    });
  }

  getLeagueImage(leagueId: number) {
    return this.http.get(`${API_URL}image`, {
      params: { leagueId: leagueId },
    });
  }
}

import { Component } from "@angular/core";
import { navOption } from "./nav.types";
import { SanitizeHtmlPipe } from "../../pipes/sanitizeHtml";
import { NAV_ICONS } from "./nav.svg";
import { NavBarOptionComponent } from "../nav-bar-option/nav-bar-option.component";

@Component({
  selector: "sss-nav",
  host: { class: "w-full flex justify-center items-center" },
  standalone: true,
  imports: [SanitizeHtmlPipe, NavBarOptionComponent],
  templateUrl: "./nav.component.html",
  styles: ``,
})
export class NavComponent {
  public navOptions: navOption[] = [
    {
      label: "Sezony",
      icon: NAV_ICONS.seasons,
      children: [
        {
          label: "Aktualne",
        },
        {
          label: "Archiwalne",
        },
      ],
    },
    {
      label: "Discord",
      icon: NAV_ICONS.discord,
    },
    {
      label: "Statystki",
      icon: NAV_ICONS.stats,
    },
    {
      label: "Aktualności",
      icon: NAV_ICONS.news,
    },
    {
      label: "Zaloguj",
      icon: NAV_ICONS.login,
    },
    {
      label: "Wyloguj",
      icon: NAV_ICONS.logout,
    },
  ];

  public seasonDropdown = false;
}

import { Component, Input } from "@angular/core";
import { navOption } from "../navbar/nav.types";
import { SanitizeHtmlPipe } from "../../pipes/sanitizeHtml";

@Component({
  selector: "sss-nav-bar-option",
  host: { class: "flex justify-center items-center relative" },
  standalone: true,
  imports: [SanitizeHtmlPipe],
  templateUrl: "./nav-bar-option.component.html",
})
export class NavBarOptionComponent {
  @Input() option!: navOption;

  public dropdownVisible?: boolean = false;

  handleDropdownVisibility = (value: boolean): void => {
    if (this.option.children?.length !== undefined) {
      this.dropdownVisible = value;
    }
  };
}

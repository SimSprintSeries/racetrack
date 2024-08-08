import { Component } from "@angular/core";

@Component({
  selector: "sss-loading-spinner",
  standalone: true,
  imports: [],
  template: `
    <div
      role="status"
      class="w-full min-h-full grow flex justify-center items-center"
    ></div>
  `,
  styles: ``,
})
export class LoadingSpinnerComponent {}

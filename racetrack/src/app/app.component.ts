import { Component } from "@angular/core";
import { NavComponent } from "./ui-elements/navbar/nav.component";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [NavComponent, RouterOutlet],
  template: `
    <main
      class="w-full min-h-[100vh] flex flex-col relative bg-[url('assets/bg.png')] bg-cover bg-right-top font-poppins font-light"
    >
      <sss-nav />
      <router-outlet />
    </main>
  `,
  styles: [],
})
export class AppComponent {}

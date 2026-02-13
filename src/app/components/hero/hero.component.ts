import { Component, inject } from "@angular/core";
import { TranslationService } from "../../services/translation.service";

@Component({
  selector: "app-hero",
  imports: [],
  templateUrl: "./hero.component.html",
  styleUrls: ["./hero.component.css"],
})
export class HeroComponent {
  translationService = inject(TranslationService);
  scrollToContact() {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }
}

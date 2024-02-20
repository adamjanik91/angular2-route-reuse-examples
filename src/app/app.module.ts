import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, RouteReuseStrategy } from "@angular/router";
import { CustomReuseStrategy } from "./route.reuse.custom.strategy";
import { AppRoutingModule } from "./app-routing.module";

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        RouterModule,
        AppRoutingModule
    ],
    providers: [ { provide: RouteReuseStrategy, useClass: CustomReuseStrategy } ],
    bootstrap: [AppComponent]
 
})
export class AppModule {
}

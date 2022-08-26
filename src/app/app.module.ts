import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';

@NgModule({
    declarations: [AppComponent, HomeComponent, ToolbarComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,

        MatButtonModule,
        MatIconModule,
        MatInputModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}

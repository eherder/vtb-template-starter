import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';

import { VtbComponentsModule } from '@sitespirit/vtb-component-library';

import { ItineraryResolver } from './resolvers/itinerary.resolver';

import { AppComponent } from './app.component';

import { MinisiteComponent } from './pages/minisite/minisite.component';

import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    AppComponent,
    MinisiteComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([{
      path: '',
      component: MinisiteComponent,
      pathMatch: 'full',
      resolve: {
        itinerary: ItineraryResolver
      }
    }
  ]),
  AgmCoreModule.forRoot({
    apiKey: 'AIzaSyDbQRG8PPZbPN0EUsOEm-Lbj0sYN4Ho_VI'
  }),
  HttpClientModule,
  VtbComponentsModule.forRoot(environment)
],
providers: [ItineraryResolver],
bootstrap: [AppComponent]
})
export class AppModule { }

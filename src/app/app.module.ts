import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroesComponent } from './heroes/heroes.component';
import { MessagesComponent } from './messages/messages.component';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { HeroEditorComponent } from './hero-editor/hero-editor.component';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAnalyticsModule} from '@angular/fire/analytics';
import {environment} from '../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireStorageModule} from '@angular/fire/storage';
import { ArmesComponent } from './armes/armes.component';
import { ArmeDetailComponent } from './arme-detail/arme-detail.component';
import { ArmeEditorComponent } from './arme-editor/arme-editor.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {_MatMenuDirectivesModule} from '@angular/material/typings/esm5/menu';
import {
  MatButtonModule, MatCardModule, MatChipsModule, MatFormFieldModule,
  MatGridListModule,
  MatIconModule, MatInputModule,
  MatListModule,
  MatMenuModule, MatProgressBarModule,
  MatToolbarModule
} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    HeroEditorComponent,
    ArmesComponent,
    ArmeDetailComponent,
    ArmeEditorComponent
  ],
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        ReactiveFormsModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        // AngularFireAnalyticsModule, // dynamically imports firebase/analytics
        NoopAnimationsModule,
        // imports firebase/firestore, only needed for database features
        // AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
        // AngularFireStorageModule // imports firebase/storage only needed for storage features
        MatMenuModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatChipsModule,
        MatFormFieldModule,
        MatListModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


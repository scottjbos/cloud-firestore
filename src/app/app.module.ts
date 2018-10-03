import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }    from '@angular/forms';

import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireModule } from 'angularfire2';

import { MatCheckboxModule, MatInputModule, MatButtonModule, MatIconModule, MatListModule, MatCardModule, MatTableModule, MatPaginatorModule, MatSortModule, MatTabsModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';


import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule }     from './app-routing.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { TodoComponent } from './todo/todo.component';
import { CctransactionComponent } from './cctransaction/cctransaction.component';

@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent,
        TodoComponent,
        CctransactionComponent
    ],
    imports: [
        BrowserModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        FormsModule,
        BrowserAnimationsModule,
        MatCheckboxModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatListModule,
        MatCardModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatTabsModule,
        FlexLayoutModule,
        AppRoutingModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }

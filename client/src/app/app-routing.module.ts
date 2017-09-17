import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component'

const appRoutes: Routes = [
    { 
        path: '', 
        component: HomeComponent 
    },
    { 
        path: 'home', 
        component: HomeComponent 
    },
    { 
        path: 'dashboard', 
        component: DashboardComponent 
    }
    // { path: 'hero/:id',      component: HeroDetailComponent },
    // {
    //   path: 'heroes',
    //   component: HeroListComponent,
    //   data: { title: 'Heroes List' }
    // },
    // { path: '',
    //   redirectTo: '/heroes',
    //   pathMatch: 'full'
    // },
    // { path: '**', component: PageNotFoundComponent }
  ];

@NgModule({
  declarations: [],
  imports: [
      RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
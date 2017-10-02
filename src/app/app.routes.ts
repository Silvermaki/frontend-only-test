//Native Imports
import {Routes} from "@angular/router";

//Component Imports
import {LoginComponent} from "./views/login/login.component";
import {RegisterComponent} from "./views/register/register.component";
import {NewRequestComponent} from "./views/new_request/new_request.component";
import {HomeComponent} from "./views/home/home.component";
import {XteamRequestComponent} from "./views/xteam_request/xteam_request.component";
import {BasicLayoutComponent} from "./components/common/layouts/basicLayout.component";
import {ReviewRequestComponent} from "./views/review_request/review_request.component";
import {MyRequestsComponent} from "./views/my_requests/my_requests.component";


export const ROUTES:Routes = [
  	{path: 'login', component: LoginComponent},
  	{path: 'register', component: RegisterComponent},
  	{path: 'dashboard', component: BasicLayoutComponent, 
    children: [
      	{path: 'new_request', component: NewRequestComponent},
      	{path: 'xteam_request', component: XteamRequestComponent},
        {path: 'my_requests', component: MyRequestsComponent},
        {path: 'review', component: ReviewRequestComponent},
      	{path: 'home', component: HomeComponent}
    ]
  },
  {path: '**',  redirectTo: 'login'}
];

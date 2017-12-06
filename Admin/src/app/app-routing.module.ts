import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthenticationComponent} from './authentication/authentication.component';
import {MainComponent} from './main/main.component';
import {LoggingGuard} from './logging.guard';
import {OrderComponent} from './order/order.component';
import {ProductComponent} from './product/product.component';
import {RealizedOrderComponent} from './realized-order/realized-order.component';

const routes: Routes = [
  {path: 'admin',
    component: AuthenticationComponent,
    pathMatch: 'full'
  },
  {path: 'admin/main',
    canActivate: [LoggingGuard],
    component: MainComponent,
    pathMatch: 'full'
  },
  {path: 'admin/main/orders',
    canActivate: [LoggingGuard],
    component: OrderComponent,
    pathMatch: 'full'
  },
  {path: 'admin/main/realizedOrders',
    canActivate: [LoggingGuard],
    component: RealizedOrderComponent,
    pathMatch: 'full'
  },
  {path: 'admin/main/products',
    canActivate: [LoggingGuard],
    component: ProductComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

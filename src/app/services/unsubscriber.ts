import { Injectable, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

/**
 * Unsubscribe from all subscriptions
 * Prevents memory leaks: when a subscription is made in a component it must
 * be unsubscribed from when the component is destroyed (when you change view)
 */

@Injectable({
  providedIn: 'root',
})
export class Unsubscriber implements OnDestroy {
  private subscription: Subscription = new Subscription();
  constructor() {}

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe(); // Unsubscribes from all subscriptions
    }
  }

  set addNewSubscription(subscription: Subscription) {
    this.subscription.add(subscription);
  }
}

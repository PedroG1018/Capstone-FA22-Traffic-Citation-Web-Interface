import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, HostBinding, Inject, OnDestroy, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './components/dialogs/confirmation-dialog/confirmation-dialog.component';
import { Unsubscriber } from './services/unsubscriber';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css',]
})
export class AppComponent extends Unsubscriber implements OnInit, OnDestroy {
  title = 'TrafficCitation.UI';
  intervalSub;

  @HostBinding('class') className = '';
  
  constructor(public auth: AuthService, private overlay: OverlayContainer, @Inject(DOCUMENT) private doc: Document, private dialog: MatDialog, private storage: StorageService) {
    super();
  }

  ngOnInit() : void {
    this.toggleDarkMode(this.storage.darkMode);

    this.addNewSubscription = this.storage.observeStorage().subscribe(change => {
      this.toggleDarkMode(change);
    })
  }

  toggleDarkMode(change: string) {
    if (change === 'darkModeOn') {
      this.className = 'darkMode';
      this.overlay.getContainerElement().classList.add(this.className);      
    } else if (change === 'darkModeOff') {
      this.className = '';
      this.overlay.getContainerElement().classList.remove('darkMode');
    }
  }

  logout(): void {
    var dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      autoFocus: true,
      disableClose: true,
      width: '335px',
      height: 'auto'
    });

    dialogRef.componentInstance.title = 'Are you sure you want to logout?';
    this.addNewSubscription = dialogRef.afterClosed().subscribe(response => {
      if (response) {
        this.auth.logout({ returnTo: this.doc.location.origin });
      }
    })
  }
}
// src/app/services/event-update.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventUpdateService {
  private eventUpdatedSource = new Subject<void>();

  eventUpdated$ = this.eventUpdatedSource.asObservable();

  notifyEventUpdated() {
    this.eventUpdatedSource.next();
  }
}
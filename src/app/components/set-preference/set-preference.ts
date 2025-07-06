import { Component, EventEmitter, Output } from '@angular/core';
import { primeNgImports } from '../../imports/primeNgImports';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-set-preference',
  standalone: true,
  imports: [primeNgImports, FormsModule],
  templateUrl: './set-preference.html',
  styleUrl: './set-preference.scss',
})
export class SetPreference {
  fromBusStop: boolean = false; // Default: Thrissur
  toBusStop: boolean = false; // Default: Vellanikodu
  timePeriods: boolean = false;
  @Output() preferenceChanged = new EventEmitter<{ from: string; to: string; time: string;}>();

  onFromBusStopChange(): void {
    this.toBusStop = this.fromBusStop;
    this.emitPreference();
  }

  onToBusStopChange(): void {
    this.fromBusStop = this.toBusStop;
    this.emitPreference();
  }

  emitPreference(): void {
    const from = this.fromBusStop ? 'Thrissur' : 'Vellanikodu';
    const to = this.toBusStop ? 'Vellanikodu' : 'Thrissur';
    const time = this.timePeriods ? 'Morning' : 'Afternoon';

    this.preferenceChanged.emit({ from, to, time });
  }
}

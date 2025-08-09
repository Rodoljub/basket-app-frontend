import { Component, OnInit } from '@angular/core';
import { DriverService } from '../driver.service';
import { Driver } from '../driver.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-driver-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './driver-list.component.html',
  styleUrls: ['./driver-list.component.scss']
})
export class DriverListComponent implements OnInit {
  drivers: Driver[] = [];
  newDriverName = '';

  constructor(private driverService: DriverService) {}

  ngOnInit(): void {
    this.loadDrivers();
  }

  loadDrivers() {
    this.driverService.getDrivers().subscribe(data => {
      this.drivers = data;
    });
  }

  addDriver() {
    if (!this.newDriverName.trim()) return;
    this.driverService.createDriver({ name: this.newDriverName }).subscribe(() => {
      this.newDriverName = '';
      this.loadDrivers();
    });
  }

  deleteDriver(id: number) {
    if (confirm('Are you sure?')) {
      this.driverService.deleteDriver(id).subscribe(() => {
        this.loadDrivers();
      });
    }
  }
}

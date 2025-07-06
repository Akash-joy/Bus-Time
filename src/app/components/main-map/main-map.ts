import { SetPreference } from './../set-preference/set-preference';
import { Component, ViewChild } from '@angular/core';
import * as L from 'leaflet';
import { Bus, Locations } from '../../constants/model';
import { Route } from '../../services/route';
import { primeNgImports } from '../../imports/primeNgImports';
import { Popover } from 'primeng/popover';
@Component({
  selector: 'app-main-map',
  standalone: true,
  imports: [SetPreference, primeNgImports],
  templateUrl: './main-map.html',
  styleUrl: './main-map.scss',
})
export class MainMap {
  @ViewChild('timeDetails') timeDetails!: Popover;
  preference: any = { from: 'Vellanikodu', time: 'Afternoon', to: 'Thrissur' };
  constructor(private route: Route) {}
  busesByStop: { [key: string]: Bus[] } = {
    Vellanikodu: [
      {
        busName: 'Sleeha',
        from: 'Vellanikodu',
        to: 'Thrissur',
        time: 'Morning',
        arrival: '07:18 am',
      },
      {
        busName: 'Sreelakham',
        from: 'Vellanikodu',
        to: 'Thrissur',
        time: 'Morning',
        arrival: '08:18 am',
      },
    ],
    'Vadakke Stand': [
      {
        busName: 'Sleeha',
        from: 'Thrissur',
        to: 'Vellanikodu',
        time: 'Afternoon',
        arrival: '06:10 pm',
      },
      {
        busName: 'Matha Deluxe',
        from: 'Thrissur',
        to: 'Vellanikodu',
        time: 'Afternoon',
        arrival: '06:30 pm',
      },
    ],
  };

  filteredBuses: Bus[] = [];
  clickedMarker: any = null;

  ngAfterViewInit(): void {
    delete (L.Icon.Default.prototype as any)._getIconUrl;

    const map = L.map('map').setView(
      [10.462783432109736, 76.33734602568512],
      15
    );

    this.setIconConfig();

    L.tileLayer(
      'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
      { attribution: '&copy; OpenStreetMap & CARTO' }
    ).addTo(map);

    const locations = this.getlocationConfig();

    const markers = locations.map((loc) => {
      const marker = L.marker([loc.lat, loc.lng])
        .bindTooltip(loc.label, {
          permanent: true,
          direction: 'top',
          offset: [0, -10],
        })
        .on('click', (e) => {
          const target = e.originalEvent.target;
          const stopName = loc.label;
          this.updateFilteredBuses(stopName);
          this.timeDetails.toggle({ currentTarget: target });
        });

      return marker;
    });

    map.fitBounds(L.featureGroup(markers).getBounds());
    markers.forEach((marker) => marker.addTo(map));

    this.getRoute(map);
  }

  getRoute(map: any) {
    this.route.getRoutePath(this.getCoordinates()).subscribe((res: any) => {
      const geojson = L.geoJSON(res, {
        style: {
          color: 'blue',
          weight: 5,
        },
      }).addTo(map);

      map.fitBounds(geojson.getBounds());
    });
  }

  setIconConfig() {
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'assets/images/marker-icon-2x.png',
      iconUrl: 'assets/images/marker-icon.png',
      shadowUrl: 'assets/images/marker-shadow.png',
    });
  }

  getlocationConfig() {
    return [
      Locations.Vellanikodu,
      Locations.Amballur,
      Locations.Thalor,
      Locations.OllurCenter,
      Locations.Kuriachira,
      Locations.ShakthanStand,
      Locations.VadakkeStand,
    ];
  }

  getCoordinates() {
    return [
      [Locations.Vellanikodu.lng, Locations.Vellanikodu.lat],
      [Locations.Amballur.lng, Locations.Amballur.lat],
      [Locations.Thalor.lng, Locations.Thalor.lat],
      [Locations.OllurCenter.lng, Locations.OllurCenter.lat],
      [Locations.Kuriachira.lng, Locations.Kuriachira.lat],
      [Locations.ShakthanStand.lng, Locations.ShakthanStand.lat],
      [Locations.VadakkeStand.lng, Locations.VadakkeStand.lat],
    ];
  }

  handlePreference(event: any) {
    this.preference = event;
  }

  updateFilteredBuses(stopLabel: string) {
    const stopName = stopLabel.replace('📍 ', ''); // clean label

    const allBusesAtStop = this.busesByStop[stopName] || [];

    this.filteredBuses = allBusesAtStop.filter(
      (bus: { from: string; to: string; time: string }) =>
        bus.from === this.preference.from &&
        bus.to === this.preference.to &&
        bus.time === this.preference.time
    );
  }
}

export const Locations = {
  Vellanikodu: { lat: 10.46278, lng: 76.33734, label: '📍 Vellanikodu' },
  Amballur: { lat: 10.43267, lng: 76.26656, label: '📍 Amballur' },
  Thalor: { lat: 10.45479228200209, lng: 76.25341171432801, label: '📍 Thalor' },
  OllurCenter: { lat: 10.475075890237294, lng: 76.2405826553752, label: '📍 Ollur center' },
  Kuriachira: { lat: 10.503993744883587, lng: 76.22565727539255, label: '📍 Kuriachira' },
  ShakthanStand: { lat: 10.51543846359093, lng: 76.21565718927036, label: '📍 Shakthan stand' },
  VadakkeStand: { lat: 10.530651952336312, lng: 76.21474920889706, label: '📍 Vadakke Stand' },
} as const;


export interface Bus {
  busName: string;
  from: string;
  to: string;
  time: string;
  arrival: string;
}


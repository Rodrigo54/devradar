import api from "./api";

export interface Dev {
  _id: string;
  name: string,
  github_username: string,
  bio: string,
  avatar_url: string,
  techs: string[],
  location: {
    coordinates: [number, number] // [longitude, latitude]
    type: string;
    _id: string;
  }
}

export interface DevBody {
  github_username: string,
  techs: string,
  latitude: number;
  longitude: number;
}


type observer = (dev: any) => void;

export class DevEtitly {
  private static observers: observer[] = [];

  dev: Partial<DevBody>;

  constructor(dev: Partial<DevBody>) {
    this.dev = dev;
  }

  static subscribe(observer: observer) {
    this.observers.push(observer)
  }

  static next(dev?: Dev) {
    for (const observerFunction of this.observers) {
      observerFunction(dev)
    }
  }

  static async index() {
    const response = await api.get<Dev[]>("/devs");
    return response.data;
  }

  async store() {
    const response = await api.post<Dev>("/devs", this.dev);
    return response.data;
  }

  async update() {
    const response = await api.put<Dev>(`/devs/${this.dev.github_username}`, this.dev);
    return response.data;
  }

  async destroy() {
    const response = await api.delete(`/devs/${this.dev.github_username}`);
    return response.data;
  }
}

import { Reducer } from "./reduxHelper";
import { GeoJSON } from "geojson";

import { config } from '../../app-config/index'

export const backendUrl = "/api";

export interface MapArea {
  celat: number;
  celng: number;
  nelat: number;
  nelng: number;
}

export enum InternalPages {
  MAP = 'internal--gl--map'
}

export type MapData = {
  types?: Record<string, string>;
  data: Array<Record<string, Record<string, number>>>;
}

export type VisualId = string;

export type Viewport = {
  latitude: number;
  longitude: number;
  zoom: number;
}
export interface AppState {
  activePage: string;
  viewport: Viewport;
  currentPosition: Array<number> | null;
  userAllowedLocation: boolean;
  currentArea: MapArea | null;
  history: string[];
  geos: Map<string, GeoJSON>;
  datasets: Map<string, MapData>;
  mappedSets: Map<VisualId, Map<string, GeoJSON>>;
  currentDay: number; 
  datasetFound: boolean;
  currentVisual: VisualId; // TODO: Rename to currentVisual (when moving to app-config driven build)
  loading: Map<string, string>;
  viewPortEventsCount: number;
}

export const defaultAppState: AppState = {
  activePage: InternalPages.MAP,
  userAllowedLocation: true,
  currentPosition: null,
  viewport: {
    latitude: 51.65892664880053,
    longitude: 10.129394531250002,
    zoom: 5,
  },
  currentArea: null,
  history: [],
  geos: new Map<string, GeoJSON>(),
  datasets: new Map<string, MapData>(),
  mappedSets: new Map<VisualId, Map<string, GeoJSON>>(), 
  currentDay: 0,
  datasetFound: true,
  currentVisual: config.defaultVisual,
  loading: new Map(),
  viewPortEventsCount: 0,
};

class AppReducer extends Reducer<AppState> {
  constructor() {
    super(defaultAppState);
  }
  public gotoPage(pageId: string) {
    window.history.pushState({ page: pageId }, pageId);
    this.state.history.push(this.state.activePage);
    this.state.activePage = pageId;
  }
  public setUserAllowedLocation(allowed: boolean) {
    this.state.userAllowedLocation = allowed;
  }
  public setCurrentPosition(position: Array<number>) {
    this.state.currentPosition = position;
  }
  public setViewport(viewport: Viewport) {
    this.state.viewport = viewport;
  }
  public setCurrentArea(area: MapArea) {
    this.state.currentArea = area;
  }
  public addGeo(id: string, geo: GeoJSON) {
    this.state.geos.set(id, geo);
  }
  public addDataset(id: string, data: MapData) {
    this.state.datasets.set(id, data);
  }
  public addMappedSet(visualId: VisualId, id: string, data: GeoJSON) {
    if (!this.state.mappedSets.has(visualId)) {
      this.state.mappedSets.set(visualId, new Map<string, GeoJSON>())
    }
    this.state.mappedSets.get(visualId)?.set(id, data);
  }
  public setCurrentDay(day: number) {
    this.state.currentDay = day;
  }
  public setDatasetFound(found: boolean) {
    this.state.datasetFound = found;
  }
  public setCurrentVisual(id: VisualId) {
    this.state.currentVisual = id;
  }
  public setViewportEventCount(count: number) {
    this.state.viewPortEventsCount = count;
  }
  public pushLoading(id: string, message: string) {
    if (!this.state.loading.has(id)) {
      this.state.loading.set(id, message)
    }
  }
  public popLoading(id: string) {
    this.state.loading.delete(id)
  }
}

const AppReducerInstance = new AppReducer();
export const AppApi = AppReducerInstance.getApi();
export const AppReduxReducer = AppReducerInstance.getReduxReducer();

import { ComponentType } from 'react'
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { State }  from './state'

export type AppConfig = {
    ui: AppUI;
    content?: AppContent;
    buildJSON: BuildJSON;
    mapSettings?: MapSettings;
    defaultVisual: string;
    datasources: Record<DatasourceId, AppDatasource>;
    visuals: Record<VisualId, AppVisual>;
    geos: Record<GeoId, AppGeo>;
}

export type DatasourceId = string
export type VisualId = string
export type GeoId = string
export type MappingId = string
export type LayerId = string

export type AppDatasource = {
    url: string | Function;
}

export type AppVisual = {
    name: string;
    description: string;
    layers: Array<AppVisualLayerSpec>;
    layerGroups: Array<LayerGroup>;
    mappings: Record<MappingId, AppVisualMapping>;
    InfoComponent?: ComponentType; 
}

export type LayerGroup = {
    title: string;
    default?: boolean;
    layers: Array<LayerId>;
    mappables: Array<Mappable>;
    FeatureInfo: ComponentType<FeatureInfoProps>;
    search?: DefaultSearchOptions | CustomSearchOptions;
    pitch?: number;
    bearing?: number;
}

export type SearchResult = {
    feature?: any; // GeoJSON Feature, if available to be marked when found
    source?: string; // The datasource/mapping id the result was found in
    name: string;
    lng: number;
    lat: number;
}
export type SearchResultList = {
    results: Array<SearchResult>;
}
export type SearchMethod = (query: string, state: State) => SearchResultList

export type DefaultSearchOptions = {
    placeholder: string;
    inMappings: Array<AppSearchWhere>;
    nameProp: string;
    notFoundMessage: string;
    /**
     * Allows to transform a search term before it is queried for in the data
     * @param query
     */
    transformQuery?(query: string): string;
    all?: boolean;
}

export type CustomSearchOptions = {
    placeholder: string;
    notFoundMessage: string;
    searchMethod?: SearchMethod;
}

export type AppSearchWhere = {
    id: MappingId;
    properties: Array<string>;
    getCoordinates(feature: any): Array<number>; 
}

export enum LayerType {
    FILL = 'fill',
    LINE = 'line',
    CIRCLE = 'circle',
    FILL_EXTRUSION = 'fill-extrusion'
}

export type AppVisualLayerFunction = (dataField?: string, timeKey?: string) => AppVisualLayer

export type AppVisualLayerSpec = {
    id: LayerId;
    source: MappingId;
    fn: AppVisualLayerFunction;
}

export type AppVisualLayer = {
    id?: LayerId;
    source?: MappingId;
    type: LayerType;
    paint: Record<string, any>;
}

export type FeatureInfoProps = {
    feature: any; // TODO: use GeoJSON feature type
    dataField: string;
    timeKey: string;
    rawData: any;
    onClose?: Function;
}

export type AppVisualMapping = {
    geoId: string;
    datasourceId: string;
    geoProperty: string;
    dataProperty: string;
    transformData?: Function;
    transformGeo?: Function;
}

export type Mappable = {
    property: string;
    title: string;
    default?: boolean;
    transform?: Function;
}

export type AppGeo = {
    url: string | Function;
}

export type AppContent = {
    pages: Array<AppPage>;
}

export type AppPage = {
    id: string;
    title: string;
    Component: ComponentType;
}

export type BuildJSON = {
    /**
     * Absolute URL path to an image to be used in the loading/splash screen
     * Example:
     * app-config/static/logo.svg
     * -> www.domain.com/logo.svg
     * -> logoSrc: "/logo.svg"
     */
    meta: AppMeta;
    logoSrc: string;
    pwaOptions?: PWAOptions;
}

type Latitude = number
type Longitude = number
type LatLang = [Latitude, Longitude]
type NorthWest = LatLang
type SouthEast = LatLang

export type MapSettings = {
  constraints: [NorthWest, SouthEast];
}

export type AppMeta = {
    /**
     * Application Title, used as Logo alt text and in html head title
     */
    title: string;
}

export type AppUI = {
    Logo?: ComponentType;
    theme?: Theme;
}

export type Color = string;
export enum AppleMobileWebAppCapable {
    YES = 'yes',
    NO = 'no'
}
export enum AppleMobileWebAppStatusBarStyle {
    DEFAULT = 'default',
}

export type PWAOptions = {
    name?: string;
    themeColor?: Color;
    msTileColor?: Color;
    appleMobileWebAppCapable?: AppleMobileWebAppCapable;
    appleMobileWebAppStatusBarStyle?: AppleMobileWebAppStatusBarStyle;
    assetsVersion?: string;
    manifestPath?: string;
    iconPaths?: {
        favicon32?: string;
        favicon16?: string;
        appleTouchIcon?: string;
        maskIcon?: string;
        msTileImage?: string;
    };
}
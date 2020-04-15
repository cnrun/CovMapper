import { setAutoFreeze, enableMapSet } from "immer";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import storage from "redux-persist/lib/storage";
import { createBlacklistFilter } from 'redux-persist-transform-filter';

import { AppReduxReducer, AppState } from "./app";

enableMapSet()
setAutoFreeze(false);

const viewportSubsetFiler = createBlacklistFilter(
  'viewport',
  ['transitionInterpolator']
);

function persist(reducer: any, key: string, whitelist?: string[], blacklist?: string[]) {
  return persistReducer({
    blacklist,
    key,
    stateReconciler: autoMergeLevel2,  // alternatives: autoMigrateLevel1 (default), autoMigrateLevel2
    storage,
    whitelist,
    transforms: [viewportSubsetFiler]
  }, reducer);
}

export const rootReducer = combineReducers({
  app: persist(AppReduxReducer, "app", undefined, [
    'mappedSets', 'datasets', 'geos', 'loading', 'datasetFound', 
    'viewPortEventsCount', 'currentDate', 'hasSearchError',
    'currentFeature', 'isInstalled', 'installPrompt', 'snackbarMessage',
    'currentLayerGroup'
  ]),
});

// tslint:disable-next-line: no-empty-interface
export interface State {
    app: AppState;
}

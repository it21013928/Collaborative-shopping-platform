import { lazy } from 'react';
import Loadable from '../../components/Loadable';

const AppTable = Loadable(lazy(() => import('./tables/AppTable')));
const AppForm = Loadable(lazy(() => import('./forms/AppForm')));
const AppButton = Loadable(lazy(() => import('./buttons/AppButton')));
const AppIcon = Loadable(lazy(() => import('./icons/AppIcon')));
const AppProgress = Loadable(lazy(() => import('./AppProgress')));
const AppMenu = Loadable(lazy(() => import('./menu/AppMenu')));
const AppCheckbox = Loadable(lazy(() => import('./checkbox/AppCheckbox')));
const AppSwitch = Loadable(lazy(() => import('./switch/AppSwitch')));
const AppRadio = Loadable(lazy(() => import('./radio/AppRadio')));
const AppSlider = Loadable(lazy(() => import('./slider/AppSlider')));
const AppDialog = Loadable(lazy(() => import('./dialog/AppDialog')));
const AppSnackbar = Loadable(lazy(() => import('./snackbar/AppSnackbar')));
const AppAutoComplete = Loadable(lazy(() => import('./auto-complete/AppAutoComplete')));
const AppExpansionPanel = Loadable(lazy(() => import('./expansion-panel/AppExpansionPanel')));

const materialRoutes = [
  { path: 'dashboard/material/table', element: <AppTable /> },
  { path: 'dashboard/material/form', element: <AppForm /> },
  { path: 'dashboard/material/buttons', element: <AppButton /> },
  { path: 'dashboard/material/icons', element: <AppIcon /> },
  { path: 'dashboard/material/progress', element: <AppProgress /> },
  { path: 'dashboard/material/menu', element: <AppMenu /> },
  { path: 'dashboard/material/checkbox', element: <AppCheckbox /> },
  { path: 'dashboard/material/switch', element: <AppSwitch /> },
  { path: 'dashboard/material/radio', element: <AppRadio /> },
  { path: 'dashboard/material/slider', element: <AppSlider /> },
  { path: 'dashboard/material/autocomplete', element: <AppAutoComplete /> },
  { path: 'dashboard/material/expansion-panel', element: <AppExpansionPanel /> },
  { path: 'dashboard/material/dialog', element: <AppDialog /> },
  { path: 'dashboard/material/snackbar', element: <AppSnackbar /> }
];

export default materialRoutes;

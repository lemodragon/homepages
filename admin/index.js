import CMS from 'netlify-cms-app';
import { Control, Preview } from 'netlify-cms-ui-default';

CMS.registerWidget('string', Control, Preview);

CMS.init();
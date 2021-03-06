import Vue from 'vue';
import { Tab, TabItem } from 'vux';
import { Divider } from 'vux';
import { Search } from 'vux';
import { Checklist } from 'vux';
import { Drawer } from 'vux';
import { XHeader } from 'vux';
import { XButton } from 'vux';
import { ViewBox } from 'vux';
import { Cell } from 'vux';
import { Group } from 'vux';
import { Swipeout, SwipeoutItem, SwipeoutButton } from 'vux';
import { Tabbar, TabbarItem } from 'vux';
import { Masker } from 'vux';
import { XSwitch } from 'vux';
import { ToastPlugin } from 'vux';
import { Toast } from 'vux';
import { XInput } from 'vux';
import { Selector } from 'vux';
import { Popup } from 'vux';
import { Confirm } from 'vux';
import { ConfirmPlugin } from 'vux';
import { TransferDom } from 'vux';
import { Actionsheet } from 'vux';
import { Msg } from 'vux';
import { CellFormPreview } from 'vux';
import { Icon } from 'vux';
import { Badge } from 'vux'
import { XTextarea } from 'vux'
import { Loading } from 'vux'
import { LoadingPlugin } from 'vux'

Vue.use(LoadingPlugin)
Vue.component('loading', Loading)
Vue.component('x-textarea', XTextarea)
Vue.component('badge', Badge)
Vue.component('icon', Icon);
Vue.component('cell-form-preview', CellFormPreview);
Vue.component('msg', Msg);
Vue.component('actionsheet', Actionsheet);
Vue.directive('transfer-dom', TransferDom);
Vue.use(ConfirmPlugin);
Vue.component('confirm', Confirm);
Vue.component('popup', Popup);
Vue.component('selector', Selector);
Vue.component('x-input', XInput);
Vue.component('toast', Toast);
Vue.use(ToastPlugin);
Vue.component('x-switch', XSwitch);
Vue.component('masker', Masker);
Vue.component('tabbar', Tabbar);
Vue.component('tabbar-item', TabbarItem);
Vue.component('swipeout', Swipeout);
Vue.component('swipeout-item', SwipeoutItem);
Vue.component('swipeout-button', SwipeoutButton);
Vue.component('group', Group);
Vue.component('cell', Cell);
Vue.component('view-box', ViewBox);
Vue.component('x-button', XButton);
Vue.component('x-header', XHeader);
Vue.component('drawer', Drawer);
Vue.component('checklist', Checklist);
Vue.component('search', Search);
Vue.component('divider', Divider);
Vue.component('tab', Tab);
Vue.component('tab-item', TabItem);
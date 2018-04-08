import Vuex from 'vuex';
import { shallow, createLocalVue } from '@vue/test-utils';
// import bButton from 'bootstrap-vue/es/components/button/button';
import Wifi from '@/views/Wifi/Wifi';
import storeConfig from '@/../store/modules/WIFI';
// import { SET_SCAN_STATUS } from '../../../store/mutation-types';

const localVue = createLocalVue();
localVue.use(Vuex);
// localVue.component('b-button', bButton);

describe('WiFi.vue', () => {
  const defaultAPList = [{
    Index: 0,
    SSID: '360WIFI-XX',
    BSSID: '11:22:33:44:55:66',
    RSSI: '-80',
    JAM: false,
  },
  {
    Index: 1,
    SSID: '360WIFI-X2',
    BSSID: '11:22:33:44:55:66',
    RSSI: '-94',
    JAM: false,
  },
  {
    Index: 2,
    SSID: '360WIFI-X3',
    BSSID: '11:22:33:44:55:66',
    RSSI: '-81',
    JAM: false,
  }];

  const defaultSTAList = [{
    Index: 0,
    NAME: 'iPhone',
    MAC: '11:22:33:44:55:66',
    RSSI: '522',
    JAM: false,
  },
  {
    Index: 1,
    NAME: 'Android',
    MAC: '11:22:33:44:55:66',
    RSSI: '94',
    JAM: false,
  },
  {
    Index: 2,
    NAME: 'iPhone',
    MAC: '11:22:33:44:55:66',
    RSSI: '101',
    JAM: false,
  }];

  const defaultWiFiField = ['SSID', 'BSSID', 'RSSI', 'JAM'];
  const defaultClientField = ['MAC', 'BSSID', 'RSSI', 'JAM'];

  let store;
  let wrapper;
  before(() => {
    store = new Vuex.Store({
      modules: {
        WIFI: storeConfig,
      },
    });
    wrapper = shallow(Wifi, {
      mocks: {
        propsData: {
          wifi_fields: defaultWiFiField,
          client_fields: defaultClientField,
        },
        $store: store,
      },
      localVue,
    });
  });


  it('should render title correctly', () => {
    const defaultTitle = 'Cube Wifi Manage';
    expect(wrapper.find('.board h1').text()).to.equal(defaultTitle);
  });

  it('should renders wifi_fields to first table from $store.state', () => {
    expect(wrapper.findAll('b-table').wrappers[0].vnode.data.attrs.fields).deep.equal(defaultWiFiField);
  });
  it('should renders client_fields to second table from $store.state', () => {
    expect(wrapper.findAll('b-table').wrappers[1].vnode.data.attrs.fields).deep.equal(defaultClientField);
  });

  it('should renders apList to first table from $store.state', () => {
    expect(wrapper.findAll('b-table').wrappers[0].vnode.data.attrs.items)
      .deep.equal([]);
  });
  it('should renders staList to second table from $store.state', () => {
    expect(wrapper.findAll('b-table').wrappers[1].vnode.data.attrs.items)
      .deep.equal([]);
  });

  it('should renders Scan button before click', () => {
    expect(wrapper.find('van-button').text()).to.equal('Scan');
  });
  it('should renders Stop button after click', () => {
    wrapper.find('van-button').trigger('click');
    expect(wrapper.find('van-button').text()).to.equal('Stop');
  });
  it('should renders Scan button after double click', () => {
    wrapper.find('van-button').trigger('click');
    expect(wrapper.find('van-button').text()).to.equal('Scan');
  });
});

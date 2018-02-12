/* eslint import/no-extraneous-dependencies: ["error", {"peerDependencies": true}] */
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import axios from 'axios';

configure({ adapter: new Adapter() });

axios.defaults.adapter = require('axios/lib/adapters/http');

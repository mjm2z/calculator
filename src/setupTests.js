import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

global.config = {};
configure({ adapter: new Adapter() });

const defaultJestTimeout = 15000;
jest.setTimeout(defaultJestTimeout);

import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './App';
import 'mock-local-storage';
Enzyme.configure({adapter: new Adapter()});
const props = {

};

describe('App component', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<App/>, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});


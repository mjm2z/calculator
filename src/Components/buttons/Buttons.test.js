import React from 'react';
import Buttons from './Buttons';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';


describe('Button Tests', () => {
    let shallowButtons = null;
    let props = null;
    let store = {
        getState:jest.fn().mockImplementation(() => {state: {equation: '0'}}), 
        subscribe:jest.fn(), 
        dispatch:jest.fn()
    }

    const buttons = () => {
        if (!shallowButtons) {
            const { equation } = props;
            shallowButtons = shallow(<Buttons store={store} equation={equation} />)
        }
        return shallowButtons;
    }
    beforeEach(() => {
        props = {
            equation: '0'
        }
    })
    it('Given the reducer is called with an empty action, it should return the initial state', ()=>{
        // Follow this pattern for testing button clicks
        const btAC = buttons().dive().dive().find('#bt0');
        btAC.simulate('click');        
        
        console.log(buttons().dive().dive().find("#bt0").debug());
        console.log("Then")
        expect(buttons().dive().dive().find("#test")).toHaveLength(1);
        // console.log(res);
        // const stateAfter = Buttons.equation(initialState, {});
        // expect(stateAfter).toEqual(initialState);
    })
});
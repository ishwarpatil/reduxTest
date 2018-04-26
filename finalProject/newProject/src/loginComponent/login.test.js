import React from 'react';
import Enzyme, { mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Login} from './login';
import {MemoryRouter} from 'react-router-dom';
import 'mock-local-storage';
Enzyme.configure({adapter: new Adapter()});
const props = {
    login: jest.fn(),
    LoginUser: jest.fn(),
    userData: {
        msg: 'success',
    },
    history:{
        push:jest.fn()
    }
};

describe('Login component', () => {
    let component, inst;
    beforeEach(() => {
        component = mount(<MemoryRouter><Login {...props} /></MemoryRouter>).find('Login');
        inst = component.instance();
        inst.setState({ userValues: {username: "", password: ""}})
    });

    // it('component should render', () => {
    //     //console.log(component.html());
    //     const expectedHtml = '<div class="materialContainer"><div class="box"><div class="title">LOGIN</div><div class="input"><label for="name">Username</label><input type="text" name="username" id="name"><span class="spin"></span></div><div class="input"><label for="pass">Password</label><input type="password" name="password" id="pass"><span class="spin"></span></div><div class="button login"><button><span>GO</span> <i class="fa fa-check"></i></button></div><a href="" class="pass-forgot">Forgot your password?</a></div><div class="overbox" style="height: 120%;"><div class="material-button alt-2"><span class="shape"></span></div><div class="title">REGISTER</div><div class="input"><label for="regfirstname">First Name</label><input type="text" name="firstName" id="regfirstname" value=""><span class="spin"></span></div><div class="input"><label for="reglastname">Last Name</label><input type="text" name="lastName" id="reglastname" value=""><span class="spin"></span></div><div class="input"><label for="regemail">Email</label><input type="text" name="email" id="regemail" value=""><span class="spin"></span></div><div class="input"><label for="regpass">Password</label><input type="password" name="passwor" id="regpass" value=""><span class="spin"></span></div><div class="button"><button><span>Sing Up</span></button></div></div></div>';
    //     expect(component.html()).toEqual(expectedHtml);
    // });

    it('should render Login', () => {
        const loginWrapper = component.find('.materialContainer');
        expect(loginWrapper.length).toBe(1);
        const loginButton = component.find('button #buttonLogin');
        expect(loginButton.length).toBe(1);
        loginButton.simulate('click');
        //expect(props.userData.msg).toEqual("fail");
        expect(props.LoginUser).toHaveBeenCalled();
        //expect(inst.props.userData.msg).toEqual("fail");
        inst.setState({ userValues: {username: "sagar@gmail.com", password: "lanetteam1"}});
        loginButton.simulate('click');
        expect(props.LoginUser).toHaveBeenCalled();
        expect(inst.props.userData.msg).toEqual("success");
        //expect(props.history.push).toHaveBeenCalledWith('/login');
        // inst.setState({ credentials: {email: "mehul@gmail.com", password: "mehul123"}});
        // loginButton.simulate('click');
        // console.log(inst.props.history.push);
        // expect(props.history.push).toHaveBeenCalledWith('/main');
    });
});

import React from 'react';
import { connect } from 'react-redux'; //That lets us modify our component to have access to things related to redux.
import { createStructuredSelector } from 'reselect';


// import { auth } from '../../firebase/firebase.utils'
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectCartHidden } from '../../redux/cart/cart.selectors';

import { signOutStart } from '../../redux/user/user.actions';

import { ReactComponent as Logo } from '../../assets/crown.svg'; // This is a sepcial syntax in React for importing SVG.

import { 
    HeaderContainer, 
    LogoContainer, 
    OptionsContainer, 
    OptionLink 
} from './header.styles';

const Header = ({ currentUser, hidden, signOutStart }) => (
    <HeaderContainer>
        <LogoContainer to="/">
            <Logo className='logo' />
        </LogoContainer>
        <OptionsContainer>
            <OptionLink to="/shop">
                SHOP
            </OptionLink>
            <OptionLink to="/shop">
                CONTACT
            </OptionLink>
            {
                currentUser ? (
                <OptionLink as='div' onClick={signOutStart}>SIGN OUT</OptionLink> )
                :
                ( <OptionLink to="/signin">SIGN IN</OptionLink>)
            }
            <CartIcon />
        </OptionsContainer>
        {
            hidden ? null : <CartDropdown />
        }
    </HeaderContainer>
);

//This naming can be anything but mapStateToProps() is standart with Redux codebases.
const mapStateToProps = createStructuredSelector({ // createStructuredSelector(), the properties that we want point to the correct selector and then create structure selector will automatically pass are top level state that we get as our mapStateToProps into each subsequebt selector.
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
});

const mapDispatchToProps = dispatch => ({
    signOutStart: () => dispatch(signOutStart())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
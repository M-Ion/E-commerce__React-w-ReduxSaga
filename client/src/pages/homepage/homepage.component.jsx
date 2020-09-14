import React from 'react';

import Directory from '../../components/directory/directory.component'

import './homepgae.styles.scss';

import { HomePageContainer } from './homepgage.styles';

const HomePage = () => (
    <HomePageContainer>
        <Directory /> 
    </HomePageContainer>
);

export default HomePage;
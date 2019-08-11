import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import Iris from '../iris-keyboard.inline.svg';

const HeaderLink = styled(Link)`
  margin: 0;
  color: ${props => props.theme.colors.foreground};
`;

const HeaderStyle = styled.header`
  background: ${props => props.theme.colors.background};
  padding: 3.45rem 1.0875rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
`;

const IrisContainer = styled.div`
  width: 14rem;
`;

const Header = ({ siteTitle }) => (
  <HeaderStyle>
    <h1>
      <HeaderLink
        to="/"
        style={{
          textDecoration: `none`,
        }}
      >
        {siteTitle}
      </HeaderLink>
    </h1>
    <IrisContainer>
      <Iris />
    </IrisContainer>
  </HeaderStyle>
);

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;

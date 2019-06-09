import { Link as GatsbyLink } from "gatsby"
import styled from "styled-components"

export const Link = styled(GatsbyLink)`
  color: ${props => props.theme.colors.red};
`

import {
  Alignment,
  Button,
  Classes,
  Navbar,
  NavbarDivider,
  NavbarGroup,
  NavbarHeading,
} from "@blueprintjs/core";

const NavTop = ({ onAddClick }) => {
  return (
    <Navbar>
      <NavbarGroup align={Alignment.LEFT}>
        <NavbarHeading>Notas</NavbarHeading>
        <NavbarDivider />
        <Button onClick={onAddClick} className={Classes.MINIMAL} icon="annotation" text="Nova Nota" />
      </NavbarGroup>
    </Navbar>
  )
}

export default NavTop;
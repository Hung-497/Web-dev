import PageLinks from './PageLinks';
import SocialLinks from './SocialLinks';
import Registration from './Registration'

const Navbar = () => {
  return (
    <>
      <PageLinks parentClass="nav-links" itemClass="nav-link" />
      <SocialLinks parentClass="nav-icons" itemClass="nav-icon"/>
    </>
  );
};

export default Navbar;

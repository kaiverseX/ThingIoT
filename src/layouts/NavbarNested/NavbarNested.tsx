import {Navbar, ScrollArea} from '@mantine/core';
import LinksGroup from './components/LinksGroup';
import {exampleConfig, nestedNavbarConfig} from './config/navbarConfig';

/**
 * `NavbarNested` allows infinite nested level. But we should avoid nested as much as possible for a better UI/UX.
 *
 * ⚠️ `label` of each navbar item must be a *unique* string.
 *___
 * @notes In case of complex navbar routers, use Navbar with multiple collapsible sections instead.
 */
const NavbarNested = () => {
  const renderNavbarItems = nestedNavbarConfig.map((item) => (
    <LinksGroup {...item} key={item.label} />
  ));

  const renderExampleNavbar = exampleConfig.map((item) => (
    <LinksGroup {...item} key={item.label} />
  ));

  return (
    <Navbar width={{base: 250}}>
      {/* <Navbar.Section className="overflow-y-auto" grow> */}
      <Navbar.Section grow component={ScrollArea}>
        {renderNavbarItems}
      </Navbar.Section>

      <Navbar.Section className="border-t border-neutral-200">
        <div className="m-4 font-semibold">⭐ Demo section</div>
        {renderExampleNavbar}
      </Navbar.Section>
    </Navbar>
  );
};

export default NavbarNested;

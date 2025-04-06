
import React from "react";
import { Link } from "react-router-dom";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";

const NavLinks = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link to="/">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Home
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to="/doctors">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Doctors
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to="/services">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Services
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to="/appointments">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Appointments
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default NavLinks;

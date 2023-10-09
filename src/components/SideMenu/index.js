import {
  CalendarPlus,
  Gear,
  ListDashes,
  ListMagnifyingGlass,
  SignOut,
  Stethoscope,
} from "@phosphor-icons/react";
import React from "react";
import { NavLink } from "react-router-dom";
import Nav from "react-bootstrap/Nav";

const SideNav = () => {
  return (
    <Nav className="side-menu flex-column bg-3">
      <NavLink className="nav-link mb-4" to="/">
        <ListDashes size={20} weight="fill" />
        Resumo
      </NavLink>
      <NavLink className="nav-link mb-4" to="/agendar">
        <CalendarPlus size={20} weight="fill" />
        Agendar
      </NavLink>
      <NavLink className="nav-link mb-4" to="/consultar">
        <ListMagnifyingGlass size={20} weight="fill" />
        Consultar
      </NavLink>
      <NavLink className="nav-link mb-4" to="/medicos">
        <Stethoscope size={20} weight="fill" />
        Médicos
      </NavLink>
      <NavLink className="nav-link mb-4" to="/configuracoes">
        <Gear size={20} weight="fill" />
        Configurações
      </NavLink>
      <NavLink className="nav-link" to="/sair">
        <SignOut size={20} weight="fill" />
        Sair
      </NavLink>
    </Nav>
  );
};

export default SideNav;

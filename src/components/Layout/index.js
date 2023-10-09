import { Container, Row, Col } from "react-bootstrap";
import { ConsultSearch } from "../ConsultSearch";
import styles from "./styles.module.css";
import { SideMenu } from "../SideMenu";
export function Layout() {
  return (
    <div className={styles.container}>
      <SideMenu />
    </div>
  );
}

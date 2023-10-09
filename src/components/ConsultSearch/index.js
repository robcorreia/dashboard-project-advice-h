import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { MagnifyingGlass } from "@phosphor-icons/react";
import styles from "./styles.module.css";
import Button from "react-bootstrap/Button";

export function ConsultSearch() {
  return (
    <Form inline>
      <InputGroup>
        <Form.Control
          placeholder="Username"
          aria-label="Username"
          aria-describedby="basic-addon1"
        />
        <Button>
          <MagnifyingGlass size={20} />
        </Button>
      </InputGroup>
    </Form>
  );
}

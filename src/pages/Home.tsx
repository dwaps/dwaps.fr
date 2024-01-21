import { Col, Container, Row } from "react-bootstrap";
import styles from "./Home.module.scss";
import { useContext, useEffect, useRef } from "react";
import { NavigationContext } from "../utils/context/NavigationContext";

function Home() {
  const { setContactSection } = useContext(NavigationContext);
  const contactSection = useRef<HTMLDivElement>(null);

  useEffect(
    () => setContactSection(contactSection.current!),
    [setContactSection]
  );

  return (
    <Container fluid>
      <Row>
        <Col className={styles.slider}>SLIDER</Col>
      </Row>
      <Row>
        <Col className={`${styles.section} text-center`}>MES REALISATIONS</Col>
      </Row>
      <Row>
        <Col className={`${styles.section} text-center`}>
          <h2 ref={contactSection}>ME CONTACTER</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <hr style={{ backgroundColor: "#444", height: 10 }} />
          <Row>
            <Col>
              <h4 className="text-center">Liens</h4>
            </Col>
            <Col>
              <h4 className="text-center">Liens</h4>
            </Col>
            <Col>
              <h4 className="text-center">Liens</h4>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;

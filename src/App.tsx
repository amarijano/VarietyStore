import { useRoutes } from "react-router-dom";
import { AppRoutes } from "./router/data/routes";
import { Layout } from "antd";
import { Header } from "./components";
import styles from "./App.styles.module.scss";
import { ModalProvider } from "./components/GlobalModal/ModalContext";

function App() {
  const routesElement = useRoutes(AppRoutes());
  const { Content } = Layout;

  return (
    <ModalProvider>
      <Layout className={styles.layout}>
        <Header />
        <Content>{routesElement}</Content>
      </Layout>
    </ModalProvider>
  );
}
export default App;

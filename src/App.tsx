import { useRoutes } from "react-router-dom";
import { AppRoutes } from "./router/data/routes";
import { Layout } from "antd";
import { Header } from "./components";
import styles from "./App.styles.module.scss";

function App() {
  const routesElement = useRoutes(AppRoutes());
  const { Content } = Layout;

  return (
    <Layout className={styles.layout}>
      <Header />
      <Content>{routesElement}</Content>
    </Layout>
  );
}
export default App;

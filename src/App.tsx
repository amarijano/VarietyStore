import { Layout } from "antd";
import { useRoutes } from "react-router-dom";

import styles from "./App.styles.module.scss";
import { Header } from "./components";
import { ModalProvider } from "./context/ModalContext";
import { ProductsProvider } from "./context/ProductsContext";
import { AppRoutes } from "./router/data/routes";

function App() {
  const routesElement = useRoutes(AppRoutes());
  const { Content } = Layout;

  return (
    <ProductsProvider>
      <ModalProvider>
        <Layout className={styles.layout}>
          <Header />
          <Content className={styles.content}>{routesElement}</Content>
        </Layout>
      </ModalProvider>
    </ProductsProvider>
  );
}
export default App;

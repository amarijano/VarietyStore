import { useRoutes } from "react-router-dom";
import { AppRoutes } from "./router/data/routes";
import { Layout } from "antd";
import { Header } from "./components";
import styles from "./App.styles.module.scss";
import { ModalProvider } from "./components/GlobalModal/ModalContext";
import { ProductsProvider } from "./context/ProductsContext";

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

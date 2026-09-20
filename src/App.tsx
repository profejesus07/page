import { BookOpen, ClipboardCheck, Gamepad2, LayoutDashboard, LogIn, MonitorPlay, Newspaper, Sparkles } from "lucide-react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import ScrollToTop from "./components/layout/ScrollToTop";
import ComingSoonPage from "./pages/ComingSoonPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />

          <Route
            path="contenidos"
            element={
              <ComingSoonPage
                icon={BookOpen}
                title="Contenidos académicos"
                description="Planeaciones, guías, actividades y material para cada área y grado. Estamos preparando esta sección."
              />
            }
          />
          <Route
            path="gamificacion"
            element={
              <ComingSoonPage
                icon={Gamepad2}
                title="Gamificación"
                description="Juegos, retos y dinámicas para motivar y fortalecer el aprendizaje. Muy pronto disponible."
              />
            }
          />
          <Route
            path="recursos"
            element={
              <ComingSoonPage
                icon={MonitorPlay}
                title="Recursos digitales"
                description="Materiales interactivos, OVA, presentaciones, videos y más. Estamos trabajando en ello."
              />
            }
          />
          <Route
            path="examenes"
            element={
              <ComingSoonPage
                icon={ClipboardCheck}
                title="Plataforma de exámenes"
                description="Evalúa, realiza seguimiento y genera reportes fácilmente. Esta plataforma estará disponible próximamente."
              />
            }
          />
          <Route
            path="servicios"
            element={
              <ComingSoonPage
                icon={Sparkles}
                title="Servicios"
                description="Gamificaciones y soluciones educativas para docentes y escuelas. Página de detalle en construcción."
              />
            }
          />
          <Route
            path="blog"
            element={
              <ComingSoonPage
                icon={Newspaper}
                title="Blog"
                description="Ideas, guías y reflexiones sobre educación, gamificación y tecnología. Los primeros artículos llegan pronto."
              />
            }
          />
          <Route
            path="login"
            element={
              <ComingSoonPage
                icon={LogIn}
                title="Iniciar sesión"
                description="El acceso a la plataforma educativa estará disponible próximamente."
              />
            }
          />
          <Route
            path="admin"
            element={
              <ComingSoonPage
                icon={LayoutDashboard}
                title="Panel administrativo"
                description="Espacio de gestión para el contenido y la plataforma. En construcción."
              />
            }
          />

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}

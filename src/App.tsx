import { BookOpen, ClipboardCheck, LayoutDashboard, LogIn, Newspaper, Sparkles } from "lucide-react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import ScrollToTop from "./components/layout/ScrollToTop";
import AcademiaCodePage from "./pages/AcademiaCodePage";
import ComingSoonPage from "./pages/ComingSoonPage";
import EldoriaPage from "./pages/EldoriaPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import RecursosPage from "./pages/RecursosPage";
import AvisoLegalPage from "./pages/legal/AvisoLegalPage";
import PrivacidadPage from "./pages/legal/PrivacidadPage";
import TerminosPage from "./pages/legal/TerminosPage";

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
          <Route path="academia-code" element={<AcademiaCodePage />} />
          <Route path="eldoria" element={<EldoriaPage />} />
          <Route path="recursos" element={<RecursosPage />} />
          <Route
            path="examenes"
            element={
              <ComingSoonPage
                icon={ClipboardCheck}
                title="Plataforma de exámenes"
                description="Evalúa, realiza seguimiento y genera reportes fácilmente."
                link={{ href: "https://examenes-santarita.vercel.app/login", label: "Ir a la plataforma" }}
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

          <Route path="aviso-legal" element={<AvisoLegalPage />} />
          <Route path="privacidad" element={<PrivacidadPage />} />
          <Route path="terminos" element={<TerminosPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}

import { FileText } from "lucide-react";
import LegalLayout, { LegalSection } from "../../components/legal/LegalLayout";
import { contactInfo } from "../../data/contact";

export default function TerminosPage() {
  return (
    <LegalLayout
      icon={FileText}
      title="Términos y condiciones de uso"
      updated="25 de septiembre de 2026"
      intro="Condiciones bajo las que se ofrece el acceso y uso de este sitio web y de los contenidos que publica."
    >
      <LegalSection title="1. Aceptación de los términos">
        <p>
          Al navegar por este sitio, la persona usuaria acepta estos términos y condiciones. Si no está de
          acuerdo con ellos, debe abstenerse de usar el sitio.
        </p>
      </LegalSection>

      <LegalSection title="2. Descripción del sitio">
        <p>
          Este es un sitio educativo personal que ofrece, entre otros: contenidos académicos, recursos digitales,
          la experiencia de gamificación Academia C.O.D.E., la crónica de Chronicles of Eldoria, y enlaces a una
          plataforma externa de exámenes.
        </p>
      </LegalSection>

      <LegalSection title="3. Uso permitido">
        <p>
          El contenido puede consultarse y usarse con fines personales, educativos y no comerciales. No está
          permitido reproducir, distribuir o modificar los contenidos originales del sitio con fines comerciales
          sin autorización previa del titular.
        </p>
      </LegalSection>

      <LegalSection title="4. Plataformas de terceros">
        <p>
          El acceso a Academia C.O.D.E., Chronicles of Eldoria o la plataforma de exámenes desde este sitio
          redirige a aplicaciones independientes, cada una con sus propios términos de uso. El titular de este
          sitio no controla ni garantiza la disponibilidad, el contenido ni el funcionamiento continuo de esas
          plataformas.
        </p>
      </LegalSection>

      <LegalSection title="5. Propiedad intelectual">
        <p>
          Los nombres, textos e identidad visual propios de este sitio y de los proyectos Academia C.O.D.E. y
          Chronicles of Eldoria pertenecen a su titular. Su uso no autorizado con fines comerciales está
          prohibido.
        </p>
      </LegalSection>

      <LegalSection title="6. Limitación de responsabilidad">
        <p>
          El contenido de este sitio tiene fines informativos y educativos. No se garantiza que esté libre de
          errores ni que el servicio esté disponible de forma ininterrumpida. El titular no responde por daños
          derivados del uso o la imposibilidad de uso del sitio.
        </p>
      </LegalSection>

      <LegalSection title="7. Modificaciones">
        <p>
          Estos términos pueden actualizarse en cualquier momento para reflejar cambios en el sitio o en la
          normativa aplicable. La fecha de la última actualización se indica al inicio de esta página.
        </p>
      </LegalSection>

      <LegalSection title="8. Legislación aplicable">
        <p>
          Estos términos se rigen por la legislación colombiana. Para cualquier consulta relacionada con ellos,
          puede escribirse a {contactInfo.email}.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}

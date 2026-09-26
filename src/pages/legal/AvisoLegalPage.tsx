import { Scale } from "lucide-react";
import LegalLayout, { LegalSection } from "../../components/legal/LegalLayout";
import { contactInfo } from "../../data/contact";

export default function AvisoLegalPage() {
  return (
    <LegalLayout
      icon={Scale}
      title="Aviso legal"
      updated="25 de septiembre de 2026"
      intro="Este aviso identifica al responsable de este sitio y las condiciones básicas bajo las que puede usarse."
    >
      <LegalSection title="1. Identificación del titular">
        <p>
          Este sitio web es un espacio personal de carácter educativo, gestionado por{" "}
          <strong>Jesús Álvarez</strong> ("Profe Jesús Álvarez"), docente de primaria, con domicilio en Colombia.
        </p>
        <ul>
          <li>Correo de contacto: {contactInfo.email}</li>
          <li>WhatsApp: {contactInfo.whatsapp}</li>
        </ul>
      </LegalSection>

      <LegalSection title="2. Objeto del sitio">
        <p>
          El sitio tiene fines informativos y educativos: presenta contenidos académicos, recursos digitales,
          proyectos de gamificación (como Academia C.O.D.E. y Chronicles of Eldoria) y enlaces a plataformas
          externas, como la plataforma de exámenes. No es una plataforma de comercio electrónico ni recoge pagos.
        </p>
      </LegalSection>

      <LegalSection title="3. Plataformas y enlaces de terceros">
        <p>
          Algunas secciones enlazan a plataformas independientes (por ejemplo, el portal de Academia C.O.D.E., el
          portal estudiante de Chronicles of Eldoria o la plataforma de exámenes). Cada una de estas plataformas
          funciona bajo su propia infraestructura, condiciones de uso y política de privacidad, que no están
          cubiertas por este aviso legal. Se recomienda revisarlas de forma independiente antes de usarlas.
        </p>
      </LegalSection>

      <LegalSection title="4. Propiedad intelectual">
        <p>
          Los textos, imágenes, marcas propias (Academia C.O.D.E., Chronicles of Eldoria) y demás contenidos
          originales de este sitio pertenecen a su titular y no pueden reproducirse ni distribuirse con fines
          comerciales sin autorización previa. El material puede usarse libremente con fines educativos,
          citando la fuente.
        </p>
      </LegalSection>

      <LegalSection title="5. Limitación de responsabilidad">
        <p>
          Se procura que la información publicada sea correcta y esté actualizada, pero no se garantiza la
          disponibilidad continua del sitio ni la ausencia de errores. El titular no se hace responsable del uso
          que terceros hagan de la información aquí publicada, ni del contenido o disponibilidad de las
          plataformas externas enlazadas.
        </p>
      </LegalSection>

      <LegalSection title="6. Legislación aplicable">
        <p>
          Este aviso se rige por la legislación colombiana. Cualquier controversia relacionada con el sitio se
          someterá a los jueces y tribunales competentes en Colombia.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}

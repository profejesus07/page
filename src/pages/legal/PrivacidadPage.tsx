import { ShieldCheck } from "lucide-react";
import LegalLayout, { LegalSection } from "../../components/legal/LegalLayout";
import { contactInfo } from "../../data/contact";

export default function PrivacidadPage() {
  return (
    <LegalLayout
      icon={ShieldCheck}
      title="Política de privacidad"
      updated="25 de septiembre de 2026"
      intro="Cómo se tratan los datos personales de quienes visitan o contactan este sitio, en línea con la Ley 1581 de 2012 (Colombia)."
    >
      <LegalSection title="1. Responsable del tratamiento">
        <p>
          <strong>Jesús Álvarez</strong>, docente y titular de este sitio, es el responsable del tratamiento de
          los datos personales que se describen a continuación. Contacto: {contactInfo.email}.
        </p>
      </LegalSection>

      <LegalSection title="2. Qué datos se recogen">
        <p>
          Este sitio no tiene formularios de registro propios. Los únicos datos personales que se reciben son los
          que la persona entrega voluntariamente al escribir por correo electrónico o WhatsApp: nombre, datos de
          contacto y el contenido del mensaje.
        </p>
      </LegalSection>

      <LegalSection title="3. Finalidad del tratamiento">
        <ul>
          <li>Responder consultas sobre contenidos, recursos educativos o servicios.</li>
          <li>Brindar información sobre proyectos como Academia C.O.D.E. o Chronicles of Eldoria.</li>
        </ul>
        <p>Los datos no se usan con fines publicitarios ni se venden ni ceden a terceros.</p>
      </LegalSection>

      <LegalSection title="4. Terceros que intervienen en el sitio">
        <p>El sitio se aloja y distribuye a través de proveedores externos que pueden procesar datos técnicos:</p>
        <ul>
          <li>
            <strong>Vercel</strong>: alojamiento y entrega del sitio.
          </li>
          <li>
            <strong>Google Fonts</strong>: carga de tipografías, lo que puede implicar una solicitud a servidores
            de Google desde el navegador de quien visita el sitio.
          </li>
        </ul>
        <p>Cada proveedor gestiona esos datos según su propia política de privacidad.</p>
      </LegalSection>

      <LegalSection title="5. Cookies">
        <p>
          Este sitio no utiliza cookies propias de seguimiento, publicidad ni analítica. Los recursos externos
          (como las tipografías) pueden generar peticiones técnicas mínimas necesarias para su funcionamiento. Si
          en el futuro se incorporan herramientas de analítica o cookies adicionales, esta política se actualizará
          para informarlo.
        </p>
      </LegalSection>

      <LegalSection title="6. Plataformas educativas enlazadas">
        <p>
          Academia C.O.D.E., Chronicles of Eldoria y la plataforma de exámenes son aplicaciones independientes,
          pensadas para uso escolar bajo la supervisión de la institución educativa. Cada una recoge y trata sus
          propios datos (por ejemplo, códigos de estudiante o calificaciones) conforme a su propia política de
          privacidad, que no forma parte de este sitio. Se recomienda a docentes, familias e instituciones
          revisarlas antes de habilitar su uso con menores de edad.
        </p>
      </LegalSection>

      <LegalSection title="7. Derechos de los titulares">
        <p>
          De acuerdo con la Ley 1581 de 2012 y el Decreto 1377 de 2013, toda persona puede conocer, actualizar,
          rectificar y solicitar la supresión de sus datos personales, así como revocar la autorización otorgada
          para su tratamiento, escribiendo a {contactInfo.email}.
        </p>
      </LegalSection>

      <LegalSection title="8. Cambios en esta política">
        <p>
          Esta política puede actualizarse para reflejar cambios en el sitio o en la normativa aplicable. La
          fecha de la última actualización se indica al inicio de esta página.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}

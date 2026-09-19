export const metadata = {
  title: 'Políticas de Privacidad | UNITEC USA DESIGN',
  description: 'Políticas de Tratamiento de Información y Protección de los Datos Personales de UNITEC USA DESIGN.',
};

export default function PoliciesPage() {
  return (
    <main className="w-full min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-slate-900 px-6 py-8 sm:p-10 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Políticas de Tratamiento de Información y Protección de los Datos Personales
          </h1>
          <p className="mt-2 text-lg text-slate-300">
            UNITEC USA DESIGN
          </p>
        </div>
        
        <div className="px-6 py-8 sm:p-10 space-y-8 text-gray-700 leading-relaxed">
          
          <div className="bg-slate-50 p-5 rounded-lg border border-slate-200 text-slate-800 text-base leading-relaxed">
            <p>
              Esta Política de Privacidad describe cómo se recopila y utiliza la información para la aplicación móvil <strong>Building Innovation AI</strong>, desarrollada y mantenida por <strong>Unitec USA Design</strong>.
            </p>
          </div>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 border-b pb-2">Autorización y aviso de privacidad</h2>
            <p>
              La empresa <strong>UNITEC USA DESIGN</strong>, en cumplimiento de lo dispuesto en la Ley 1581 de 2012 y el Decreto 1074 de 2015, es responsable del tratamiento de los datos personales recolectados.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 border-b pb-2">Finalidad del tratamiento de datos</h2>
            <p className="mb-4">Los datos personales recolectados serán utilizados para las siguientes finalidades:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Establecer comunicación con clientes potenciales y actuales.</li>
              <li>Enviar información comercial, promocional y publicitaria sobre productos y servicios.</li>
              <li>Realizar seguimiento a solicitudes, cotizaciones o procesos comerciales.</li>
              <li>Gestionar relaciones contractuales y comerciales.</li>
              <li>Ejecutar estrategias de marketing a través de diferentes canales (correo electrónico, llamadas, SMS, WhatsApp y redes sociales).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 border-b pb-2">Derechos del titular de los datos</h2>
            <p className="mb-4">Como titular de la información, usted tiene derecho a:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Conocer, actualizar y rectificar sus datos personales.</li>
              <li>Solicitar prueba de la autorización otorgada.</li>
              <li>Ser informado sobre el uso que se le ha dado a sus datos.</li>
              <li>Revocar la autorización y/o solicitar la supresión del dato cuando no se respeten los principios legales.</li>
              <li>Acceder en forma gratuita a sus datos personales.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 border-b pb-2">Autorización del titular</h2>
            <p>
              Al suministrar sus datos personales por cualquier medio, el titular autoriza de manera libre, previa, expresa e informada a <strong>UNITEC USA DESIGN</strong> para realizar el tratamiento de los mismos conforme a las finalidades aquí descritas.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 border-b pb-2">Procedimiento para consultas y reclamos</h2>
            <p className="mb-4">
              Para ejercer sus derechos, el titular podrá enviar su solicitud al correo electrónico: <a href="mailto:lidermarketingonline@espaciosimportados.com.co" className="text-blue-600 hover:underline">lidermarketingonline@espaciosimportados.com.co</a>.
            </p>
            <p className="mb-6">Las consultas y reclamos serán atendidos en los términos establecidos por la ley.</p>
            
            <div className="bg-gray-100 p-6 rounded-lg">
              <h3 className="font-bold text-gray-900 mb-3">Datos de contacto:</h3>
              <ul className="space-y-2">
                <li><span className="font-semibold text-gray-900">Correo:</span> lidermarketingonline@espaciosimportados.com.co</li>
                <li><span className="font-semibold text-gray-900">Dirección:</span> Centro Comercial IDEO, Local 274</li>
                <li><span className="font-semibold text-gray-900">Ciudad:</span> Medellín, Antioquia</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 border-b pb-2">Seguridad de la información</h2>
            <p>
              <strong>UNITEC USA DESIGN</strong> reconoce la información como un activo fundamental y se compromete a implementar medidas técnicas, humanas y administrativas necesarias para garantizar la seguridad de los datos personales, evitando su adulteración, pérdida, consulta, uso o acceso no autorizado.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 border-b pb-2">Vigencia</h2>
            <p>
              La presente política rige a partir de su publicación y estará vigente mientras se mantenga la finalidad del tratamiento de los datos.
            </p>
          </section>

          <div className="pt-8 mt-8 border-t border-gray-200 text-sm text-gray-500 text-center">
            <p>Atentamente,</p>
            <p className="mt-2 text-base font-bold text-gray-900">ADRIANA RESTREPO</p>
            <p>Gerente General</p>
            <p>UNITEC USA DESIGN</p>
          </div>
          
        </div>
      </div>
    </main>
  );
}

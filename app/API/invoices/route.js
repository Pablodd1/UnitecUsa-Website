import { NextResponse } from 'next/server'
import PDFDocument from 'pdfkit'

export async function POST(req) {
  try {
    const { cart = [], language = 'es', reference = 'N/A', customer = {} } = await req.json()

    const doc = new PDFDocument({ size: 'A4', margin: 50 })
    const chunks = []
    doc.on('data', (chunk) => chunks.push(chunk))
    const endPromise = new Promise((resolve) => {
      doc.on('end', () => resolve(Buffer.concat(chunks)))
    })

    // Header
    doc.fontSize(20).text('UNITEC USA Design', { align: 'center' })
    doc.fontSize(10).text('Materiales Arquitectónicos de Alto Desempeño', { align: 'center' })
    doc.moveDown()
    
    doc.fontSize(16).text(language === 'es' ? 'RESUMEN DE COTIZACIÓN' : 'QUOTATION SUMMARY', { align: 'center', underline: true })
    doc.moveDown()

    // Info Section
    doc.fontSize(10)
    doc.text(`${language === 'es' ? 'Referencia' : 'Reference'}: ${reference}`)
    doc.text(`${language === 'es' ? 'Fecha' : 'Date'}: ${new Date().toLocaleDateString()}`)
    doc.moveDown()

    if (customer.companyName) {
      doc.text(`${language === 'es' ? 'Empresa' : 'Company'}: ${customer.companyName}`)
      doc.text(`${language === 'es' ? 'Contacto' : 'Contact'}: ${customer.contactName}`)
      doc.text(`${language === 'es' ? 'Email' : 'Email'}: ${customer.email}`)
      doc.moveDown()
    }

    // Table Header
    doc.fontSize(12).text(language === 'es' ? 'Productos Seleccionados' : 'Selected Products', { underline: true })
    doc.moveDown(0.5)

    let total = 0
    cart.forEach((line, idx) => {
      const price = line.price || 0
      const qty = line.qty || 1
      const lineTotal = price * qty
      total += lineTotal
      
      doc.fontSize(10).text(`${idx + 1}. ${line.name}`)
      doc.fontSize(9).text(`   ${qty} x $${price.toFixed(2)} = $${lineTotal.toFixed(2)}`, { indent: 20 })
      doc.moveDown(0.3)
    })

    doc.moveDown()
    doc.fontSize(14).text(`${language === 'es' ? 'Total Estimado' : 'Estimated Total'}: $${total.toFixed(2)}`, { align: 'right' })
    
    doc.moveDown(2)
    doc.fontSize(8).text(language === 'es' 
      ? 'Este documento es un resumen de los productos seleccionados y no constituye una factura legal o compromiso de compra.' 
      : 'This document is a summary of the selected products and does not constitute a legal invoice or purchase commitment.', 
      { align: 'center', color: 'gray' })

    doc.end()
    const pdfBuffer = await endPromise
    
    return new Response(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="unitec-quote-${reference}.pdf"`
      }
    })
  } catch (e) {
    console.error('PDF Error:', e)
    return NextResponse.json({ error: 'Invoice generation failed', detail: String(e) }, { status: 500 })
  }
}

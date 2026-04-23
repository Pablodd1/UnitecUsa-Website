import { NextResponse } from 'next/server'
import PDFDocument from 'pdfkit'

export async function POST(req) {
  try {
    const { cart = [], language = 'es' } = await req.json()

    const doc = new PDFDocument({ size: 'A4', margin: 50 })
    const chunks = []
    doc.on('data', (chunk) => chunks.push(chunk))
    const endPromise = new Promise((resolve) => {
      doc.on('end', () => resolve(Buffer.concat(chunks)))
    })

    doc.fontSize(18).text(language === 'es' ? 'Factura' : 'Invoice', { align: 'center' })
    doc.moveDown()

    let total = 0
    cart.forEach((line, idx) => {
      const price = line.price || 0
      const qty = line.qty || 1
      const lineTotal = price * qty
      total += lineTotal
      doc.fontSize(12).text(`${idx + 1}. ${line.name} - ${qty} x ${price.toFixed(2)} = ${lineTotal.toFixed(2)}`)
    })
    doc.moveDown()
    doc.fontSize(14).text(language === 'es' ? `Total: ${total.toFixed(2)}` : `Total: ${total.toFixed(2)}`, { align: 'right' })
    doc.end()
    const pdfBuffer = await endPromise
    return new Response(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="invoice.pdf"'
      }
    })
  } catch (e) {
    return NextResponse.json({ error: 'Invoice generation failed', detail: String(e) }, { status: 500 })
  }
}

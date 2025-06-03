import { useState } from 'react'
import { useCarrito } from '../context/CarritoContext'
import { useNavigate } from 'react-router-dom'
import './Checkout.css'

const Checkout = () => {
  const { carrito, vaciarCarrito } = useCarrito()
  const navigate = useNavigate()

  const [datos, setDatos] = useState({
    nombre: '',
    direccion: '',
    ciudad: '',
    metodoPago: '',
    metodoEnvio: ''
  })

  const [pagoTarjeta, setPagoTarjeta] = useState({
    numero: '',
    vencimiento: '',
    cvv: ''
  })

  const [mostrarError, setMostrarError] = useState(false)

  const total = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0)

  const handleSubmit = (e) => {
    e.preventDefault()

    const camposVacios = Object.values(datos).some(v => v === '')
    const pagoIncompleto =
      datos.metodoPago === 'tarjeta' &&
      Object.values(pagoTarjeta).some(v => v === '')

    if (camposVacios || pagoIncompleto || carrito.length === 0) {
      setMostrarError(true)
      return
    }

    vaciarCarrito()
    navigate('/pedido-completado')
  }

  return (
    <section className="checkout">
      <h2>Checkout</h2>

      <form className="formulario" onSubmit={handleSubmit}>
        <h3>Datos de envío</h3>
        <input
          type="text"
          placeholder="Nombre completo"
          value={datos.nombre}
          onChange={(e) => setDatos({ ...datos, nombre: e.target.value })}
        />
        <input
          type="text"
          placeholder="Dirección"
          value={datos.direccion}
          onChange={(e) => setDatos({ ...datos, direccion: e.target.value })}
        />
        <input
          type="text"
          placeholder="Ciudad"
          value={datos.ciudad}
          onChange={(e) => setDatos({ ...datos, ciudad: e.target.value })}
        />

        <h3>Método de pago</h3>
        <select
          value={datos.metodoPago}
          onChange={(e) => setDatos({ ...datos, metodoPago: e.target.value })}
        >
          <option value="">-- Seleccionar --</option>
          <option value="qr">Código QR</option>
          <option value="tarjeta">Tarjeta de Crédito</option>
        </select>

        {datos.metodoPago === 'qr' && (
          <img
            className="qr-img"
            src="https://borealtech.com/wp-content/uploads/2018/10/codigo-qr-1024x1024-1.jpg"
            alt="QR de pago"
          />
        )}

        {datos.metodoPago === 'tarjeta' && (
          <div className="tarjeta">
            <input
              type="text"
              placeholder="Número de tarjeta"
              value={pagoTarjeta.numero}
              onChange={(e) => setPagoTarjeta({ ...pagoTarjeta, numero: e.target.value })}
            />
            <input
              type="text"
              placeholder="Fecha de vencimiento (MM/AA)"
              value={pagoTarjeta.vencimiento}
              onChange={(e) => setPagoTarjeta({ ...pagoTarjeta, vencimiento: e.target.value })}
            />
            <input
              type="text"
              placeholder="CVV"
              value={pagoTarjeta.cvv}
              onChange={(e) => setPagoTarjeta({ ...pagoTarjeta, cvv: e.target.value })}
            />
          </div>
        )}

        <h3>Método de envío</h3>
        <select
          value={datos.metodoEnvio}
          onChange={(e) => setDatos({ ...datos, metodoEnvio: e.target.value })}
        >
          <option value="">-- Seleccionar --</option>
          <option value="express">Express (24h)</option>
          <option value="normal">Normal (3-5 días)</option>
        </select>

        {mostrarError && (
          <p className="error">Por favor, completa todos los campos requeridos.</p>
        )}

        <button type="submit">Completar orden</button>
      </form>

      <div className="resumen-pedido">
        <h3>Resumen del pedido</h3>
        {carrito.map(item => (
          <p key={item.id}>
            {item.nombre} × {item.cantidad} = <strong>S/. {(item.precio * item.cantidad).toFixed(2)}</strong>
          </p>
        ))}
        <p><strong>Total: S/. {total.toFixed(2)}</strong></p>
      </div>
    </section>
  )
}

export default Checkout

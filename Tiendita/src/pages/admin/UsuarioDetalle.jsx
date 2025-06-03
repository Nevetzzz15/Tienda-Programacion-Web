import { useParams } from 'react-router-dom'
import usuarios from '../../data/usuarios.json'
import './UsuarioDetalle.css'

const UsuarioDetalle = () => {
  const { id } = useParams()
  const usuario = usuarios.find(u => u.id === parseInt(id))
  console.log("Usuario encontrado:", usuario)
  
  if (!usuario) {
    return <p style={{ padding: '2rem' }}>Usuario no encontrado</p>
  }

  return (
    <section className="usuario-detalle">
      <h2>Detalle del Usuario</h2>

      <div className="info">
        <p><strong>Nombre:</strong> {usuario.nombre} {usuario.apellido}</p>
        <p><strong>Correo:</strong> {usuario.correo}</p>
        <p><strong>Rol:</strong> {usuario.rol}</p>
        <p><strong>Estado:</strong> {usuario.activo === false ? 'Inactivo' : 'Activo'}</p>
        <p><strong>Fecha de registro:</strong> {usuario.fechaRegistro}</p>
      </div>

      <hr />

      <h3>Últimas órdenes</h3>
      {usuario.ordenes && usuario.ordenes.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Fecha</th>
              <th>Estado</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {usuario.ordenes.slice(0, 10).map((orden) => (
              <tr key={orden.id}>
                <td>{orden.id}</td>
                <td>{orden.fecha}</td>
                <td>{orden.estado}</td>
                <td>S/. {orden.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Este usuario no tiene órdenes registradas.</p>
      )}
    </section>
  )
}

export default UsuarioDetalle
import { useParams, Navigate } from 'react-router';
import { useAuth } from './AuthContext';

function idMongoDbValidator (id) {

  // Validación básica que no esté vacío
  // y su longitud sea de 24 caracteres
  if (!id || id.trim().length !== 24)
    return false;

 // Validar formato hexadecimal
const isValidHex = /^[0-9a-fA-F]{24}$/.test(id.trim());
if (!isValidHex)
  return false;

// Validar IDs "especiales" reservados para mongodb
// IDs "sospechosos para testing o ataques"
// O secuencias que nunca generará mongodb en un id
const reservedOrSuspiciousObjectIds = [
  '000000000000000000000000',
  'ffffffffffffffffffffffff',

  // Patrones de testing comunes
  'aaaaaaaaaaaaaaaaaaaaaaaa',
  'bbbbbbbbbbbbbbbbbbbbbbbb',
  'cccccccccccccccccccccccc',

  // Secuencias obvias
  '0123456789abcdef01234567',
  '1234567890abcdef12345678',

  // Palabras/conceptos en hex
  'deadbeefdeadbeefdeadbeef', // "dead beef"
  'cafebabecafebabecafebabe', // "cafe babe"
  'badc0ffebadc0ffebadc0ffe', // "bad coffee"
];

if (reservedOrSuspiciousObjectIds.includes(id.trim().toLowerCase()))
  return false;

return true;

};//Fin de idMongoDbValidator

// Wrapper para validación
function IdValidator({ children }) {
  const { isAdmin } = useAuth();
  const { id } = useParams();
  const validatedId = idMongoDbValidator(id);

  if (!validatedId) {
    if (isAdmin)
      return <Navigate to="/products" replace />;
    else
      return <Navigate to="/getallproducts" replace />;
  }

  return children;
}

export default IdValidator;

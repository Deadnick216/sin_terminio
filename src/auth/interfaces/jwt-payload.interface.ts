export interface JwtPayload {
    id: number;
    tipo: 'estudiante' | 'docente' | 'nodocente'; // Agregar esta propiedad
  }
export class Productos {
    // Propiedades del modelo
    id: string;
    nombre: string;
    cantidad: number;
  
    // Puedes agregar un constructor si deseas inicializar propiedades
    constructor(obj: any) {
        this.id = obj && obj.id;
        this.nombre = obj && obj.username || '';
        this.cantidad = obj && obj.cantidad || '';
    }
  }
  
  

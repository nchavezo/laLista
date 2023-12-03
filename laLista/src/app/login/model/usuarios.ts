export class Usuarios {
    // Propiedades del modelo
    id: string;
    username: string;
    password: string;
    email: string;
  
    // Puedes agregar un constructor si deseas inicializar propiedades
    constructor(obj: any) {
        this.id = obj && obj.id;
        this.username = obj && obj.username || '';
        this.password = obj && obj.password || '';
        this.email = obj && obj.email || '';
    }
  }
  
  
